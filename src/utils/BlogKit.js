import cBlogConst from "../const/BlogConst";
/*博客收藏*/
let addToWz = (pageId) => window.AddToWz(pageId);
/*分享到新浪*/
let shareToTsina = () => window.ShareToTsina();
/*分享到微信*/
let shareOnWechat = () => window.shareOnWechat();
/*获得静态资源路径*/
let getExtendStylePath = (relativePath) => {
  return cBlogConst.extendStylePath + relativePath;
}
export default {getExtendStylePath, addToWz, shareToTsina, shareOnWechat};
