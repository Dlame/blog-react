import { SHOW_LOADING, HIDE_LOADING } from "../../types";

const initState = {
  isLoading: false
};

export function global(state = initState, action) {
  switch (action.type) {
    case SHOW_LOADING:
    case HIDE_LOADING:
      return {
        isLoading: state.isLoading
      };
    default:
      return state;
  }
}
