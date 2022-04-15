import { Action } from "redux";
import { DELETE, update } from "immupdate";
import { PersistConfig } from "redux-persist";

import { AppStoreState } from "../store/RootReducer";
import {
  createReducer,
  createRootReducer,
  PerformAction,
} from "../constans/ReducerUtils";

export const authReducerPersistConfig: Partial<PersistConfig<
  AuthReducerState
>> = {
  whitelist: ["token", "refreshToken", "authDate", "role"],
};

interface SetTokenMeta {
  readonly token: string;
}

interface SetRefreshTokenMeta {
  readonly refreshToken: string;
}

interface SetAuthDateMeta {
  readonly authDate: number;
}

interface SetRoleMeta {
  readonly role: string;
}

interface SetAuthDateExpiredMeta {
  readonly state: boolean;
}

enum ReducerActions {
  SetToken = "Auth/SetToken",
  SetRefreshToken = "Auth/SetRefreshToken",
  ResetToken = "Auth/ResetToken",
  ResetRefresh = "Auth/ResetRefresh",
  SetAuthDate = "Auth/SetAuthDate",
  SetAuthDateExpired = "Auth/SetAuthDateExpired",
  SetRole = "Auth/SetRole",
  ResetRole = "Auth/ResetRole",
}

export interface AuthReducerState {
  readonly token?: string;
  readonly refreshToken?: string;
  readonly authDate?: number;
  readonly authDateExpired: boolean;
  readonly role?: string;
}

function getState(): AuthReducerState {
  return {
    authDateExpired: false,
  };
}

export const authReducer = createRootReducer<AuthReducerState>(
  getState(),

  createReducer([ReducerActions.SetToken], (state, { meta }) =>
    update(state, { token: meta.token, authDate: Date.now() })
  ),
  createReducer([ReducerActions.SetRefreshToken], (state, { meta }) =>
    update(state, { refreshToken: meta.refreshToken })
  ),
  createReducer([ReducerActions.SetRole], (state , {meta}) =>
  update(state, {role: meta.role})
  ),
  createReducer([ReducerActions.ResetToken], (state) =>
    update(state, { token: DELETE, authDate: DELETE })
  ),

  createReducer([ReducerActions.SetAuthDate], (state, { meta }) =>
    update(state, { authDate: meta.authDate })
  ),

  createReducer([ReducerActions.SetAuthDateExpired], (state, { meta }) =>
    update(state, { authDateExpired: meta.state })
  )
);

// ==================
// Selectors
// ==================

export function tokenSelector(state: AppStoreState): string | undefined {
  return state.auth.token;
}

export function refreshTokenSelector(state: AppStoreState): string | undefined {
  return state.auth.refreshToken;
}
export function roleSelector(state: AppStoreState): string | undefined {
  return state.auth.role;
}
export function authDateSelector(state: AppStoreState): number | undefined {
  return state.auth.authDate;
}

export const authDateExpiredSelector = ({ auth }: AppStoreState): boolean =>
  auth.authDateExpired;

// ==================
// Actions
// ==================

export function setToken(meta: SetTokenMeta): PerformAction<SetTokenMeta> {
  return { meta, type: ReducerActions.SetToken };
}

export function setRefreshToken(
  meta: SetRefreshTokenMeta
): PerformAction<SetRefreshTokenMeta> {
  return { meta, type: ReducerActions.SetRefreshToken };
}
export function setRole(meta: SetRoleMeta): PerformAction<SetRoleMeta> {
  return { meta, type: ReducerActions.SetRole };
}
export function resetToken(): Action {
  return {type: ReducerActions.ResetToken};
}
export function resetRole(): Action {
  return {type: ReducerActions.ResetRole};
}
export function resetRefresh(): Action {
  return {type: ReducerActions.ResetRefresh};
}
export function setAuthDate(
  meta: SetAuthDateMeta
): PerformAction<SetAuthDateMeta> {
  return { meta, type: ReducerActions.SetAuthDate };
}

export function setAuthDateExpired(
  meta: SetAuthDateExpiredMeta
): PerformAction<SetAuthDateExpiredMeta> {
  return { meta, type: ReducerActions.SetAuthDateExpired };
}
