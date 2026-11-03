# syntax=docker/dockerfile:1
#
# Image de production de Laura.
#   - un seul processus uvicorn : channels.py et quotas.py gardent leur état en mémoire ;
#   - base SQLite dans /data (volume) ;
#   - fiches dans app/knowledge (volume) : modifiables par l'équipe via /admin/fiches,
#     elles survivent aux redéploiements (voir docker/entrypoint.sh).

# ---------- Dépendances ----------
FROM python:3.14-slim AS builder
ENV PIP_NO_CACHE_DIR=1 PIP_DISABLE_PIP_VERSION_CHECK=1
RUN python -m venv /opt/venv
COPY requirements.txt .
RUN /opt/venv/bin/pip install -r requirements.txt

# ---------- Image finale ----------
FROM python:3.14-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH" \
    DATABASE_URL=sqlite+aiosqlite:////data/laura.db
RUN groupadd --system --gid 1001 laura \
    && useradd --system --uid 1001 --gid laura --home-dir /app --shell /usr/sbin/nologin laura
WORKDIR /app

COPY --from=builder /opt/venv /opt/venv
COPY --chown=laura:laura app ./app
COPY --chown=laura:laura static ./static
# Copie de référence des fiches : l'entrypoint ajoute au volume celles qui y manquent.
COPY --chown=laura:laura app/knowledge ./fiches-initiales
COPY docker/entrypoint.sh /usr/local/bin/entrypoint
RUN chmod 755 /usr/local/bin/entrypoint && mkdir -p /data && chown laura:laura /data

USER laura
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/sante', timeout=4)"]
ENTRYPOINT ["entrypoint"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
