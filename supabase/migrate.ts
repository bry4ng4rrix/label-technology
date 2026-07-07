// Exécute les fichiers supabase/migrations/*.sql (par ordre alphabétique) contre la base
// via une connexion Postgres directe. Nécessite DATABASE_URL dans .env.local — le "Connection
// string" (mode "Transaction" ou "Session") depuis Supabase > Project Settings > Database.
import { config } from "dotenv";
config({ path: ".env.local" });

import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { Client } from "pg";

const MIGRATIONS_DIR = join(import.meta.dirname, "migrations");

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL n'est pas défini dans .env.local. Récupérez le connection string sur " +
        "Supabase > Project Settings > Database > Connection string (URI)."
    );
  }

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("Aucune migration trouvée dans supabase/migrations/.");
    return;
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    for (const file of files) {
      const sql = readFileSync(join(MIGRATIONS_DIR, file), "utf-8");
      console.log(`→ Exécution de ${file}...`);
      await client.query(sql);
      console.log(`✓ ${file} appliquée.`);
    }
    console.log("Migrations terminées.");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
