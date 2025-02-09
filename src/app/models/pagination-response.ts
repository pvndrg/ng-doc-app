 
  export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface PaginationResponse {
    content: any[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  