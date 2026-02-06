import { Injectable } from '@nestjs/common';
import { MikroORM, UniqueConstraintViolationException } from '@mikro-orm/core';
import { UserProfile } from '../model/entities/user-profile.entity';
import type { EnsureUserProfileRequestDto } from './user-profiles.dto';

function cleanOptionalString(v: unknown): string | undefined {
  const s = typeof v === 'string' ? v.trim() : '';
  return s ? s : undefined;
}

@Injectable()
export class InternalUserProfilesService {
  constructor(private readonly orm: MikroORM) {}

  async ensureUserProfile(input: EnsureUserProfileRequestDto): Promise<UserProfile> {
    const keycloakId = String(input.keycloakId ?? '').trim();
    if (!keycloakId) throw new Error('missing_keycloak_id');

    const middleName = cleanOptionalString(input.middleName);
    const position = cleanOptionalString(input.position);
    const department = cleanOptionalString(input.department);

    const em = this.orm.em.fork();

    const attempt = async () =>
      em.transactional(async (tx) => {
        let profile = await tx.findOne(UserProfile, { keycloakId });

        if (!profile) {
          profile = new UserProfile();
          profile.keycloakId = keycloakId;
        }

        // Last-write-wins for provided fields (idempotent for repeats)
        if (middleName !== undefined) profile.middleName = middleName;
        if (position !== undefined) profile.position = position;
        if (department !== undefined) profile.department = department;

        await tx.persistAndFlush(profile);
        return profile;
      });

    try {
      return await attempt();
    } catch (e: unknown) {
      // Handle rare race: two concurrent ensure() for same keycloakId.
      if (e instanceof UniqueConstraintViolationException) {
        const found = await em.findOne(UserProfile, { keycloakId });
        if (found) return found;
      }
      throw e;
    }
  }

  async findByKeycloakId(keycloakId: string): Promise<UserProfile | null> {
    const kc = String(keycloakId ?? '').trim();
    if (!kc) return null;
    return this.orm.em.findOne(UserProfile, { keycloakId: kc });
  }
}

