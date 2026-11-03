"""Énumérations du modèle de domaine — cf. docs/regles-de-gestion.md § 2.2."""

from enum import StrEnum


class Canal(StrEnum):
    """Canaux métier de Laura (RG-C02)."""

    SITE = "site"
    FORMULAIRE = "formulaire"
    WHATSAPP = "whatsapp"


class StatutConversation(StrEnum):
    ACTIVE = "active"
    ABANDONNEE = "abandonnee"
    TERMINEE = "terminee"
    ANONYMISEE = "anonymisee"


class Role(StrEnum):
    VISITEUR = "visiteur"
    LAURA = "laura"


class Temperature(StrEnum):
    CHAUD = "chaud"
    TIEDE = "tiede"
    FROID = "froid"


class StatutSuivi(StrEnum):
    """Cycle de vie commercial (RG-S01)."""

    NOUVEAU = "nouveau"
    CONTACTE = "contacte"
    RDV_PLANIFIE = "rdv_planifie"
    DEVIS_ENVOYE = "devis_envoye"
    SIGNE = "signe"
    PERDU = "perdu"


class MotifAlerte(StrEnum):
    """Les six motifs d'alerte équipe (RG-N01)."""

    URGENCE = "urgence"
    GROS_PROJET = "gros_projet"
    ORGANISME_PUBLIC = "organisme_public"
    APPEL_OFFRES = "appel_offres"
    MECONTENTEMENT = "mecontentement"
    DEMANDE_HUMAIN = "demande_humain"


class Gravite(StrEnum):
    IMMEDIATE = "immediate"
    NORMALE = "normale"
    DIFFEREE = "differee"


class TypeEvenement(StrEnum):
    PROSPECT_CHAUD = "prospect_chaud"
    ALERTE_EQUIPE = "alerte_equipe"
    COMPTE_RENDU = "compte_rendu"
    INCIDENT_TECHNIQUE = "incident_technique"
    BILAN_HEBDO = "bilan_hebdo"


class CanalNotification(StrEnum):
    TELEGRAM = "telegram"
    EMAIL = "email"
    WEBSOCKET = "websocket"
