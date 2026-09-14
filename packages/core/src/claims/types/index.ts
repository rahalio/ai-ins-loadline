/**
 * Claims Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/claims.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AutomaticSettlement = components["schemas"]["AutomaticSettlement"];
export type AutomaticSettlementCreate = components["schemas"]["AutomaticSettlementCreate"];
export type ExpenseMeasurement = components["schemas"]["ExpenseMeasurement"];
export type FraudReferral = components["schemas"]["FraudReferral"];
export type FraudReferralCreate = components["schemas"]["FraudReferralCreate"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SettleClaimAutomaticallyRequestInput = NonNullable<operations["settleClaimAutomatically"]["requestBody"]>["content"]["application/json"];
export type RaiseFraudReferralRequestInput = NonNullable<operations["raiseFraudReferral"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetExpenseMeasurementParams = NonNullable<operations["getExpenseMeasurement"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type SettleClaimAutomaticallyResponse = operations["settleClaimAutomatically"]["responses"]["201"]["content"]["application/json"];
export type RaiseFraudReferralResponse = operations["raiseFraudReferral"]["responses"]["201"]["content"]["application/json"];
export type GetExpenseMeasurementResponse = operations["getExpenseMeasurement"]["responses"]["200"]["content"]["application/json"];


