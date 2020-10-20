import { PayloadAction, CreateSliceOptions, SliceCaseReducers, createSlice } from "@reduxjs/toolkit"
import {IRootState} from "./root";
import {IThread} from "../types/thread";

export interface ISelectedThreadState {
    selectedThread?: IThread;
};

type ISelectedThreadAction = PayloadAction<IThread|undefined>;

const options: CreateSliceOptions<ISelectedThreadState, SliceCaseReducers<ISelectedThreadState>, string> = {
    name: "selectedThread",
    initialState: {
        selectedThread: undefined
    },
    reducers: {
        setSelectedThread: (state: ISelectedThreadState, action: PayloadAction<IThread>) => {
            state.selectedThread = action.payload;
        }
    }
};

const selectedThreadSlice = createSlice<ISelectedThreadState, SliceCaseReducers<ISelectedThreadState>, string>(options);

export const selectedThreadReducer = selectedThreadSlice.reducer;

export const {setSelectedThread} = selectedThreadSlice.actions;

export const selectThread = (state: IRootState) => state.selectedThread.selectedThread;
