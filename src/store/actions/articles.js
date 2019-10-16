import { SAVE_ARTICLES_LIST } from '../types.js';

export function saveArticlesList(data) {
	return {
		type: SAVE_ARTICLES_LIST,
		payload: data
	};
}

export function getArticlesList() {
	return dispatch => {
		dispatch(saveArticlesList([]));
	};
}
