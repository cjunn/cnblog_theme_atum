<template>
  <div id="blog_menu_items">
    <div class="blog-menu-items">
      <form>
        <div v-for="(oubItem,oubIndex) in funcMenus" class="func-menu-item-wrap">
          <input style="display: none" name="func-radio-item" type="radio" :id="'func-radio-item_'+oubIndex"
                 class="func-radio"
                 onclick="let wrap=this.closest('form');if(this.id==wrap.lastMenuId){this.checked=false;wrap.lastMenuId='undefined';return;};wrap.lastMenuId=this.id">
          <div class="func-menu-item">
            <label :for="'func-radio-item_'+oubIndex">
              <div class="func-menu-title">
                    <span class="title-name">
                      <span class="icon iconfont" :class="[oubItem.icon]"></span>
                      <span>{{oubItem.titleName}}</span>
                    </span>
                <span class="title-arrow">
                      <span class="icon iconfont bottom show-bottom-icon"></span>
                    </span>
              </div>
            </label>
            <div class="func-menu-list" :style="{height:(oubItem.list.length*35)+'px'}">
              <div v-for="inbItem in oubItem.list" v-if="inbItem.name">
                <router-link v-show="inbItem.to" :to="inbItem.to||''"
                             class="func-menu-list-item"
                             tag="div">
                        <span class="list-item-name">
                        {{inbItem.name}}
                        </span>
                  <span v-if="inbItem.num" class="list-item-num">
                        {{inbItem.num}}
                        </span>
                </router-link>
                <div v-show="!inbItem.to" class="func-menu-list-item" @click="openPage(inbItem.url)">
                        <span class="list-item-name">
                        {{inbItem.name}}
                        </span>
                  <span v-if="inbItem.num" class="list-item-num">
                        {{inbItem.num}}
                        </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            //[icon:'',titleName:'',list:[{name,num,to}]]
            funcMenus: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        name: "BlogMenuItem",
        methods: {
            openPage: (url) => {
                window.open(url);
            }
        }
    }
</script>

<style lang="scss">
  #blog_menu_items {
    .blog-menu-items {
      .func-menu-item-wrap {
        .func-radio:not(:checked) + .func-menu-item {
          .func-menu-list {
            height: 0px !important;
          }
        }

        .func-radio:checked + .func-menu-item {
          .func-menu-title {
            .show-bottom-icon {
              transform: rotate(180deg);
            }
          }
        }

        .func-menu-item {
          .func-menu-title:hover {
            background-color: rgb(216, 222, 224);
          }

          .func-menu-title {

            padding: 10px 0 9px 0;

            cursor: pointer;
            font-size: 14px;

            .title-name {
              padding: 5px 10px 5px 10px;

              span {
                vertical-align: top;
              }

              .iconfont {
                padding: 0px 10px 0px 10px;
                font-size: 18px;
              }
            }

            .title-arrow {
              float: right;
              margin-right: 20px;

              .show-bottom-icon {
                font-size: 18px;
                display: inline-block;
                transform: rotate(0deg);
                transition: all 0.2s ease-in-out 0s;
              }
            }

          }

          .func-menu-list {
            overflow: hidden;
            transition: all 0.3s ease-in-out 0s;


            .func-menu-list-item:hover {
              background-color: rgb(216, 222, 224);
            }

            .func-menu-list-item {
              padding: 10px 18px 9px 56px;
              box-sizing: border-box;
              width: 100%;
              line-height: 16px;
              font-size: 14px;
              cursor: pointer;

              .list-item-name {
                display: inline-block;
                vertical-align: top;
              }

              .list-item-num {
                vertical-align: top;
                display: inline-block;
                float: right;
                font-size: 10px !important;
                background-color: #cfdadd !important;
                padding: 0px 6px 0px 6px;
                min-width: 12px;
                text-align: center;
                border-radius: 10px;
                text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
                color: white;
              }
            }
          }
        }
      }
    }
  }
</style>
