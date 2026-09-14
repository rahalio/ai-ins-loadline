/**
 * Integration event type definitions (hand-maintained shell).
 * Registry entries are generated from OpenAPI `x-integration-events`.
 */

export interface IntegrationEventTypeDefinition {
  type: string;
  domain?: string;
  aggregateType?: string;
  description?: string;
  payloadSchemaRef?: string;
}
