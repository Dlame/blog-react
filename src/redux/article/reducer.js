import { ARTICLE_GET_TAG_LIST, ARTICLE_GET_CATEGORY_LIST } from '../types';

import { genertorColor } from '../../utils';

/**
 * state
 */
const initState = {
  categoryList: [],
  tagList: [],
};

/**
 * article Reducer
 */
export default function articleReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case ARTICLE_GET_TAG_LIST:
      const tagList = genertorColor(payload);
      return { ...state, tagList };
    case ARTICLE_GET_CATEGORY_LIST:
      const categoryList = genertorColor(payload);
      return { ...state, categoryList };
    default:
      return state;
  }
}
