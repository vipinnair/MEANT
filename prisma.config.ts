// Prisma CLI config — loads dev DATABASE_URL by default for migrations.
// To run against prod: DATABASE_URL="prod-url" npx prisma migrate deploy
import path from "node:path";
import fs from "node:fs";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Only load .env files if they exist (local dev). On Vercel, env vars are injected natively.
for (const file of [".env.development.local", ".env.local"]) {
  const filePath = path.resolve(file);
  if (fs.existsSync(filePath)) dotenv.config({ path: filePath });
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
