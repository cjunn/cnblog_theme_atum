let blogUrlPre = "https://www.cnblogs.com/";
let manPage = "https://i.cnblogs.com/";
let sendPage = "https://msg.cnblogs.com/send/${BLOG_ACC}";
let subPage = "https://www.cnblogs.com/${BLOG_ACC}/rss";
let indexPage = blogUrlPre+"${BLOG_ACC}";
let autoInfoReset = true;
let blogAcc = "cjunn";
let blogId = "571504";
let blogPostId = "12436930";
let blogName = "C君";
let blogUserGuid = "2476b4f3-9f13-4c75-389e-08d789d7fa8d";
let pageBarImgs = 21;
let myCommentSize=10;
let blogCommentSize=50;
let commentLength = 10;
let openMathJax = false;
let urlMathJax = "https://mathjax.cnblogs.com/2_7_5/MathJax.js?config=TeX-AMS-MML_HTMLorMML";


let setBlogAccAndId=(acc,id)=>{
  blogAcc=acc;
  blogId=id;
  sendPage=sendPage.replace("${BLOG_ACC}",acc);
  subPage=subPage.replace("${BLOG_ACC}",acc);
  indexPage=indexPage.replace("${BLOG_ACC}",acc);
}
let setGidAndName=()=>(gid,name)=>{
  blogUserGuid=gid;
  blogName=name;
}
let setPid=(pId)=>{
  blogPostId=pId;
}
export default {
  blogUrlPre,
  manPage,
  sendPage,
  subPage,
  indexPage,
  autoInfoReset,
  blogAcc,
  blogId,
  blogPostId,
  blogName,
  blogUserGuid,
  setBlogAccAndId,
  setGidAndName,
  setPid,
  pageBarImgs,
  commentLength,
  openMathJax,
  urlMathJax,
  myCommentSize,
  blogCommentSize
}
