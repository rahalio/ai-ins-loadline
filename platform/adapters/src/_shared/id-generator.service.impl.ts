/**
 * ID Generator Service Implementation — Loadline prefixes.
 */

import type { DomainCode } from '@loadline/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@loadline/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@loadline/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  scoId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.scoring);
  }
  cmpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.composition);
  }
  prmId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.permitting);
  }
  engId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.engagement);
  }
  expId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.experience);
  }
  clmId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.claims);
  }
  reiId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.reinsurance);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
