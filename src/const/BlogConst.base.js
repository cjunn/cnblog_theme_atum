let openDev = false;//启动开发模式
let blogAcc = "cjunn";
let blogId = "571504";
let blogPostId = "12237892";
let blogName = "C君";
let blogUserGuid = "2476b4f3-9f13-4c75-389e-08d789d7fa8d";
let blogUrlPre = "https://www.cnblogs.com/";
let blogIndexPath = blogUrlPre + blogAcc;
let extendStylePath = "https://cdn.jsdelivr.net/gh/cjunn/atum@v1.0"; //图片路径
let myGithub = "https://github.com/" + blogAcc;
let manPage = "https://i.cnblogs.com/";
let sendPage = "https://msg.cnblogs.com/send/" + blogAcc;
let subPage = "https://www.cnblogs.com/" + blogAcc + "/rss";
let headBackImg = extendStylePath + "/img/ing/autorbimg.jpg";
let bigBackImg = extendStylePath + "/img/body/background.jpg";
let blogSign = "自惭多情污梵行，入山又恐误倾城。世间安得双全法，不负如来不负卿。";
let aboutmeHtml = " <img src='" + extendStylePath + "/img/ing/aboutme.jpg" + "'/>";
let avatarSign = " ↗↗点击头像关注我。";
let ingTitle = "一念花开，一念花落。这山长水远的人世，终究是要自己走下去。";
let blogFriendList = [];                      //{name: '', url: ''}格式
let blogUsedLinks = [];                       //{name: '', url: ''}格式
let musicIds = ["26568025", "26329928", "1340002509", "551337407", "28160369", "27548281", "34923851", "31421442", "29829683", "446247397", "32317208"];
let qq = "592571519";
let email = "592571519@qq.com"
let github = "cjunn";
let musicApiUrl = "https://api.i-meto.com/meting/api?server=netease&type=:type&id=:id&r=:r";
let pageItemImgs = 35;
let pageBarImgs = 21;
let commentLength = 10;//评论区显示评论数
let mainExtNav = [
  {title: "音乐收藏", url: "https://www.cjunn.xyz/musicplayer/index.html", icon: "ic_addmusic"},
  {title: "在线壁纸", url: "https://www.cjunn.xyz/wallpaper/", icon: "paper"},
  {title: "博客动态", url: "https://www.cnblogs.com/cjunn/", icon: "comment1"},
  {title: "音乐律动", url: "https://cjunn.gitee.io/mikutap/", icon: "gift"},
  {title: "博主简历", url: "https://www.cnblogs.com/cjunn/", icon: "face2"}
];
let faceIcon = [
  {
    name: "贴吧表情",
    path: extendStylePath + "/img/face/tieba/",
    maxNum: 50,
    file: ".jpg",
    placeholder: "#tieba_{alias}#",
    alias: {
      1: "hehe",
      2: "haha",
      3: "tushe",
      4: "a",
      5: "ku",
      6: "lu",
      7: "kaixin",
      8: "han",
      9: "lei",
      10: "heixian",
      11: "bishi",
      12: "bugaoxing",
      13: "zhenbang",
      14: "qian",
      15: "yiwen",
      16: "yinxian",
      17: "tu",
      18: "yi",
      19: "weiqu",
      20: "huaxin",
      21: "hu",
      22: "xiaonian",
      23: "neng",
      24: "taikaixin",
      25: "huaji",
      26: "mianqiang",
      27: "kuanghan",
      28: "guai",
      29: "shuijiao",
      30: "jinku",
      31: "shengqi",
      32: "jinya",
      33: "pen",
      34: "aixin",
      35: "xinsui",
      36: "meigui",
      37: "liwu",
      38: "caihong",
      39: "xxyl",
      40: "taiyang",
      41: "qianbi",
      42: "dnegpao",
      43: "chabei",
      44: "dangao",
      45: "yinyue",
      46: "haha2",
      47: "shenli",
      48: "damuzhi",
      49: "ruo",
      50: "OK"
    },
    title: {
      1: "呵呵",
      2: "哈哈",
      3: "吐舌",
      4: "啊",
      5: "酷",
      6: "怒",
      7: "开心",
      8: "汗",
      9: "泪",
      10: "黑线",
      11: "鄙视",
      12: "不高兴",
      13: "真棒",
      14: "钱",
      15: "疑问",
      16: "阴脸",
      17: "吐",
      18: "咦",
      19: "委屈",
      20: "花心",
      21: "呼~",
      22: "笑脸",
      23: "冷",
      24: "太开心",
      25: "滑稽",
      26: "勉强",
      27: "狂汗",
      28: "乖",
      29: "睡觉",
      30: "惊哭",
      31: "生气",
      32: "惊讶",
      33: "喷",
      34: "爱心",
      35: "心碎",
      36: "玫瑰",
      37: "礼物",
      38: "彩虹",
      39: "星星月亮",
      40: "太阳",
      41: "钱币",
      42: "灯泡",
      43: "茶杯",
      44: "蛋糕",
      45: "音乐",
      46: "haha",
      47: "胜利",
      48: "大拇指",
      49: "弱",
      50: "OK"
    }
  },
  {
    name: "QQ高清",
    path: extendStylePath + "/img/face/qq/",
    maxNum: 91,
    excludeNums: [41, 45, 54],
    file: ".gif",
    placeholder: "#qq_{alias}#"
  },
  {
    name: "emoji高清",
    path: extendStylePath + "/img/face/emoji/",
    maxNum: 84,
    file: ".png",
    placeholder: "#emoji_{alias}#"
  }
];

export default {
  openDev,
  blogAcc,
  blogId,
  blogPostId,
  blogName,
  blogUserGuid,
  blogIndexPath,
  myGithub,
  manPage,
  sendPage,
  subPage,
  pageItemImgs,
  pageBarImgs,
  commentLength,
  blogSign,
  extendStylePath,
  ingTitle,
  blogFriendList,
  musicIds,
  musicApiUrl,
  qq,
  email,
  github,
  blogUsedLinks,
  mainExtNav,
  avatarSign,
  headBackImg,
  bigBackImg,
  aboutmeHtml,
  blogUrlPre,
  faceIcon
};
