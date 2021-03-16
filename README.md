# atum主题部署文档

## 介绍
这是一款由VUE打造的简约型博客主题，兼容各大主流浏览器，响应式设计，PC、平板、手机等均可正常浏览。

## 特性
- 响应式设计，兼容手机端浏览器。
- 提供多种配置信息，方便各类用户进行个人定制化。
- 部署文档十分详细且部署快捷。
- 主题整体偏向简约、无太多不必要的特效画面、偏向于简洁型博客。
- 请求局部HTML刷新，实现全站无刷新式加载。

## 二次开发
> 如果您不想进行二次开发可以跳过本节，直接进入下一节查看如何进行主题急速部署。
> 如果您只想简单修改CSS样式，则不建议您在此处进行二次开发，您可以通过控制台在线调整样式后将自定义样式写入css文件中，通过atum参数配置`extCss`进行原生样式覆盖。（具体可参考下一节急速部署）
> 如果您只想简单扩展JS功能的话，同样也不建议您在此处进行二次开，您可以通过atum参数配置`extJs`进行Js代码块的调用。

> 请先确保您正在使用的机器已经安装 Node.js 和 Git 客户端。

### 代码构建
```
git clone https://github.com/cjunn/cnblog_theme_atum.git        # 克隆源码
cd cnblogs-theme-silence                                        # 进入项目
npm install                                                     # 安装依赖
npm run build                                                   # 重新构建
```

