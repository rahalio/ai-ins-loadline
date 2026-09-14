#!/usr/bin/env python3
"""
Split loadline/openapi.yaml into one OpenAPI domain per PRODUCT tag,
expand with x-repository / x-dynamodb for zero-codegen, and write
packages/openapi-core/src/{domain}.yaml + {domain}.schemas.yaml.
"""
from __future__ import annotations

import copy
import re
from collections import defaultdict
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "openapi.yaml"
OUT = ROOT / "packages" / "openapi-core" / "src"

# Prefer block style for readability
class NoAliasDumper(yaml.SafeDumper):
    def ignore_aliases(self, data):
        return True


def dump(data) -> str:
    return yaml.dump(
        data,
        Dumper=NoAliasDumper,
        default_flow_style=False,
        sort_keys=False,
        allow_unicode=True,
        width=100,
    )


DOMAINS = {
    "scoring": {
        "title": "Loadline — Scoring",
        "prefix": "sco",
        "domain_code": "SCORING",
        "description": "Consent resolution, risk scoring, and score contributions attributed to one premium term.",
        "tags": ["Scoring"],
    },
    "composition": {
        "title": "Loadline — Composition",
        "prefix": "cmp",
        "domain_code": "COMPOSITION",
        "description": "Premium composition, commercial calibration, variation envelopes, and price offers.",
        "tags": ["Composition"],
    },
    "permitting": {
        "title": "Loadline — Permitting",
        "prefix": "prm",
        "domain_code": "PERMITTING",
        "description": "Factor permits per jurisdiction and the model validation queue.",
        "tags": ["Permitting"],
    },
    "engagement": {
        "title": "Loadline — Engagement",
        "prefix": "eng",
        "domain_code": "ENGAGEMENT",
        "description": "Engagement programmes, enrolment, and the touchpoint ledger.",
        "tags": ["Engagement"],
    },
    "experience": {
        "title": "Loadline — Experience",
        "prefix": "exp",
        "domain_code": "EXPERIENCE",
        "description": "Cohort definitions and realised claims, lapse, and persistency experience.",
        "tags": ["Experience"],
    },
    "claims": {
        "title": "Loadline — Claims",
        "prefix": "clm",
        "domain_code": "CLAIMS",
        "description": "Automatic settlement, fraud referral, and expense measurement.",
        "tags": ["Claims"],
    },
    "reinsurance": {
        "title": "Loadline — Reinsurance",
        "prefix": "rei",
        "domain_code": "REINSURANCE",
        "description": "Cession experience against the treaty pricing basis and human review of automated decisions.",
        "tags": ["Reinsurance"],
    },
}

# operationId → repository resource (PascalCase). Actions that should skip ports use None.
OP_REPOSITORY = {
    "resolveConsentState": "ConsentRecord",
    "recordConsentChange": "ConsentRecord",
    "scoreRiskSubject": "ScoreResult",
    "getScoreExplanation": "ScoreResult",
    "composePremium": "PremiumComposition",
    "applyCommercialCalibration": "CommercialCalibration",
    "issuePriceOffer": "PriceOffer",
    "listVariationEnvelopes": "VariationEnvelope",
    "setVariationEnvelope": "VariationEnvelope",
    "listFactorPermits": "FactorPermit",
    "recordFactorPermit": "FactorPermit",
    "listRiskModels": "RiskModel",
    "submitRiskModel": "RiskModel",
    "validateRiskModel": "ModelValidation",
    "getValidationQueue": "ValidationQueue",
    "listEngagementProgrammes": "EngagementProgramme",
    "createEngagementProgramme": "EngagementProgramme",
    "recordTouchpointEvent": "TouchpointEvent",
    "getTouchpointFrequency": "TouchpointEvent",
    "listCohortDefinitions": "CohortDefinition",
    "defineCohort": "CohortDefinition",
    "listExperienceObservations": "ExperienceObservation",
    "creditExpectedClaimsSaving": "SavingsCredit",
    "settleClaimAutomatically": "AutomaticSettlement",
    "raiseFraudReferral": "FraudReferral",
    "getExpenseMeasurement": "ExpenseMeasurement",
    "getCessionExperience": "CessionExperience",
    "requestHumanReview": "ReviewDecision",
}

