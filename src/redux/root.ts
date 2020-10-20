import {IUserState, userReducer} from "./user";
import {ISelectedThreadState, selectedThreadReducer} from "./selected-thread";

export interface IRootState {
   user: IUserState;
   selectedThread: ISelectedThreadState;
}

export const rootReducer = {
  user: userReducer,
  selectedThread: selectedThreadReducer
};
