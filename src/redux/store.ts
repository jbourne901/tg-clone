import {configureStore, ConfigureStoreOptions} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {rootReducer, IRootState} from "./root";


const options: ConfigureStoreOptions<IRootState, AnyAction, any> = {
    reducer: rootReducer
};

export const store = configureStore<IRootState, AnyAction>(options)