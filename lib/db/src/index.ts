import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // In serverless (Vercel), keep connections minimal to avoid exhausting
  // the external Postgres (e.g. Neon) connection limit during scale-out.
  ...(process.env.VERCEL
    ? { max: 2, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 10_000 }
    : {}),
});
export const db = drizzle(pool, { schema });

export * from "./schema";
