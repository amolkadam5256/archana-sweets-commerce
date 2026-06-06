/** Generic API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: Record<string, string[]>;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Query parameters */
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
