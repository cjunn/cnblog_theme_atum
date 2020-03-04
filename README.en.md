# atum主题部署文档

## 介绍
一款由VUE打造的简约型博客主题，兼容各大主流浏览器，响应式设计，PC、平板、手机等均可正常浏览。

## 特性
- 响应式设计，兼容手机端浏览器。
- 提供多种配置信息，方便各类用户进行个人定制化。
- 部署文档十分详细且部署快捷。
- 主题整体偏向简约、无太多不必要的特效画面、偏向于阅读型博客。
- 请求局部HTML刷新，实现全站无刷新式加载。

## 二次开发
> 如果您不想进行二次开发可以跳过本节，直接进入下一节查看如何进行主题急速部署。
> 如果您只想简单修改CSS样式，则不建议您在此处进行二次开发，您可以通过控制台在线调整样式后将自定义样式写入css文件中，通过stum参数配置`extCss`进行原生样式覆盖。（具体可参考下一节急速部署）
> 如果您只想简单扩展JS功能的话，同样也不建议您在此处进行二次开，您可以通过stum参数配置`extJs`进行Js代码块的调用。

> 请先确保您正在使用的机器已经安装 Node.js 和 Git 客户端。

### 代码构建
```
git clone https://github.com/cjunn/cnblog_theme_atum.git        # 克隆源码
cd cnblogs-theme-silence                                        # 进入项目
npm install                                                     # 安装依赖
npm run build                                                   # 重新构建
```

### 构建后生成代码结构

