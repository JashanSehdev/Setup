export interface PaginationMeta {
    total : number,
    page : number,
    limit: number,
    totalPages: number
}

export interface PaginationResult<T>{
    success : boolean,
    data: T[],
    meta : PaginationMeta
}
