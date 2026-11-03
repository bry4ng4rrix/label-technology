# Déploiement

## Architecture

```
Internet ──https─▶ nginx (hôte, Certbot) ──▶ 127.0.0.1:8050 ──▶ conteneur laura
   (443)                                                        (uvicorn, 1 worker)
                                                        ├─ volume laura_fiches → app/knowledge
                                                        ├─ volume laura_data   → /data (ancienne base SQLite)
                                                        └─▶ conteneur db (PostgreSQL 17, réseau interne)
                                                              └─ volume laura_pgdata
```

- **Un seul worker** : `channels.py` et `quotas.py` gardent leur état en mémoire.
- **Le port 8050 n'est pas public** : le conteneur écoute sur `127.0.0.1`, seul
  nginx l'atteint. C'est ce qui rend les quotas réels — `quotas.ip_client` lit
  la première adresse de `X-Forwarded-For`, et nginx l'écrase par `$remote_addr`
  ([deploy/nginx-laura.conf](../deploy/nginx-laura.conf)). Tant que le port
  était exposé sur `0.0.0.0`, il suffisait d'appeler l'API en direct avec un
  `X-Forwarded-For` différent à chaque requête pour n'avoir aucune limite
  (RG-X04), et `ufw` n'y pouvait rien puisque Docker écrit ses propres règles
  iptables.
- **HTTPS obligatoire pour le widget** : le site est en https, il ne peut ouvrir
  qu'un `wss://`. Une page https qui tente un `ws://` est bloquée par le
  navigateur pour contenu mixte, sans message explicite dans l'interface.

## CI/CD — [.github/workflows/deploy.yml](../.github/workflows/deploy.yml)

| Job | Quand | Rôle |
|---|---|---|
| `image` | push, pull request | construit l'image, vérifie `/sante`, publie sur GHCR (sauf PR) |
| `deploy` | push sur `main`, lancement manuel | copie `docker-compose.yml`, `deploy.sh`, `nginx-laura.conf` et `laura.env` dans `~/laura`, pull de l'image, redémarrage, vérification de `/sante` |

### Secrets GitHub

**Settings → Secrets and variables → Actions → New repository secret**

| Nom | Valeur |
|---|---|
| `VPS_HOST` | adresse IP du VPS |
| `VPS_USER` | utilisateur SSH, membre du groupe `docker` |
| `VPS_SSH_KEY` | clé privée de déploiement, fichier complet (`-----BEGIN` … `END-----`) |
| `VPS_KNOWN_HOSTS` | sortie de `ssh-keyscan -t ed25519 <adresse>` |
| `LAURA_ENV` | contenu complet du `laura.env` de production (modèle : [.env.example](../.env.example)) |

Variables facultatives (onglet **Variables**) : `LAURA_PORT` (défaut `8050`,
à reporter dans la conf nginx), `LAURA_DIR` (défaut `laura`).

