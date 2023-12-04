import Vue from "vue";
import VueRouter from "vue-router";
import BlogArticles from "../views/BlogArticles.vue";
import BlogArchives from "@/views/BlogArchives";
import BlogArticleDetail from "@/views/BlogArticleDetail";
import BlogIndex from "@/views/BlogIndex";
import BlogArticleType from "@/views/BlogArticleType";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: BlogIndex,
    children: [
      {
        path: "/",
        name: "home",
        component: BlogArticles,
      },
      {
        path: "/detail/:articleId",
        name: "detail",
        component: BlogArticleDetail,
      },
      {
        path: "/archives/:time",
        name: "archives",
        component: BlogArchives,
      },
      {
        path: "/articleType/:articleTypeId/:articleTypeName",
        name: "articleType",
        component: BlogArticleType,
      },
    ],
  },
];

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
