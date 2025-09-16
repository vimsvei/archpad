#!/bin/sh
set -eu

: "${MINIO_BUCKET:?}"
: "${MINIO_ROOT_USER:?}"
: "${MINIO_ROOT_PASSWORD:?}"
: "${MINIO_STRAPI_USER:?}"
: "${MINIO_STRAPI_PASSWORD:?}"
: "${MINIO_PORTAL_USER:?}"
: "${MINIO_PORTAL_PASSWORD:?}"

log() { echo "[minio-init] $*"; }

# wait for MinIO
until mc alias set local http://minio:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" >/dev/null 2>&1; do
  log "waiting for MinIO..."; sleep 2;
done
log "connected to MinIO"

# ensure bucket
mc mb -p local/"$MINIO_BUCKET" >/dev/null 2>&1 || true
log "bucket ensured: $MINIO_BUCKET"

# make private
mc anonymous set none local/"$MINIO_BUCKET" >/dev/null 2>&1 || true
log "anonymous disabled"

# Strapi RW user
mc admin user add local "$MINIO_STRAPI_USER" "$MINIO_STRAPI_PASSWORD" >/dev/null 2>&1 || true
cat >/tmp/strapi-policy.json <<EOF
{"Version":"2012-10-17","Statement":[
  {"Effect":"Allow","Action":["s3:ListBucket"],"Resource":["arn:aws:s3:::${MINIO_BUCKET}"]},
  {"Effect":"Allow","Action":["s3:GetObject","s3:PutObject","s3:DeleteObject"],"Resource":["arn:aws:s3:::${MINIO_BUCKET}/*"]}
]}
EOF
mc admin policy add local strapi-bucket-policy /tmp/strapi-policy.json >/dev/null 2>&1 || true
mc admin policy set local strapi-bucket-policy user="$MINIO_STRAPI_USER" >/dev/null 2>&1 || true
log "strapi user/policy ensured"

# Portal RO user
mc admin user add local "$MINIO_PORTAL_USER" "$MINIO_PORTAL_PASSWORD" >/dev/null 2>&1 || true
cat >/tmp/portal-policy.json <<EOF
{"Version":"2012-10-17","Statement":[
  {"Effect":"Allow","Action":["s3:ListBucket"],"Resource":["arn:aws:s3:::${MINIO_BUCKET}"]},
  {"Effect":"Allow","Action":["s3:GetObject"],"Resource":["arn:aws:s3:::${MINIO_BUCKET}/*"]}
]}
EOF
mc admin policy add local portal-readonly-policy /tmp/portal-policy.json >/dev/null 2>&1 || true
mc admin policy set local portal-readonly-policy user="$MINIO_PORTAL_USER" >/dev/null 2>&1 || true
log "portal RO user/policy ensured"

log "minio-init done"