Changer la configuration : modifier le secret `LAURA_ENV`, puis
**Actions → Build & déploiement → Run workflow**. `DATABASE_URL` et `POSTGRES_PASSWORD` viennent de `LAURA_ENV` : voir
[Passage à PostgreSQL](#passage-à-postgresql).

## HTTPS (une fois)

1. **DNS** — enregistrement A `laura.labeltechnology.mg` → IP du VPS, chez le
   registrar du domaine. Le site reste sur son hébergement actuel : seul le
   sous-domaine pointe vers le VPS. Vérifier la propagation avant la suite,
   sinon certbot échoue :
   ```bash
   dig +short laura.labeltechnology.mg      # doit renvoyer l'IP du VPS
   ```
2. **Pare-feu** — 80 et 443 ouverts (80 est nécessaire au renouvellement
   automatique du certificat, ne pas le fermer après coup) :
   ```bash
   sudo ufw allow 80,443/tcp
   ```
3. **nginx + certificat** :
   ```bash
   sudo cp    ~/laura/nginx-laura.conf /etc/nginx/sites-available/laura.labeltechnology.mg
   sudo ln -s /etc/nginx/sites-available/laura.labeltechnology.mg /etc/nginx/sites-enabled/
   sudo mkdir -p /etc/nginx/snippets
   sudo cp    ~/laura/laura-proxy.conf /etc/nginx/snippets/laura-proxy.conf
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d laura.labeltechnology.mg
   ```
   Certbot ajoute lui-même le bloc `listen 443 ssl`, le certificat et la
   redirection depuis le port 80. Il installe aussi un timer de renouvellement ;
   le vérifier une fois : `systemctl list-timers | grep certbot`.

   > ⚠ **Ne plus recopier `nginx-laura.conf` après cette étape.** certbot
   > réécrit `/etc/nginx/sites-available/laura.labeltechnology.mg` ; le remplacer ferait retomber
   > Laura en http seul. `nginx -t` passerait sans erreur et le widget
   > échouerait en silence — une page https ne peut pas ouvrir un `ws://`, le
   > navigateur bloque pour contenu mixte sans rien afficher à l'utilisateur.
   >
   > Les règles de proxy vivent exprès dans `laura-proxy.conf`, que certbot ne
   > touche jamais. Pour les modifier : recopier ce seul fichier dans
   > `/etc/nginx/snippets/` puis `sudo systemctl reload nginx`.
4. **Les trois valeurs à aligner** — c'est là que ça casse le plus souvent :

   | Où | Variable | Valeur |
   |---|---|---|
   | Secret GitHub `LAURA_ENV` | `BASE_URL` | `https://laura.labeltechnology.mg` |
   | Secret GitHub `LAURA_ENV` | `ALLOWED_ORIGINS` | `https://labeltechnology.mg,https://www.labeltechnology.mg` |
   | Hébergeur du site | `NEXT_PUBLIC_LAURA_URL` | `https://laura.labeltechnology.mg` |

   `NEXT_PUBLIC_*` est injecté **à la compilation** : après l'avoir ajouté, il
   faut redéployer le site, un simple redémarrage ne suffit pas.

5. **Vérifier** depuis une machine extérieure :
   ```bash
   curl -s https://laura.labeltechnology.mg/sante
   # puis le WebSocket, qui doit répondre 101 Switching Protocols
   curl -isk -o /dev/null -w '%{http_code}\n' \
     -H 'Connection: Upgrade' -H 'Upgrade: websocket' \
     -H 'Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==' -H 'Sec-WebSocket-Version: 13' \
     https://laura.labeltechnology.mg/ws/chat
   ```

## Variante DuckDNS (dépannage, pas pour la production)

Sans accès au DNS de `labeltechnology.mg`, un sous-domaine gratuit permet de
valider toute la chaîne — certbot, `wss://`, widget branché sur le vrai site —
sans attendre personne. Sur un VPS l'IP est fixe : on la renseigne une fois sur
duckdns.org, aucun cron de mise à jour n'est nécessaire (contrairement à ce que
décrivent la plupart des guides, prévus pour des connexions résidentielles).

Quatre valeurs changent, rien dans le code : `server_name` du bloc nginx, le
`-d` de certbot, `BASE_URL` et `NEXT_PUBLIC_LAURA_URL`. `ALLOWED_ORIGINS` ne
bouge pas — il décrit l'origine du site, pas celle de l'API.

**À ne pas faire en production**, pour deux raisons concrètes :

- **Les emails partiront en indésirables.** `reclamer_conversation` envoie,
  depuis `laura@labeltechnology.mg`, un lien vers un autre domaine avec un
  jeton opaque en paramètre. Domaine expéditeur ≠ domaine du lien + hébergeur
  de DNS dynamique + jeton long : c'est la signature d'un hameçonnage.
  Microsoft 365 et Proofpoint — l'essentiel des prospects français en B2B — le
  classent sévèrement. L'envoi réussira, l'email n'arrivera pas.
- **Des réseaux d'entreprise bloquent les domaines de DNS dynamique** (duckdns,
  no-ip, dyndns), couramment utilisés comme canaux de commande par des
  logiciels malveillants. Le widget afficherait « Connexion perdue » sans que
  personne comprenne pourquoi, chez la cible même de l'offre France.

Tant que Laura tourne sur DuckDNS, laisser le chat actif mais ne pas pousser le
bouton « recevoir une copie par email » : c'est le lien qui pose problème, pas
la conversation.

## Les fiches en production

Elles vivent dans le volume `laura_fiches`, pour que les modifications faites par
l'équipe via `PUT /admin/fiches/{code}` (RG-F02) survivent aux redéploiements.
Au démarrage, [docker/entrypoint.sh](../docker/entrypoint.sh) **ajoute** les
fiches du dépôt absentes du volume, mais **n'écrase jamais** une fiche existante.

Pour pousser la version du dépôt d'une fiche déjà présente :

```bash
docker compose exec laura cp /app/fiches-initiales/02-logiciels.md /app/app/knowledge/
```

## Sur le serveur

```bash
cd ~/laura
docker compose ps                    # état (doit être « healthy »)
docker compose logs -f               # logs
docker compose restart               # redémarrer (ne relit pas laura.env)
docker compose up -d                 # appliquer un laura.env modifié à la main

# Sauvegarde cohérente de la base, même en fonctionnement
docker compose exec -T db pg_dump -U laura -Fc laura > laura-$(date +%F).dump
# Restauration : docker compose exec -T db pg_restore -U laura -d laura --clean < laura-AAAA-MM-JJ.dump

# Console SQL
docker compose exec db psql -U laura
```

