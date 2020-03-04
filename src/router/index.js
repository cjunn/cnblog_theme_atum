import Vue from 'vue'
import Router from 'vue-router'
import BlogMain from '@/components/BlogMain'
import BlogAuthorBody from "../components/body/author/BlogAuthorBody";
import BlogWorksBody from "../components/body/works/BlogWorksBody";
import BlogCategory from "../components/body/works/BlogCategory";
import BlogArticle from "../components/body/works/BlogArticle";
import BlogTag from "../components/body/works/BlogTag";
import BlogRedirect from "../utils/BlogRedirect";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: (e) => {
        return BlogRedirect.redirect(e);
      }
    },
    {
      path: '/cnblog',
      name: 'BlogMain',
      component: BlogMain,
      children: [
        {path: 'author', component: BlogAuthorBody},
        {
          path: 'works',
          component: BlogWorksBody,
          children: [
            {path: 'category/tag/:categoryId/:page', component: BlogTag, props: true},
            {path: 'category/:categoryType/:categoryId/:page', component: BlogCategory, props: true},
            {path: 'article/:pageId', component: BlogArticle, props: true},

          ]
        }
      ]
    },
    {
      path: '*',
      redirect: "/"
    }
  ]
});
