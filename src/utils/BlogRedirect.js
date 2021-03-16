import BlogContext from "../context/BlogContext";
let matchUrlType = (pathname) => {
  let regexps=[
    /*请求打开文章*/
    new RegExp("^/" + BlogContext.blogAcc + "/p/(.+)?\.html"),
    /*请求打开类别*/
    new RegExp("^/" + BlogContext.blogAcc + "/category/(.+)?\.html")
  ];
  for(let i in regexps){
    if(regexps[i].test(pathname)){
      return '/subject'+pathname.replace("/"+BlogContext.blogAcc,"");
    }
  }
};
export default {
  redirect: function (e) {
    let pathname = window.location.pathname;
    let relPath = matchUrlType(pathname);
    relPath = relPath ? relPath : '/subject/category/default.html';
    return {
      path: process.env.VUE_CTX + relPath
    };
  }
}
