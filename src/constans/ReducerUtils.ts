import { Action, Reducer } from "redux";

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export type ChildReducer<S> = (state: S, action: AnyAction) => S;

export function createRootReducer<S>(
  initialState: S,
  ...reducers: ChildReducer<S>[]
): Reducer<S> {
  return (state: S = initialState, action: AnyAction) => {
    let nextState = state;

    reducers.forEach((reducer) => {
      nextState = reducer(nextState, action);
    });

    return nextState;
  };
}

export function createReducer<S>(
  types: string[],
  reducer: ChildReducer<S>
): ChildReducer<S> {
  return (state, action): S =>
    types.includes(action.type) ? reducer(state, action) : state;
}

export interface PerformAction<M = any> extends Action {
  readonly meta: M;
}
export interface FulfillAction<P = any, M = any> extends PerformAction<M> {
  readonly payload: P;
}
export interface RejectAction<M = any> extends PerformAction<M> {
  readonly error: true;
}
