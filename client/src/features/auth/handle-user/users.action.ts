import { api, getErrorMessage } from "@/api/api";
import { RootState } from "@/features/store";
import { auth } from "@/lib/firebase/firebase";
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