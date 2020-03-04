import CryptoUtils from "../utils/CryptoUtils";

let __BLOG_CONFIG__ = window.__BLOG_CONFIG__ || {};
let isForward = false;//是否转发测试
//"https://hm.baidu.com/hm.js?ae80cc662109a34c868ba6cbe3431c8d"
let baiduCount = CryptoUtils.o("OwuIQwM6LG9cPTjp2XZYkTjqPgISO4IRObM/2XViM4CqCq2GMUAj2UMI2HngD4soCaCpNUMIMHrqD4t=");
let extendApiPath = __BLOG_CONFIG__.extendApiPath || "https://www.cjunn.xyz/cnblog-api";   //Api路径
export default {isForward, baiduCount, extendApiPath};
