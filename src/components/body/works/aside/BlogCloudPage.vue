<template>
  <div id="blog_cloud_page">
    <div class="menu-body-item">
      <div class="menu-body-item-title">
        <div>标签云</div>
      </div>
      <div class="cloud-content cloud_label_content_clz">
        <span v-for="item in labels">
          <router-link :to="VUE_CTX+'/works/category/tag/' + item.id + '/1'">
             <span class="info-item-bg">
                  <span>{{item.name}}</span>
             </span>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import BlogApi from "../../../../utils/BlogApi";

  export default {
    name: "BlogCloudPage",
    created: function () {
      BlogApi.loadCloudLabel().then((data) => {
        this.labels = data;
      })
    },
    data: () => {
      return {labels: []}
    }
  }
</script>

<style lang="scss">
  #blog_cloud_page {
    .menu-body-item {
      padding: 15px 15px 0px 18px;

      .menu-body-item-title {
        margin-bottom: 15px;
        color: rgb(88, 102, 110);
        font-size: 15px;
      }

      .cloud-content {
        display: inline-block;
        font-size: 12px;
        word-break: break-all;
        width: 100%;
        margin-bottom: 20px;

        > span {
          display: inline-block;
          margin-right: 3px;
          margin-bottom: 3px;
        }
      }

      .info-item-bg:before, .info-item-bg:after {
        content: '　';
        width: 8px;
        display: inline-block;
        height: 18px;
        background-color: rgb(207, 218, 221);
        vertical-align: top;
      }

      .info-item-bg:before {
        border-radius: 20px 0 0 20px;
      }

      .info-item-bg:after {
        border-radius: 0 20px 20px 0;
      }

      .info-item-bg {
        font-size: 0px;
        height: 18px;
        overflow: hidden;
        width: auto;
        display: inline-block;
        > span {
          font-size: 12.8px;
          background-color: rgb(207, 218, 221);
          display: inline-block;
          color: white;
          text-shadow: 1px 1px 1px rgba(80, 80, 80, .6);
          cursor: pointer;
          height: 18px;
          vertical-align: top;
          position: relative;
          top:-1px;
          padding-bottom: 1px;
        }
      }
    }
  }
</style>
