<template>
  <div id="loading_bar">
    <div class="loading-bar">
      <transition name="trans">
        <div class="preloaderbar show active" :class="{'preloaderbarShow':!isClose}">
          <span class="bar"></span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoadingBar",
    data: () => {
      return {
        isClose: true,
      }
    },
    methods: {
      openLoadingBar: function () {
        this.isClose = false;
      },
      closeLoadingBar: function () {
        this.isClose = true;
      }
    }
  }
</script>
<style lang="scss">
  .loading-bar {
    .preloaderbarShow {
      transform: translateY(0) !important;
    }

    //彩色横向进度条
    .preloaderbar {
      transition: all 0.2s ease 0s;
      transform: translateY(-100%);
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      margin-bottom: -4px;
    }

    .preloaderbar .bar {
      position: absolute;
      width: 100%;
      height: 0;
      text-indent: -9999px;
      background-color: #23b7e5
    }

    .preloaderbar .bar:before {
      position: absolute;
      right: 50%;
      left: 50%;
      height: 3px;
      background-color: inherit;
      content: ""
    }

    .preloaderbar.active {
      -webkit-animation: changebar 2.25s infinite 0.75s;
      -moz-animation: changebar 2.25s infinite 0.75s;
      animation: changebar 2.25s infinite 0.75s;
    }

    .preloaderbar.active .bar {
      -webkit-animation: changebar 2.25s infinite;
      -moz-animation: changebar 2.25s infinite;
      animation: changebar 2.25s infinite;
    }

    .preloaderbar.active .bar:before {
      -webkit-animation: movingbar 0.75s infinite;
      -moz-animation: movingbar 0.75s infinite;
      animation: movingbar 0.75s infinite
    }

    @-webkit-keyframes movingbar {
      0% {
        right: 50%;
        left: 50%
      }
      99.9% {
        right: 0;
        left: 0
      }
      100% {
        right: 50%;
        left: 50%
      }
    }
    @-moz-keyframes movingbar {
      0% {
        right: 50%;
        left: 50%
      }
      99.9% {
        right: 0;
        left: 0
      }
      100% {
        right: 50%;
        left: 50%
      }
    }
    @keyframes movingbar {
      0% {
        right: 50%;
        left: 50%
      }
      99.9% {
        right: 0;
        left: 0
      }
      100% {
        right: 50%;
        left: 50%
      }
    }
    @-webkit-keyframes changebar {
      0% {
        background-color: #8BC34A
      }
      33.3% {
        background-color: #8BC34A
      }
      33.33% {
        background-color: #FFCA28
      }
      66.6% {
        background-color: #FFCA28
      }
      66.66% {
        background-color: #F44336
      }
      99.9% {
        background-color: #F44336
      }
    }
    @-moz-keyframes changebar {
      0% {
        background-color: #8BC34A
      }
      33.3% {
        background-color: #8BC34A
      }
      33.33% {
        background-color: #FFCA28
      }
      66.6% {
        background-color: #FFCA28
      }
      66.66% {
        background-color: #F44336
      }
      99.9% {
        background-color: #F44336
      }
    }
    @keyframes changebar {
      0% {
        background-color: #8BC34A
      }
      33.3% {
        background-color: #8BC34A
      }
      33.33% {
        background-color: #FFCA28
      }
      66.6% {
        background-color: #FFCA28
      }
      66.66% {
        background-color: #F44336
      }
      99.9% {
        background-color: #F44336
      }
    }
  }
</style>
