import base from "./BlogConst.base";
import dev from "./BlogConst.dev";
import prod from "./BlogConst.prod";

window.__BLOG_CONFIG__ = window.__BLOG_CONFIG__ || {};
let blogConst = base;
if (process.env.NODE_ENV === "development") {
  blogConst = Object.assign(base, dev);
} else {
  blogConst = Object.assign(base, prod);
}
blogConst = Object.assign(blogConst, window.__BLOG_CONFIG__);


export default blogConst;
