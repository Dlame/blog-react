//判断是移动端还是 pc 端 ，true 表示是移动端，false 表示是 pc 端
export function isMobileOrPc() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}

//根据 QueryString 参数名称获取值
export function getQueryStringByName(name) {
  let result = window.location.search.match(
    new RegExp("[?&]" + name + "=([^&]+)", "i")
  );
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}