### 构建后生成代码结构
![](https://s3.ax1x.com/2021/03/16/6rLtRs.png)
<p style="word-break:break-all">其中img为图片素材库,cnblogLoader.js负责从远程服务器加载app.css,app.js,manifest.js,vendor.js文件</p>
<p style="word-break:break-all">其中需要新建code文件夹并且将css文件夹与js文件夹放入其中，然后将img文件夹与code文件夹部署到您的服务器上即可。</p>
<p style="word-break:break-all">在博客园引用cnblogLoader.js前,定义好atum的`staticSrc`、`staticVer`等参数使其cnblogLoader.js加载为您服务器上的静态文件文件。具体可参考下一节介绍。</p>

### 源码代码结构

![](https://s3.ax1x.com/2021/03/16/6rLWsx.png)

如果您具有一定VUE开发经验一定能够理解源代码，这里不展开详细介绍。


## 急速部署

前提：已经开通`js`权限，没开通的可以向博客园官方申请开通。

###代码块部署位置
```
<style type="text/css">
#page_begin_html{top: 0;bottom: 0;left: 0;right: 0;position: fixed;z-index:99999;}
#home #main #mainContent{display:none}
body{margin:0;padding:0;overflow:hidden;margin-top:100%}#shade_animal_wrap{opacity:1;margin:0;padding:0;display:flex;position:absolute;top:0;left:0;right:0;bottom:0;align-items:center;justify-content:center;height:100vh;width:100%;background-color:#f2f2f2;z-index:99999;transition:all .5s ease 0s;}.lds-hourglass{display:inline-block;position:relative;width:64px;height:64px;transform:translateX(-30px) translateY(-60px);}.lds-hourglass:after{content:" ";display:block;border-radius:50%;width:0;height:0;margin:6px;box-sizing:border-box;border:60px solid #fff;border-color:#ff8d00 transparent #ff3004 transparent;animation:lds-hourglass 1.2s infinite;}@keyframes lds-hourglass{0%{transform:rotate(0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);}50%{transform:rotate(900deg);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);}100%{transform:rotate(1800deg);}}</style>
<div id="shade_animal_wrap"><div class="lds-hourglass"></div></div>
```
将上述代码块拷贝至 `博客园设置->页首HTML代码` 。


```
<script>
$("link").remove();$("script").remove();$(function(){$("link").remove();$("script").remove()});window.blogCommentManager=function(){this.renderComments=function(){}};window.loadViewCount=function(){};window.loadNewsAndKb=function(){};window.loadBlogSignature=function(){};window.LoadPostCategoriesTags=function(){};window.LoadPostInfoBlock=function(){};window.GetPrevNextPost=function(){};window.loadBlogCalendar=function(){};window.loadBlogSideColumn=function(){};window.loadBlogTopLists=function(){};window.GetHistoryToday=function(){};window.deliverAdT2=function(){};window.getFollowStatus=function(){};window.deliverAdC1=function(){};
</script>
<script type="text/javascript">
(()=>{
//该处用于配置atum主题参数，具体配置参数可参考下方。
let p={};
p.blogSign="自惭多情污梵行，入山又恐误倾城。世间安得双全法，不负如来不负卿。";
p.avatarSign= " ↗↗点击头像关注我。";
window.__BLOG_CONFIG__=p;

})();
</script>
<script type=text/javascript src=https://cjunn.gitee.io/blog_theme_atum/cnblogLoader.js></script>
```
将上述代码块拷贝至 `博客园设置->博客侧边栏公告（支持HTML代码） （支持 JS 代码）` ，并且按需配置好所需要的参数并且赋值给全局变量__BLOG_CONFIG__中。


###可配置的相关参数
```
//音乐请求接口API地址
let musicApiUrl = "https://api.i-meto.com/meting/api?server=netease&type=:type&id=:id&r=:r";
//扩展素材库地址根路径
let extendStylePath = "https://cjunn.gitee.io/blog_theme_atum"
//作者页背景图片地址URL
let headBackImg = `${extendStylePath}/img/ing/autorbimg.jpg`;
//首页背景图片地址URL
let bigBackImg = `${extendStylePath}/img/body/background.jpg`;
//文章块前置图片URL，数组[]。
let panelItemPic=Array.from(Array(35), (v,k) => (`${extendStylePath}/img/pageItem/page-item-$I.jpg`).replace("$I",k+1));
//右侧快速导航图片URL，数组[]
let panelRightImgPic=Array.from(Array(10), (v,k) =>(`${extendStylePath}/img/menuIcon/menuicon-$I.png`).replace("$I",k));
//默认音乐播放器音乐图片URL
let musicSignImg=`${extendStylePath}/img/body/music_play.png`;
//博客签名
let blogSign = "自惭多情污梵行，入山又恐误倾城。世间安得双全法，不负如来不负卿。";
//作者页关于我 HTML
let aboutmeHtml = `<img src='${extendStylePath}/img/ing/aboutme.jpg'/>`;
//作者签名
let avatarSign = " ↗↗点击头像关注我。";
//心情栏签名
let ingTitle = "你的一字一句犹如刀疤划心上，我的一举一动随你改变多荒唐。";
//友链
let blogFriendList = [];                      //{name: '', url: ''}格式
//暂时无用
let blogUsedLinks = [];                       //{name: '', url: ''}格式
//网易云音乐ID ，数组[]
let musicIds = ["1382596189"];
let qq = "592571519";
let email = "592571519@qq.com"
let github = "cjunn";
//评论人默认图片URL
let defHeadImg= `${extendStylePath}/img/body/defAvatar.jpg`;
//默认采用主题风格，style0、style1可选。
let themeStyle="style0";
//用于心情展示的博客ID
let feelingBlogId=13393903;
//导航链接
let mainExtNav = [
  {title: "首页",url:"/subject/category/default.html",icon: "home"},
  {title: "博客动态", url: "https://www.cnblogs.com/cjunn/", icon: "comment1"},
  {title: "博主简历", url: "https://www.cnblogs.com/cjunn/", icon: "face2"},
  {title: "主题反馈", url: '/c/subject/p/12494785.html', icon: "bug"},
  {title: "赞赏博主", url: '/c/subject/p/12495086.html', icon: "gift"}
];
//广告栏的HTML
let adDisplay="<div class=\"blog-cloud-ad-item\">\n" +
  "            <img src=\"https://img.alicdn.com/tfs/TB1nkoQDlv0gK0jSZKbXXbK2FXa-440-240.jpg\"\n" +
  "                 onclick=\"window.open('https://www.aliyun.com/activity/daily/cloud?userCode=njf7bpon')\">\n" +
  "          </div>\n" +
  "          <div class=\"blog-cloud-ad-item\">\n" +
  "            <img src=\"https://upload-dianshi-1255598498.file.myqcloud.com/345-60759ea0b2a21d3d1c764570c2a9f2960bfdf128.200.jpg\"\n" +
  "                 onclick=\"window.open('https://url.cn/OLi4lNzq')\">\n" +
  "          </div>";
```
上方是可配置的参数目前的默认参数值。可以根据目前自己所需要的修改相关参数值，然后设置进全局参数__BLOG_CONFIG__中。


## 部署后效果

![](https://s3.ax1x.com/2021/03/16/6rL7JH.png)
具体效果可至 [点我跳转](https://www.cnblogs.com/cjunn/) 查看。

## 新增特性
    1.相对1.0版本，该版本只要做JS引入就可以立刻构建出相应主题，无需做任何配置项必填。
    2.新增style1风格可选，该风格更加偏向小清新。
    3.修改API接口为独立模块来应对常变动的博客园接口问题。

## 最后
- 开源地址[Gitee](https://gitee.com/cjunn/cnblog_theme_atum.git)、[Github](https://github.com/cjunn/cnblog_theme_atum.git)，求些小星星嗯。
- 感谢 [@YJLAugus](https://www.cnblogs.com/yjlaugus/) 在该主题不断代码迭代的时候提供的宝贵意见。
- 另外如果需要进行主题反馈请至[反馈](https://www.cnblogs.com/cjunn/#/c/subject/p/12494785.html)
- 源码目前已开源、方便具有开发经验的人进行二次开发、但恳请您二次开发时能够保留相应的作者信息。
- 如果你有多余的RMB的话，可以赏我吃颗糖么。
- 如果您赞赏了我，请在支付宝或微信上留下博客园ID号，让我知道你嗯。

<div style="text-align:center">
    <img style="display: inline-block;width:25%;margin:5px" src="https://s3.ax1x.com/2021/03/16/6rqXaF.png">
    <img style="display: inline-block;width:25%;margin:5px" src="https://s3.ax1x.com/2021/03/16/6rLZPH.png">
</div>
