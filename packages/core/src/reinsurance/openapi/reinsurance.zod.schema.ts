import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const requestHumanReview_Body = z
  .object({
    requestedBy: z.enum([
      'applicant',
      'policyholder',
      'claimant',
      'distributor',
      'underwriter',
    ]),
    grounds: z.string(),
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
const Money = z
  .object({ amount: z.number(), currency: z.string() })
  .passthrough();
const CessionExperience = z
  .object({
    treatyId: z.string(),
    cohortId: z.string(),
    period: z.string(),
    cededExposureYears: z.number(),
    cededClaims: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    pricingBasisExpected: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    actualToExpected: z.number(),
    assumptionsHolding: z.boolean(),
    sharedWithCounterparty: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DataEnvelopeCessionExperience = z
  .object({
    data: z
      .object({
        treatyId: z.string(),
        cohortId: z.string(),
        period: z.string(),
        cededExposureYears: z.number(),
        cededClaims: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        pricingBasisExpected: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        actualToExpected: z.number(),
        assumptionsHolding: z.boolean(),
        sharedWithCounterparty: z.boolean(),
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
const ReviewDecision = z
  .object({
    id: z.string(),
    decisionId: z.string(),
    decisionKind: z
      .enum([
        'declinature',
        'exclusion',
        'loading',
        'claims_decision',
        'price_refusal',
      ])
      .optional(),
    requestedBy: z.string().optional(),
    grounds: z.string().optional(),
    status: z.enum(['open', 'upheld', 'overturned', 'partially_overturned']),
    reviewerId: z.string().optional(),
    explanationProvided: z.boolean().optional(),
    resolvedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DataEnvelopeReviewDecision = z
  .object({
    data: z
      .object({
        id: z.string(),
        decisionId: z.string(),
        decisionKind: z
          .enum([
            'declinature',
            'exclusion',
            'loading',
            'claims_decision',
            'price_refusal',
          ])
          .optional(),
        requestedBy: z.string().optional(),
        grounds: z.string().optional(),
        status: z.enum([
          'open',
          'upheld',
          'overturned',
          'partially_overturned',
        ]),
        reviewerId: z.string().optional(),
        explanationProvided: z.boolean().optional(),
        resolvedAt: z.string().datetime({ offset: true }).optional(),
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

export const schemas: any = {
  requestHumanReview_Body,
  Problem,
  Money,
  CessionExperience,
  ResponseMeta,
  DataEnvelopeCessionExperience,
  ReviewDecision,
  DataEnvelopeReviewDecision,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/decisions/:decisionId/review',
    alias: 'requestHumanReview',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestHumanReview_Body,
      },
      {
        name: 'decisionId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            decisionId: z.string(),
            decisionKind: z
              .enum([
                'declinature',
                'exclusion',
                'loading',
                'claims_decision',
                'price_refusal',
              ])
              .optional(),
            requestedBy: z.string().optional(),
            grounds: z.string().optional(),
            status: z.enum([
              'open',
              'upheld',
              'overturned',
              'partially_overturned',
            ]),
            reviewerId: z.string().optional(),
            explanationProvided: z.boolean().optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'get',
    path: '/v1/reinsurance/cession-experience',
    alias: 'getCessionExperience',
    requestFormat: 'json',
    parameters: [
      {
        name: 'treatyId',
        type: 'Query',
        schema: z.string(),
      },
      {
        name: 'cohortId',
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
            treatyId: z.string(),
            cohortId: z.string(),
            period: z.string(),
            cededExposureYears: z.number(),
            cededClaims: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            pricingBasisExpected: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            actualToExpected: z.number(),
            assumptionsHolding: z.boolean(),
            sharedWithCounterparty: z.boolean(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
