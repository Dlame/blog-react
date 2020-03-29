import { COLOR_LIST } from './config';
import xss from 'xss';

// 转化 md 语法为 html
export const translateMarkdown = (plainText, isGuardXss = false) => {
  return marked(isGuardXss ? xss(plainText) : plainText, {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code) {
      /*eslint no-undef: "off"*/
      return hljs.highlightAuto(code).value;
    },
  });
};

/**
 * 对数组进行分组
 * @param {Array} arr - 分组对象
 * @param {Function} f
 * @returns 数组分组后的新数组
 */
export const groupBy = (arr, f) => {
  const groups = {};
  arr.forEach(item => {
    const group = JSON.stringify(f(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return Object.keys(groups).map(group => groups[group]);
};

/**
 * 取数组中的随机数
 * @param {*} arr 数组
 */
export const randomIndex = arr => Math.floor(Math.random() * arr.length);

/**
 * 生成 color
 * @param {*} list
 * @param {*} colorList 颜色列表
 */
export function genertorColor(list = [], colorList = COLOR_LIST) {
  const _list = [...list];
  _list.forEach((l, i) => {
    l.color = colorList[i] || colorList[randomIndex(colorList)];
  });
  return _list;
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|http:)/.test(path);
}

/**
 * 获取 url query 参数
 * @param {*} url 路径
 */
export const decodeQuery = url => {
  const params = {};
  const paramsStr = url.replace(/\.*\?/, ''); // a=1&b=2&c=&d=xxx&e
  paramsStr.split('&').forEach(v => {
    const d = v.split('=');
    if (d[1] && d[0]) params[d[0]] = d[1];
  });
  return params;
};

/**
 * 获取token
 */
export function getToken() {
  let token = '';
  const userInfo = get('userInfo');

  if (userInfo && userInfo.token) {
    token = 'Bearer ' + userInfo.token;
  }

  return token;
}

/**
 * 生成随机 ID
 * @param {Number} len - 长度
 */
export function RandomId(len) {
  return Math.random()
    .toString(36)
    .substr(3, len);
}
