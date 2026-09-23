#!/usr/bin/env -S node

import type { Contract as Start } from "../../snapshots/3038b1f8defba3b2152d60a8ee0ca09feed194de2a8c35fc30f910ea59122e3e/contract";
import startContractJson from "../../snapshots/3038b1f8defba3b2152d60a8ee0ca09feed194de2a8c35fc30f910ea59122e3e/contract.json" with { type: "json" };

import type { Contract as End } from "../../snapshots/f3c89d651871e03f1e55de294d51716a1d020b12bb10d232a84063374ac128db/contract";
import endContractJson from "../../snapshots/f3c89d651871e03f1e55de294d51716a1d020b12bb10d232a84063374ac128db/contract.json" with { type: "json" };

import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
} from "@prisma/orm-postgres/migration";

import postgresAdapter from "@prisma/orm-postgres/adapter/runtime";
import { sql } from "@prisma/orm-postgres/builder/runtime";
import {
  createExecutionContext,
  createSqlExecutionStack,
} from "@prisma/orm-postgres/family-runtime";
import postgresTarget, {
  PostgresContractSerializer,
} from "@prisma/orm-postgres/target/runtime";

const stack = createSqlExecutionStack({
  target: postgresTarget,
  adapter: postgresAdapter,
});

const endContract =
  new PostgresContractSerializer().deserializeContract<End>(
    endContractJson,
  );

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
        schema: "public",
        table: "booking",
        constraint: "booking_paymentStatus_check_c913b4d1",
      }),

      this.dropIndex({
        schema: "public",
        table: "booking",
        index: "booking_eventId_idx_6a266d47",
      }),

      this.dropCheckConstraint({
        schema: "public",
        table: "event",
        constraint: "event_status_check_e86f1c56",
      }),

      this.dropIndex({
        schema: "public",
        table: "policy",
        index: "policy_companyId_idx_33acc5ed",
      }),

      this.addColumn({
        schema: "public",
        table: "booking",
        column: col("createdAt", "timestamptz", {
          notNull: true,
          default: fn("now()"),
          codecRef: {
            codecId: "pg/timestamptz-string@1",
          },
        }),
      }),

      this.addColumn({
        schema: "public",
        table: "event",
        column: col("createdAt", "timestamptz", {
          notNull: true,
          default: fn("now()"),
          codecRef: {
            codecId: "pg/timestamptz-string@1",
          },
        }),
      }),

      this.addColumn({
        schema: "public",
        table: "event",
        column: col("purpose", "text", {
          codecRef: {
            codecId: "pg/text@1",
          },
        }),
      }),

      this.addColumn({
        schema: "public",
        table: "venue",
        column: col("active", "bool", {
          notNull: true,
          default: lit(true),
          codecRef: {
            codecId: "pg/bool@1",
          },
        }),
      }),

      this.addColumn({
        schema: "public",
        table: "venue",
        column: col("address", "text", {
          codecRef: {
            codecId: "pg/text@1",
          },
        }),
      }),

      this.addColumn({
        schema: "public",
        table: "event",
        column: col("title", "text", {
          codecRef: {
            codecId: "pg/text@1",
          },
        }),
      }),

      this.dataTransform(
        endContract,
        "backfill-event-title",
        {
          check: () =>
            migrationDb.public.event
              .select("id")
              .where((fields, functions) =>
                functions.eq(fields.title, null),
              )
              .limit(1),

          run: () =>
            migrationDb.public.event
              .update({
                title: "Untitled event",
              })
              .where((fields, functions) =>
                functions.eq(fields.title, null),
              ),
        },
      ),

      this.setNotNull({
        schema: "public",
        table: "event",
        column: "title",
      }),

      this.addColumn({
        schema: "public",
        table: "venue",
        column: col("name", "text", {
          codecRef: {
            codecId: "pg/text@1",
          },
        }),
      }),

      this.dataTransform(
        endContract,
        "backfill-venue-name",
        {
          check: () =>
            migrationDb.public.venue
              .select("id")
              .where((fields, functions) =>
                functions.eq(fields.name, null),
              )
              .limit(1),

          run: () =>
            migrationDb.public.venue
              .update({
                name: "Unnamed venue",
              })
              .where((fields, functions) =>
                functions.eq(fields.name, null),
              ),
        },
      ),

      this.setNotNull({
        schema: "public",
        table: "venue",
        column: "name",
      }),

      this.setDefault({
        schema: "public",
        table: "booking",
        column: "currency",
        defaultSql: "DEFAULT 'INR'",
      }),

      this.setDefault({
        schema: "public",
        table: "event",
        column: "diet",
        defaultSql: "DEFAULT 'NONE'",
      }),

      this.addUnique({
        schema: "public",
        table: "approval",
        constraint: "approval_eventId_approverId_key",
        columns: ["eventId", "approverId"],
      }),

      this.addCheckConstraint({
        schema: "public",
        table: "booking",
        constraint:
          "booking_paymentStatus_check_60515b20",
        expression:
          "\"paymentStatus\" IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')",
      }),

      this.addUnique({
        schema: "public",
        table: "booking",
        constraint: "booking_eventId_key",
        columns: ["eventId"],
      }),

      this.addUnique({
        schema: "public",
        table: "booking",
        constraint: "booking_razorpayOrderId_key",
        columns: ["razorpayOrderId"],
      }),

      this.addCheckConstraint({
        schema: "public",
        table: "event",
        constraint: "event_status_check_3bca4d65",
        expression:
          "\"status\" IN ('DRAFT', 'REQUESTED', 'APPROVED', 'REJECTED', 'BOOKED', 'COMPLETED', 'CANCELLED')",
      }),

      this.addUnique({
        schema: "public",
        table: "policy",
        constraint: "policy_companyId_key",
        columns: ["companyId"],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);