Ne jamais lancer `docker compose down -v` : `-v` supprime les volumes, donc la
base et les fiches.

## Passage à PostgreSQL

Une seule base PostgreSQL, dans le conteneur `db`, pour Laura **et** pour le
contenu du site (anciennement sur Supabase). Elle n'est joignable que depuis
le conteneur `laura` : aucun port publié.

### 1. Configuration

Ajouter au secret GitHub `LAURA_ENV` (le mot de passe deux fois, identique) :

```
POSTGRES_PASSWORD=<sortie de : openssl rand -hex 24>
DATABASE_URL=postgresql+asyncpg://laura:<le même>@db:5432/laura
```

Puis pousser sur `main` (ou **Run workflow**). Au démarrage, `db` crée la
base, Laura crée toutes les tables. À partir de là, les nouvelles
conversations vont dans PostgreSQL.

> Si `POSTGRES_PASSWORD` manque, `db` ne démarre pas, Laura non plus, et le
> déploiement échoue sur `--wait`. Laura reste arrêtée jusqu'à ce que le
> secret soit corrigé et le workflow relancé : mettre à jour `LAURA_ENV`
> **avant** de pousser ce changement.

### 2. Conversations existantes (SQLite → PostgreSQL)

L'ancienne base est toujours dans le volume `laura_data`. Sur le VPS :

```bash
cd ~/laura
docker compose exec laura python -m app.migrer_sqlite sqlite+aiosqlite:////data/laura.db
```

Relançable sans risque : une ligne déjà présente est ignorée, rien n'est
écrasé, la base SQLite n'est pas modifiée. La garder quelques semaines, puis
le volume `laura_data` pourra être supprimé.

### 3. Contenu du site (Supabase → PostgreSQL)

Trois façons, au choix, qui donnent exactement le même résultat. Toutes en
lecture seule côté Supabase.

**A. SQL Editor — rien à demander, juste l'accès au tableau de bord.**

1. Supabase → **SQL Editor** → **New query** → coller
   [deploy/supabase-export.sql](../deploy/supabase-export.sql) → **Run**.
2. Le résultat est une seule cellule `export` : la copier en entier dans un
   fichier `supabase-export.json` (les copies « Copy as JSON » sont aussi
   acceptées).
3. Sur le VPS :
   ```bash
   docker compose exec -T laura python -m app.site_import - < supabase-export.json
   rm supabase-export.json      # contient les candidatures (données personnelles)
   ```

**B. pg_dump — copie brute, la plus fiable pour un gros volume.**

Il faut la chaîne de connexion : Supabase → **Connect** (en haut) → onglet
**Connection string** → **Session pooler** (le « Direct connection » est en
IPv6 seulement sur l'offre gratuite), et le mot de passe de la base (Project
Settings → Database → *Reset database password* si personne ne l'a noté).

Depuis votre poste (pg_dump 15 ou plus récent), puis `scp supabase-data.sql vps:laura/` :

```bash
pg_dump "postgresql://postgres.<ref>:<mot de passe>@aws-0-<région>.pooler.supabase.com:5432/postgres" \
  --data-only --no-owner --no-privileges \
  -t services -t projects -t job_offers -t blog_posts -t testimonials \
  -t tag_meta -t settings -t job_applications > supabase-data.sql

# sur le VPS, base Laura déjà démarrée (tables créées), tables du site vides :
docker compose exec -T db psql -U laura -d laura -v ON_ERROR_STOP=1 < supabase-data.sql
```

Les colonnes ont les mêmes types que dans Supabase (`text[]` compris) : le
fichier se recharge sans conversion. Contrairement à A et C, ce n'est **pas**
relançable sur des tables déjà remplies (doublons de clés).

**C. API REST — avec la clé `service_role`** (Project Settings → API) :

```bash
docker compose exec -e SUPABASE_URL=https://<ref>.supabase.co \
  -e SUPABASE_SERVICE_ROLE_KEY=<clé> laura python -m app.site_import
```

A et C mettent à jour les lignes par `id` : on peut importer une première fois
pour tester, puis à nouveau juste avant de couper Supabase pour récupérer les
dernières candidatures.

### 4. Vérifier

```bash
docker compose exec db psql -U laura -c "select count(*) from services; select count(*) from job_applications; select count(*) from conversations;"
curl -s http://127.0.0.1:8050/api/site/services | head -c 300
```
