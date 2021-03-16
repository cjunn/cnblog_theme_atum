<template>
  <div id="min_set_btn" @click="$emit('clickSet')">
    <div>
      <span class="icon iconfont shezhi"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MinSetBtn"
  }
</script>

<style lang="scss">
  #min_set_btn {
    height: $headHeight;
    width: $headHeight;
    line-height: $headHeight;
    text-align: center;
    font-size: 16px;
    color: #a6a8b1;
    cursor: pointer;
    position: absolute;
    z-index: 2;
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    @include switchHeadBar(){
      display: inline-block;
    }
  }

  #min_set_btn:hover {
    background-color: rgba(0, 0, 0, .12);
    color: rgba(240, 240, 240, .9);
  }

</style>
