(function () {
  var cnblogLoader = function (param) {
    if (!param) {
      console.log("缺少必要参数,param[js],param[css]");
      return;
    }
    var c_css = param.css;
    var c_js = param.js;
    var c_ico = param.ico;
    var c_extCss = param.extCss;
    var c_extJs = param.extJs;

    function dynamicLoadIco(url, dom) {
      var link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = url;
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    function dynamicLoadCss(url, dom) {
      var head = dom || document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      head.appendChild(link);
    };

    function dynamicLoadJs(url, dom, callback) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (callback) {
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
              script.onreadystatechange = null;
              callback();
            }
          }
        } else {
          script.onload = function () {
            callback();
          }
        }
      }
      script.src = url;
      var head = dom || document.getElementsByTagName('head')[0];
      head.appendChild(script);
    };

    $(function () {
      var app = $("<div id=app></div>");
      $("link").remove();
      /*删除所有除头页的消息*/
      $("body").css("overflow", "hidden");
      $("#home").css("display", "none");
      $("body").append(app);
      /*加载图标*/
      dynamicLoadIco(c_ico);
      /*加载所有CSS*/
      while (c_css.length > 0) {
        dynamicLoadCss(c_css.shift(), '');
      }
      /*同步加载JS*/
      (function () {
        if (c_js.length > 0) {
          dynamicLoadJs(c_js.shift(), '', arguments.callee);
        }
      })();


      /*加载扩展Css*/
      while (c_extCss.length > 0) {
        dynamicLoadCss(c_extCss.shift(), '');
      }
      /*加载扩展JS*/
      (function () {
        if (c_extJs.length > 0) {
          dynamicLoadJs(c_extJs.shift(), '', arguments.callee);
        }
      })();
    });
  };

  var __BLOG_CONFIG__ = window.__BLOG_CONFIG__ || {};
  var staticVer = __BLOG_CONFIG__.staticVer || "v1.0";
  var staticSrc = __BLOG_CONFIG__.staticSrc || "https://cdn.jsdelivr.net/gh/cjunn/atum@";
  var staticIco = __BLOG_CONFIG__.staticIco || "https://cjunn.gitee.io/c_cnblog_vue/img/body/miao.ico";
  var extCss = __BLOG_CONFIG__.extCss || [];
  var extJs = __BLOG_CONFIG__.extJs || [];
  var staticPath = staticSrc + staticVer + "/code/";
  var staticParam = {
    css: [staticPath + "css/app.css"],
    js: [
      staticPath + "js/manifest.js",
      staticPath + "js/vendor.js",
      staticPath + "js/app.js",
    ],
    extCss: extCss,
    extJs: extJs,
    ico: staticIco,
  };
  cnblogLoader(staticParam);
})();

