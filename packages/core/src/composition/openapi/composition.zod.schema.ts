import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const composePremium_Body = z
  .object({
    riskSubjectId: z.string(),
    productCode: z.string(),
    jurisdiction: z.string(),
    contributingScoreIds: z.array(z.string()),
    assumedTouchpointFrequency: z.string().optional(),
    touchpointEvidenceId: z.string().optional(),
  })
  .passthrough();
const applyCommercialCalibration_Body = z
  .object({
    calibratedPrice: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    rationale: z.string(),
    narrative: z.string().optional(),
    approvedBy: z.string(),
  })
  .passthrough();
const setVariationEnvelope_Body = z
  .object({
    jurisdiction: z.string(),
    productCode: z.string(),
    maxIncreasePercent: z.number().optional(),
    maxDecreasePercent: z.number().optional(),
    minRevisionIntervalDays: z.number().int().optional(),
    prohibitedDrivers: z.array(z.string()).optional(),
    basis: z.string(),
    basisReference: z.string().optional(),
  })
  .passthrough();
const PremiumCompositionCreate = z
  .object({
    riskSubjectId: z.string(),
    productCode: z.string(),
    jurisdiction: z.string(),
    contributingScoreIds: z.array(z.string()),
    assumedTouchpointFrequency: z.string().optional(),
    touchpointEvidenceId: z.string().optional(),
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
const PremiumComposition = z
  .object({
    id: z.string(),
    riskSubjectId: z.string(),
    productCode: z.string().optional(),
    jurisdiction: z.string().optional(),
    expectedClaims: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    loadingForRisk: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    loadingForExpense: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    technicalCost: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    contributingScoreIds: z.array(z.string()).optional(),
    riskLoadingBasis: z
      .object({
        assumedTouchpointFrequency: z.string(),
        touchpointEvidenceId: z.string(),
        chronicConditionLoading: z.boolean(),
      })
      .partial()
      .passthrough()
      .optional(),
    composedAt: z.string().datetime({ offset: true }).optional(),
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
const DataEnvelopePremiumComposition = z
  .object({
    data: z
      .object({
        id: z.string(),
        riskSubjectId: z.string(),
        productCode: z.string().optional(),
        jurisdiction: z.string().optional(),
        expectedClaims: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        loadingForRisk: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        loadingForExpense: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        technicalCost: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        contributingScoreIds: z.array(z.string()).optional(),
        riskLoadingBasis: z
          .object({
            assumedTouchpointFrequency: z.string(),
            touchpointEvidenceId: z.string(),
            chronicConditionLoading: z.boolean(),
          })
          .partial()
          .passthrough()
          .optional(),
        composedAt: z.string().datetime({ offset: true }).optional(),
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
const CommercialCalibrationCreate = z
  .object({
    calibratedPrice: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    rationale: z.string(),
    narrative: z.string().optional(),
    approvedBy: z.string(),
  })
  .passthrough();
const CommercialCalibration = z
  .object({
    compositionId: z.string(),
    technicalCost: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    calibratedPrice: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    deltaPercent: z.number().optional(),
    rationale: z.enum([
      'competitive_position',
      'channel_terms',
      'new_business_strain',
      'retention_objective',
      'portfolio_steering',
    ]),
    narrative: z.string().optional(),
    approvedBy: z.string(),
    approvedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DataEnvelopeCommercialCalibration = z
  .object({
    data: z
      .object({
        compositionId: z.string(),
        technicalCost: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        calibratedPrice: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        deltaPercent: z.number().optional(),
        rationale: z.enum([
          'competitive_position',
          'channel_terms',
          'new_business_strain',
          'retention_objective',
          'portfolio_steering',
        ]),
        narrative: z.string().optional(),
        approvedBy: z.string(),
        approvedAt: z.string().datetime({ offset: true }).optional(),
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
const PriceOffer = z
  .object({
    id: z.string(),
    compositionId: z.string(),
    offeredPrice: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    gateOutcome: z.enum([
      'within_envelope',
      'refused_magnitude',
      'refused_frequency',
      'refused_prohibited_driver',
    ]),
    envelopeId: z.string().optional(),
    validUntil: z.string().optional(),
    issuedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DataEnvelopePriceOffer = z
  .object({
    data: z
      .object({
        id: z.string(),
        compositionId: z.string(),
        offeredPrice: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        gateOutcome: z.enum([
          'within_envelope',
          'refused_magnitude',
          'refused_frequency',
          'refused_prohibited_driver',
        ]),
        envelopeId: z.string().optional(),
        validUntil: z.string().optional(),
        issuedAt: z.string().datetime({ offset: true }).optional(),
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
const VariationEnvelope = z
  .object({
    id: z.string(),
    jurisdiction: z.string(),
    productCode: z.string(),
    maxIncreasePercent: z.number().optional(),
    maxDecreasePercent: z.number().optional(),
    minRevisionIntervalDays: z.number().int().optional(),
    prohibitedDrivers: z.array(z.string()).optional(),
    basis: z
      .enum([
        'rate_filing',
        'regulatory_rule',
        'policy_condition',
        'treaty_term',
      ])
      .optional(),
    basisReference: z.string().optional(),
    effectiveFrom: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ListEnvelopeVariationEnvelope = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              jurisdiction: z.string(),
              productCode: z.string(),
              maxIncreasePercent: z.number().optional(),
              maxDecreasePercent: z.number().optional(),
              minRevisionIntervalDays: z.number().int().optional(),
              prohibitedDrivers: z.array(z.string()).optional(),
              basis: z
                .enum([
                  'rate_filing',
                  'regulatory_rule',
                  'policy_condition',
                  'treaty_term',
                ])
                .optional(),
              basisReference: z.string().optional(),
              effectiveFrom: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
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
const VariationEnvelopeCreate = z
  .object({
    jurisdiction: z.string(),
    productCode: z.string(),
    maxIncreasePercent: z.number().optional(),
    maxDecreasePercent: z.number().optional(),
    minRevisionIntervalDays: z.number().int().optional(),
    prohibitedDrivers: z.array(z.string()).optional(),
    basis: z.string(),
    basisReference: z.string().optional(),
  })
  .passthrough();
const DataEnvelopeVariationEnvelope = z
  .object({
    data: z
      .object({
        id: z.string(),
        jurisdiction: z.string(),
        productCode: z.string(),
        maxIncreasePercent: z.number().optional(),
        maxDecreasePercent: z.number().optional(),
        minRevisionIntervalDays: z.number().int().optional(),
        prohibitedDrivers: z.array(z.string()).optional(),
        basis: z
          .enum([
            'rate_filing',
            'regulatory_rule',
            'policy_condition',
            'treaty_term',
          ])
          .optional(),
        basisReference: z.string().optional(),
        effectiveFrom: z.string().optional(),
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
  composePremium_Body,
  applyCommercialCalibration_Body,
  setVariationEnvelope_Body,
  PremiumCompositionCreate,
  Problem,
  Money,
  PremiumComposition,
  ResponseMeta,
  DataEnvelopePremiumComposition,
  CommercialCalibrationCreate,
  CommercialCalibration,
  DataEnvelopeCommercialCalibration,
  PriceOffer,
  DataEnvelopePriceOffer,
  VariationEnvelope,
  ListEnvelopeVariationEnvelope,
  VariationEnvelopeCreate,
  DataEnvelopeVariationEnvelope,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/compositions',
    alias: 'composePremium',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: composePremium_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            riskSubjectId: z.string(),
            productCode: z.string().optional(),
            jurisdiction: z.string().optional(),
            expectedClaims: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            loadingForRisk: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            loadingForExpense: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            technicalCost: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            contributingScoreIds: z.array(z.string()).optional(),
            riskLoadingBasis: z
              .object({
                assumedTouchpointFrequency: z.string(),
                touchpointEvidenceId: z.string(),
                chronicConditionLoading: z.boolean(),
              })
              .partial()
              .passthrough()
              .optional(),
            composedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 422,
        description: `Rejected when a contributing model has not declared its premium term or when a risk-loading reduction cites touchpoint frequency without supporting touchpoint evidence.`,
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
    method: 'post',
    path: '/v1/compositions/:compositionId/calibration',
    alias: 'applyCommercialCalibration',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: applyCommercialCalibration_Body,
      },
      {
        name: 'compositionId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            compositionId: z.string(),
            technicalCost: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            calibratedPrice: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            deltaPercent: z.number().optional(),
            rationale: z.enum([
              'competitive_position',
              'channel_terms',
              'new_business_strain',
              'retention_objective',
              'portfolio_steering',
            ]),
            narrative: z.string().optional(),
            approvedBy: z.string(),
            approvedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 403,
        description: `Calibration beyond the approver&#x27;s threshold requires escalation`,
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
    method: 'post',
    path: '/v1/compositions/:compositionId/offer',
    alias: 'issuePriceOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'compositionId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            compositionId: z.string(),
            offeredPrice: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            gateOutcome: z.enum([
              'within_envelope',
              'refused_magnitude',
              'refused_frequency',
              'refused_prohibited_driver',
            ]),
            envelopeId: z.string().optional(),
            validUntil: z.string().optional(),
            issuedAt: z.string().datetime({ offset: true }).optional(),
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
        description: `Offer refused by the permitted variation gate because the magnitude or frequency of variation exceeds what the jurisdiction permits for this product.`,
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
    path: '/v1/variation-envelopes',
    alias: 'listVariationEnvelopes',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'jurisdiction',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'productCode',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string(),
                  jurisdiction: z.string(),
                  productCode: z.string(),
                  maxIncreasePercent: z.number().optional(),
                  maxDecreasePercent: z.number().optional(),
                  minRevisionIntervalDays: z.number().int().optional(),
                  prohibitedDrivers: z.array(z.string()).optional(),
                  basis: z
                    .enum([
                      'rate_filing',
                      'regulatory_rule',
                      'policy_condition',
                      'treaty_term',
                    ])
                    .optional(),
                  basisReference: z.string().optional(),
                  effectiveFrom: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
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
    method: 'post',
    path: '/v1/variation-envelopes',
    alias: 'setVariationEnvelope',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setVariationEnvelope_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            jurisdiction: z.string(),
            productCode: z.string(),
            maxIncreasePercent: z.number().optional(),
            maxDecreasePercent: z.number().optional(),
            minRevisionIntervalDays: z.number().int().optional(),
            prohibitedDrivers: z.array(z.string()).optional(),
            basis: z
              .enum([
                'rate_filing',
                'regulatory_rule',
                'policy_condition',
                'treaty_term',
              ])
              .optional(),
            basisReference: z.string().optional(),
            effectiveFrom: z.string().optional(),
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
