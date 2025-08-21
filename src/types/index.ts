
// Common API response types
export interface ApiResponse<T> {
    data: T;
    error?: string;
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