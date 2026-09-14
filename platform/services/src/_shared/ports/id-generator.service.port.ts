/**
 * IdGeneratorService Port — Loadline domain prefixes.
 */

import type { DomainCode } from '@loadline/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  scoId(): string;
  cmpId(): string;
  prmId(): string;
  engId(): string;
  expId(): string;
  clmId(): string;
  reiId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
