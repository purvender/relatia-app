import "server-only";
import "dotenv/config";

import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./schema.d";
import contractJson from "./schema.json" with { type: "json" };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

export const db = postgres<Contract>({
  contractJson,
  url: databaseUrl,
});

export type TransactionClient = Parameters<
  Parameters<typeof db.transaction>[0]
>[0];