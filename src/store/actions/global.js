import { SHOW_LOADING, HIDE_LOADING } from "../types.js";

export function showLoading(data) {
  return {
    type: SHOW_LOADING,
    payload: data
  };
}
export function hideLoading(data) {
  return {
    type: HIDE_LOADING,
    payload: data
  };
}
