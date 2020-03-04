<template>
  <div id="blog_article_full_screen">
    <transition name="fade">
      <div class="blog-article-full-screen-warp" v-show="isOpenFullScreen">
        <div class="post-body-content-fiex-wrap">
          <div id="full_body_top_target"></div>
          <div class="post-body-content-fiex-inner-wrap">
            <div class="post-body-title-fullscreen">{{article.title}}</div>
            <div v-html="article.body" id="post_body_content_fullscreen" v-highlight>{{article.body}}</div>
          </div>
          <div class="post-body-fiex-close">
            <span class="icon iconfont LogonClosed" @click="closeFullScreenEven"></span>
          </div>
          <div class="post-body-fiex-menu">
            <div id="post_body_fiex_menu_anchor">

            </div>
          </div>
          <div id="full_body_bottom_target"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    import BlogUtils from "../../utils/BlogUtils";
    import TocHelper from '../../assets/lib/toc/toc-helper';
    import $ from 'jquery';

    export default {
        name: "BlogFullPage",
        methods: {
            closeFullScreenEven: function () {
                this.$bus.emit("closeFullScreenEven", true);
            }
        },
        data: () => {
            return {
                isOpenFullScreen: false,
                article: {
                    title: '',
                    body: ''
                }
            }
        },
        created: function () {
            /*监听打开全屏*/
            this.$bus.on("openFullScreenEven", (data) => {
                let newBody = $(data.body);
                newBody.find("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]").each((i, e) => {
                    let ei = $(e);
                    ei.attr("id", ei.attr("id") + "__fullscreen");
                });
                this.article.body = newBody.prop("outerHTML");
                this.article.title = data.title;
                newBody.remove();
                setTimeout(() => {
                    this.$nextTick(() => {
                        $("#post_body_fiex_menu_anchor").empty();
                        $("#post_body_content_fullscreen").attr("data-toc", "#post_body_fiex_menu_anchor");
                        let tocHelper = new TocHelper({
                            /*需要生成目录的内容*/
                            dom: '#post_body_content_fullscreen',
                            /*能过获得滚动事件的dom*/
                            offsetBody: document.querySelector('.post-body-content-fiex-wrap'),
                        });
                        tocHelper.reset();
                        this.isOpenFullScreen = true
                        BlogUtils.registerAnchorFunc($("#post_body_fiex_menu_anchor"));
                        let topBtnDom = $("<span class='icon iconfont top topBtn topBtnDown'></span>");
                        $("#post_body_fiex_menu_anchor .toc-brand").append(topBtnDom);
                        /*滑动到上文或下文*/
                        topBtnDom.click(() => {
                            if (topBtnDom.hasClass("topBtnDown")) {
                                document.getElementById("full_body_bottom_target").scrollIntoView({behavior: "smooth"});
                            } else {
                                document.getElementById("full_body_top_target").scrollIntoView({behavior: "smooth"});
                            }
                        });
                        /*滚动切换上下按钮*/
                        $(".post-body-content-fiex-wrap").scroll(function (e) {
                            if ($("#full_body_top_target").offset().top < -80) {
                                topBtnDom.removeClass("topBtnDown");
                            } else {
                                topBtnDom.addClass("topBtnDown");
                            }
                        });
                    })
                },);

            });
            this.$bus.on("closeFullScreenEven", (dom) => {
                this.isOpenFullScreen = false;
            });
        }
    }
</script>

<style lang="scss">

  #blog_article_full_screen {
    fade-enter-active, .fade-leave-active {
      opacity: 1;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }


    .blog-article-full-screen-warp {
      transition: opacity .3s;
      position: absolute;
      z-index: 5 !important;


      .post-body-content-fiex-wrap::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: #F5F5F5;
      }

      .post-body-content-fiex-wrap::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #F5F5F5;
      }

      .post-body-content-fiex-wrap::-webkit-scrollbar-thumb:hover {
        background-color: rgb(160, 160, 160);
      }

      .post-body-content-fiex-wrap::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgb(160, 160, 160);
      }


      .post-body-content-fiex-wrap {
        //////////////
        -moz-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: center;
        -webkit-transition: all .3s ease-in;
        background: rgb(224, 216, 200);
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        padding: 20px;
        overflow-y: scroll;
        z-index: 99 !important;

        .post-body-fiex-close {
          display: inline-block;
          position: fixed;
          top: 0;
          cursor: pointer;
          margin: 10px;
          @include deve-right(35px, 35px, 35px, 35px, '', '', '');

          span {
            font-size: 35px !important;
            color: rgba(80, 80, 80, .4);

          }
        }

        .post-body-fiex-menu {
          text-align: left;
          display: inline-block;
          position: fixed;
          margin-left: 10px;
          top: 50px;
          height: 800px;
          font-size: 12px;

          #post_body_fiex_menu_anchor {
            @include deve-width(0, 0, 0, 0, 200px, 220px, 220px);
            @include deve-display(none, none, none, none, '', '', '');
            position: relative;
            background: rgba(250, 250, 250, .5);
            border-radius: 5px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);

            .toc-brand {
              margin-bottom: 10px !important;
            }
          }
        }

        .post-body-title-fullscreen {
          width: 100%;
          font-weight: bold;
          text-align: center;
          font-size: 25px;
          margin-bottom: 10px;
        }


        .post-body-content-fiex-inner-wrap {
          display: inline-block;
          @include deve-width(100%, 100%, 100%, 100%, 640px, 740px, 920px);
          padding: 50px 55px 40px 55px;
          box-sizing: border-box;
          margin: 0 auto;
          background: rgb(248, 241, 226);
          box-shadow: 0 6px 12px 3px rgba(0, 0, 0, .2);
          border-radius: 3px;
          text-align: left;
        }
      }

      .post-body-content-fiex-wrap {
        padding-top: 10px;
        font-size: 15px;
        box-sizing: border-box;

      }
    }
  }

</style>
