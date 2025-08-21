import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  try {
    const records = await ((db as PostgresJsDatabase).insert(advocates).values(advocateData).returning());
    return Response.json({ advocates: records });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
