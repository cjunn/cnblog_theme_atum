import blogConst from "../const/BlogConst";
import BlogKit from "../utils/BlogKit";
import $ from 'jquery';
import BlogUtils from "./BlogUtils";
/*缓存类*/
let isForward = blogConst.isForward;//是否所有请求都进行转发请求
/////////////////////////////基础函数/////////////////////////////////
let xmlCache = {};
let dataDelayTime = 3000;//3秒
let putXmlCache = (key, value) => {
  xmlCache[key] = {
    data: value,
    time: Date.parse(new Date())
  }
};
let getXmlCache = (key) => {
  if (xmlCache[key] && (Date.parse(new Date()) - xmlCache[key].time < dataDelayTime)) {
    return xmlCache[key].data;
  }
  return null;
};
let removeXmlCache = (key) => {
  if (xmlCache[key]) {
    delete xmlCache[key];
  }
};

/*请求类,GET请求,POST请求(强制返回JSON)*/
let localJsonp = (url, param) => {
  return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        dataType: "jsonp",
        data: param,
        complete: function (XHR, TS) {
          if (TS != 'success') {
            console.log("转发URL[" + url + "]失败状态为:" + TS);
            reject();
          } else {
            let res = XHR.responseJSON;
            if (res && res["data"] !== undefined) {
              resolve(res["data"]);
            } else {
              console.log("转发URL[" + url + "]失败");
              console.log(url);
              console.log(param);
              reject();
            }
          }
        }
      })
    }
  )
};
let remoteJsonp = (url) => {
  return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        complete: function (XHR, TS) {
          if (TS != 'success' && TS != 'parsererror') {
            reject();
          } else {
            resolve(XHR.responseJSON || XHR.responseText)
          }
        }
      })
    }
  )
}
let remoteJsonpPost = (url, param) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: "post",
      data: JSON.stringify(param),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 1e4,
      success: function (n) {
        resolve(n);
      },
      error: function (n) {
        resolve(n.responseText);
      }
    })
  });
};
let forwardJsonp = (forwardUrl) => {
  return localJsonp(blogConst.extendApiPath + "/forwardGet.php", {url: forwardUrl});
};
let forwardJsonpPost = (forwardUrl, param) => {
  let askParam = {};
  askParam.url = forwardUrl;
  for (let key in param) {
    let val = param[key];
    if (typeof val === 'number') {
      key = "i_" + key;
    } else if (typeof val === 'string') {
      key = "s_" + key;
    } else {
      continue;
    }
    askParam[key] = val;
  }
  return localJsonp(blogConst.extendApiPath + "/forwardPost.php", askParam);
};
let directJsonp = (directUrl) => {
  return remoteJsonp(directUrl);
}
let directJsonpPost = (directUrl, param) => {
  return remoteJsonpPost(directUrl, param);
};
let unifiJsonp = (askUrl) => {
  if (isForward) {
    return forwardJsonp(askUrl);
  } else {
    return directJsonp(askUrl);
  }
}
let unifiJsonpPost = (askUrl, param) => {
  if (isForward) {
    return forwardJsonpPost(askUrl, param);
  } else {
    return directJsonpPost(askUrl, param);
  }
};
let removeUselessTag = (response) => {
  response = response.replace(/<link.*?(\/)*?>/ig, '');
  response = response.replace(/<style[\s\S]*?<\/style>/ig, '');
  response = response.replace(/<head[\s\S]*?<\/head>/ig, '');
  response = response.replace(/<script/ig, '<cjunscript');
  response = response.replace(/<\/script>/ig, '</cjunscript>');
  response = response.replace(/src=/g, '_src=');
  return "<div>" + response + "</div>";
};
//用于适配不同jsonpAdater
let xmlJsonpAdapter = (jsonpAdater, askUrl, parser) => {
  return new Promise((resolve, reject) => {
    let resHtml = getXmlCache(askUrl);
    if (resHtml) {
      resolve(parser(resHtml));
      return;
    }
    jsonpAdater(askUrl).then((data) => {
      if (parser) {
        try {
          let resHtml = removeUselessTag(data);
          putXmlCache(askUrl, resHtml);
          resolve(parser(resHtml));
        } catch (e) {
          console.log(e);
          reject();
        }
      } else {
        let res = removeUselessTag(data);
        putXmlCache(askUrl, res);
        resolve(res);
      }
    }).catch(() => {
      reject();
    })
  });
};
//用于适配不同jsonAdaterPost
let xmlJsonpPostAdapter = (jsonpAdater, askUrl, askParam, parser) => {
  return new Promise((resolve, reject) => {
    jsonpAdater(askUrl, askParam).then((data) => {
      if (parser) {
        try {
          resolve(parser(data));
        } catch (e) {
          console.log(e);
          reject();
        }
      } else {
        resolve(data);
      }
    }).catch(() => {
      reject();
    })
  });
};
/*根据上下文判断使用接口*/
let unifiXmlJsonp = (askUrl, parser) => {
  return new xmlJsonpAdapter(unifiJsonp, askUrl, parser);
};
let unifiXmlJsonpPost = (askUrl, askParam, parser) => {
  return new xmlJsonpPostAdapter(unifiJsonpPost, askUrl, askParam, parser);
};
/*只使用转发接口*/
let forwardXmlJsonp = (askUrl, parser) => {
  return new xmlJsonpAdapter(forwardJsonp, askUrl, parser);
};
/////////////////////////////解析库/////////////////////////////////////
/*获得最后一个参数*/
let getLastParam = (text) => {
  let arr = text.split("/");
  return arr[arr.length - 1].replace(".html", "");
};
let getLastParamWidthBar = (text) => {
  let arr = text.split("/");
  return arr[arr.length - 2];
}
/*解析查询关键字*/
let parseSearchKeyWord = (dom) => {
  dom = $(dom);
  let list = [];
  dom.find("#searchResult .searchItem").each((i, e) => {
    let searchItemTitle = $(e).find(".searchItemTitle")
    let href = searchItemTitle.find("a").attr("href");
    searchItemTitle.find("a").attr("href", "javascript:void(0)");
    list.push({
      title: searchItemTitle.html().trim(),
      content: $(e).find(".searchCon").html().trim(),
      sign: $(e).find(".searchItemInfo").eq(0).html().trim(),
      url: href,
      pageId: getLastParam(href)
    })
  });
  let aArr = dom.find(".pager a");
  let maxPage = 0;
  if (aArr.length > 0) {
    let aSize = aArr.length;
    let a = aArr[aSize - 2];
    maxPage = parseInt($(a).html().trim());
  }
  dom.empty();
  dom.remove();
  return {
    'cnList': list,
    'cnTotal': maxPage
  }
};
/*解析所有文章目录*/
let parseArticleClassify = (dom) => {
  let reList = [];
  dom = $(dom);
  dom.find("#sidebar_postcategory a").each((i, e) => {
    let url = $(e).attr("href").trim();
    let categoryId = getLastParam(url)
    let conArr = $(e).html().trim().split("(");
    let name = conArr[0].trim();
    let num = conArr[1] ? parseInt(conArr[1].trim()) : 0;
    reList.push({
      name: name,
      num: num,
      id: categoryId,
    })
  });
  dom.empty();
  dom.remove();
  return reList;
};
/*解析侧边栏通用解析器*/

