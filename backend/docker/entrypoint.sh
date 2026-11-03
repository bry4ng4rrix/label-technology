#!/bin/sh
# Les fiches vivent dans un volume pour que les modifications de l'équipe (RG-F02)
# survivent aux redéploiements. On n'ajoute que les fiches absentes : une fiche
# déjà présente n'est jamais écrasée par la version du dépôt.
set -e
cp -n /app/fiches-initiales/*.md /app/app/knowledge/ 2>/dev/null || true
exec "$@"
