import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { AnyAction } from "../constans/ReducerUtils";
import {
  authReducer,
  authReducerPersistConfig,
  AuthReducerState,
} from "../reducers/authReducer";

export interface AppStoreState {
  readonly auth: AuthReducerState;
}

export const rootReducer = combineReducers<any>({
  auth: persistReducer<AuthReducerState, AnyAction>(
    {
      ...authReducerPersistConfig,
      key: "auth",
      storage,
    },
    authReducer
  ),
});
