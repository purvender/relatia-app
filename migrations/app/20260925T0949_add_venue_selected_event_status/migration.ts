#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e631114033910891e449f2bb033bdde2c659fb4fac022701949e6c0c79de6dd1/contract';
import endContract from '../../snapshots/e631114033910891e449f2bb033bdde2c659fb4fac022701949e6c0c79de6dd1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/f3c89d651871e03f1e55de294d51716a1d020b12bb10d232a84063374ac128db/contract';
import startContract from '../../snapshots/f3c89d651871e03f1e55de294d51716a1d020b12bb10d232a84063374ac128db/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropCheckConstraint({
        schema: 'public',
        table: 'event',
        constraint: 'event_status_check_3bca4d65',
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'event',
        constraint: 'event_status_check_59f4e26b',
        expression:
          "\"status\" IN ('DRAFT', 'REQUESTED', 'APPROVED', 'VENUE_SELECTED', 'REJECTED', 'BOOKED', 'COMPLETED', 'CANCELLED')",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
