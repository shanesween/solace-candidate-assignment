
import db from "../../../../db";
import { advocates } from "../../../../db/schema";
import { ilike, or } from "drizzle-orm";
import type { AdvocateSearchResult, SearchResponse } from "../../../../types";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface DatabaseSearchResult {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  yearsOfExperience: number;
}

/**
 * Advocate Search API
 * 
 * Provides fuzzy search across advocate fields (firstName, lastName, city, degree)
 * Returns formatted results with display text for dropdown UI components
 * Minimum query length: 2 characters
 * Default limit: 10 results
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");
    const maxResults = parseInt(searchParams.get("limit") || "10");

    if (!query || query.trim().length < 2) {
      return Response.json({ data: [] } as SearchResponse);
    }

    const searchTerm = `%${query.trim()}%`;

    const results = await ((db as PostgresJsDatabase)
      .select({
        id: advocates.id,
        firstName: advocates.firstName,
        lastName: advocates.lastName,
        city: advocates.city,
        degree: advocates.degree,
        yearsOfExperience: advocates.yearsOfExperience,
      })
      .from(advocates)
      .where(
        or(
          ilike(advocates.firstName, searchTerm),
          ilike(advocates.lastName, searchTerm),
          ilike(advocates.city, searchTerm),
          ilike(advocates.degree, searchTerm)
        )
      )
      .limit(maxResults)) as DatabaseSearchResult[];

    const searchResults: AdvocateSearchResult[] = results.map((advocate) => ({
      ...advocate,
      fullName: `${advocate.firstName} ${advocate.lastName}`,
      displayText: `${advocate.firstName} ${advocate.lastName} - ${advocate.city}, ${advocate.yearsOfExperience} years exp.`
    }));

    return Response.json({
      data: searchResults
    } satisfies SearchResponse);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json(
      { error: 'Failed to search advocates' },
      { status: 500 }
    );
  }
}