#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5e7a6fd6d87626c52b26186c7ca58d42931908a8fb0d59996606345cc0849b3b/contract';
import endContract from '../../snapshots/5e7a6fd6d87626c52b26186c7ca58d42931908a8fb0d59996606345cc0849b3b/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/777475dbf011c7de0d7073a72aebbf85e8f9078ed49f28cc828ddbcf279cb728/contract';
import startContract from '../../snapshots/777475dbf011c7de0d7073a72aebbf85e8f9078ed49f28cc828ddbcf279cb728/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'booking',
        column: col('paidAt', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-string@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'booking',
        column: col('razorpayPaymentId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'booking',
        column: col('razorpaySignature', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addUnique({
        schema: 'public',
        table: 'booking',
        constraint: 'booking_razorpayPaymentId_key',
        columns: ['razorpayPaymentId'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
