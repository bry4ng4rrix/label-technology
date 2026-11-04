"""Connexion à /setting et formulaire de contact, sans base ni réseau."""

import time
import unittest
from unittest import mock

from fastapi.testclient import TestClient

from app import quotas, session
from app.config import params
from app.main import app

client = TestClient(app)


class Session(unittest.TestCase):
    def setUp(self):
        quotas._echecs_connexion.clear()
        for nom, valeur in {"ADMIN_TOKEN": "jeton", "ADMIN_PASSWORD": "secret"}.items():
            patch = mock.patch.object(params, nom, valeur)
            patch.start()
            self.addCleanup(patch.stop)

    def test_jetons_invalides(self):
        expire = str(int(time.time()) - 1)
        for jeton in (
            "",
            "abc",
            "123.signature",
            session.creer_session() + "x",
            f"{expire}.{session._signer(expire)}",
            "é.é",
        ):
            self.assertFalse(session.session_valide(jeton), jeton)
        self.assertTrue(session.session_valide(session.creer_session()))

    def test_changer_admin_token_invalide_les_sessions(self):
        jeton = session.creer_session()
        with mock.patch.object(params, "ADMIN_TOKEN", "autre"):
            self.assertFalse(session.session_valide(jeton))

    def test_connexion_puis_acces_admin(self):
        self.assertEqual(client.get("/admin/site/session").status_code, 401)
        r = client.post("/api/site/session", json={"password": "faux"})
        self.assertEqual((r.status_code, r.json()["detail"]), (401, "Mot de passe incorrect."))

        jeton = client.post("/api/site/session", json={"password": "secret"}).json()["token"]
        entetes = {"Authorization": f"Bearer {jeton}"}
        self.assertEqual(client.get("/admin/site/session", headers=entetes).status_code, 204)
        # La session ne vaut que pour le site, pas pour l'administration de Laura.
        self.assertEqual(client.get("/admin/fiches", headers=entetes).status_code, 401)

    def test_jeton_d_exploitation_toujours_accepte(self):
        r = client.get("/admin/site/session", headers={"X-Admin-Token": "jeton"})
        self.assertEqual(r.status_code, 204)

    def test_sans_mot_de_passe_configure_personne_n_entre(self):
        with mock.patch.object(params, "ADMIN_PASSWORD", ""):
            r = client.post("/api/site/session", json={"password": ""})
        self.assertEqual(r.status_code, 503)

    def test_force_brute_bloquee_meme_avec_le_bon_mot_de_passe(self):
        for _ in range(quotas.MAX_ECHECS_CONNEXION):
            client.post("/api/site/session", json={"password": "faux"})
        r = client.post("/api/site/session", json={"password": "secret"})
        self.assertEqual(r.status_code, 429)


class Contact(unittest.TestCase):
    corps = {"name": "A", "email": "a@b.co", "message": "m"}

    def test_sans_smtp_le_message_n_est_pas_perdu_en_silence(self):
        with mock.patch.object(params, "SMTP_HOST", ""):
            self.assertEqual(client.post("/api/site/contact", json=self.corps).status_code, 503)

    def test_avec_smtp_l_email_part(self):
        with (
            mock.patch.object(params, "SMTP_HOST", "smtp.test"),
            mock.patch("app.routes.site._email", new=mock.AsyncMock()) as envoi,
        ):
            r = client.post("/api/site/contact", json={**self.corps, "service": ""})
        self.assertEqual(r.status_code, 200)
        envoi.assert_awaited_once()
