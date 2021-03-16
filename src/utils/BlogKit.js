import BlogContext from "../context/BlogContext";
import $ from "../assets/lib/toast/jquery.toast.min";
/*博客收藏*/
let addToWz = (pageId) => window.AddToWz(pageId);
/*分享到新浪*/
let shareToTsina = () => window.ShareToTsina();
/*分享到微信*/
let shareOnWechat = () => window.shareOnWechat();
/*获得静态资源路径*/
let getExtendStylePath = (relativePath) => {
  return BlogContext.extendStylePath + relativePath;
}
let convertSubjectUrls=(list) => {
  list=$(list);
  list.each((i, v) => {
    v.url = (v.url || "").replace(new RegExp("https://www.cnblogs.com/.+?/"), process.env.VUE_CTX+"/subject/");
  });
  return list;
}

let initBaiduCount = () => {
  setTimeout(() => {
    window._hmt = [];
    (function () {
      let hm = document.createElement("script");
      hm.src = BlogContext.baiduCount;
      let s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }, 0);
}


let pushBaiduCount = (fullPath) => {
  if (fullPath) {
    setTimeout(() => {
      window._hmt.push(['_trackPageview', '/' + BlogContext.blogAcc + '/#' + fullPath]);
    }, 0);
  }
}

export default {getExtendStylePath, addToWz, shareToTsina, shareOnWechat,convertSubjectUrls,initBaiduCount,pushBaiduCount};
