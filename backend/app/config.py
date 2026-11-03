"""Configuration lue depuis .env — voir .env.example."""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

RACINE = Path(__file__).resolve().parent.parent


class Parametres(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=RACINE / ".env", env_file_encoding="utf-8", extra="ignore"
    )

    # Modèle
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.5-flash"
    #: Utilisé quand le modèle principal répond 503 « high demand ». Prendre un
    #: modèle d'une autre famille : les saturations sont corrélées à l'intérieur
    #: d'une même génération.
    GEMINI_MODEL_SECOURS: str = "gemini-3.1-flash-lite"

    # Base
    DATABASE_URL: str = "sqlite+aiosqlite:///./laura.db"

    # Sécurité
    ALLOWED_ORIGINS: str = "http://localhost:8000"
    ADMIN_TOKEN: str = "change-moi"
    IP_SALT: str = "change-moi-aussi"

    # Quotas
    MAX_CHARS_PAR_MESSAGE: int = 2000
    MAX_MESSAGES_PAR_CONVERSATION: int = 30
    MAX_TOKENS_SORTIE: int = 600
    TOURS_HISTORIQUE: int = 20
    MAX_MESSAGES_PAR_10S: int = 2
    MAX_CONVERSATIONS_PAR_IP_JOUR: int = 10

    # Notifications
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_CHAT_ID: str = ""
    SEUIL_SCORE_CHAUD: int = 70
    SEUIL_SCORE_TIEDE: int = 40

    # Email
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAIL_EXPEDITEUR: str = "laura@labeltechnology.mg"
    EMAIL_EQUIPE: str = "contact@labeltechnology.mg"

    # Divers
    BASE_URL: str = "http://localhost:8000"
    DELAI_ABANDON_MINUTES: int = 30

    @property
    def origines(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    @property
    def llm_disponible(self) -> bool:
        return bool(self.GEMINI_API_KEY)

    @property
    def dossier_fiches(self) -> Path:
        return Path(__file__).resolve().parent / "knowledge"


params = Parametres()
