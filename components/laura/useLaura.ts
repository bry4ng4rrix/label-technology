"use client";

/**
 * Connexion WebSocket à l'API Laura.
 *
 * Deux choix structurants :
 *
 * 1. La connexion n'est ouverte qu'au PREMIER clic sur le logo, jamais au
 *    montage. Côté API, se connecter crée une conversation en base : brancher
 *    le socket sur chaque page vue remplirait la table de conversations vides
 *    et consommerait le quota par IP (RG-X04) sans qu'un visiteur ait rien
 *    demandé.
 *
 * 2. L'identifiant et le jeton de reprise sont gardés en localStorage. Un
 *    visiteur qui recharge ou change de page retrouve son échange — sans
 *    compte ni mot de passe (RG-A01).
 */

import { useCallback, useEffect, useRef, useState } from "react";

import type {
  CompteRendu,
  ErreurLaura,
  Message,
  StatutConnexion,
  TrameEntrante,
  TrameSortante,
} from "./types";

const CLE_SESSION = "laura.session";
const INTERVALLE_PING = 25_000;
const RECULS = [1_000, 2_000, 4_000, 8_000, 15_000];

interface SessionStockee {
  conversation_id: string;
  resume_token: string;
}

function lireSession(): SessionStockee | null {
  if (typeof window === "undefined") return null;
  try {
    const brut = window.localStorage.getItem(CLE_SESSION);
    if (!brut) return null;
    const v = JSON.parse(brut) as SessionStockee;
    return v.conversation_id && v.resume_token ? v : null;
  } catch {
    return null;
  }
}

function ecrireSession(v: SessionStockee | null) {
  if (typeof window === "undefined") return;
  if (v) window.localStorage.setItem(CLE_SESSION, JSON.stringify(v));
  else window.localStorage.removeItem(CLE_SESSION);
}

/** Construit l'URL du socket depuis NEXT_PUBLIC_LAURA_URL (http → ws). */
function urlSocket(params: URLSearchParams): string {
  const base =
    process.env.NEXT_PUBLIC_LAURA_URL?.replace(/\/$/, "") ??
    "http://localhost:8000";
  const ws = base.replace(/^http/, "ws");
  return `${ws}/ws/chat?${params.toString()}`;
}

let compteur = 0;
const idLocal = () => `local-${++compteur}`;

export interface EtatLaura {
  statut: StatutConnexion;
  messages: Message[];
  erreur: ErreurLaura | null;
  compteRendu: CompteRendu | null;
  genereCompteRendu: boolean;
  modeDegrade: boolean;
  reclamee: boolean;
  /** Vrai dès qu'un message visiteur a été envoyé : masque les suggestions. */
  demarree: boolean;
  envoyer: (texte: string) => void;
  terminer: () => void;
  reclamer: (nom: string, email: string, consentement: boolean) => void;
  reinitialiser: () => void;
}

