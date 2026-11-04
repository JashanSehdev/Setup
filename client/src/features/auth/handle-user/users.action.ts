import { api, getErrorMessage } from "@/api/api";
import { FilterInput } from "@/components/admin/users/user-toolbar/user-toolbar.type";
import { RootState } from "@/features/store";
import { PaginationRequest, PaginationResponse } from "@/type/meta.type";
import { AdminUser } from "@/type/user.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";


type data = {
    avatar : string
}
export const changeAvatarAsync = createAsyncThunk <{data : data}, data, {state: RootState}>(
    'user/changeAvatar',
    async({avatar}:{avatar : string}, thunkApi) => {
        try {
            const state = thunkApi.getState()
            const response = await api.patch(`users/${state.auth.user?.id}/avatar`, {avatar})
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

//admin Thunk
export const fetchUsersAsync = createAsyncThunk <PaginationResponse<AdminUser>, FilterInput & PaginationRequest | void>(
    'user/changeAvatar',
    async(filters, thunkApi) => {
        try {
            const response = await api.get('/users', {
                params: filters
            })
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)
