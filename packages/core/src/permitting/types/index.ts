/**
 * Permitting Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/permitting.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FactorPermit = components["schemas"]["FactorPermit"];
export type FactorPermitCreate = components["schemas"]["FactorPermitCreate"];
export type ModelValidation = components["schemas"]["ModelValidation"];
export type ModelValidationCreate = components["schemas"]["ModelValidationCreate"];
export type RiskModel = components["schemas"]["RiskModel"];
export type RiskModelCreate = components["schemas"]["RiskModelCreate"];
export type ValidationQueue = components["schemas"]["ValidationQueue"];
export type PermittingModel = operations["listRiskModels"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordFactorPermitRequestInput = NonNullable<operations["recordFactorPermit"]["requestBody"]>["content"]["application/json"];
export type SubmitRiskModelRequestInput = NonNullable<operations["submitRiskModel"]["requestBody"]>["content"]["application/json"];
export type ValidateRiskModelRequestInput = NonNullable<operations["validateRiskModel"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFactorPermitsParams = NonNullable<operations["listFactorPermits"]["parameters"]["query"]>;
export type ListRiskModelsParams = NonNullable<operations["listRiskModels"]["parameters"]["query"]>;
export type ValidateRiskModelParams = operations["validateRiskModel"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFactorPermitsResponse = operations["listFactorPermits"]["responses"]["200"]["content"]["application/json"];
export type RecordFactorPermitResponse = operations["recordFactorPermit"]["responses"]["201"]["content"]["application/json"];
export type ListRiskModelsResponse = operations["listRiskModels"]["responses"]["200"]["content"]["application/json"];
export type SubmitRiskModelResponse = operations["submitRiskModel"]["responses"]["201"]["content"]["application/json"];
export type ValidateRiskModelResponse = operations["validateRiskModel"]["responses"]["200"]["content"]["application/json"];
export type GetValidationQueueResponse = operations["getValidationQueue"]["responses"]["200"]["content"]["application/json"];


