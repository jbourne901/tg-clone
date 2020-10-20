import { PayloadAction, CreateSliceOptions, SliceCaseReducers, createSlice } from "@reduxjs/toolkit"
import {IRootState} from "./root";
import {IUser} from "../types/user";

export interface IUserState {
    user?: IUser;
};

type IUserAction = PayloadAction<IUser|undefined>;

const options: CreateSliceOptions<IUserState, SliceCaseReducers<IUserState>, string> = {
    name: "user",
    initialState: {
        user: undefined
    },
    reducers: {
        login: (state: IUserState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state: IUserState) => {
            state.user=undefined;
        }
    }
};

const userSlice = createSlice<IUserState, SliceCaseReducers<IUserState>, string>(options);

export const userReducer = userSlice.reducer;

export const {login, logout} = userSlice.actions;

export const selectUser = (state: IRootState) => state.user.user;
