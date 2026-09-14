import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createEngagementProgramme_Body = z
  .object({
    name: z.string(),
    premiumTermTargeted: z.enum([
      'expected_claims',
      'loading_for_risk',
      'loading_for_expense',
    ]),
    interventionKind: z.string(),
    assumedTouchpointFrequency: z.string().optional(),
    jurisdictions: z.array(z.string()).optional(),
  })
  .passthrough();
const recordTouchpointEvent_Body = z
  .object({
    enrolmentId: z.string(),
    touchpointKind: z.string(),
    occurredAt: z.string().datetime({ offset: true }),
    consentRecordId: z.string().optional(),
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
const PremiumTerm = z.enum([
  'expected_claims',
  'loading_for_risk',
  'loading_for_expense',
]);
const EngagementProgramme = z
  .object({
    id: z.string(),
    name: z.string(),
    premiumTermTargeted: z.enum([
      'expected_claims',
      'loading_for_risk',
      'loading_for_expense',
    ]),
    interventionKind: z
      .enum([
        'activity_nudge',
        'chronic_condition_management',
        'driving_feedback',
        'home_risk_alert',
        'screening_reminder',
        'financial_wellbeing',
      ])
      .optional(),
    assumedTouchpointFrequency: z.string().optional(),
    state: z.enum(['design', 'boundary_review', 'live', 'suspended', 'closed']),
    boundaryReview: z
      .object({
        medicalAdviceBoundaryCleared: z.boolean(),
        inducementBoundaryCleared: z.boolean(),
        jurisdictions: z.array(z.string()),
        officerId: z.string(),
      })
      .partial()
      .passthrough()
      .optional(),
    enrolledCount: z.number().int().optional(),
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
const ListEnvelopeEngagementProgramme = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string(),
              name: z.string(),
              premiumTermTargeted: z.enum([
                'expected_claims',
                'loading_for_risk',
                'loading_for_expense',
              ]),
              interventionKind: z
                .enum([
                  'activity_nudge',
                  'chronic_condition_management',
                  'driving_feedback',
                  'home_risk_alert',
                  'screening_reminder',
                  'financial_wellbeing',
                ])
                .optional(),
              assumedTouchpointFrequency: z.string().optional(),
              state: z.enum([
                'design',
                'boundary_review',
                'live',
                'suspended',
                'closed',
              ]),
              boundaryReview: z
                .object({
                  medicalAdviceBoundaryCleared: z.boolean(),
                  inducementBoundaryCleared: z.boolean(),
                  jurisdictions: z.array(z.string()),
                  officerId: z.string(),
                })
                .partial()
                .passthrough()
                .optional(),
              enrolledCount: z.number().int().optional(),
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
const EngagementProgrammeCreate = z
  .object({
    name: z.string(),
    premiumTermTargeted: z.enum([
      'expected_claims',
      'loading_for_risk',
      'loading_for_expense',
    ]),
    interventionKind: z.string(),
    assumedTouchpointFrequency: z.string().optional(),
    jurisdictions: z.array(z.string()).optional(),
  })
  .passthrough();
const DataEnvelopeEngagementProgramme = z
  .object({
    data: z
      .object({
        id: z.string(),
        name: z.string(),
        premiumTermTargeted: z.enum([
          'expected_claims',
          'loading_for_risk',
          'loading_for_expense',
        ]),
        interventionKind: z
          .enum([
            'activity_nudge',
            'chronic_condition_management',
            'driving_feedback',
            'home_risk_alert',
            'screening_reminder',
            'financial_wellbeing',
          ])
          .optional(),
        assumedTouchpointFrequency: z.string().optional(),
        state: z.enum([
          'design',
          'boundary_review',
          'live',
          'suspended',
          'closed',
        ]),
        boundaryReview: z
          .object({
            medicalAdviceBoundaryCleared: z.boolean(),
            inducementBoundaryCleared: z.boolean(),
            jurisdictions: z.array(z.string()),
            officerId: z.string(),
          })
          .partial()
          .passthrough()
          .optional(),
        enrolledCount: z.number().int().optional(),
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
const TouchpointEventCreate = z
  .object({
    enrolmentId: z.string(),
    touchpointKind: z.string(),
    occurredAt: z.string().datetime({ offset: true }),
    consentRecordId: z.string().optional(),
  })
  .passthrough();
const TouchpointEvent = z
  .object({
    id: z.string(),
    enrolmentId: z.string(),
    touchpointKind: z.enum([
      'data_sync',
      'nudge_delivered',
      'nudge_acted',
      'coaching_session',
      'screening_completed',
      'alert_resolved',
    ]),
    occurredAt: z.string().datetime({ offset: true }),
    consentRecordId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DataEnvelopeTouchpointEvent = z
  .object({
    data: z
      .object({
        id: z.string(),
        enrolmentId: z.string(),
        touchpointKind: z.enum([
          'data_sync',
          'nudge_delivered',
          'nudge_acted',
          'coaching_session',
          'screening_completed',
          'alert_resolved',
        ]),
        occurredAt: z.string().datetime({ offset: true }),
        consentRecordId: z.string().optional(),
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
const TouchpointFrequency = z
  .object({
    enrolmentId: z.string(),
    assumedFrequency: z.string(),
    measuredFrequency: z.string(),
    measurementWindow: z.string(),
    meetsAssumption: z.boolean(),
    consentGapDays: z.number().int(),
    riskLoadingSupported: z.boolean(),
  })
  .partial()
  .passthrough();
const DataEnvelopeTouchpointFrequency = z
  .object({
    data: z
      .object({
        enrolmentId: z.string(),
        assumedFrequency: z.string(),
        measuredFrequency: z.string(),
        measurementWindow: z.string(),
        meetsAssumption: z.boolean(),
        consentGapDays: z.number().int(),
        riskLoadingSupported: z.boolean(),
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
  createEngagementProgramme_Body,
  recordTouchpointEvent_Body,
  Problem,
  PremiumTerm,
  EngagementProgramme,
  ResponseMeta,
  ListEnvelopeEngagementProgramme,
  EngagementProgrammeCreate,
  DataEnvelopeEngagementProgramme,
  TouchpointEventCreate,
  TouchpointEvent,
  DataEnvelopeTouchpointEvent,
  TouchpointFrequency,
  DataEnvelopeTouchpointFrequency,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/engagement/enrolments/:enrolmentId/frequency',
    alias: 'getTouchpointFrequency',
    requestFormat: 'json',
    parameters: [
      {
        name: 'enrolmentId',
        type: 'Path',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            enrolmentId: z.string(),
            assumedFrequency: z.string(),
            measuredFrequency: z.string(),
            measurementWindow: z.string(),
            meetsAssumption: z.boolean(),
            consentGapDays: z.number().int(),
            riskLoadingSupported: z.boolean(),
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
    method: 'get',
    path: '/v1/engagement/programmes',
    alias: 'listEngagementProgrammes',
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
        name: 'state',
        type: 'Query',
        schema: z
          .enum(['design', 'boundary_review', 'live', 'suspended', 'closed'])
          .optional(),
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
                  name: z.string(),
                  premiumTermTargeted: z.enum([
                    'expected_claims',
                    'loading_for_risk',
                    'loading_for_expense',
                  ]),
                  interventionKind: z
                    .enum([
                      'activity_nudge',
                      'chronic_condition_management',
                      'driving_feedback',
                      'home_risk_alert',
                      'screening_reminder',
                      'financial_wellbeing',
                    ])
                    .optional(),
                  assumedTouchpointFrequency: z.string().optional(),
                  state: z.enum([
                    'design',
                    'boundary_review',
                    'live',
                    'suspended',
                    'closed',
                  ]),
                  boundaryReview: z
                    .object({
                      medicalAdviceBoundaryCleared: z.boolean(),
                      inducementBoundaryCleared: z.boolean(),
                      jurisdictions: z.array(z.string()),
                      officerId: z.string(),
                    })
                    .partial()
                    .passthrough()
                    .optional(),
                  enrolledCount: z.number().int().optional(),
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
    path: '/v1/engagement/programmes',
    alias: 'createEngagementProgramme',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createEngagementProgramme_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            name: z.string(),
            premiumTermTargeted: z.enum([
              'expected_claims',
              'loading_for_risk',
              'loading_for_expense',
            ]),
            interventionKind: z
              .enum([
                'activity_nudge',
                'chronic_condition_management',
                'driving_feedback',
                'home_risk_alert',
                'screening_reminder',
                'financial_wellbeing',
              ])
              .optional(),
            assumedTouchpointFrequency: z.string().optional(),
            state: z.enum([
              'design',
              'boundary_review',
              'live',
              'suspended',
              'closed',
            ]),
            boundaryReview: z
              .object({
                medicalAdviceBoundaryCleared: z.boolean(),
                inducementBoundaryCleared: z.boolean(),
                jurisdictions: z.array(z.string()),
                officerId: z.string(),
              })
              .partial()
              .passthrough()
              .optional(),
            enrolledCount: z.number().int().optional(),
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
    method: 'post',
    path: '/v1/engagement/touchpoints',
    alias: 'recordTouchpointEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordTouchpointEvent_Body,
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string(),
            enrolmentId: z.string(),
            touchpointKind: z.enum([
              'data_sync',
              'nudge_delivered',
              'nudge_acted',
              'coaching_session',
              'screening_completed',
              'alert_resolved',
            ]),
            occurredAt: z.string().datetime({ offset: true }),
            consentRecordId: z.string().optional(),
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