# Persisted entity schemas → DynamoDB metadata (single-tenant, no ORG# prefix)
ENTITY_DDB = {
    "ConsentRecord": ("CONSENT_RECORD", "consentRecordId", "csr"),
    "ScoreResult": ("SCORE_RESULT", "scoreId", "scr"),
    "PremiumComposition": ("PREMIUM_COMPOSITION", "compositionId", "pcm"),
    "CommercialCalibration": ("COMMERCIAL_CALIBRATION", "calibrationId", "ccl"),
    "VariationEnvelope": ("VARIATION_ENVELOPE", "envelopeId", "ven"),
    "PriceOffer": ("PRICE_OFFER", "offerId", "pof"),
    "FactorPermit": ("FACTOR_PERMIT", "permitId", "fpt"),
    "RiskModel": ("RISK_MODEL", "modelId", "rmd"),
    "ModelValidation": ("MODEL_VALIDATION", "validationId", "mvl"),
    "EngagementProgramme": ("ENGAGEMENT_PROGRAMME", "programmeId", "epr"),
    "TouchpointEvent": ("TOUCHPOINT_EVENT", "touchpointId", "tpe"),
    "CohortDefinition": ("COHORT_DEFINITION", "cohortId", "cdf"),
    "ExperienceObservation": ("EXPERIENCE_OBSERVATION", "observationId", "exo"),
    "SavingsCredit": ("SAVINGS_CREDIT", "creditId", "svc"),
    "AutomaticSettlement": ("AUTOMATIC_SETTLEMENT", "settlementId", "ast"),
    "FraudReferral": ("FRAUD_REFERRAL", "referralId", "frr"),
    "ExpenseMeasurement": ("EXPENSE_MEASUREMENT", "measurementId", "exm"),
    "CessionExperience": ("CESSION_EXPERIENCE", "cessionExperienceId", "cex"),
    "ReviewDecision": ("REVIEW_DECISION", "reviewId", "rvd"),
}

SHARED_PRIMITIVES = {
    "Money",
    "PremiumTerm",
    "DataCategory",
    "ProcessingPurpose",
    "Feature",
}

REF_RE = re.compile(r"#/components/schemas/([A-Za-z0-9_]+)")


def collect_schema_refs(node, found: set[str]) -> None:
    if isinstance(node, dict):
        for k, v in node.items():
            if k == "$ref" and isinstance(v, str):
                m = REF_RE.search(v)
                if m:
                    found.add(m.group(1))
            else:
                collect_schema_refs(v, found)
    elif isinstance(node, list):
        for item in node:
            collect_schema_refs(item, found)


def rewrite_refs(node, schema_file: str):
    """Rewrite local schema refs to schemas file or shared common primitives."""
    if isinstance(node, dict):
        out = {}
        for k, v in node.items():
            if k == "$ref" and isinstance(v, str) and v.startswith("#/components/schemas/"):
                name = v.split("/")[-1]
                if name in ("ResponseMeta",):
                    out[k] = "./common/envelopes.yaml#/components/schemas/ResponseMeta"
                elif name == "Problem":
                    out[k] = "./common/problem.yaml#/components/schemas/Problem"
                elif name in SHARED_PRIMITIVES:
                    out[k] = (
                        f"./common/loadline-primitives.yaml#/components/schemas/{name}"
                    )
                else:
                    out[k] = f"./{schema_file}#/components/schemas/{name}"
            else:
                out[k] = rewrite_refs(v, schema_file)
        return out
    if isinstance(node, list):
        return [rewrite_refs(i, schema_file) for i in node]
    return node


def rewrite_schema_internal_refs(node):
    """Keep #/components/schemas/X inside schemas file (self-contained)."""
    if isinstance(node, dict):
        out = {}
        for k, v in node.items():
            if k == "$ref" and isinstance(v, str) and v.startswith("#/components/schemas/"):
                name = v.split("/")[-1]
                if name == "ResponseMeta":
                    out[k] = "./common/envelopes.yaml#/components/schemas/ResponseMeta"
                elif name == "Problem":
                    out[k] = "./common/problem.yaml#/components/schemas/Problem"
                else:
                    out[k] = v  # same file
            else:
                out[k] = rewrite_schema_internal_refs(v)
        return out
    if isinstance(node, list):
        return [rewrite_schema_internal_refs(i) for i in node]
    return node


def normalize_security(op: dict) -> None:
    sec = op.get("security")
    if not sec:
        op["security"] = [{"apiKey": []}, {"bearerAuth": []}]
        return
    mapped = []
    for entry in sec:
        item = {}
        for k, v in entry.items():
            if k in ("ApiKeyAuth", "apiKey"):
                item["apiKey"] = v
            elif k in ("BearerAuth", "bearerAuth"):
                item["bearerAuth"] = v
            else:
                item[k] = v
        mapped.append(item)
    op["security"] = mapped


def normalize_responses(op: dict) -> None:
    responses = op.get("responses") or {}
    for code, body in list(responses.items()):
        if not isinstance(body, dict):
            continue
        if "$ref" in body and body["$ref"].startswith("#/components/responses/"):
            name = body["$ref"].split("/")[-1]
            responses[code] = {
                "$ref": f"./common/responses.yaml#/components/responses/{name}"
            }
    # Ensure default problem
    if "default" not in responses:
        responses["default"] = {
            "$ref": "./common/responses.yaml#/components/responses/Problem"
        }
    op["responses"] = responses


