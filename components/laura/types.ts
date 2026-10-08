/**
 * Protocole WebSocket de Laura — miroir de app/routes/ws.py côté API.
 *
 * Toute modification ici doit être répercutée dans l'API, et inversement :
 * c'est le seul contrat entre les deux dépôts.
 */

export type Canal = "site" | "formulaire" | "whatsapp";
export type Role = "visiteur" | "laura";
export type Temperature = "chaud" | "tiede" | "froid";

export interface MessageHistorique {
  role: Role;
  contenu: string;
  horodatage: string;
}

/** Message affiché dans le panneau. */
export interface Message {
  id: string;
  role: Role;
  contenu: string;
  /** Vrai pendant le streaming : affiche le curseur clignotant. */
  enCours?: boolean;
}

export interface CompteRendu {
  objet: string;
  resume: string;
  temperature: Temperature;
  score: number;
  prochaine_action: string;
}

export interface ErreurLaura {
  code: string;
  message: string;
}

/** Serveur → client. */
export type TrameEntrante =
  | {
      type: "pret";
      conversation_id: string;
      resume_token: string;
      canal: Canal;
      statut: string;
      historique: MessageHistorique[];
      mode_degrade: boolean;
    }
  | { type: "fragment"; texte: string }
  | { type: "fin_message"; message_id: string; contenu: string }
  | { type: "compte_rendu_en_cours" }
  | ({ type: "compte_rendu" } & CompteRendu)
  | { type: "reclamee"; lien_reprise: string }
  | { type: "erreur"; code: string; message: string }
  | { type: "pong" };

/** Client → serveur. */
export type TrameSortante =
  | { type: "message"; contenu: string }
  | { type: "terminer" }
  | { type: "reclamer"; nom: string; email: string; consentement: boolean }
  | { type: "ping" };

export type StatutConnexion =
  | "hors-ligne"
  | "connexion"
  | "en-ligne"
  | "termine"
  | "echec";

/** Codes d'erreur qui closent l'échange : on propose alors le relais humain. */
export const CODES_TERMINAUX = new Set([
  "conversation_pleine",
  "trop_de_conversations",
  "modele_indisponible",
  "introuvable",
]);
