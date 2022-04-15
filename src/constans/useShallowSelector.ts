import { shallowEqual, useSelector } from "react-redux";

export function useShallowEqualSelector<TResult = any>(
  selector: (store: any) => TResult
) {
  return useSelector(selector, shallowEqual);
}
