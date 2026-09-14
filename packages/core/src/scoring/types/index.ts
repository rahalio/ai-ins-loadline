/**
 * Scoring Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/scoring.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConsentRecord = components["schemas"]["ConsentRecord"];
export type ConsentRecordCreate = components["schemas"]["ConsentRecordCreate"];
export type ConsentState = components["schemas"]["ConsentState"];
export type ScoreContribution = components["schemas"]["ScoreContribution"];
export type ScoreExplanation = components["schemas"]["ScoreExplanation"];
export type ScoreResult = components["schemas"]["ScoreResult"];
export type ScoreRequest = components["schemas"]["ScoreRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordConsentChangeRequestInput = NonNullable<operations["recordConsentChange"]["requestBody"]>["content"]["application/json"];
export type ScoreRiskSubjectRequestInput = NonNullable<operations["scoreRiskSubject"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ResolveConsentStateParams = NonNullable<operations["resolveConsentState"]["parameters"]["query"]>;
export type RecordConsentChangeParams = operations["recordConsentChange"]["parameters"]["path"];
export type GetScoreExplanationParams = operations["getScoreExplanation"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ResolveConsentStateResponse = operations["resolveConsentState"]["responses"]["200"]["content"]["application/json"];
export type RecordConsentChangeResponse = operations["recordConsentChange"]["responses"]["201"]["content"]["application/json"];
export type ScoreRiskSubjectResponse = operations["scoreRiskSubject"]["responses"]["200"]["content"]["application/json"];
export type GetScoreExplanationResponse = operations["getScoreExplanation"]["responses"]["200"]["content"]["application/json"];


