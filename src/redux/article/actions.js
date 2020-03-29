import { ARTICLE_GET_TAG_LIST, ARTICLE_GET_CATEGORY_LIST } from '../types';

import { $axios } from '../../utils/interceptor';

export const getTagList = () => dispatch =>
  $axios.get('/tag/list').then(res => {
    dispatch({
      type: ARTICLE_GET_TAG_LIST,
      payload: res,
    });
  });

export const getCategoryList = () => dispatch =>
  $axios.get('/category/list').then(res => {
    dispatch({
      type: ARTICLE_GET_CATEGORY_LIST,
      payload: res,
    });
  });
