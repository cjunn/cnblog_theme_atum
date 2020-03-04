import $ from "../assets/lib/toast/jquery.toast.min";
import BlogConst from "../const/BlogConst";

function OpenWindow(n, t, i, r) {
  let u = (screen.width - t) / 2 - r
    , f = (screen.height - i) / 2 - r
    , e = window.open(n, "_blank", "width=" + t + ",height=" + i + ",toolbars=0,resizable=1,left=" + u + ",top=" + f);
  e.focus()
}

function OpenImageUploadWindow(callback) {
  try {
    let tmpText = $("#imgTmp");
    if (tmpText.length == 0) {
      tmpText = $("<textarea id='imgTmp'></textarea>")
      tmpText.focus(() => {
        if (tmpText.val() != "") {
          let url = tmpText.val();
          tmpText.val("");
          callback ? callback(url.replace("[img]", "![](").replace("[/img]", ")")) : '';
        }
      });
      $('body').append(tmpText);
    }
    tmpText.val("");

    let n = location.protocol + "//upload.cnblogs" + location.hostname.substring(location.hostname.lastIndexOf(".")) + "/imageuploader/upload?host=www.cnblogs.com&editor=0#imgTmp";
    document.domain = "cnblogs." + location.hostname.substring(location.hostname.lastIndexOf(".") + 1, location.hostname.length);
    OpenWindow(n, 450, 120, 200);
  } catch (e) {
    console.log(e);
    utils.showErrMsg("启动图片上传失败");
  }
}

function insertUbbUrl(n) {
  let res = "";
  let i = prompt("显示链接的文本.\n如果为空，那么将只显示超级链接地址", ""), t;
  i != null && (t = prompt("http:// 超级链接", "http://"),
  t != "" && t != "http://" && (i != "" ? res = ("[url=" + t + "]" + i + "[/url]") : res = ("[url]" + t + "[/url]")));
  return res;
}

function insertUbbCode(callback) {
  try {
    let n = 450, t = 400, r = (screen.width - n) / 2, u = (screen.height - t) / 2, i;
    document.domain = "cnblogs." + location.hostname.substring(location.hostname.lastIndexOf(".") + 1, location.hostname.length);
    i = window.open("/SyntaxHighlighter.htm", "_blank", "width=" + n + ",height=" + t + ",toolbars=0,resizable=1,left=" + r + ",top=" + u);
    i.focus();
    window.InsertCodeToEditor = function (n) {
      callback ? callback(n) : '';
      i.close ? i.close() : "";
    };
  } catch (e) {
    console.log(e);
    utils.showErrMsg("启动代码上传失败");
  }


}

function copyToClip(text) {
  let textarea = document.createElement("textarea"); //创建input对象
  document.body.appendChild(textarea);
  textarea.value = text;
  textarea.focus();
  if (textarea.setSelectionRange) {
    textarea.setSelectionRange(0, textarea.value.length); //获取光标起始位置到结束位置
  } else {
    textarea.select();
  }
  let flag = document.execCommand("copy"); //执行复制
  document.body.removeChild(textarea);
  return flag;
}


let initPreCodeCopyBtn = (preDom) => {
  let initFlag = "initedCopyBtn";
  let dom = $(preDom);
  if (dom.hasClass(initFlag)) {
    return;
  }
  dom.addClass(initFlag);
  let copyBtn = $("<span class='copyBtn icon iconfont copy'></span>");
  copyBtn.click((e) => {
    let codeDom = $(e.target).closest("pre").find("code");
    copyToClip(codeDom.text());
    utils.showInfoMsg("复制成功!");
  });
  dom.prepend(copyBtn);
}

