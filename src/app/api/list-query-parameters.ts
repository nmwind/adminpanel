export interface ListQueryParameters {
    searchValue?: string;
    isDeleted?: boolean;
    sortField?: string;
    sortDirection?: "ASC" | "DESC";
    pageIndex?: number;
    pageSize?: number;
}
