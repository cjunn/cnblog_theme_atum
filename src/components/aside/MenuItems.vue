<template>
  <div id="menu_items">
    <div class="menu-items-wrap">
      <div class="menu-item-title">{{menuTitle}}</div>
      <div class="menu-item-area">
        <form>
          <div v-for="(item,id) in menuList" class="item-row panel-aside-color">
            <input name="func-radio-item" type="radio" :id="'func-radio-item_'+menuIdentify+'_'+id"
                   class="func-radio"
                   onclick="let wrap=this.closest('form');if(this.id==wrap.lastMenuId){this.checked=false;wrap.lastMenuId='undefined';return;};wrap.lastMenuId=this.id"/>
            <label :for="'func-radio-item_'+menuIdentify+'_'+id">
              <div class="parent-item-wrap" @click="clickItem(item.url)">
                <div class="icon-wrap">
                  <span class="icon iconfont" :class="item.icon"></span>
                </div>
                <div class="title-wrap">
                  <span>{{item.title}}</span>
                </div>
                <div class="arrow-wrap" v-if="item.children&&item.children.length>0">
                  <span class="icon iconfont bottom show-bottom-icon"></span>
                </div>
              </div>
            </label>

            <div class="children-wrap" v-if="item.children&&item.children.length>0"
                 :style="calChildrenHeight(item.children.length)">
              <div v-for="row in item.children" class="children-item-wrap" @click="clickItem(row.url)">
                <span>{{row.title}}</span>
                <span class="children-num" v-if="row.num">{{row.num}}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  /*菜单*/
  export default {
    name: "MenuItems",
    methods: {
      calChildrenHeight: function (size) {
        let childrenHeight = 33;
        return 'height:' + ((size * childrenHeight)) + 'px';
      },
      clickItem:function(url){
        if(!url){
          return;
        }
        if(url.startsWith("http")){
          window.open(url);
          return;
        }
        if(this.$route.path==url){
          return;
        }
        this.$router.push(url);
      },
    },
    props: {
      /*菜单标识*/
      menuIdentify: {
        type: String,
        default() {
          return ""
        }
      },
      /*菜单标题*/
      menuTitle: {
        type: String,
        default() {
          return ""
        }
      },
      menuList: {
        type: Array,
        default() {
          return [];
        }
      },
    }
  }
</script>

<style lang="scss">
  #menu_items {
    font-size: 0px;

    .menu-items-wrap {
      border-top: 1px solid #e2e8ea;
      padding-bottom: 10px;

      .menu-item-title {
        color: #98a6ad;
        font-size: 12px;
        padding: 10px 13px 6px 13px;
        box-sizing: border-box;
      }

      .menu-item-area {
        .item-row {
          width: 100%;
          box-sizing: border-box;

          .children-item-wrap:hover, .parent-item-wrap:hover {
            background-color: rgba(150,150,150,.15);
          }

          .func-radio:not(:checked) {
            + label {
              .arrow-wrap {
                .show-bottom-icon {
                  transform: rotate(180deg);
                }
              }

              + .children-wrap {
                height: 0px !important;
              }
            }
          }

          .children-wrap {
            overflow: hidden;
            transition: all 0.2s ease-in-out 0s;

            .children-item-wrap {
              padding: 7px 23px 7px 60px;
              cursor: pointer;
              font-size: 13px;
              position: relative;
              .children-num {
                border-radius: 10px;
                font-size: 10px;
                float: right;
                padding: 1px 0 1px 0;
                width: 25px;
                height: 14px;
                line-height: 14px;
                background-color: #cfdadd;
                color: white;
                text-align: center;
                position: relative;
                right: -4px;
                top: 2px;
                text-shadow: 0 1px 0 rgba(0, 0, 0, .2);
              }
            }
          }

          .parent-item-wrap {
            cursor: pointer;
            padding: 9px 23px 9px 23px;
            line-height: 1.4;
            .icon-wrap {
              padding-right: 19px;
            }

            .arrow-wrap {
              display: inline-block;
              font-size: 8px;
              float: right;
              padding-top: 1px;

              .show-bottom-icon {
                display: inline-block;
                transition: all 0.2s ease-in-out 0s;
              }
            }

            .icon-wrap, .title-wrap {
              font-size: 14px;
              display: inline-block;

              .icon {
                font-size: 17px;
                position: relative;
                top: 2px;
              }
            }
          }
        }
      }
    }
  }
</style>
