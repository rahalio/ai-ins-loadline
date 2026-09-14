/**
 * Experience Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/experience.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CohortDefinition = components["schemas"]["CohortDefinition"];
export type CohortDefinitionCreate = components["schemas"]["CohortDefinitionCreate"];
export type ExperienceObservation = components["schemas"]["ExperienceObservation"];
export type SavingsCredit = components["schemas"]["SavingsCredit"];
export type SavingsCreditCreate = components["schemas"]["SavingsCreditCreate"];
export type Cohort = operations["listCohortDefinitions"]["responses"]["200"]["content"]["application/json"]["data"];
export type Observation = operations["listExperienceObservations"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type DefineCohortRequestInput = NonNullable<operations["defineCohort"]["requestBody"]>["content"]["application/json"];
export type CreditExpectedClaimsSavingRequestInput = NonNullable<operations["creditExpectedClaimsSaving"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCohortDefinitionsParams = NonNullable<operations["listCohortDefinitions"]["parameters"]["query"]>;
export type ListExperienceObservationsParams = NonNullable<operations["listExperienceObservations"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCohortDefinitionsResponse = operations["listCohortDefinitions"]["responses"]["200"]["content"]["application/json"];
export type DefineCohortResponse = operations["defineCohort"]["responses"]["201"]["content"]["application/json"];
export type ListExperienceObservationsResponse = operations["listExperienceObservations"]["responses"]["200"]["content"]["application/json"];
export type CreditExpectedClaimsSavingResponse = operations["creditExpectedClaimsSaving"]["responses"]["201"]["content"]["application/json"];


