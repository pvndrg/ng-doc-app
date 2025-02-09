export interface PaginationRequest {
    pageNumber: number;
  pageSize: number;
  sortFields: string[];      // Array of sort field names
  sortDirections: string[];  // Array of sort directions ("asc" or "desc")
  searchFields: string[];    // Fields to search in
  searchValues: string[];    // Corresponding values to search for
}
