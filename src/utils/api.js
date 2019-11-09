import { $api } from "./interceptor";

// 获取文章
export const $getArticles = params => $api.get("/getArticleList", params);