export function useLaura(actif: boolean): EtatLaura {
  const [statut, setStatut] = useState<StatutConnexion>("hors-ligne");
  const [messages, setMessages] = useState<Message[]>([]);
  const [erreur, setErreur] = useState<ErreurLaura | null>(null);
  const [compteRendu, setCompteRendu] = useState<CompteRendu | null>(null);
  const [genereCompteRendu, setGenereCompteRendu] = useState(false);
  const [modeDegrade, setModeDegrade] = useState(false);
  const [reclamee, setReclamee] = useState(false);
  const [demarree, setDemarree] = useState(false);

  const socket = useRef<WebSocket | null>(null);
  const ping = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnexion = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tentatives = useRef(0);
  const fermetureVoulue = useRef(false);

  const emettre = useCallback((trame: TrameSortante) => {
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(trame));
      return true;
    }
    return false;
  }, []);

  const traiter = useCallback((trame: TrameEntrante) => {
    switch (trame.type) {
      case "pret": {
        ecrireSession({
          conversation_id: trame.conversation_id,
          resume_token: trame.resume_token,
        });
        setModeDegrade(trame.mode_degrade);
        setStatut(trame.statut === "terminee" ? "termine" : "en-ligne");
        setMessages(
          trame.historique.map((m, i) => ({
            id: `hist-${i}`,
            role: m.role,
            contenu: m.contenu,
          })),
        );
        setDemarree(trame.historique.some((m) => m.role === "visiteur"));
        setErreur(null);
        tentatives.current = 0;
        break;
      }

      case "fragment":
        setMessages((prev) => {
          const dernier = prev[prev.length - 1];
          if (dernier?.enCours) {
            return [
              ...prev.slice(0, -1),
              { ...dernier, contenu: dernier.contenu + trame.texte },
            ];
          }
          return [
            ...prev,
            {
              id: idLocal(),
              role: "laura",
              contenu: trame.texte,
              enCours: true,
            },
          ];
        });
        break;

      case "fin_message":
        setMessages((prev) => {
          const dernier = prev[prev.length - 1];
          if (!dernier?.enCours) return prev;
          return [
            ...prev.slice(0, -1),
            {
              id: trame.message_id,
              role: "laura",
              contenu: trame.contenu,
            },
          ];
        });
        break;

      case "compte_rendu_en_cours":
        setGenereCompteRendu(true);
        break;

      case "compte_rendu":
        setGenereCompteRendu(false);
        setCompteRendu({
          objet: trame.objet,
          resume: trame.resume,
          temperature: trame.temperature,
          score: trame.score,
          prochaine_action: trame.prochaine_action,
        });
        setStatut("termine");
        break;

      case "reclamee":
        setReclamee(true);
        break;

      case "erreur":
        setGenereCompteRendu(false);
        setErreur({ code: trame.code, message: trame.message });
        // Le fragment en cours est abandonné : sinon une bulle vide reste.
        setMessages((prev) =>
          prev[prev.length - 1]?.enCours ? prev.slice(0, -1) : prev,
        );
        break;

      case "pong":
        break;
    }
  }, []);

  const connecter = useCallback(() => {
    if (socket.current) return;

    fermetureVoulue.current = false;
    setStatut("connexion");

    const params = new URLSearchParams({
      canal: "site",
      page_url: window.location.href,
      referrer: document.referrer || "",
      langue: document.documentElement.lang || "fr",
    });
    const session = lireSession();
    if (session) {
      params.set("conversation_id", session.conversation_id);
      params.set("token", session.resume_token);
    }

    const ws = new WebSocket(urlSocket(params));
    socket.current = ws;

    ws.onmessage = (e) => {
      try {
        traiter(JSON.parse(e.data) as TrameEntrante);
      } catch {
        /* trame illisible : on ignore plutôt que de casser le panneau */
      }
    };

    ws.onopen = () => {
      ping.current = setInterval(
        () => emettre({ type: "ping" }),
        INTERVALLE_PING,
      );
    };

    ws.onclose = () => {
      if (ping.current) clearInterval(ping.current);
      socket.current = null;
      if (fermetureVoulue.current) {
        setStatut("hors-ligne");
        return;
      }
      // Jeton refusé : la session stockée ne vaut plus rien, on la jette pour
      // que la prochaine tentative reparte sur une conversation neuve.
      setErreur((e) => {
        if (e?.code === "introuvable") ecrireSession(null);
        return e;
      });

      const recul = RECULS[tentatives.current];
      if (recul === undefined) {
        setStatut("echec");
        return;
      }
      tentatives.current += 1;
      setStatut("connexion");
      reconnexion.current = setTimeout(connecter, recul);
    };

    ws.onerror = () => ws.close();
  }, [emettre, traiter]);

  useEffect(() => {
    if (!actif) return;
    connecter();
    return () => {
      fermetureVoulue.current = true;
      if (ping.current) clearInterval(ping.current);
      if (reconnexion.current) clearTimeout(reconnexion.current);
      socket.current?.close(1000);
      socket.current = null;
    };
  }, [actif, connecter]);

  const envoyer = useCallback(
    (texte: string) => {
      const contenu = texte.trim();
      if (!contenu) return;
      setErreur(null);
      setDemarree(true);
      // Affichage optimiste : la bulle du visiteur apparaît sans attendre
      // l'aller-retour, le serveur ne la renvoie pas.
      setMessages((prev) => [
        ...prev,
        { id: idLocal(), role: "visiteur", contenu },
      ]);
      if (!emettre({ type: "message", contenu })) {
        setErreur({
          code: "hors_ligne",
          message: "Connexion perdue. Réessayez dans un instant.",
        });
      }
    },
    [emettre],
  );

  const terminer = useCallback(() => {
    setErreur(null);
    emettre({ type: "terminer" });
  }, [emettre]);

  const reclamer = useCallback(
    (nom: string, email: string, consentement: boolean) => {
      setErreur(null);
      emettre({ type: "reclamer", nom, email, consentement });
    },
    [emettre],
  );

  const reinitialiser = useCallback(() => {
    fermetureVoulue.current = true;
    socket.current?.close(1000);
    socket.current = null;
    ecrireSession(null);
    tentatives.current = 0;
    setMessages([]);
    setErreur(null);
    setCompteRendu(null);
    setReclamee(false);
    setDemarree(false);
    setStatut("hors-ligne");
    // Laisse le socket se fermer avant de rouvrir.
    setTimeout(connecter, 120);
  }, [connecter]);

  return {
    statut,
    messages,
    erreur,
    compteRendu,
    genereCompteRendu,
    modeDegrade,
    reclamee,
    demarree,
    envoyer,
    terminer,
    reclamer,
    reinitialiser,
  };
}
