<template>
  <div id="avatar_area" class="panel-avatar-dec">
    <div class="avatar-area-wrap" @click="foucsMe">
      <router-link :to="VUE_CTX+'/author'" tag="img" :src="avatarObj.avatar" :onerror="'this.src=\''+avatarObj.face+'\';this.onerror=null;'"></router-link>
      <div class="panel-avatar-sign">
        <div class="name-wrap panel-aside-color">
          <span>{{avatarName}}</span>
          <span class="icon iconfont angeldown1"></span>
        </div>
        <div class="sign-wrap panel-aside-color">
          <span>{{avatarSign}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import blogUtils from "../../utils/BlogUtils";
  import BlogContext from "../../context/BlogContext";
  import blogApi from "../../utils/BlogApi";
  export default {

    name: "AvatarArea",
    components: {},
    created: function () {
      blogApi.loadAuthorHeadImg().then((res)=>{
        this.avatarObj=res;
      });
    },
    data: () => {
      return {
        avatarSign: BlogContext.avatarSign,
        avatarName:BlogContext.blogName,
        avatarObj:{face:'',avatar:''},
      }
    },
    methods:{
      showDefaultImg:function(dom){
        if(this.isInitError){
          return;
        }
        this.isInitError=true;
      },
      foucsMe: () => {
        blogApi.blogFollow().then((data) => {
          blogUtils.showInfoMsg(data);
        });
      },
    }
  }
</script>

<style lang="scss">
  #avatar_area:hover{
    background: url("https://cjunn.gitee.io/blog_theme_atum/img/body/float.gif");
    background-size: cover;
  }
  #avatar_area {
    font-size: 0;
    .avatar-area-wrap {
      position: relative;
      cursor: pointer;
      img {
        box-shadow: 2px 2px 3px #e1e1e1;
      }

      .name-wrap {
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 8px;
        margin-bottom: 2px;

        .icon {
          font-size: 2px;
          position: relative;
          top: 1px;
        }
      }

      .sign-wrap {
        cursor: pointer;
        text-align: center;
        margin-top: 4px;
        font-size: 12px;
      }
    }
  }
</style>
