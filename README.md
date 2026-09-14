# Loadline

Premium-composition platform for life and health risk carriers. Scaffolded from the zero-apps OpenAPI-first DDD codegen starter (`@loadline/*`).

## Domains

| Domain | OpenAPI | Responsibility |
|--------|---------|----------------|
| `identity` | `packages/openapi-core/src/identity.yaml` | API keys + operator auth (shared blueprint) |
| `scoring` | `scoring.yaml` | Consent + risk scores |
| `composition` | `composition.yaml` | Technical cost, calibration, variation gate, offers |
| `permitting` | `permitting.yaml` | Factor permits + model validation queue |
| `engagement` | `engagement.yaml` | Programmes + touchpoint ledger |
| `experience` | `experience.yaml` | Cohorts + savings credits |
| `claims` | `claims.yaml` | Auto settlement, fraud, expense |
| `reinsurance` | `reinsurance.yaml` | Cession experience + human review |

Product specs: `PRODUCT.md`, `USER_STORIES.md`, `WEBAPP.md`. Skeleton monolith kept at `docs/openapi-skeleton.yaml`.

## Quick start

```bash
pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:all
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: loadline_demo_local_dev_key

pnpm dev:web   # http://127.0.0.1:3000
```

## Codegen rules

1. **New domain** → full multi-layer generate once.
2. **YAML edit on existing domain** → bundle → `--layers core` → handwrite below.
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
