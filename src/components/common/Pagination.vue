<template>
<div id="pagination">
  <div class="post-comment-num">
    <ul class="pagination">
      <li v-for="item in pageList" @click="(!isNaN(item)&&item!=pageCur)?$emit('clickPage',item):''">
        <a :class="item==pageCur?'active':''">{{item}}</a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
    export default {
      name: "Pagination",
      props: {
        pageSize: {
          default:0,
        },
        pageCur:{
          default:0,
        },
        maxPage:{
          default:0,
        }
      },
      data: () => {
        return {
          pageList:[]
        }
      },
      watch:{
        pageSize:function(){
          this.initPageList();
        },
        pageCur:function(){
          this.initPageList();
        },
        maxPage:function(){
          this.initPageList();
        }
      },
      created: function () {
          this.initPageList();
      },
      methods:{
         initPageList:function(){
           this.pageList=this.computePageList(
             parseInt(this.pageSize),
             parseInt(this.pageCur),
             parseInt(this.maxPage)
           );
         },
         computePageList : (pageSize, pageCur, maxPage) => {
          if (pageSize <= maxPage) {
            /*页数少于等于10页*/
            return Array.from(Array(pageSize), (v, k) => k + 1);
          } else if (pageCur <= (maxPage / 2) + 1) {
            /*前10页*/
            let arr = Array.from(Array(maxPage), (v, k) => k + 1);
            arr.push("...");
            arr.push(pageSize);
            return arr;
          } else if ((pageSize - pageCur) <= ((maxPage / 2) + 1)) {
            /*后10页*/
            let arr = Array.from(Array(maxPage), (v, k) => (pageSize - maxPage) + k + 1);
            arr.unshift("...");
            arr.unshift(1);
            return arr;
          } else {
            /*中间页*/
            let arr = Array.from(Array(maxPage), (v, k) => (pageCur - (maxPage / 2)) + k + 1);
            arr.unshift("...");
            arr.unshift(1);
            arr.push("...");
            arr.push(pageSize);
            return arr;
          }
        }
      }
    }
</script>

<style lang="scss">
#pagination{
  .post-comment-num{
    //border-top: 1px solid #e7edef;
    text-align: center;
    padding-top: 2px;
    padding-bottom: 7px;
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
      padding: 5px 11px;
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
