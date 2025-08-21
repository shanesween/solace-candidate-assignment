
// Common API response types
export interface ApiResponse<T> {
    data: T;
    error?: string;
}