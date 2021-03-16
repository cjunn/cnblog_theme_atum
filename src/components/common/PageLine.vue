<template>
  <div id="page_line">
    <div class="post-comment-num">
      <ul class="pagination">
        <li v-for="item in pageLines" @click="$emit('clickItem',item.num)">
          <a :class="item.focus?'active':''">{{item.text}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "PageLine",
        props: {
          pageLines:{
            default() {
              return [];
            }
          },
        },
    }
</script>

<style lang="scss">
  #page_line{
    .post-comment-num{
      text-align: center;
      padding-top: 2px;
      padding-bottom: 3px;
      font-size: 12px;

      ul.pagination {
        display: inline-block;
        padding: 0;
        margin: 0;
      }

      ul.pagination li {

        display: inline;
      }

      ul.pagination li a {
        font-size: 12px;
        color: rgb(56, 56, 56);
        float: left;
        @include switchHeadBar(){
          padding: 5px 9px;
        }
        text-decoration: none;
        border-radius: 3px;
        cursor: pointer;
        box-sizing: border-box;

      }

      ul.pagination li a.active {
        background-color: rgba(58, 63, 81, .99);
        color: white;
        border-radius: 3px;
      }

      ul.pagination li a:hover:not(.active) {
        background-color: #ddd;
      }

      li.seatClz {
        a::selection {
          color: transparent !important;
          background-color: transparent !important;
        }

        a:hover {
          background-color: transparent !important;
        }

        a:hover {
          background-color: transparent !important;
        }

        a {
          cursor: default !important;
          color: transparent !important;
        }
      }

    }
  }
</style>
