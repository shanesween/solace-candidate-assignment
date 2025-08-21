import db from "../../../../db";
import { advocates } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const advocateId = parseInt(params.id);

    if (isNaN(advocateId)) {
      return Response.json(
        { error: "Invalid advocate ID" },
        { status: 400 }
      );
    }

    const result = await ((db as PostgresJsDatabase)
      .select()
      .from(advocates)
      .where(eq(advocates.id, advocateId))
      .limit(1));

    if (result.length === 0) {
      return Response.json(
        { error: "Advocate not found" },
        { status: 404 }
      );
    }

    return Response.json({ data: result[0] });
  } catch (error) {
    console.error('Get advocate error:', error);
    return Response.json(
      { error: 'Failed to fetch advocate' },
      { status: 500 }
    );
  }
}