<template>
  <div id="music_player">
    <div class="music-player-out-wrap">
      <div class="music-player-wrap head-back-color">
        <div class="music-img-wrap" :class="{Rotation:isPlay}">
          <div class="div-img head-music-pic" :style="getPicImgStyle"></div>
        </div>
        <div class="music-right-wrap">
          <div class="music-ope-wrap">
            <div class="music-title" :style="{width:cssStyle.titleWidth+'px'}" :title="playing.title">
              <div class="music-display-info sing-ellipsis" :class="{ marquee: isPlay }"
                   :style="{width:(cssStyle.titleWidth-5)+'px'}">{{playing.title}}
              </div>
              <div class="music-display-info sing-ellipsis" :class="{ marqueeT: isPlay }"
                   :style="{width:(cssStyle.titleWidth-5)+'px'}" v-show="isPlay">{{playing.title}}
              </div>
            </div>
            <div class="music-ope-bar">
              <span class="pre" @click="musicPlayPre"><span class="icon iconfont angle-double-left"></span></span>
              <span class="play" @click="musicState"><span class="icon iconfont "
                                                           :class="{timeout:!isPlay,play1:isPlay}"></span></span>
              <span class="pos" @click="musicPlayPos"><span class="icon iconfont angle-double-right"></span></span>
            </div>
          </div>
          <div class="music-volume-wrap">
            <span class="icon iconfont volume-"></span>
          </div>
          <div class="music-progress" :style="{width:cssStyle.barWidth+'px'}"></div>
        </div>
        <div class="music-list-wrap" @click="showPlay=!showPlay">
          <span class="icon iconfont headphones"></span>
        </div>
      </div>
      <div class="music-player-shade head-back-color"></div>
      <transition name="trans">
        <pop-list class="pop-list" ref="popList" v-show="showPlay" :pop-list="musicList" pop-title="音乐列表" :flag="true"
                  @clickItem="clickItem"></pop-list>
      </transition>
    </div>
  </div>
</template>

<script>
  import blogUtils from "../../utils/BlogUtils";
  import PopList from "./PopList";
  import blogApi from "../../utils/BlogApi";
  import BlogContext from "../../context/BlogContext";

  export default {
    name: "MusicPlayer",
    components: {PopList},
    created: function () {
      this.audio.ontimeupdate = this.musicUpdate;
      this.audio.onerror = this.musicError;
      this.audio.oncanplay = this.musicCanplay;
      this.audio.onended = this.musicEnded;
      blogApi.loadMusicList().then((list) => {
        this.playList = list;
        this.musicState();
        this.musicState();
      });
      blogUtils.registerUnClick("#music_player", () => {
        this.showPlay = false;
      });

    },
    data: () => {
      return {
        delayTime:0,
        audio: new Audio(),
        isPlay: false,
        playing: {
          index: 0,
          title: '音乐播放器',
          name: '',
          url: '',
          pic: '',
        },
        playList: [],
        showPlay: false,
        cssStyle: {
          maxTitleWidth: 130,
          titleWidth: 130,
          barMaxWidth: 140,
          barWidth: 0,
          fontSize: '9',
        }
      }
    },
    computed: {
      getPicImgStyle:function(){
        let src=this.playing.pic?this.playing.pic:BlogContext.musicSignImg;
        return {
          "background":"url('"+src+"') 0% 0% / 100% no-repeat",
        }
      },
      musicList: function () {
        return this.playList.map((item, i) => {
          return {
            key: item.title,
            key2: item.author,
            value: item,
            index: i
          };
        });
      }
    },
    methods: {
      musicEnded: function (even) {
        blogUtils.showInfoMsg('播放结束,自动切换下一首');
        this.musicPlayPos();
      },
      musicUpdate: function (even) {
        this.cssStyle.barWidth = ((this.audio.currentTime / this.audio.duration) * this.cssStyle.barMaxWidth).toFixed(0);
      },
      musicError: function (even) {
        blogUtils.showInfoMsg('播放失败,5秒后自动切换下一首');
        this.delayTime=setTimeout(()=>{
          this.musicPlayPos();
        },5000);
      },
      musicCanplay: function (even) {
      },
      /*切換播放暫停狀態*/
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
        if (this.playing.index == 0) {
          this.musicPlay(this.playList[this.playList.length - 1]);
        } else {
          this.musicPlay(this.playList[this.playing.index - 1]);
        }
      },
      musicPlayPos: function () {
        if (this.playing.index == this.playList.length - 1) {
          this.musicPlay(this.playList[0]);
        } else {
          this.musicPlay(this.playList[this.playing.index + 1]);
        }
      },

      musicSetInfo: function (item) {
        this.playing.url = item.url;
        this.playing.index = item.index;
        this.playing.pic = item.pic;
        this.playing.title = item.title + "[" + item.author + "]";
        let calTitleWidth = blogUtils.getTextWidth(this.playing.name, this.cssStyle.fontSize);
        calTitleWidth > this.cssStyle.maxTitleWidth ? this.cssStyle.titleWidth = calTitleWidth : this.cssStyle.titleWidth = this.cssStyle.maxTitleWidth;
        this.$refs.popList.setFlag(item.index);
      },
      musicPlay: function (item) {
        try {
          this.audio.src = item.url;
          this.audio.play();
          this.musicSetInfo(item);
          this.isPlay = true;
          if(this.delayTime>0){
            clearTimeout(this.delayTime);
            this.delayTime=0;
          }
        } catch (e) {
          this.musicError();
        }

      },
      clickItem: function (item) {
        this.musicPlay(item);
      }
    }
  }
