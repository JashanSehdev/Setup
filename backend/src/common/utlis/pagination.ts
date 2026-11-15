import { PaginationResult } from "../interfaces/pagination.interface.js";

export function paginationResponse<T>(
    data : T[],
    page : number,
    limit : number,
    total : number
  ) : PaginationResult<T>{
    return {
      success : true,
      data : data,
      meta : {
        total,
        page,
        limit,
        totalPages : Math.ceil(total / limit)
      }
    }
  }