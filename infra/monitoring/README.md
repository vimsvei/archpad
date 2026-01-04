### Observability in Docker Desktop (metrics + logs + traces)

This repo can run a local “single pane of glass” stack:

- **Grafana** (UI): metrics + logs + traces in one place
- **Prometheus**: metrics scraping (Traefik/Hasura/cAdvisor/Postgres exporter + uptime probes)
- **Loki**: centralized logs
- **Tempo**: distributed tracing storage/query
- **OpenTelemetry Collector**: OTLP receiver → Tempo
- **Vector**: reads Docker container logs via Docker socket → Loki

### How to start

From repo root:

```bash
docker compose -f infra/docker-compose.yml --profile observability up -d
```

If you also want the app stack:

```bash
docker compose -f infra/docker-compose.yml --profile observability --profile backend --profile app up -d
```

### HTTPS / self-signed certs (sslip.io)

If your browser shows TLS warnings when opening:

- `https://${GRAFANA_HOST}`
- `https://${PROMETHEUS_HOST}`

then your machine does **not trust** the local CA that signed Traefik certs, or the cert doesn't include the right SANs.

This repo already has a recommended flow using `mkcert`:

```bash
brew install mkcert nss
mkcert -install

# Generate a cert for *.${LAN_IP//./-}.sslip.io (grafana/prometheus/etc)
LAN_IP=192.168.1.119 bash infra/traefik/generate/certs.sh
```

Then restart Traefik (or the whole stack). Traefik serves the cert from:

- `infra/traefik/certs/local.crt`
- `infra/traefik/certs/local.key`

Notes:

- **Chrome/Safari**: `mkcert -install` usually is enough.
- **Firefox**: make sure `nss` is installed (see `brew install nss` above). Alternatively enable `security.enterprise_roots.enabled=true` in `about:config`.

### URLs / ports

- **Grafana**:
  - via Traefik (recommended): `https://${GRAFANA_HOST}`
  - fallback direct: `http://localhost:3001`
- **Prometheus**:
  - via Traefik (recommended): `https://${PROMETHEUS_HOST}`
  - fallback direct: `http://localhost:9090`
- **cAdvisor**: `http://localhost:8081`
- **Loki**: `http://localhost:3100`
- **Tempo**: `http://localhost:3200`
- **OTLP (send traces here)**:
  - gRPC: `localhost:4317`
  - HTTP: `http://localhost:4318`

### Where to look in Grafana

- **Metrics**: Explore → datasource `Prometheus`
- **Logs**: Explore → datasource `Loki`
  - labels: `service`, `project`, `container`, `image`
- **Traces**: Explore → datasource `Tempo`

### Sending traces (example)

Configure your services to export OTLP traces to the collector:

- **OTLP HTTP**: `http://otel-collector:4318` (from containers)
- **OTLP gRPC**: `otel-collector:4317` (from containers)