</script>

<style lang="scss">
  #music_player {
    color: #a6a8b1;
    width: 250px;
    height: $headHeight;
    display: inline-block;
    font-size: 0px;
    @include switchHeadBar(){
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    }
    .music-player-out-wrap {
      position: relative;
      font-size: 0px;

      .trans-enter-active, .trans-leave-active {
        transition: all .24s ease-in-out 0s;
      }

      .trans-enter, .trans-leave-to {
        transform: translateY(-100%);
      }

      .pop-list {
        position: absolute;
        top:$headHeight;
        z-index: 2;
      }
      .music-player-shade{
        position: absolute;
        left: -4px;
        right: -4px;
        top: 0px;
        bottom: 0px;
        height: 50px;
        z-index: 3;
      }
      .music-player-wrap {
        width: 250px;
        display:inline-block;
        position: relative;
        height: $headHeight;
        text-align: right;
        float: right;
        z-index: 4;
        @include switchHeadBar(){
          float: none;
          width: 100%;
          text-align: center;
          padding-left: 35px;
          box-sizing: border-box;

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
          padding: 4px 0 4px 0;
          display: inline-block;
          vertical-align: top;
          .div-img {

            background-size:100% 100%;
            width: 42px;
            height: 42px;
            border-radius: 21px;
            cursor: pointer;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
          }
        }

        .music-right-wrap:hover {
          .music-volume-wrap {
            vertical-align: bottom;
            display: inline-block;
            position: absolute;
            cursor: pointer;
            right: 0;
            bottom: 4px;
          }
        }

        .music-right-wrap {
          padding: 4px 0px 0px 0;
          display: inline-block;
          vertical-align: top;
          position: relative;
          text-align: left;
          box-sizing: border-box;
          height: 50px;
          .music-progress {
            height: 2px;
            background-color: #a6a8b1;
            position: absolute;
            bottom: 0px;
          }

          .music-ope-wrap {
            padding-left: 13px;
            vertical-align: top;
            display: inline-block;
            font-size: 12px;
            padding-top: 3px;
            box-sizing: border-box;
            .music-title {
              cursor: pointer;
              overflow: hidden;
              position: relative;
              height: 15px;

              .music-display-info {
                overflow: hidden;
              }

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

            .music-ope-bar {
              padding-top: 7px;

              .play {
                position: relative;
                top: 1px;
              }

              .icon {
                display: inline-block;
                font-size: 17px;
                width: 25px;
                cursor: pointer;
                font-weight: bold;
              }
            }
          }

          .music-volume-wrap {
            display: none;
          }

        }

        .music-list-wrap {
          height: $headHeight;
          width: $headHeight;
          display: inline-block;
          position: relative;
          cursor: pointer;
          text-align: center;
          line-height: $headHeight;
          color: #a6a8b1;
          .headphones {


          }
        }

        .music-list-wrap:hover {
          background-color: rgba(0, 0, 0, .12);
          color: rgba(240, 240, 240, .9);
        }
      }
    }
  }
</style>