/*解析排行榜通用解析器*/
let parseCnBlogToplists = (dom, anchor) => {
  let topList = [];
  dom = $(dom);
  dom.find("#" + anchor).find("li a").each((i, e) => {
    let pageId = getLastParam(($(e).attr("href") || "").trim());
    let name = $(e).html().trim().replace(/\d+\.?/, "").trim();
    let tmp = name.split("(");
    name = tmp[0].trim();
    let num = parseInt(tmp[1].replace(")", "").trim());
    topList.push({
      name: name,
      pageId: pageId,
      num: num
    })
  });
  dom.empty();
  dom.remove();
  return topList;
};
/*解析文章排行榜*/
let parseHotArticle = (dom) => {
  return parseCnBlogToplists(dom, "TopViewPostsBlock");
};
/*解析文章档案*/
let parseArticleArchives = function (data) {
  let dom = $(data);
  let list = [];
  dom.find("#sidebar_postarchive").find("a").each((i, e) => {
    let arr = $(e).attr("href").split("/");
    list.push({
      id: arr[arr.length - 2] + "-" + arr[arr.length - 1].replace(".html", ""),
      name: $(e).html().trim(),
    })
  });
  dom.empty();
  dom.remove();
  return list;
}
/*解析最新评论*/
let parseCnBlogLastComment = (dom) => {
  let list = [];
  dom = $(dom);
  let commentDom = dom.find("#sidebar_recentcomments");
  let titles = commentDom.find(".recent_comment_title");
  let bodys = commentDom.find(".recent_comment_body");
  let owners = commentDom.find(".recent_comment_author");
  titles.each((i, e) => {
    let title = $(titles[i]);
    let body = $(bodys[i]);
    let owner = $(owners[i]);
    let titleA = title.find("a");
    let url = titleA.attr("href");
    let arr = url.split("#");
    let pageId = getLastParam((arr[0] || "").trim());
    let anchor = arr[1].trim();
    list.push({
      title: titleA.html().replace(/^\d+./, "").trim(),
      body: body.html().trim(),
      owner: owner.html().trim(),
      pageId: pageId,
      anchor: anchor
    })
  });
  dom.empty();
  dom.remove();
  return list;
};
/*解析用户博客信息*/
let parseUserBlogInfo = (respon) => {
  if (respon) {
    let data = {};
    respon = respon.replace("<!--done-->", "");
    respon = respon.replace("<h3 class=\"catListTitle\">公告</h3>", "");
    let dom = $(respon);
    let profile = dom.find("#profile_block");
    if (profile.length > 0) {
      data['username'] = profile.find("a:eq(0)").html().trim();
      data['age'] = profile.find("a:eq(1)").html().trim();
      data['follow'] = profile.find("a:eq(2)").html().trim();
      data['focus'] = profile.find("a:eq(3)").html().trim();
    }
    dom.empty();
    dom.remove();
    return data;
  }
};
/*解析标签云*/
let parseCloudCnBlogSidecolumn = (res, anchor) => {
  let redata = [];
  let tmpDom = $(res);
  tmpDom.find("#" + anchor).find("ul a").each((i, e) => {
    let aTag = $(e);
    redata.push({
      name: aTag.html().trim(),
      id: getLastParamWidthBar(aTag.attr("href"))
    });
  });
  tmpDom.empty();
  tmpDom.remove();
  return redata;
};
let parseCloudLabel = (dom) => {
  return parseCloudCnBlogSidecolumn(dom, "sidebar_toptags");
};
let parseTagArticle = (respon) => {
  let dom = $(respon);
  let reData = {};
  let reList = [];
  reData.list = reList;
  reData.pageList = [];
  reData.categoryName = (dom.find(".PostListTitle").html() || "").replace("当前", "随笔").replace("：", " - ").trim();
  dom.find("#myposts .PostList").each((i, e) => {
    let data = {};
    let titl = $(e).find(".postTitl2");
    let desc = $(e).find(".postDesc2");
    data.title = titl.find("a").html().trim();
    data.pageId = getLastParam(titl.find("a").attr("href"));
    let descText = desc.html().trim();
    let item = descText.split(/[\s\n]/);
    data.author = item[0];
    data.time = item[1] + " " + item[2];
    data.readNum = item[3].replace("阅读:", "");
    data.commentNum = item[4].replace("评论:", "");
    reData.list.push(data);
  });
  dom.empty();
  dom.remove();
  return reData;
}
/*解析Ing心情*/
let parseTalkList = (respon) => {
  respon = respon.replace(/···/g, "<a href='/···'>···</a>");
  let reData = [];
  let current = -1;
  let pageList = [];
  ////////////解析必要参数
  let tmp = $(respon);
  tmp.find(".feed_block .ing-item .feed_body").each((i, e) => {
    reData.push({
      'content': $(e).find(".ing_body").html().trim(),
      'time': $(e).find(".ing_time").html().trim(),
      'count': 999,
      'from': '博客园',
      'author': blogConst.blogName
    });
  });
  let paper = tmp.find(".block_arrow .pager");

  paper.find(">*").each((i, e) => {
    e = $(e);
    if (e.hasClass("current")) {
      current = e.html().trim();
      pageList.push({
        id: current,
        text: current
      })
    } else {
      let spli = e.attr("href").split("/").reverse();
      let text = (e.html() || "").trim().replace(" &gt;", "").replace("&lt; ", "");
      if (text != "Next" && text != "Prev") {
        pageList.push({
          id: spli[0],
          text: text
        })
      }
    }
  });
  tmp.empty();
  tmp.remove();
  return {
    'cnList': reData,
    'current': current,
    'pageList': pageList
  }
};
/*解析文章数等信息*/
let parsetArticleNum = (data) => {
  let dom = $(data);
  let pageNum = dom.find("#stats_post_count").html().replace("-", "").replace("随笔", "").replace("&nbsp;", "").trim();
  let commentNum = dom.find("#stats-comment_count").html().replace("-", "").replace("评论", "").trim();
  dom.empty();
  dom.remove();
  return {
    pageNum: pageNum,
    commentNum: commentNum,
  };
};
/*解析全部文章标题*/
let parseAllArticle = (respon) => {
  let dom = $(respon.replace(/[\r\n]/g, ""));
  let forFlow = dom.find("#main .forFlow");
  let posTitles = forFlow.find(".postTitle");
  let postCons = forFlow.find(".postCon");
  let postDescs = forFlow.find(".postDesc");
  let reData = {};
  let reList = [];
  let pageList = [];
  reData.list = reList;
  reData.pageList = pageList;
  posTitles.each((i, e) => {
    let re = {};
    let posTitle = posTitles[i];
    let postCon = postCons[i];
    let postDesc = postDescs[i];
    re.title = $(posTitle).find("a").html().trim();
    //pageId可能不为整数
    //.match(/(\d+)[^0-9]*$/)[1]将会失效
    re.pageId = getLastParam($(posTitle).find("a").attr("href"));
    let postConDiv = $(postCon).find("div");
    postConDiv.find("a").remove();
    re.content = postConDiv.text();
    re.img = postConDiv.find("img").attr("_src");
    let postDescHtml = $(postDesc).html();
    let postArr = postDescHtml.split("阅读");
    let postPreHtml = postArr[0];
    let postPosHtml = postArr[1];
    re.time = postPreHtml.match(/\d+-\d+-\d+ \d+:\d+/)[0];
    let nums = postPosHtml.match(/(\(\d+?\))/g)
    re.readNum = nums[0].replace("(", "").replace(")", "");
    re.commentNum = nums[1].replace("(", "").replace(")", "");
    reList.push(re);
  })
  /*只存在下一页按钮*/
  let nextPageA = forFlow.find("#nav_next_page a");
  let bottomPager = forFlow.find("#homepage_bottom_pager .pager")
  if (nextPageA.length > 0) {
    pageList.push({
      text: nextPageA.html().trim(),
      num: nextPageA.attr("href").match(/(\d+)[^0-9]*$/)[1],
      current: false
    })
  } else if (bottomPager.length > 0) {
    let arr = bottomPager.html().replace(/ /g, "").split("</a>");

    function pushVal(arr, vdom) {
      let reVal = {
        text: vdom.html().trim(),
        num: vdom.attr("href").match(/(\d+)[^0-9]*$/)[1],
        current: false
      };
      if (reVal.text) {
        arr.push(reVal);
      }
    }

    arr.forEach((e, i) => {
      if (e) {
        if (e.startsWith("<ahref")) {
          let tmp = $(e.replace("<ahref", "<a href") + "</a>");
          pushVal(pageList, tmp);
          tmp.remove();
        } else {
          let arr2 = e.split("<ahref");
          pageList.push({text: arr2[0], num: arr2[0], current: !isNaN(arr2[0])});
          if (arr2[1]) {
            let tmp = $("<a href" + arr2[1] + "</a>");
            pushVal(pageList, tmp);
            tmp.remove();
          }
        }
      }
    })
  }
  if (pageList.length > 1) {
    pageList.forEach((e, i) => {
      if ("上一页" == e.text) {
        e.text = "<";
      } else if ("下一页" == e.text) {
        e.text = ">";
      }
    });
  }
  dom.empty();
  dom.remove();
  return reData;
};
/*解析分组下的文章*/
let parseCategoryArticle = (respon) => {
  let data = {};
  let dom = $(respon);
  let entrylist = dom.find(".forFlow .entrylist");
  let categoryName = entrylist.find(".entrylistTitle").html().trim();
  data.categoryName = categoryName;
  data.list = [];
  data.pageList = [];
  entrylist.find(".entrylistItem").each((i, e) => {
    let titleDom = $(e).find(".entrylistItemTitle");
    let pageId = getLastParam(titleDom.attr("href"));
    let title = titleDom.html().trim();
    let summaryDom = $(e).find(".entrylistPostSummary");
    summaryDom.find("a").remove();
    let content = summaryDom.children().html().trim();
    let postDescHtml = $(e).find(".entrylistItemPostDesc").text().replace(/  /g, "");
    let time = postDescHtml.match(/\d+-\d+-\d+ \d+:\d+/)[0];
    postDescHtml = postDescHtml.replace(time, "").replace("编辑", "");
    let postDescArr = postDescHtml.split(" ");
    data.list.push({
      pageId: pageId,
      title: title,
      content: content,
      time: time,
      author: postDescArr[2].trim(),
      readNum: postDescArr[4].trim(),
      commentNum: postDescArr[7].trim(),
    });
  });
  dom.empty();
  dom.remove();
  return data;
};
/*解析文章内容*/
let parseArticle = (data) => {
  let reData = [];
  let dom = $(data);
  reData.title = dom.find("#cb_post_title_url").html().trim();
  reData.body = dom.find(".postBody").prop("outerHTML").trim().replace(new RegExp("_src", 'g'), "src");
  reData.fontNum = dom.find(".postBody").text().length;
  let postDesc = dom.find(".postDesc");
  reData.time = postDesc.find("#post-date").html().trim();
  reData.mdUrl = postDesc.find("a:contains('MD')").attr("href");
  reData.editUrl = postDesc.find("a:contains('编辑')").attr("href");
  /*收藏所需要的ID*/
  reData.addToWzId = postDesc.find("a:contains('收藏')").attr("onclick").replace("AddToWz(", "").replace(")", "");
  dom.empty();
  dom.remove();
  return reData;
};
/*解析关注等信息*/
let parseBlogPostInfo = (data) => {
  let dom = $(data);
  let reData = {};
  reData.fucus = (dom.find("#green_channel_follow").html() || "").trim() == "关注我" ? true : false;
  reData.digg = (dom.find("#green_channel_digg").html() || "").trim() == "好文要顶" ? true : false;
  dom.empty();
  dom.remove();
  return reData;
};
/*解析获得评论数*/
let parseCommentCountAndViewCount = (data) => {
  return data.replace("<div>", "").replace("</div>", "").trim();
}
/*解析评论区*/
let parseArticleComment = (data) => {
  let reObj = {};
  let reData = [];
  let dom = $(data);
  reObj.current = (dom.find(".current").html() || "").trim();
  reObj.list = reData;
  dom.find(".feedbackItem").each((i, e) => {
    let tempDom = $(e);
    let isReply = tempDom.find("[onclick^='return Reply']").length > 0;
    let isQuote = tempDom.find("[onclick^='return Quote']").length > 0;
    let isDel = tempDom.find("[onclick^='return Del']").length > 0;
    let isUpdate = tempDom.find("[onclick^='return Get']").length > 0;
    let avatar = ((tempDom.find("[id$='_avatar']").html()) || '').trim();
    let layer = tempDom.find(".layer").prop("outerHTML");
    let anchor = tempDom.find("[id^='comment_anchor']").prop("outerHTML");
    let time = tempDom.find(".comment_date").html().trim();
    let commenter = tempDom.find("[id^=a_comment_author_]").html();
    let commenterAnchor;
    let commenterUrl = tempDom.find("[id^=a_comment_author_]").attr("href");
    let commenterId = commenterUrl.split("\/").reverse()[1]
    let commentBody = tempDom.find(".blog_comment_body").html().trim();
    let comment_vote = tempDom.find(".comment_vote");
    let onclick = comment_vote.find("a").attr("onclick")
    let commentId;
    let regRes = /voteComment\((\d*),/.exec(onclick);
    if (regRes) {
      commentId = regRes[1].trim();
    }
    let anchorDom = $(anchor);
    commenterAnchor = (anchorDom.attr("name") || "").trim();
    anchorDom.remove();
    let layerAnchor = layer + anchor + "<input id='__anchor" + commentId + "' style='width:0px'/>";

    let support = comment_vote.find("a").eq(0).html().trim().replace("(", "").replace(")", "").replace("支持", "");
    let oppose = comment_vote.find("a").eq(1).html().trim().replace("(", "").replace(")", "").replace("反对", "");
    if (!avatar) {
      avatar = BlogKit.getExtendStylePath("/img/body/defAvatar.jpg")
    }

    reData.push({
      isReply: isReply,
      isQuote: isQuote,
      isDel: isDel,
      isUpdate: isUpdate,
      layerAnchor: layerAnchor,
      time: time,
      commenter: commenter,
      commenterUrl: commenterUrl,
      commentBody: commentBody,
      commentId: commentId,
      support: support,
      oppose: oppose,
      commenterId: commenterId,
      avatar: avatar,
      commenterAnchor: commenterAnchor,
    })
  });
  dom.empty();
  dom.remove();
  return reObj;
};
/*解析用户信息dom*/
let parseUserInfo = (data) => {
  let userData = {};
  let dom = $(data);
  let headUrl = dom.find(".user_avatar img").attr("_src");
  userData.headUrl = headUrl;
  dom.empty();
  dom.remove();
  return userData;
};

/*解析新增评论返回信息*/
let parseAddComment = (msg) => {
  let data = {};
  let obj
  if (typeof (msg) == 'string') {
    obj = JSON.parse(msg);
  } else {
    obj = msg;
  }
  data.isSuccess = obj.isSuccess;
  data.duration = obj.duration;
  let dom = $(removeUselessTag(obj.message));
  data.commentBody = dom.find(".bq_post_comment").prop("outerHTML").trim();
  data.layerAnchor = dom.find("a").prop("outerHTML").trim();
  data.commenterId = dom.find("a").attr("href").split("\/").reverse()[1];
  data.commenter = dom.find("a b").html().trim();
  data.support = 0;
  data.oppose = 0;
  dom.empty();
  dom.remove();
  return data;
};
/*解析评论点赞取消赞操作*/
let parseCommentOperator = function (data) {
  if (typeof (data) == 'string') {
    return JSON.parse(data);
  }
  return data;
};
/*解析文章推荐*/
let parseBlogpost = function (data) {
  if (typeof (data) == 'string') {
    return JSON.parse(data);
  }
  return data;
}
/*解析关注作者*/
let parseBlogFollow = function (data) {
  return data;
}
/*解析或者的评论内容*/
let parseCommentBody = function (data) {
  return data;
}
let parseCurrentUserInfo = function (data) {
  let redata = {};
  let dom = $(data);
  let userDom = dom.find("#header_user_left");

  if (userDom.html().indexOf("欢迎你") != -1) {
    redata.isLogin = true;
    redata.username = userDom.html().replace("欢迎你，", "").trim();
    redata.setUrl = dom.find("a:contains('设置')").attr("href");
  } else {
    redata.isLogin = false;
    redata.username = "登录";
  }
  dom.empty();
  dom.remove();
  return redata;
}
/*解析更新评论*/
let parseUpdateComment = function (data) {
  if (typeof (data) == 'string') {
    return JSON.parse(data);
  }
  return data;
}
/*解析归档文档*/
let parseArchivesArticle = function (data) {
  return parseCategoryArticle(data);
}
let parsePrevnext = function (data) {
  let reData = {};
  let dom = $(data);
  let aPre = dom.find("a:contains(«)");
  if (aPre.length > 0) {
    reData.prePageId = getLastParam(aPre.attr("href"));
    reData.preTitle = (aPre.next().html() || "").trim();
  }
  let aPos = dom.find("a:contains(»)");
  if (aPos.length > 0) {
    reData.posPageId = getLastParam(aPos.attr("href"));
    reData.posTitle = (aPos.next().html() || "").trim();
  }
  dom.empty();
  dom.remove();
  return reData;
}
/*解析获得用户名*/
let parseUserName = function (data) {
  let reData = {};
  let dom = $(data);
  reData.username = dom.find("#tbCommentAuthor").val();
  dom.empty();
  dom.remove();
  return reData;
}
/*解析获得作者头像*/
let parseAuthorHeadImg = function (data) {
  let dom = $(data);
  let headImgSrc = '';
  let authorImg = dom.find(".author_avatar")
  headImgSrc = authorImg.length > 0 ? authorImg.attr("_src").trim() : '';
  dom.empty();
  dom.remove();
  return headImgSrc.replace("face", "avatar");
}
/*解析音乐接口*/
let parseMusicInterface = function (list) {
  let reData = [];
  list.forEach((item) => {
    item = item[0] || item;
    reData.push({
      cover: item.cover,
      author: item.artist,
      name: item.name,
      url: item.url,
      lrc: item.lrc
    });
  })
  return reData;
}
/*解析标签*/
let parseCloudLabelExt = function (data) {
  let list = [];
  let dom = $(data);
  dom.find("#taglist td").each((i, e) => {
    let cloudA = $(e).find("a");
    let cloudSpan = $(e).find("span");
    if (cloudA.length > 0 && cloudSpan.length > 0) {
      list.push({
        name: cloudA.html().trim(),
        id: getLastParamWidthBar(cloudA.attr("href")),
        num: cloudSpan.html().trim().replace(")", "").replace("(", "")
      })
    }
  })
  dom.empty();
  dom.remove();
  return list;
}
let parseGetCommentAvatarByAnchor = function (list, anchor) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].commenterAnchor == anchor) {
      return list[i].avatar;
    }
  }
}
let parseGetCommentIndexByAnchor = function (list, anchor) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].commenterAnchor == anchor) {
      return i;
    }
  }
}
/*解析获得粉丝*/
let parseFollowers = function (data) {
  let dom = $(data);
  let followList = [];
  let pageList = [];
  let pageInfo = {};
  pageInfo.current = -1;
  pageInfo.pageList = pageList;
  //current
  dom.find(".avatar_list li a[title]").each((i, e) => {
    let fllowA = $(e);
    let urlArr = (fllowA.attr("href") || "").split("/").reverse();
    let account = urlArr[0];
    let username = (fllowA.find(".avatar_name").html() || "").trim();
    let avatar = (fllowA.find(".avatar_pic img").attr("_src"));
    followList.push({
      account, username, avatar
    })
  });
  dom.find(".pager >*").each((i, e) => {
    let pageA = $(e);
    let page = (pageA.html() || "").trim();
    if (!(page.indexOf("&gt") != -1 || page.indexOf("&lt") != -1)) {
      pageList.push(page);
      if (pageA.hasClass("current")) {
        pageInfo.current = page;
      }
    }
  });
  dom.empty();
  dom.remove();
  return {followList, pageInfo};
}
let parseCategoriesTags = function (data) {
  let list = [];
  let dom = $(data);
  dom.find("#BlogPostCategory a").each((i, e) => {
    let tagA = $(e);
    list.push({
      id: getLastParam(tagA.attr("href")),
      text: tagA.html()
    })
  })
  dom.empty();
  dom.remove();
  return list;
}
let api = {
  loadMusicSongExt: () => {
    return new Promise((oubresolve, oubreject) => {
      let proArr = [];
      blogConst.musicIds.forEach((item) => {
        proArr.push(new Promise((resolve, reject) => {
          api.loadMusicSong(item).then((data) => {
            resolve(data);
          });
        }));
      })
      Promise.all(proArr).then((list) => {
        oubresolve(list)
      });
    })
  },
  loadMusicPlayListExt: () => {
    return new Promise((oubresolve, oubreject) => {
      api.loadMusicPlayList(blogConst.musicIds).then((list) => {
        oubresolve(list);
      })
    });
  },
  loadMusicSong: (id) => {
    return new Promise((resolve, reject) => {
      $.get(blogConst.musicApiUrl.replace(":type", "song").replace(":id", id).replace(":r", Math.random()), (data) => {
        resolve(JSON.parse(data));
      });
    });
  },
  loadMusicPlayList: (id) => {
    return new Promise((resolve, reject) => {
      $.get(blogConst.musicApiUrl.replace(":type", "playlist").replace(":id", id).replace(":r", Math.random()), (data) => {
        resolve(JSON.parse(data));
      });
    });
  },
  loadMusicList: () => {
    let promis;
    if (Array.isArray(blogConst.musicIds)) {
      promis = api.loadMusicSongExt();
    } else {
      promis = api.loadMusicPlayListExt();
    }
    return new Promise((resolve, reject) => {
      promis.then((list) => {
        resolve(parseMusicInterface(list));
      })
    });
  },
  loadBlogSearch: (keyword) => {
    return forwardXmlJsonp("https://zzk.cnblogs.com/s/blogpost?w=" + encodeURI("blog:" + blogConst.blogAcc + " " + keyword), parseSearchKeyWord);
  },
  loadArticleClassify: () => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/sidecolumn.aspx", parseArticleClassify)
  },
  loadHotArticle: () => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/TopLists.aspx", parseHotArticle)
  },
  loadArticleArchives: () => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/sidecolumn.aspx", parseArticleArchives)
  },
  /*获得最新评论包含图片*/
  loadLastComment: () => {
    return new Promise((oubresolve, reject) => {
      unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/sidecolumn.aspx", parseCnBlogLastComment).then((data) => {
        if (data.length == 0) {
          oubresolve([]);
        }
        /*分组获取头像,防止同一个头像发起多次请求*/
        let avatarKey = BlogUtils.groupBy(data, "owner");
        let promiseArr = [];
        /*获得所有头像*/
        Object.getOwnPropertyNames(avatarKey).forEach(function (key) {
          let e = avatarKey[key][0];
          promiseArr.push(
            new Promise((resolve, reject) => {
              api.loadArticleComment(e.pageId, 0, e.anchor).then((data) => {
                resolve({
                  avatar: parseGetCommentAvatarByAnchor(data.list, e.anchor),
                  owner: e.owner
                });
              });
            })
          );
        });
        Promise.all(promiseArr).then((list) => {
          list.forEach((outE) => {
            data.forEach((inE) => {
              if (outE.owner == inE.owner) {
                inE.avatar = outE.avatar;
              }
            });
          });
          oubresolve(data);
        });
      });
    });
  },
  loadAuthorBlogInfo: () => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/news.aspx", parseUserBlogInfo)
  },
  loadAuthorHeadImg: () => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/BlogPostInfo.aspx?blogId=" + blogConst.blogId + "&postId=" + blogConst.blogPostId + "&blogUserGuid=" + blogConst.blogUserGuid, parseAuthorHeadImg)
  },
  loadCloudLabel: () => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/tag/", parseCloudLabelExt)
  },
  loadBlogTalk: (page) => {
    return forwardXmlJsonp("https://ing.cnblogs.com/u/" + blogConst.blogAcc + "/" + page, parseTalkList);
  },
  loadArticleNum: () => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/tag/", parsetArticleNum)
  },
  loadAllArticle: (page) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/default.html?page=" + page, parseAllArticle)
  },
  loadTagArticle: (tagId, page) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/tag/" + tagId + "/?page=" + page, parseTagArticle)
  },
  loadCategoryArticle: (categoryId, page) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/category/" + categoryId + ".html?page=" + page, parseCategoryArticle)
  },
  loadArchivesArticle: (archivesId, page) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/archive/" + archivesId + ".html?page=" + page, parseArchivesArticle)
  },
  loadArticle: (pageId) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/p/" + pageId + ".html", parseArticle)
  },
  loadBlogPostInfo: (pageId) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/BlogPostInfo.aspx?blogId=" + blogConst.blogId + "&postId=" + pageId + "&blogUserGuid=" + blogConst.blogUserGuid, parseBlogPostInfo)
  },
  loadCommentCount: (pageId) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/GetCommentCount.aspx?postId=" + pageId, parseCommentCountAndViewCount)
  },
  loadViewCount: (pageId) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/GetViewCount.aspx?postId=" + pageId, parseCommentCountAndViewCount)
  },
  loadArticleComment: (pageId, page, anchorCommentId) => {
    let askUrl = "https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/GetComments.aspx?postId=" + pageId + "&pageIndex=" + page;
    if (anchorCommentId) {
      askUrl = askUrl + "&anchorCommentId=" + anchorCommentId;
    }
    return unifiXmlJsonp(askUrl, parseArticleComment);
  },
  loadArticleCommentInfoByAnchor: (pageId, anchor) => {
    let blogCommentList = 50;
    let bl = blogCommentList / blogConst.commentLength;//获得比例
    return new Promise((resolve, reject) => {
      Promise.all([api.loadCommentCount(pageId), api.loadArticleComment(pageId, 0, anchor)]).then((data) => {
        let blogPageSize = data[0];
        let commentInfo = data[1];
        if (blogPageSize > blogConst.commentLength) {
          let anchorIndex = parseGetCommentIndexByAnchor(commentInfo.list, anchor);
          let c_current = (commentInfo.current - 1) * bl + Math.ceil(anchorIndex / (blogConst.commentLength - 1));
          let leftAskRemain = (c_current - 1) % bl;
          let leftIndex = leftAskRemain * blogConst.commentLength;//计算左边距
          let rightIndex = leftIndex + blogConst.commentLength;//计算右边距
          let list = commentInfo.list.slice(leftIndex, rightIndex);
          let size = Math.ceil(blogPageSize / blogConst.commentLength);
          let current = c_current;
          resolve({size, current, list});
          return;
        } else {
          resolve({size: 1, current: 1, list: commentInfo.list});
          return;
        }

      })
    });
  },
  /*页数转换*/
  loadArticelCommentInfo: (pageId, page) => {
    return new Promise((resolve, reject) => {
      api.loadCommentCount(pageId).then((commentCount) => {
        let commentPageSize = Math.ceil(commentCount / blogConst.commentLength);
        page = page == -1 ? commentPageSize : page;
        let blogCommentList = 50;
        let bl = blogCommentList / blogConst.commentLength;//获得比例
        let askPage = Math.ceil(page / bl);             //转化页数
        let leftAskRemain = (page - 1) % bl;
        let leftIndex = leftAskRemain * blogConst.commentLength;//计算左边距
        let rightIndex = leftIndex + blogConst.commentLength;//计算右边距
        api.loadArticleComment(pageId, askPage).then((commentInfo) => {
          if (commentCount > blogConst.commentLength) {
            let size = commentPageSize;
            let current = page;
            let list = commentInfo.list.slice(leftIndex, rightIndex).reverse();
            resolve({size, current, list});
            return;
          } else {
            resolve({size: 1, current: 1, list: commentInfo.list.reverse()});
            return;
          }
        });
      });
    });

  },
  loadUserInfo: (userId) => {
    return unifiXmlJsonp("https://home.cnblogs.com/u/" + userId + "/", parseUserInfo)
  },
  addComment: (pageId, parentCommentId, body) => {
    parentCommentId = parentCommentId || 0;
    return unifiXmlJsonpPost("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/PostComment/Add.aspx", {
      postId: parseInt(pageId),
      body: body,
      parentCommentId: parseInt(parentCommentId)
    }, parseAddComment);
  },
  commentOperator: (commentId, type, parse) => {
    return unifiXmlJsonpPost("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/vote/comment", {
      commentId: parseInt(commentId),
      isAbandoned: false,
      voteType: type
    }, parse);
  },
  commentDigg: (commentId) => {
    return api.commentOperator(commentId, "Digg", parseCommentOperator);
  },
  commentBury: (commentId) => {
    return api.commentOperator(commentId, "Bury", parseCommentOperator);
  },
  blogpost: (pageId) => {
    return unifiXmlJsonpPost("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/vote/blogpost", {
      postId: parseInt(pageId),
      isAbandoned: false,
      voteType: "Digg"
    }, parseBlogpost);
  },
  blogFollow: () => {
    return unifiXmlJsonpPost("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/Follow/FollowBlogger.aspx", {
      blogUserGuid: blogConst.blogUserGuid
    }, parseBlogFollow);
  },
  loadCommentBody: (commentId) => {
    return unifiXmlJsonpPost("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/comment/GetCommentBody.aspx", {
      commentId: parseInt(commentId)
    }, parseCommentBody);
  },
  updateComment: (commentId, body) => {
    return unifiXmlJsonpPost("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/PostComment/Update.aspx", {
      commentId: parseInt(commentId),
      body: body
    }, parseUpdateComment);
  },
  /*收藏博客*/
  addToWz: (pageId) => {
    return window.AddToWz(pageId);
  },
  shareToTsina: () => {
    return window.ShareToTsina ? window.ShareToTsina() : '';
  },
  shareOnWechat: () => {
    return window.shareOnWechat ? window.shareOnWechat() : '';
  },
  loadPrevnext: (pageId) => {
    return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/post/prevnext?postId=" + pageId, parsePrevnext);
  },
  loadUserName: () => {
    /*该接口已废弃*/
    /*return unifiXmlJsonp("https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/CommentForm.aspx?postId=0", parseUserName);*/
    return new Promise((resolve, reject) => {
      resolve({username: ''});
    });
  },
  loadFollowers: (page) => {
    let url = "https://home.cnblogs.com/u/" + blogConst.blogAcc + "/relation/followers/";
    if (page && page > 1) {
      url += "?page=" + page;
    }
    return forwardXmlJsonp(url, parseFollowers);
  },
  loadCategoriesTags: (pageId) => {
    let url = "https://www.cnblogs.com/" + blogConst.blogAcc + "/ajax/CategoriesTags.aspx?blogId=" + blogConst.blogId + "&postId=" + pageId;
    return unifiXmlJsonp(url, parseCategoriesTags);
  },
}
export default api;
