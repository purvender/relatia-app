#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/5e7a6fd6d87626c52b26186c7ca58d42931908a8fb0d59996606345cc0849b3b/contract';
import startContract from '../../snapshots/5e7a6fd6d87626c52b26186c7ca58d42931908a8fb0d59996606345cc0849b3b/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a38ac279dd3c00bfdd12fcfe765515e6a0db64c07575573bc4f9c1c7bb5bfdc0/contract';
import endContract from '../../snapshots/a38ac279dd3c00bfdd12fcfe765515e6a0db64c07575573bc4f9c1c7bb5bfdc0/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'webhookEventLog',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('eventId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('eventType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'webhookEventLog',
        constraint: 'webhookEventLog_eventId_key',
        columns: ['eventId'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
