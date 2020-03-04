import BlogConst from "../const/BlogConst";

let anchor;
/*外部跳转进来*/
if (window.location.hash && !window.location.hash.startsWith("#" + process.env.VUE_CTX)) {
//存在HASH且HASH不符合该插件规范
  anchor = window.location.hash;
  anchor = anchor.replace("#", "");
  anchor = anchor.replace("/", "");
}


let matchUrlType = (pathname) => {
  let regexp;
  /*请求打开文章*/
  regexp = new RegExp("^/" + BlogConst.blogAcc + "/p/(.+)?\.html");
  if (regexp.test(pathname)) {
    let param = pathname.match(regexp)[1];
    return '/works/article/' + param;
  }
  /*请求打开类别*/
  regexp = new RegExp("^/" + BlogConst.blogAcc + "/category/(.+)?\.html");
  if (regexp.test(pathname)) {
    let param = pathname.match(regexp)[1];
    return '/works/category/category/' + param + '/1';
  }

};
export default {
  redirect: function (e) {
    let pathname = window.location.pathname;
    let relPath = matchUrlType(pathname);
    relPath = relPath ? relPath : '/works/category/all/1/1';
    return {
      path: process.env.VUE_CTX + relPath,
      query: {
        anchor: anchor
      }
    };
  }
}
