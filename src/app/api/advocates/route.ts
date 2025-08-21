import db from "../../../db";
import { advocates } from "../../../db/schema";
import { gt } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = parseInt(searchParams.get("limit") || "100");
    const cursor = searchParams.get("cursor");

    let query = db.select().from(advocates) as any;

    // Apply cursor-based pagination
    if (cursor) {
      query = query.where(gt(advocates.id, parseInt(cursor)));
    }

    // Apply limit (get one extra to check if there's a next page)
    query = query.limit(limit + 1);

    const data = await query;

    const hasNextPage = data.length > limit;
    const results = hasNextPage ? data.slice(0, limit) : data;
    const nextCursor = hasNextPage ? results[results.length - 1].id.toString() : null;

    return Response.json({
      data: results,
      pagination: {
        hasNextPage,
        nextCursor,
        limit
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to fetch advocates' },
      { status: 500 }
    );
  }
}
