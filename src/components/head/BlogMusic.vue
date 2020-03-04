<template>
  <div id="blog_music">

    <div class="music-top-view">
      <div class="music-view">
        <div class="music-img-wrap" :class="{Rotation:isPlay}">
          <img :src=playing.img>
        </div>
        <div class="music-ope-wrap">
          <div class="music-head">
            <div class="music-head-wrap" :style="{width:titleWidth+'px'}">
              <div class=" music-display-info" :class="{ marquee: isPlay }">{{playing.name}}</div>
              <div class=" music-display-info" :class="{ marqueeT: isPlay }" v-show="isPlay">{{playing.name}}</div>
            </div>
          </div>
          <div class="music-ope-btn">
            <div class="music-left">
          <span class="music-pre" @click="musicPlayPre">
            <span class="icon iconfont angle-double-left"></span>
          </span>
              <span class="music-play" @click="musicState">
              <span class="icon iconfont " :class="{timeout:!isPlay,play1:isPlay}"></span>
            </span>
              <span class="music-pos" @click="musicPlayPos">
             <span class="icon iconfont angle-double-right"></span>
            </span>
            </div>
            <div class="music-right">
              <span class="icon iconfont volume-"></span>
            </div>
          </div>
          <div class="music-bottom-bar" :style="{width:barWidth+'px'}"></div>
        </div>
      </div>
      <div class="music-list-btn" @click="musicDialog=!musicDialog">
        <span class="icon iconfont headphones"></span>
      </div>
      <div class="music-beer-btn" @click="feelDialog=!feelDialog">
        <span class="icon iconfont bell"></span>
        <span class="bell-font">闲言碎语</span>
      </div>
      <div class="music-login-btn" @click="openUser">
      <span class="music-login-name-wrap" :title="username?username:'设置'">
        <span class="music-login-name sing-ellipsis">{{username?username:'设置'}}</span>
        <span class="icon iconfont angeldown1"></span>
      </span>
      </div>
    </div>
    <div class="block-list-dialog music-list-dialog small-base-scroll"
         :class="{ 'list-dialog-show': musicDialog,
                   'list-dialog-hide':!musicDialog}">
      <div v-for="(item,index) in musicList" class="music-item" @click="musicPlay(item,index)">
        <div class="music-playing" v-show="index==playing.index"></div>
        <div class="music-index">{{index}}</div>
        <div class="music-name sing-ellipsis">{{item.name}}</div>
        <div class="music-author ">{{item.author}}</div>
      </div>
    </div>
    <div class="block-list-dialog feel-list-dialog small-base-scroll"
         :class="{ 'list-dialog-show': feelDialog,
                   'list-dialog-hide':!feelDialog}">
      <div class="feel-list-title"><strong>闲言碎语</strong></div>
      <div v-for="(item,index) in feelList" class="list-group-item">
        <div>
          <div class="feel-content" v-html="item.content">{{item.content}}</div>
          <div class="feel-time">{{item.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import BlogApi from "../../utils/BlogApi";
    import BlogKit from "../../utils/BlogKit";
    import BlogUtils from "../../utils/BlogUtils";
    import BlogConst from "../../const/BlogConst";


    export default {
        name: "BlogMusic",
        created: function () {
            let slf = this;
            this.audio.ontimeupdate = this.musicUpdate;
            this.audio.onerror = this.musicError;
            this.audio.oncanplay = this.musicCanplay;
            this.audio.onended = this.musicEnded;
            BlogApi.loadMusicList().then((data) => {
                this.musicList = data;
                if (data.length > 0) {
                    this.musicSetInfo(data[0], -1);
                }
            });
            BlogApi.loadBlogTalk(1).then((data) => {
                if (data) {
                    slf.feelList = data.cnList.slice(0, 3);
                }
            });
            BlogApi.loadUserName().then((data) => {
                slf.username = data.username;
            });
            BlogUtils.registerUnClick("#blog_music", () => {
                slf.musicDialog = false;
                slf.feelDialog = false;
            });
        },
        methods: {
            openUser: function () {
                window.open(BlogConst.manPage)
            },
            musicEnded: function (even) {
                BlogUtils.showInfoMsg('播放结束,自动切换下一首');
                this.musicPlayPos();
            },
            musicUpdate: function (even) {
                this.barWidth = ((this.audio.currentTime / this.audio.duration) * this.barMaxWidth).toFixed(0);
            },
            musicError: function (even) {
                BlogUtils.showInfoMsg('播放失败,自动切换下一首');
                this.musicPlayPos();
            },
            musicCanplay: (even) => {
            },
            musicSetInfo: function (item, index) {
                this.playing.index = index;
                this.playing.img = item.cover;
                this.playing.name = item.name + "[" + item.author + "]";
                let calTitleWidth = BlogUtils.getTextWidth(this.playing.name, this.fontSize);
                calTitleWidth > this.maxTitleWidth ? this.titleWidth = calTitleWidth : this.titleWidth = this.maxTitleWidth;
            },
            musicPlay: function (item, index) {
                this.audio.src = item.url;
                this.audio.play();
                this.playing.url = item.url;
                this.musicSetInfo(item, index);
                this.isPlay = true;
            },
            musicState: function () {
                if (this.playing.url) {
                    this.isPlay = !this.isPlay;
                    if (this.isPlay) {
                        this.audio.play();
                    } else {
                        this.audio.pause();
                    }
                } else {
                    this.musicPlayPos();
                }
            },
            musicPlayPre: function () {
                let musicItem;
                let musicIndex;
                if (this.playing.index == 0) {
                    musicIndex = this.musicList - 1;
                    musicItem = this.musicList[musicIndex];
                } else {
                    musicIndex = this.playing.index - 1;
                    musicItem = this.musicList[musicIndex];
                }
                this.musicPlay(musicItem, musicIndex);
            },
            musicPlayPos: function () {
                let musicItem;
                let musicIndex;
                if (this.playing.index == this.musicList.length - 1) {
                    musicIndex = 0;
                    musicItem = this.musicList[musicIndex];
                } else {
                    musicIndex = this.playing.index + 1;
                    musicItem = this.musicList[musicIndex];
                }
                this.musicPlay(musicItem, musicIndex);
            }
        },
        watch: {
            musicDialog: function (n, o) {
                n ? this.feelDialog = false : '';
            },
            feelDialog: function (n, o) {
                n ? this.musicDialog = false : '';
            }
        },
        data: () => {
            return {
                audio: new Audio(),
                musicDialog: false,
                feelDialog: false,
                isPlay: false,
                maxTitleWidth: 144,
                titleWidth: 144,
                barMaxWidth: 145,
                barWidth: 0,
                fontSize: '9',
                playing:
                    {
                        index: -1,
                        name: '音乐播放器',
                        url: '',
                        img: BlogKit.getExtendStylePath("/img/body/music_play.png"),
                    }
                ,
                musicList: [],
                feelList: [],
                username: '',
            }
        },
    }
</script>

<style lang="scss">
  #blog_music {
    display: inline-block;
    vertical-align: top;
    line-height: normal;
    color: #a6a8b1;
    position: relative;
    height: $headHeight;
    @include switchHeadBar {
      width: 100%;
      text-align: center;
      padding-bottom: 10px;
      background-color: $headBackColor;
    }

    .music-top-view {
      overflow: hidden;
      height: $headHeight;

      .music-view {
        position: relative;
        top: 5px;
        display: inline-block;
        vertical-align: top;
        @include switchHeadBar {
          margin-left: 28px;
        }
        @-webkit-keyframes rotation {
          from {
            -webkit-transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
          }
        }

        .Rotation {
          -webkit-transform: rotate(360deg);
          animation: rotation 8s linear infinite;
          -moz-animation: rotation 8s linear infinite;
          -webkit-animation: rotation 8s linear infinite;
          -o-animation: rotation 8s linear infinite;
        }


        .music-img-wrap {
          cursor: pointer;
          display: inline-block;
          vertical-align: top;

          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          }
        }

        .music-ope-wrap:hover, .music-ope-wrap:active {
          .music-right {
            display: inline-block !important;
          }

          .music-bottom-bar {
            display: inline-block !important;
          }
        }

        .music-ope-wrap {
          display: inline-block;
          vertical-align: top;
          font-size: 9px;
          margin-left: 12px;
          width: 145px;
          margin-top: 2px;
          position: relative;

          .music-head {
            cursor: pointer;
            padding-left: 2px;
            margin-bottom: 2px;
            width: 142px;
            height: 16px;
            position: relative;
            overflow: hidden;

            .music-head-wrap {
              width: 195px;
              height: 100%;
              display: inline-block;
              position: relative;
              font-size: 12px;
              @keyframes marquee {
                0% {
                  left: 0;
                }
                100% {
                  left: -105%;
                }
              }
              @keyframes marqueeT {
                0% {
                  left: 105%;
                }
                100% {
                  left: 0;
                }
              }

              .marqueeT {
                animation: marqueeT 12s linear infinite;
                white-space: nowrap;
                position: absolute;
              }

              .marquee {
                animation: marquee 12s linear infinite;
                white-space: nowrap;
                z-index: 2;
                position: absolute;
              }
            }
          }

          .music-ope-btn {
            height: 25px;
            cursor: pointer;

            .music-left {
              float: left;
              vertical-align: top;

              > span {
                vertical-align: top;
              }

              .music-play, .music-pause {
                > span {
                  margin: 0 12px 0 12px;
                  position: relative;
                  top: 1px;
                  font-size: 18px;
                  font-weight: 800;
                }
              }

              .music-pre, .music-pos {
                > span {
                  font-size: 16px;
                  font-weight: 800;
                }
              }
            }

            .music-right {
              display: none;
              vertical-align: top;
              float: right;
              position: relative;
              top: 4px;
              cursor: pointer;
            }
          }

          .music-bottom-bar {
            display: none;
            width: 100%;
            display: none;
            height: 2px;
            background-color: #a6a8b1;
            line-height: normal;
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }

      .music-list-btn:hover, .music-beer-btn:hover, .music-login-btn:hover {
        background-color: #32374a;
        color: #e9eaec;
        overflow: hidden;
      }

      .music-beer-btn {
        @include switchHeadBar {
          position: absolute;
          left: 0;
          height: 38px;
          transform: translateY(100%);
          right: 0 !important;
          width: 100% !important;
          background-color: $headBackColor;
          text-align: left !important;
          padding-left: 20px;
          top: 20px;
          line-height: 38px !important;
          border-top: 1px solid rgba(52, 56, 72, 1);
          .bell-font {
            margin-left: 6px;
            font-size: 13px;
            font-weight: normal;
          }
        }
      }

      .music-login-btn {
        @include switchHeadBar {

          border-top: 1px solid rgba(52, 56, 72, 1);
          position: absolute;
          left: 0;
          transform: translateY(200%);
          right: 0 !important;
          width: 100% !important;
          background-color: $headBackColor;
          height: 38px;
          line-height: 38px;
          top: 20px;
          text-align: left !important;
          padding-left: 20px !important;
          > span {
            position: relative;
            top: -5px;
          }
        }
      }

      .music-list-btn, .music-beer-btn, .music-login-btn {
        display: inline-block;
        line-height: 50px;
        vertical-align: top;
        width: 50px;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        @include switchHeadBar {
          position: absolute;
        }
      }

      .music-login-btn {
        width: 62px;
        margin-right: 8px;
      }

      .music-login-btn {
        padding: 0 10px 0 10px;


        .music-login-name-wrap {
          white-space: nowrap;

          .music-login-name {
            display: inline-block;
            font-size: 13px;
            width: 52px !important;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: top;
          }

          .iconfont {
            position: relative;
            top: 2px;
            font-size: 10px;
            margin-left: 3px;
          }
        }

      }

      .music-beer-btn {
        font-weight: bold;
      }
    }

    .list-dialog-show {
      transform: translate(0, 0);
      border: 1px solid rgba(207, 207, 207, .2);
      @include switchHeadBar {
        transform: translate(0, 0);
      }
    }

    .list-dialog-hide {
      transform: translate(0, -110%);
      @include switchHeadBar {
        height: 0px !important;
        max-height: 0px !important;
        transform: translate(0, 0);
      }
    }

    .block-list-dialog {
      position: absolute;
      font-size: 0px;
      position: absolute;
      width: 261px;
      z-index: -1;
      box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      background-color: white;
      overflow-y: scroll;
      transition: all 0.4s ease-in-out 0s;
      -webkit-transition: all 0.4s ease-in-out 0s;
      box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;

      @include switchHeadBar {
        margin-top: 5px;
        left: calc(50% - 110px);
        z-index: 3;
      }
    }

    .feel-list-dialog {

      width: 320px;
      overflow: hidden;
      left: 20px;
      font-size: 14px;
      @include switchHeadBar {
        top: 93px;
        max-height: 500px;
      }

      .list-group-item {
        font-size: 13px;
        padding: 9px 16px 11px 15px;
        color: rgb(88, 102, 110);
        border-bottom: 1px solid rgb(237, 241, 242);
        cursor: pointer;
        box-sizing: border-box;
      }

      .list-group-item:last-of-type {
        border-bottom: 0px;
      }

      .list-group-item:hover {
        background-color: rgb(249, 249, 249);
      }

      .feel-list-title {
        color: rgb(122, 134, 140);
        padding: 10px 15px 10px 15px;
        background-color: #edf1f2;
      }

      .feel-content {
        padding-bottom: 5px;

        a {

          color: #58666e;
        }
      }

      .feel-time {
        font-size: 6px;
        color: rgb(163, 175, 182);
      }
    }

    .music-list-dialog {
      width: 261px;
      height: 278px;

      .music-item:hover {
        background-color: rgb(233, 233, 233);
      }

      .music-item {
        cursor: pointer;
        font-size: 12px;
        color: #333333;
        padding: 8px 0 8px 0;
        border-bottom: 1px solid #e7edef;
        position: relative;
        text-align: left;

        .music-playing {
          position: absolute;
          background-color: rgb(107, 178, 255);
          width: 3px;
          top: 0;
          bottom: 0;
          margin-top: 4px;
          margin-bottom: 4px;
          display: inline-block;
        }

        .music-index, .music-name, .music-author {
          display: inline-block;
          vertical-align: top;
        }

        .music-index {
          padding: 0 12px 0 14px;
        }

        .music-name {
          width: 130px;
          overflow: hidden;
        }

        .music-author {
          float: right;
          padding-right: 15px;
          max-width: 70px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
</style>
