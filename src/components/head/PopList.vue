<template>
    <div id="pop_list">
        <div class="pop-list-wrap small-base-scroll">
          <div class="pop-list-head pop-list-item" v-show="popTitle">
            {{popTitle}}
          </div>
          <div v-for="(item,id) in popList" class="pop-list-item" @click="clickItem(item,id)">
            <div class="left-flag" v-if="flag&&flagIndex==id"> </div>
            <div class="item-key sing-ellipsis" :class="item.key2?'item-key1':''" v-html="item.key">{{item.key}}</div>
            <div class="item-key sing-ellipsis item-key2" v-if="item.key2" v-html="item.key2">{{item.key2}}</div>
          </div>
        </div>
    </div>
</template>

<script>

    export default {
      name: "PopList",
      methods: {
        setFlag: function (flagIndex) {
          this.flagIndex=flagIndex;
        },
        clickItem:function(item,id){
          if(item==undefined||id==undefined){
            return;
          }
          this.$emit('clickItem',item.value);
          this.setFlag(id);
        },
      },
      data: () => {
        return {
          flagIndex:-1,
        }
      },
      props: {
        flag:{
          type:Boolean
        },
        popTitle:{
          type:String,
          default() {
            return "";
          }
        },
        popList: {
          type: Array,
          default() {
            return [
              //key:'test1',key2:'test2',val:''
              {},
            ];
          }
        }
      },
    }
</script>

<style lang="scss">
  #pop_list{
    width: 100%;
    position: absolute;
    box-shadow: 0 0 5px rgba(0,0,0,.3);
    .pop-list-wrap{
      box-shadow: 0 0px 5px rgba(0,0,0,0.3);
      background-color: white;
      overflow-y: scroll;
      max-height: 250px;
      cursor: pointer;
      width: 100%;

      .pop-list-item{
        padding: 8px 14px 8px 14px;
        color: gray;
        box-sizing: border-box;
        width: 100%;
        font-size: 0;
        position: relative;
        .left-flag{
          background-color: rgba(107, 178, 255,.7);
          width: 3px;
          display: inline-block;
          top: 2px;
          bottom: 2px;
          position: absolute;
          left: 1px;
        }
        .item-key{
          font-size: 13px;
          display: inline-block;

        }
        .item-key1{
          width:75%;
        }

        .item-key2{
          float: right;
          width: 20%;
          text-align: right;
        }
      }
      .pop-list-head{
        font-size: 12px;
        background-color: rgb(237, 241, 242);
        font-weight: bold;
        padding: 7px 14px 7px 14px;
      }
      .pop-list-item:hover{
        background-color: rgb(237, 241, 242);
      }
    }
  }
</style>