![](https://img2020.cnblogs.com/blog/1912183/202003/1912183-20200304095115339-254202290.png)

<p style="word-break:break-all">其中img为图片素材库,cnblogLoader.js负责从远程服务器加载app.css,app.js,manifest.js,vendor.js文件</p>
<p style="word-break:break-all">其中需要新建code文件夹并且将css文件夹与js文件夹放入其中，然后将img文件夹与code文件夹部署到您的服务器上即可。</p>
<p style="word-break:break-all">在博客园引用cnblogLoader.js前,定义好stum的`staticSrc`、`staticVer`等参数使其cnblogLoader.js加载为您服务器上的静态文件文件。具体可参考下一节介绍。</p>

### 源码代码结构

![](https://img2020.cnblogs.com/blog/1912183/202003/1912183-20200304101603316-426457324.png)

如果您具有一定VUE开发经验一定能够理解源代码，这里不展开详细介绍。


## 急速部署

前提：已经开通`js`权限，没开通的可以向博客园官方申请开通。


###代码块部署位置
```
<script>
$("link").remove();$("script").remove();$(function(){$("link").remove();$("script").remove()});window.blogCommentManager=function(){this.renderComments=function(){}};window.loadViewCount=function(){};window.loadNewsAndKb=function(){};window.loadBlogSignature=function(){};window.LoadPostCategoriesTags=function(){};window.LoadPostInfoBlock=function(){};window.GetPrevNextPost=function(){};window.loadBlogCalendar=function(){};window.loadBlogSideColumn=function(){};window.loadBlogTopLists=function(){};window.GetHistoryToday=function(){};window.deliverAdT2=function(){};window.getFollowStatus=function(){};window.deliverAdC1=function(){};
</script>

<style type="text/css">body{margin:0;padding:0;overflow:hidden;margin-top:100%}#shade_animal_wrap{opacity:1;margin:0;padding:0;display:flex;position:absolute;top:0;left:0;right:0;bottom:0;align-items:center;justify-content:center;height:100vh;width:100%;background-color:#f2f2f2;z-index:99999;transition:all 1s ease 0s;}.lds-hourglass{display:inline-block;position:relative;width:64px;height:64px;transform:translateX(-30px) translateY(-60px);}.lds-hourglass:after{content:" ";display:block;border-radius:50%;width:0;height:0;margin:6px;box-sizing:border-box;border:60px solid #fff;border-color:#ff8d00 transparent #ff3004 transparent;animation:lds-hourglass 1.2s infinite;}@keyframes lds-hourglass{0%{transform:rotate(0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);}50%{transform:rotate(900deg);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);}100%{transform:rotate(1800deg);}}</style><div id="shade_animal_wrap"><div class="lds-hourglass"></div></div>
<script type="text/javascript">
(()=>{
//该处用于配置atum主题参数，具体配置参数可参考下方3个表格
let p={};
p.blogName = "测试用户名";
window.__BLOG_CONFIG__=p;
})();
</script>
<script type=text/javascript src=https://cdn.jsdelivr.net/gh/cjunn/atum@v1.0/cnblogLoader.js></script>

```
请将上述代码块拷贝至 `博客园设置->页首HTML代码` 中并且按需配置好所需要的参数并且赋值给全局变量__BLOG_CONFIG__中。

### 可配置参数

**用户信息参数[建议全部修改]**

|参数|是否必填|值说明|默认值|
|:---|:---|:---|:---|
|blogAcc|必填|博客账号名|cjunn|
|blogId|必填|博客ID号|571504|
|blogPostId|必填|博客随便一篇随笔的随笔ID号|12237892|
|blogName|必填|博客名称|C君|
|blogUserGuid|必填|博客账号的GUID号|2476b4f3-9f13-4c75-389e-08d789d7fa8d|
|blogIndexPath|必填|博客主页URL地址|https://www.cnblogs.com/cjun/|
|manPage|非必填|博客管理后台URL地址|https://i.cnblogs.com/|
|sendPage|必填|博客发送邮件URL地址|https://msg.cnblogs.com/send/cjunn|
|subPage|必填|博客订阅RSS地址|https://www.cnblogs.com/cjunn/rss|

<br/>

**自定义参数属性[按所需进行修改]**

|参数|是否必填|值说明|默认值|
|:---|:---|:---|:---|
|headBackImg|非必填|心情栏目背景图URL地址|.../img/ing/autorbimg.jpg|
|bigBackImg|非必填|背景图URL地址|.../img/body/background.jpg|
|blogSign|非必填|博客签名|自惭多情污梵行，入山又恐误倾城。世间安得双全法...|
|aboutmeHtml|非必填|关于我Html展示模板|`<img src=''/>`|
|avatarSign|非必填|头像底部签名| ↗↗点击头像关注我。|
|ingTitle|非必填|心情栏签名|一念花开，一念花落。这山长水远的人世...|
|blogFriendList|非必填|博客友链栏|[{name: '', url: ''}]|
|blogUsedLinks|非必填|博客常用链接|[{name: '', url: ''}]|
|musicIds|非必填|网易云单曲ID或歌单ID|["26568025", "26329928"]|
|qq|非必填|博主QQ|592571519|
|email|非必填|博主email|592571519@qq.com|
|github|非必填|博主github|cjunn|
|mainExtNav|非必填|面板扩展外链|[{title: "音乐收藏", url: "...", icon: "ic_addmusic"}]|

<br/>

**如果您需要在加载完atum主题后再次进行css渲染后JS执行可以设置以下参数值**

|参数|是否必填|值说明|默认值|
|:---|:---|:---|:---|
|extCss|非必填|扩展CSS样式URL|默认为空数组|
|extJs|非必填|扩展JS脚本URL|默认为空数组|

<br/>

**全局类参数[不建议修改]**
**如果您是属于二次开发则建议您修改此处，使其加载地址为您的服务器地址**

|参数|是否必填|值说明|默认值|
|:---|:---|:---|:---|
|staticSrc|非必填|JS与CSS引用URL地址（默认即可）|https://cdn.jsdelivr.net/gh/cjunn/atum@|
|staticVer|非必填|引用atum的版本号|v1.0|
|staticIco|非必填|网页Icon的URL地址|https://cjunn.gitee.io/c_cnblog_vue/img/body/miao.ico|
|extendApiPath|非必填|粉丝详情,博客文章搜索,闪存接口API|https://www.cjunn.xyz/cnblog-api|
|extendStylePath|非必填|博客图片库URL地址|https://cdn.jsdelivr.net/gh/cjunn/atum@v1.0|

###部分参数获取
对于参数blogId，blogPostId，blogUserGuid的获取
- 在不引用任何主题的情况下打开自己博客园中任意一篇随笔。
- 右键对其查看HTML源代码，找到对应的script代码块。
- ![](https://img2020.cnblogs.com/blog/1912183/202003/1912183-20200304005650139-889534571.png)
- ![](https://img2020.cnblogs.com/blog/1912183/202003/1912183-20200304005702017-1981016683.png)
- 获得参数填写至全局变量__BLOG_CONFIG__中。

## 部署后效果

![](https://img2020.cnblogs.com/blog/1912183/202003/1912183-20200304021023218-1917676940.png)
具体效果可至 [点我跳转](https://www.cnblogs.com/cjunn/) 查看。

## 最后
- 感谢 [@YJLAugus](https://www.cnblogs.com/yjlaugus/) 在该主题不断代码迭代的时候提供的宝贵意见。
- 源码目前已开源、方便具有开发经验的人进行二次开发、但恳请您二次开发时能够保留相应的作者信息。
- 如果你有多余的RMB的话，可以赏我吃颗糖么。
- 如果您赞赏了我，请在支付宝或微信上留下博客园ID号，让我知道你嗯。
<div style="text-align:center"><img style="display: inline-block;width:25%;margin:5px" src="https://img2020.cnblogs.com/blog/1912183/202003/1912183-20200304015451275-1554351788.png"><img style="display: inline-block;width:25%;margin:5px" src="https://img2020.cnblogs.com/blog/1912183/202003/1912183-20200304015502255-764263032.png"></div>
