
// Common API response types
export interface ApiResponse<T> {
    data: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        hasNextPage: boolean;
        nextCursor: string | null;
        limit: number;
    };
}

export interface Advocate {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: number;
    createdAt: string;
}