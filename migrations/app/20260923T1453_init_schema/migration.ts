#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3038b1f8defba3b2152d60a8ee0ca09feed194de2a8c35fc30f910ea59122e3e/contract';
import endContract from '../../snapshots/3038b1f8defba3b2152d60a8ee0ca09feed194de2a8c35fc30f910ea59122e3e/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'approval',
        columns: [
          col('approverId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('eventId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('reason', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'approval_status_check_56005a61',
            "\"status\" IN ('PENDING', 'APPROVED', 'REJECTED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'booking',
        columns: [
          col('amount', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('currency', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('eventId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('paymentStatus', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('razorpayOrderId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('taxAmount', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('venueId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'booking_paymentStatus_check_c913b4d1',
            "\"paymentStatus\" IN ('PENDING', 'PAID', 'FAILED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'company',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'event',
        columns: [
          col('attendees', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('budget', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('city', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('companyId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdById', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('dateTime', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('diet', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('eventType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'event_status_check_e86f1c56',
            "\"status\" IN ('DRAFT', 'REQUESTED', 'APPROVED', 'REJECTED', 'BOOKED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'invoice',
        columns: [
          col('bookingId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('gstin', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('pdfUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'policy',
        columns: [
          col('allowedCities', 'text[]', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('approverRole', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('companyId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('maxBudget', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('perPersonCap', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'policy_allowedCities_elem_not_null_47886974',
            'array_position("allowedCities", NULL) IS NULL',
          ),
          checkExpression(
            'policy_approverRole_check_acb353e6',
            "\"approverRole\" IN ('ADMIN', 'REQUESTER', 'APPROVER', 'FINANCE')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('clerkId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('companyId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'user_role_check_d2354a24',
            "\"role\" IN ('ADMIN', 'REQUESTER', 'APPROVER', 'FINANCE')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'venue',
        columns: [
          col('capacity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('city', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('companyId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('cuisine', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('priceBand', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('rating', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('tags', 'text[]', { notNull: true, codecRef: { codecId: 'pg/text@1', many: true } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'venue_tags_elem_not_null_aecbe9e2',
            'array_position("tags", NULL) IS NULL',
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'company',
        constraint: 'company_slug_key',
        columns: ['slug'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'invoice',
        constraint: 'invoice_bookingId_key',
        columns: ['bookingId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_clerkId_key',
        columns: ['clerkId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'approval',
        index: 'approval_approverId_idx_a4f46e61',
        columns: ['approverId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'approval',
        index: 'approval_eventId_idx_6a266d47',
        columns: ['eventId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking',
        index: 'booking_eventId_idx_6a266d47',
        columns: ['eventId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking',
        index: 'booking_venueId_idx_b49e8dab',
        columns: ['venueId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'event',
        index: 'event_companyId_idx_33acc5ed',
        columns: ['companyId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'event',
        index: 'event_createdById_idx_8bf640ed',
        columns: ['createdById'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'policy',
        index: 'policy_companyId_idx_33acc5ed',
        columns: ['companyId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'user',
        index: 'user_companyId_idx_33acc5ed',
        columns: ['companyId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'venue',
        index: 'venue_companyId_idx_33acc5ed',
        columns: ['companyId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'approval',
        foreignKey: {
          name: 'approval_eventId_fkey',
          columns: ['eventId'],
          references: { schema: 'public', table: 'event', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'approval',
        foreignKey: {
          name: 'approval_approverId_fkey',
          columns: ['approverId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking',
        foreignKey: {
          name: 'booking_eventId_fkey',
          columns: ['eventId'],
          references: { schema: 'public', table: 'event', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking',
        foreignKey: {
          name: 'booking_venueId_fkey',
          columns: ['venueId'],
          references: { schema: 'public', table: 'venue', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'event',
        foreignKey: {
          name: 'event_companyId_fkey',
          columns: ['companyId'],
          references: { schema: 'public', table: 'company', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'event',
        foreignKey: {
          name: 'event_createdById_fkey',
          columns: ['createdById'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'invoice',
        foreignKey: {
          name: 'invoice_bookingId_fkey',
          columns: ['bookingId'],
          references: { schema: 'public', table: 'booking', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'policy',
        foreignKey: {
          name: 'policy_companyId_fkey',
          columns: ['companyId'],
          references: { schema: 'public', table: 'company', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'user',
        foreignKey: {
          name: 'user_companyId_fkey',
          columns: ['companyId'],
          references: { schema: 'public', table: 'company', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'venue',
        foreignKey: {
          name: 'venue_companyId_fkey',
          columns: ['companyId'],
          references: { schema: 'public', table: 'company', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
