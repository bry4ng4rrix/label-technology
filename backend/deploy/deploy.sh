#!/usr/bin/env bash
# Exécuté sur le VPS par .github/workflows/deploy.yml, après copie de docker-compose.yml
# et laura.env dans le même dossier :
#
#   printf '%s' "$GHCR_TOKEN" | ssh vps bash laura/deploy.sh <image:tag> <port> <utilisateur>
#
# Le jeton GHCR arrive sur l'entrée standard : il n'apparaît ni dans la liste des
# processus ni dans ~/.docker/config.json, partagé avec les autres projets du VPS.
set -euo pipefail
cd "$(dirname "$0")"
image="$1" port="$2" ghcr_user="$3"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
DOCKER_CONFIG="$tmp" docker login ghcr.io -u "$ghcr_user" --password-stdin > /dev/null
DOCKER_CONFIG="$tmp" docker pull -q "$image"

# Lu par docker compose ; garde la version déployée pour un « docker compose up -d » manuel.
printf 'LAURA_IMAGE=%s\nLAURA_PORT=%s\n' "$image" "$port" > .env
chmod 600 laura.env
docker compose up -d --no-build --wait --wait-timeout 90 --remove-orphans

# Supprime les anciennes versions de l'image (les volumes ne sont pas touchés).
docker images "${image%:*}" --format '{{.Repository}}:{{.Tag}}' \
  | grep -vxF "$image" | xargs -r docker rmi > /dev/null 2>&1 || true

docker compose ps
curl -fsS "http://127.0.0.1:$port/sante"
echo
