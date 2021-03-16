<template>
  <div id="route_body_shade" v-show="!isClose">
    <div class="loading-screen-lump-wrap">
      <transition name="trans" v-on:after-leave="afterLeave">
        <div class="loading-screen-lump" :class="isShade?'loading-screen-lump-show':''">
          <div class="loading-screen-wrap">
            <div class="loading-screen-in">
              <div class="k-ball-holder3">
                <div class="k-ball7a"></div>
                <div class="k-ball7b"></div>
                <div class="k-ball7c"></div>
                <div class="k-ball7d"></div>
              </div>
            </div>
          </div>
        </div>

      </transition>
    </div>
    <transition name="fade" v-on:after-leave="afterLeave">
      <div class="loading-screen-back" v-if="isShade">111</div>
    </transition>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        isClose: true,
        isShade: false,

      }
    },

    methods: {
      openLoading: function (back) {
        this.isClose = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.isShade = true;
          }, 20);
          setTimeout(()=>{
            back();
          },320)
        })
      },
      closeLoading: function (back) {
        this.isShade = false;

      },
      afterLeave: function (el) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.isClose = true;
          }, 20);
        });
      },
    },

    name: "RouteBodyShade"
  }
</script>

<style lang="scss">

  #route_body_shade {
    height: 100%;
    position: relative;
    z-index: 10;
    .fade-enter-active, .fade-leave-active {
      transition: all .25s ease-in-out 0s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }

    .trans-enter-active, .trans-leave-active {

    }

    .trans-enter, .trans-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      transform: translateY(0%);
    }


    .loading-screen-lump-wrap {
      position: absolute;
      left: 0;
      right: 0;

      .loading-screen-lump {
        font-size: 12px;
        z-index: 2;
        height: 85px;
        box-sizing: border-box;
        transform: translateY(-100%);
        transition: all .25s ease-in-out 0s;
        position: relative;

        .loading-screen-wrap {
          margin: 8px;
          height: 65px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0px 1px 5px rgba(80, 80, 80, 0.2);
          text-align: center;

          .loading-screen-in {
            padding-top: 13px;
            width: 40px;
            height: 100%;
            display: inline-block;

            .k-ball7a {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #19A68C;
              animation-delay: -1.5s
            }

            .k-ball7b {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #F63D3A;
              animation-delay: -1s
            }

            .k-ball7c {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #FDA543;
              animation-delay: -0.5s
            }

            .k-ball7d {
              border: 0;
              margin: 0;
              width: 16px;
              height: 16px;
              position: absolute;
              border-radius: 50%;
              animation: k-loadingO 2s ease infinite;
              background: #193B48
            }

            @keyframes k-loadingO {
              0%, 100% {
                transform: translate(0)
              }
              25% {
                transform: translate(160%)
              }
              50% {
                transform: translate(160%, 160%)
              }
              75% {
                transform: translate(0, 160%)
              }
            }
          }
        }

      }

      .loading-screen-lump-show {
        transform: translateY(0%);
      }
    }

    .loading-screen-back {
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(250, 250, 250, 1);
      display: inline-block;
    }
  }
</style>