def add_ddb(schema: dict, entity_type: str, id_field: str, domain_code: str) -> None:
    schema["x-dynamodb"] = {
        "domain": domain_code,
        "entityType": entity_type,
        "entityToken": entity_type,
        "skPrefix": entity_type,
        "pkPattern": "entity",
        "pkPatternTemplate": f"{entity_type}#${{{id_field}}}",
        "skPatternTemplate": "METADATA",
        "isChildEntity": False,
        "gsi1Enabled": False,
        "gsi2Enabled": False,
        "gsi3Enabled": False,
        "softDeleteEnabled": False,
        "createdAtField": "createdAt",
        "updatedAtField": "updatedAt",
        "tableType": "core",
    }


def ensure_timestamps(schema: dict) -> None:
    if schema.get("type") != "object":
        return
    props = schema.setdefault("properties", {})
    if "createdAt" not in props:
        props["createdAt"] = {"type": "string", "format": "date-time"}
    if "updatedAt" not in props:
        props["updatedAt"] = {"type": "string", "format": "date-time"}


def main() -> None:
    raw = yaml.safe_load(SRC.read_text())
    all_schemas: dict = raw["components"]["schemas"]
    all_params: dict = raw["components"].get("parameters", {})
    tag_desc = {t["name"]: t.get("description", "") for t in raw.get("tags", [])}

    # Ensure common security has bearerAuth
    sec_path = OUT / "common" / "security.yaml"
    sec = yaml.safe_load(sec_path.read_text())
    schemes = sec["components"]["securitySchemes"]
    if "bearerAuth" not in schemes:
        schemes["bearerAuth"] = {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Operator JWT from identity /v0/auth/*.",
        }
        sec_path.write_text(dump(sec))

    # Shared primitives file
    shared = {
        "openapi": "3.1.0",
        "info": {
            "title": "Loadline shared primitives",
            "version": "0.1.0",
            "description": "Cross-domain enums and value objects for Loadline.",
        },
        "paths": {},
        "components": {"schemas": {}},
    }
    for name in SHARED_PRIMITIVES:
        if name in all_schemas:
            shared["components"]["schemas"][name] = rewrite_schema_internal_refs(
                copy.deepcopy(all_schemas[name])
            )
    # Fix Feature → DataCategory self refs stay local
    (OUT / "common" / "loadline-primitives.yaml").write_text(dump(shared))

    # Map path → domain via first operation tag
    domain_paths: dict[str, dict] = defaultdict(dict)
    domain_params: dict[str, set[str]] = defaultdict(set)
    domain_schemas: dict[str, set[str]] = defaultdict(set)

    for path, methods in raw["paths"].items():
        path_params = methods.get("parameters", [])
        domain_for_path = None
        for method, op in methods.items():
            if method in ("parameters", "summary", "description", "servers"):
                continue
            if not isinstance(op, dict):
                continue
            tags = list(op.get("tags") or [])
            # Human review sits with reinsurance/compliance surface (WEBAPP.md)
            if path.startswith("/v1/decisions"):
                tags = ["Reinsurance"]
                op["tags"] = tags
            matched = None
            for dname, meta in DOMAINS.items():
                if any(t in meta["tags"] for t in tags):
                    matched = dname
                    break
            if not matched:
                raise SystemExit(f"No domain for {method.upper()} {path} tags={tags}")
            if domain_for_path and domain_for_path != matched:
                raise SystemExit(f"Path {path} spans domains {domain_for_path} and {matched}")
            domain_for_path = matched

            op_copy = copy.deepcopy(op)
            op_copy["tags"] = tags
            normalize_security(op_copy)
            normalize_responses(op_copy)
            oid = op_copy.get("operationId")
            if oid in OP_REPOSITORY:
                repo = OP_REPOSITORY[oid]
                if repo is None:
                    op_copy["x-repository"] = "none"
                else:
                    op_copy["x-repository"] = repo

            for p in list(path_params) + list(op_copy.get("parameters") or []):
                if isinstance(p, dict) and "$ref" in p:
                    pname = p["$ref"].split("/")[-1]
                    domain_params[matched].add(pname)

            collect_schema_refs(op_copy, domain_schemas[matched])

            entry = domain_paths[matched].setdefault(path, {})
            if path_params and "parameters" not in entry:
                entry["parameters"] = copy.deepcopy(path_params)
            entry[method] = op_copy

        collect_schema_refs(path_params, domain_schemas[domain_for_path])

    # Expand schema closure + add shared primitives as external refs
    for dname, names in list(domain_schemas.items()):
        queue = list(names)
        while queue:
            n = queue.pop()
            if n not in all_schemas:
                continue
            nested: set[str] = set()
            collect_schema_refs(all_schemas[n], nested)
            for m in nested:
                if m not in names:
                    names.add(m)
                    queue.append(m)

    for dname, meta in DOMAINS.items():
        schema_file = f"{dname}.schemas.yaml"
        schemas_out: dict = {}

        for name in sorted(domain_schemas[dname]):
            if name not in all_schemas:
                continue
            if name in ("ResponseMeta", "Problem"):
                continue
            if name in SHARED_PRIMITIVES:
                continue
            schema = copy.deepcopy(all_schemas[name])
            if name in ENTITY_DDB:
                et, idf, _pfx = ENTITY_DDB[name]
                ensure_timestamps(schema)
                add_ddb(schema, et, idf, meta["domain_code"])
            schemas_out[name] = rewrite_schema_internal_refs(schema)

        # Point shared primitive refs inside schemas to common file
        def remap_shared(node):
            if isinstance(node, dict):
                if "$ref" in node and isinstance(node["$ref"], str):
                    m = REF_RE.search(node["$ref"])
                    if m and m.group(1) in SHARED_PRIMITIVES:
                        return {
                            "$ref": f"./common/loadline-primitives.yaml#/components/schemas/{m.group(1)}"
                        }
                return {k: remap_shared(v) for k, v in node.items()}
            if isinstance(node, list):
                return [remap_shared(i) for i in node]
            return node

        schemas_out = remap_shared(schemas_out)

        schemas_doc = {
            "openapi": "3.1.0",
            "info": {
                "title": f"{meta['title']} schemas",
                "version": "0.1.0",
                "x-domain": meta["prefix"],
            },
            "paths": {},
            "components": {"schemas": schemas_out},
        }
        (OUT / schema_file).write_text(dump(schemas_doc))

        # Parameters for domain
        params_out = {}
        for pname in sorted(domain_params[dname]):
            if pname in all_params:
                params_out[pname] = copy.deepcopy(all_params[pname])
            elif pname in ("Cursor", "Limit"):
                continue

        def localize_param_ref(p: dict) -> dict:
            if not (isinstance(p, dict) and "$ref" in p):
                return p
            pname = p["$ref"].split("/")[-1]
            if pname == "Cursor":
                return {
                    "name": "cursor",
                    "in": "query",
                    "schema": {"type": "string"},
                }
            if pname == "Limit":
                return {
                    "name": "limit",
                    "in": "query",
                    "schema": {
                        "type": "integer",
                        "minimum": 1,
                        "maximum": 200,
                        "default": 50,
                    },
                }
            return {"$ref": f"#/components/parameters/{pname}"}

        paths_out = {}
        for path, methods in domain_paths[dname].items():
            m_out = {}
            for mk, mv in methods.items():
                if mk == "parameters":
                    m_out["parameters"] = [localize_param_ref(p) for p in mv]
                else:
                    op = rewrite_refs(copy.deepcopy(mv), schema_file)
                    if op.get("parameters"):
                        op["parameters"] = [localize_param_ref(p) for p in op["parameters"]]
                    m_out[mk] = op
            paths_out[path] = m_out

        domain_doc = {
            "openapi": "3.1.0",
            "info": {
                "title": meta["title"],
                "version": "0.1.0",
                "description": meta["description"],
                "license": {"name": "Proprietary"},
                "x-domain": meta["prefix"],
                "x-product-slug": "loadline",
            },
            "servers": [
                {"url": "https://api.loadline.local", "description": "Local API"},
                {"url": "/", "description": "Relative"},
            ],
            "security": [{"apiKey": []}],
            "tags": [
                {"name": t, "description": tag_desc.get(t, "")}
                for t in meta["tags"]
            ],
            "paths": paths_out,
            "components": {
                "securitySchemes": {
                    "apiKey": {
                        "$ref": "./common/security.yaml#/components/securitySchemes/apiKey"
                    },
                    "bearerAuth": {
                        "$ref": "./common/security.yaml#/components/securitySchemes/bearerAuth"
                    },
                },
                "parameters": params_out,
            },
        }
        (OUT / f"{dname}.yaml").write_text(dump(domain_doc))
        print(f"Wrote {dname}: {len(paths_out)} paths, {len(schemas_out)} schemas")

    # Move skeleton aside (keep as reference)
    skeleton = ROOT / "docs" / "openapi-skeleton.yaml"
    if not skeleton.exists():
        skeleton.write_text(SRC.read_text())
    print("Done. Identity domain unchanged.")


if __name__ == "__main__":
    main()
