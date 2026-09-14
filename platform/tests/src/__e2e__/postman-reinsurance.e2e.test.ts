/**
 * Postman-collection 1:1 Vitest tests for reinsurance (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cohortId: "",
  decisionId: "",
  period: "",
  treatyId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / reinsurance (1:1 generated)", () => {

  it("getCessionExperience", async () => {
    const url = sub("{{baseUrl}}/v1/reinsurance/cession-experience?treatyId={{treatyId}}&cohortId={{cohortId}}&period={{period}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("requestHumanReview", async () => {
    const url = sub("{{baseUrl}}/v1/decisions/{{decisionId}}/review");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"requestedBy\": \"applicant\",\n  \"grounds\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