let computePageList = (pageSize, pageCur, maxPage) => {
  if (pageSize <= maxPage) {
    /*页数少于等于10页*/
    return Array.from(Array(pageSize), (v, k) => k + 1);
  } else if (pageCur <= (maxPage / 2) + 1) {
    /*前10页*/
    let arr = Array.from(Array(maxPage), (v, k) => k + 1);
    arr.push("...");
    arr.push(pageSize);
    return arr;
  } else if ((pageSize - pageCur) <= ((maxPage / 2) + 1)) {
    /*后10页*/
    let arr = Array.from(Array(maxPage), (v, k) => (pageSize - maxPage) + k + 1);
    arr.unshift("...");
    arr.unshift(1);
    return arr;
  } else {
    /*中间页*/
    let arr = Array.from(Array(maxPage), (v, k) => (pageCur - (maxPage / 2)) + k + 1);
    arr.unshift("...");
    arr.unshift(1);
    arr.push("...");
    arr.push(pageSize);
    return arr;
  }
};
let initBaiduCount = () => {
  setTimeout(() => {
    window._hmt = [];
    (function () {
      let hm = document.createElement("script");
      hm.src = BlogConst.baiduCount;
      let s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }, 0);
};
let pushBaiduCount = (fullPath) => {
  if (fullPath) {
    setTimeout(() => {
      window._hmt.push(['_trackPageview', '/' + BlogConst.blogAcc + '/#' + fullPath]);
    }, 0);
  }
}
let showInfoMsg = (msg) => {
  $.toast({
    text: msg,
    icon: 'info',
    hideAfter: 2000,
    position: 'top-center',
    loader: false,
  });
};
let showErrMsg = (msg) => {
  $.toast({
    text: msg,
    icon: 'error',
    hideAfter: 2000,
    position: 'top-center',
    loader: false,
  });
};
let getTextWidth = function (str, fontSize) {
  let width = 0;
  let html = document.createElement('span');
  html.innerText = str;
  html.className = 'getTextWidth';
  html.style.fontSize = fontSize + "px";
  document.querySelector('body').appendChild(html);
  width = document.querySelector('.getTextWidth').offsetWidth;
  document.querySelector('.getTextWidth').remove();
  return width;
}
let getNowTime = function () {
  let dates = new Date();
  let years = dates.getFullYear();
  let months = dates.getMonth() + 1;
  months = months < 10 ? '0' + months : months
  let days = dates.getDate();
  days = days < 10 ? '0' + days : days
  let hours = dates.getHours();
  hours = hours < 10 ? '0' + hours : hours
  let mins = dates.getMinutes();
  mins = mins < 10 ? '0' + mins : mins
  return years + "-" + months + "-" + days + " " + hours + ":" + mins;
}
let focusById = function (id) {
  /*  setTimeout(() => {
      let anchorDom = document.querySelector("#__anchor" + id);
      console.log(anchorDom);
      anchorDom ? anchorDom.scrollIntoView({behavior: "smooth"}) : '';
    }, 100);*/
}
let unClickCache = {};
let registerUnClick = function (el, unclickEvent) {
  if (unClickCache[el]) {
    $(document).unbind("click", unClickCache[el]);
    delete unClickCache[el];
  }
  let func = function (e) {
    let parent = $(e.target).closest(el);
    if (parent.length == 0) {
      unclickEvent();
    }
  }
  unClickCache[el] = func;
  $(document).bind("click", func);
}
let domIsVisible = function (el) {
  return $(el).is(':visible')
}
/*重新注册锚点功能*/
let registerAnchorFunc = function (dom) {
  dom.find("a[href]").each((i, e) => {
    ((dom) => {
      let anchor = dom.attr("href");
      dom.click(function () {
        let anchorDom = document.querySelector(anchor);
        anchorDom ? anchorDom.scrollIntoView({behavior: "smooth"}) : '';
      })
      dom.attr("href", "javascript:void(0);")
    })($(e));
  })
}
/*从对象数组中获取对象根据ID*/
let fetchByIdFromObjArr = (idName, val, objArr) => {
  for (let j = 0, len = objArr.length; j < len; j++) {
    if (objArr[j][idName] === val) {
      return objArr[j];
    }
  }
}
/*数组追加数组*/
let arrayAppend = (arr, appends) => {
  for (let j = 0, len = appends.length; j < len; j++) {
    arr.push(appends[j]);
  }
}
/*数组分组*/
let groupBy = (list, key) => {
  let groupObj = {};
  for (let j = 0; j < list.length; j++) {
    let item = list[j];
    let name = item[key] + "";
    groupObj[name] = groupObj[name] || [];
    groupObj[name].push(item);
  }
  return groupObj;
}
let utils = {
  getTextWidth,
  getNowTime,
  showInfoMsg,
  showErrMsg,
  focusById,
  registerUnClick,
  domIsVisible,
  registerAnchorFunc,
  fetchByIdFromObjArr,
  arrayAppend,
  initBaiduCount,
  pushBaiduCount,
  computePageList,
  groupBy,
  initPreCodeCopyBtn,
  insertUbbUrl,
  insertUbbCode,
  OpenImageUploadWindow
};

export default utils;
