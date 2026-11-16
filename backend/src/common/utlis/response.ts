import { ResponseType } from "../interfaces/response.interface.js";

export function successResponse <T> (message : string, data : T) : ResponseType<T> {
    return {
        success : true,
        message,
        data
    }
}