import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { getArchimateSequences } from '@archpad/models';

@Injectable()
export class ArchimateSequenceInitializer implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap() {
    const generator = this.orm.getSchemaGenerator();
    
    const seqNames = getArchimateSequences();
    if (!seqNames.length) return;

    const conn = this.orm.em.getConnection();

    for (const seq of seqNames) {
      const sql = `
        CREATE SEQUENCE IF NOT EXISTS "${seq}"
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;
      `;
      await conn.execute(sql);
    }
    
    await generator.updateSchema({ safe: true } as any);
  }
}
