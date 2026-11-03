"""Schémas Pydantic.

Les classes du bloc « sortie contrainte » servent de `response_schema` à Gemini
(RG-R05) : aucune rubrique du compte rendu ne peut manquer. Contrainte du SDK :
pas d'`Optional`, pas d'union — on utilise des valeurs neutres ("" et 0) pour
l'inconnu.
"""

from datetime import datetime

from pydantic import BaseModel, Field

from app.enums import Canal, StatutSuivi, Temperature

# --------------------------------------------------------------------------
# Sortie contrainte du modèle
# --------------------------------------------------------------------------


class QuestionReponse(BaseModel):
    question: str
    reponse: str


class AlerteData(BaseModel):
    motif: str = Field(
        description=(
            "urgence | gros_projet | organisme_public | appel_offres | "
            "mecontentement | demande_humain"
        )
    )
    justification: str


class ProspectData(BaseModel):
    nom: str = ""
    entreprise: str = ""
    email: str = ""
    telephone: str = ""
    pays: str = ""
    secteur: str = ""


class QualificationData(BaseModel):
    """Faits extraits de l'échange.

    Le modèle constate, il ne note pas : le score est calculé par
    `app.scoring` à partir de ces champs, pour être reproductible (RG-Q03).
    """

    activite: str = ""
    marche: str = Field(
        default="",
        description="MADAGASCAR | FRANCE | EUROPE | AFRIQUE_FRANCOPHONE | INCONNU",
    )
    service_concerne: str = ""
    besoins: list[str] = Field(default_factory=list)
    budget_evoque: bool = False
    budget_texte: str = ""
    delai_mois_estime: int = Field(default=0, description="0 si non exprimé")
    interlocuteur_decideur: bool = False
    volume_renseigne: bool = Field(
        default=False, description="véhicules, élèves, utilisateurs, documents…"
    )
    demande_explicite: bool = Field(
        default=False, description="démo, devis ou appel explicitement demandé"
    )


class CompteRenduData(BaseModel):
    """Les 9 rubriques obligatoires (RG-R01)."""

    objet: str
    prospect: ProspectData
    qualification: QualificationData
    resume: str = Field(description="3 à 4 phrases (RG-R02)")
    questions: list[QuestionReponse] = Field(default_factory=list)
    infos_recueillies: list[str] = Field(default_factory=list)
    infos_manquantes: list[str] = Field(default_factory=list)
    alertes: list[AlerteData] = Field(default_factory=list)
    etapes_contractualisation: list[str] = Field(
        default_factory=list, description="ordonnées, jusqu'à la signature (RG-R03)"
    )
    prochaine_action: str = ""
    echeance_jours: int = 0


class TrouData(BaseModel):
    """Détection d'information manquante (RG-T02)."""

    trou_detecte: bool = False
    sujet: str = ""
    fiche_code: str = Field(default="", description='ex. "02", "04", "15"')


# --------------------------------------------------------------------------
# API
# --------------------------------------------------------------------------


class CreationSession(BaseModel):
    canal: Canal = Canal.SITE
    page_url: str = ""
    referrer: str = ""
    langue: str = "fr"


class SessionCreee(BaseModel):
    conversation_id: str
    resume_token: str
    canal: Canal
    message_accueil: str


class ReclamationSession(BaseModel):
    """Le visiteur demande une copie — pas de compte, juste un email (RG-A03)."""

    nom: str
    email: str
    entreprise: str = ""
    consentement: bool = Field(description="Case à cocher obligatoire (RG-P01)")


class FicheOut(BaseModel):
    code: str
    titre: str
    contenu: str
    a_completer: bool


class FicheIn(BaseModel):
    titre: str
    contenu: str
    a_completer: bool = False


class ProspectOut(BaseModel):
    id: str
    nom: str
    entreprise: str
    email: str
    telephone: str
    pays: str
    secteur: str
    statut_suivi: StatutSuivi
    temperature: Temperature | None = None
    score: int = 0
    date_creation: datetime
    nb_conversations: int = 0


class MajStatutSuivi(BaseModel):
    statut_suivi: StatutSuivi


class TrouOut(BaseModel):
    id: str
    question: str
    sujet: str
    fiche_code: str
    occurrences: int
    resolu: bool
