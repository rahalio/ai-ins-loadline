import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const settleClaimAutomatically_Body = z
  .object({
    claimReference: z.string(),
    policyReference: z.string().optional(),
    coveragePattern: z.string(),
    evidenceRefs: z.array(z.string()),
    claimedAmount: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
  })
  .passthrough();
const raiseFraudReferral_Body = z
  .object({
    claimReference: z.string(),
    indicators: z.array(
      z
        .object({ indicator: z.string(), evidenceRef: z.string() })
        .partial()
        .passthrough()
    ),
    anomalyKind: z.string(),
    score: z.number().optional(),
  })
  .passthrough();
const Money = z
  .object({ amount: z.number(), currency: z.string() })
  .passthrough();
const AutomaticSettlementCreate = z
  .object({
    claimReference: z.string(),
    policyReference: z.string().optional(),
    coveragePattern: z.string(),
    evidenceRefs: z.array(z.string()),
    claimedAmount: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const AutomaticSettlement = z
  .object({
    id: z.string(),
    claimReference: z.string(),
    outcome: z.enum(['settled', 'referred', 'declined_pending_review']),
    settledAmount: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    coveragePattern: z.string().optional(),
    ruleVersion: z.string().optional(),
    handlingCost: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    settledAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DataEnvelopeAutomaticSettlement = z
  .object({
    data: z
      .object({
        id: z.string(),
        claimReference: z.string(),
        outcome: z.enum(['settled', 'referred', 'declined_pending_review']),
        settledAmount: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        coveragePattern: z.string().optional(),
        ruleVersion: z.string().optional(),
        handlingCost: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        settledAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();
const FraudReferralCreate = z
  .object({
    claimReference: z.string(),
    indicators: z.array(
      z
        .object({ indicator: z.string(), evidenceRef: z.string() })
        .partial()
        .passthrough()
    ),
    anomalyKind: z.string(),
    score: z.number().optional(),
  })
  .passthrough();
const FraudReferral = z
  .object({
    id: z.string(),
    claimReference: z.string(),
    indicators: z.array(
      z
        .object({ indicator: z.string(), evidenceRef: z.string() })
        .partial()
        .passthrough()
    ),
    anomalyKind: z
      .enum([
        'coverage_anomaly',
        'timing_anomaly',
        'network_pattern',
        'documentation_inconsistency',
      ])
      .optional(),
    score: z.number().optional(),
    raisedBy: z.string().optional(),
    status: z
      .enum(['open', 'investigating', 'substantiated', 'unsubstantiated'])
      .optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DataEnvelopeFraudReferral = z
  .object({
    data: z
      .object({
        id: z.string(),
        claimReference: z.string(),
        indicators: z.array(
          z
            .object({ indicator: z.string(), evidenceRef: z.string() })
            .partial()
            .passthrough()
        ),
        anomalyKind: z
          .enum([
            'coverage_anomaly',
            'timing_anomaly',
            'network_pattern',
            'documentation_inconsistency',
          ])
          .optional(),
        score: z.number().optional(),
        raisedBy: z.string().optional(),
        status: z
          .enum(['open', 'investigating', 'substantiated', 'unsubstantiated'])
          .optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();
const ExpenseMeasurement = z
  .object({
    productCode: z.string(),
    period: z.string(),
    costPerPolicyIssued: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    costPerClaimSettled: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    automatedShareIssue: z.number(),
    automatedShareClaims: z.number(),
    impliedExpenseLoading: z.number(),
    pricedExpenseLoading: z.number(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DataEnvelopeExpenseMeasurement = z
  .object({
    data: z
      .object({
        productCode: z.string(),
        period: z.string(),
        costPerPolicyIssued: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        costPerClaimSettled: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        automatedShareIssue: z.number(),
        automatedShareClaims: z.number(),
        impliedExpenseLoading: z.number(),
        pricedExpenseLoading: z.number(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough(),
  })
  .passthrough();

export const schemas: any = {
  settleClaimAutomatically_Body,
  raiseFraudReferral_Body,
  Money,
  AutomaticSettlementCreate,
  Problem,
  AutomaticSettlement,
  ResponseMeta,
  DataEnvelopeAutomaticSettlement,
  FraudReferralCreate,
  FraudReferral,
  DataEnvelopeFraudReferral,
  ExpenseMeasurement,
  DataEnvelopeExpenseMeasurement,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/claims/automatic-settlements',
    alias: 'settleClaimAutomatically',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: settleClaimAutomatically_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            claimReference: z.string(),
            outcome: z.enum(['settled', 'referred', 'declined_pending_review']),
            settledAmount: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            coveragePattern: z.string().optional(),
            ruleVersion: z.string().optional(),
            handlingCost: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            settledAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough(),
      })
      .passthrough(),
    errors: [
      {
        status: 409,
        description: `Referred rather than settled because the coverage or evidence pattern is not cleared, or a coverage anomaly was detected.`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/claims/expense-measurements',
    alias: 'getExpenseMeasurement',
    requestFormat: 'json',
    parameters: [
      {
        name: 'productCode',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            productCode: z.string(),
            period: z.string(),
            costPerPolicyIssued: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            costPerClaimSettled: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            automatedShareIssue: z.number(),
            automatedShareClaims: z.number(),
            impliedExpenseLoading: z.number(),
            pricedExpenseLoading: z.number(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough(),
      })
      .passthrough(),
  },
  {
    method: 'post',
    path: '/v1/claims/fraud-referrals',
    alias: 'raiseFraudReferral',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: raiseFraudReferral_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            claimReference: z.string(),
            indicators: z.array(
              z
                .object({ indicator: z.string(), evidenceRef: z.string() })
                .partial()
                .passthrough()
            ),
            anomalyKind: z
              .enum([
                'coverage_anomaly',
                'timing_anomaly',
                'network_pattern',
                'documentation_inconsistency',
              ])
              .optional(),
            score: z.number().optional(),
            raisedBy: z.string().optional(),
            status: z
              .enum([
                'open',
                'investigating',
                'substantiated',
                'unsubstantiated',
              ])
              .optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough(),
      })
      .passthrough(),
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
