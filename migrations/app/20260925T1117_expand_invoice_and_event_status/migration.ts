#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/777475dbf011c7de0d7073a72aebbf85e8f9078ed49f28cc828ddbcf279cb728/contract';
import endContractJson from '../../snapshots/777475dbf011c7de0d7073a72aebbf85e8f9078ed49f28cc828ddbcf279cb728/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e631114033910891e449f2bb033bdde2c659fb4fac022701949e6c0c79de6dd1/contract';
import startContractJson from '../../snapshots/e631114033910891e449f2bb033bdde2c659fb4fac022701949e6c0c79de6dd1/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit } from '@prisma/orm-postgres/migration';

import postgresAdapter from '@prisma/orm-postgres/adapter/runtime';
import { sql } from '@prisma/orm-postgres/builder/runtime';
import { createExecutionContext, createSqlExecutionStack } from '@prisma/orm-postgres/family-runtime';
import postgresTarget, { PostgresContractSerializer } from '@prisma/orm-postgres/target/runtime';

const stack = createSqlExecutionStack({
  target: postgresTarget,
  adapter: postgresAdapter,
});

const endContract = new PostgresContractSerializer().deserializeContract<End>(endContractJson);

const migrationDb = sql<End>({
  context: createExecutionContext({
    contract: endContract,
    stack,
  }),
  rawCodecInferer: stack.adapter.rawCodecInferer,
});

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContractJson;
  override readonly endContractJson = endContractJson;

  override get operations() {
    return [
      this.dropCheckConstraint({
        schema: 'public',
        table: 'event',
        constraint: 'event_status_check_59f4e26b',
      }),
      this.dropColumn({ schema: 'public', table: 'invoice', column: 'gstin' }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('cgstAmount', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('igstAmount', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('issuedAt', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('sgstAmount', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('status', 'text', {
          notNull: true,
          default: lit('ISSUED'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('baseAmount', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-invoice-baseAmount', {
        check: () =>
          migrationDb.public.invoice
            .select('id')
            .where((fields, functions) => functions.eq(fields.baseAmount, null))
            .limit(1),
        run: () =>
          migrationDb.public.invoice
            .update({ baseAmount: 0 })
            .where((fields, functions) => functions.eq(fields.baseAmount, null)),
      }),
      this.setNotNull({ schema: 'public', table: 'invoice', column: 'baseAmount' }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('invoiceNumber', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-invoice-invoiceNumber', {
        check: () =>
          migrationDb.public.invoice
            .select('id')
            .where((fields, functions) => functions.eq(fields.invoiceNumber, null))
            .limit(1),
        run: () =>
          migrationDb.public.invoice
            .update({ invoiceNumber: 'INV-LEGACY' })
            .where((fields, functions) => functions.eq(fields.invoiceNumber, null)),
      }),
      this.setNotNull({ schema: 'public', table: 'invoice', column: 'invoiceNumber' }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('recipientGstin', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-invoice-recipientGstin', {
        check: () =>
          migrationDb.public.invoice
            .select('id')
            .where((fields, functions) => functions.eq(fields.recipientGstin, null))
            .limit(1),
        run: () =>
          migrationDb.public.invoice
            .update({ recipientGstin: '' })
            .where((fields, functions) => functions.eq(fields.recipientGstin, null)),
      }),
      this.setNotNull({ schema: 'public', table: 'invoice', column: 'recipientGstin' }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('supplierGstin', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-invoice-supplierGstin', {
        check: () =>
          migrationDb.public.invoice
            .select('id')
            .where((fields, functions) => functions.eq(fields.supplierGstin, null))
            .limit(1),
        run: () =>
          migrationDb.public.invoice
            .update({ supplierGstin: '' })
            .where((fields, functions) => functions.eq(fields.supplierGstin, null)),
      }),
      this.setNotNull({ schema: 'public', table: 'invoice', column: 'supplierGstin' }),
      this.addColumn({
        schema: 'public',
        table: 'invoice',
        column: col('totalAmount', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-invoice-totalAmount', {
        check: () =>
          migrationDb.public.invoice
            .select('id')
            .where((fields, functions) => functions.eq(fields.totalAmount, null))
            .limit(1),
        run: () =>
          migrationDb.public.invoice
            .update({ totalAmount: 0 })
            .where((fields, functions) => functions.eq(fields.totalAmount, null)),
      }),
      this.setNotNull({ schema: 'public', table: 'invoice', column: 'totalAmount' }),
      this.dropNotNull({ schema: 'public', table: 'invoice', column: 'pdfUrl' }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'event',
        constraint: 'event_status_check_23fde911',
        expression:
          "\"status\" IN ('DRAFT', 'REQUESTED', 'APPROVED', 'VENUE_SELECTED', 'BOOKING_REQUESTED', 'REJECTED', 'BOOKED', 'COMPLETED', 'CANCELLED')",
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'invoice',
        constraint: 'invoice_status_check_41b49830',
        expression: "\"status\" IN ('ISSUED', 'PAID', 'CANCELLED')",
      }),
      this.addUnique({
        schema: 'public',
        table: 'invoice',
        constraint: 'invoice_invoiceNumber_key',
        columns: ['invoiceNumber'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
