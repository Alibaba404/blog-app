<template>
  <!-- 侧边栏组件盒子 -->
  <div id="sidebar-box">
    <!-- 卡片 -->
    <div class="card mb-3">
      <!-- 上半部分 -->
      <div class="row">
        <div class="col-md-4 text-center">
          <img :src="param.user_weixin_url" class="img-fluid m-3" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <p class="card-text">• 技术干货分享</p>
            <p class="card-text">• 免费资料领取</p>
            <h5 class="card-title">• 扫码领取更多惊喜</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- 卡片 -->
    <div class="card mb-3">
      <!-- 上半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="card-title">社交</h5>
          </div>
        </div>
      </div>
      <hr class="mx-3 m-0" />
      <!-- 下半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <div class="card-text mb-2">QQ: {{ param.user_weixin_no }}</div>
            <div class="card-text mb-2">邮箱:{{ param.user_email }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 广告 -->
    <div class="row mb-3">
      <div class="col-md-12">
        <img :src="param.ad_url" class="img-fluid" style="width: 100%" />
      </div>
    </div>

    <!-- 卡片 -->
    <div class="card mb-3">
      <!-- 上半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="card-title">分类</h5>
          </div>
        </div>
      </div>
      <hr class="mx-3 m-0" />
      <!-- 下半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <div class="card-text mb-3" v-for="t in countArticleType">
              <a class="text-decoration-none" href="JavaScript:void(0);" @click="goArticleType(t)">
                {{ t.articleTypeName }}({{ t.articleTypeCount }})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 归档 -->
    <div class="card mb-3">
      <!-- 上半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="card-title">归档</h5>
          </div>
        </div>
      </div>
      <hr class="mx-3 m-0" />
      <!-- 下半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <div class="card-text mb-3" v-for="t in countArticle">
              <a class="text-decoration-none" href="JavaScript:void(0);" @click="goArchives(t)">
                {{ t.time }}({{ t.articleCount }})
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 友情链接 -->
    <div class="card mb-3">
      <!-- 上半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <h5 class="card-title">友情链接</h5>
          </div>
        </div>
      </div>
      <hr class="mx-3 m-0" />
      <!-- 下半部分 -->
      <div class="row">
        <div class="col-md-12">
          <div class="card-body">
            <div class="card-text mb-3">
              <a href="#" class="text-decoration-none">RBAC权限校验实战</a>
            </div>
            <div class="card-text mb-3">
              <a href="#" class="text-decoration-none">简单易懂的单例模式</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BlogSidebar",
  mounted() {
    this.getCountArticleType();
    this.getCountArticle();
    this.getParams();
  },
  data() {
    return {
      countArticleType: [],
      countArticle: [],
      param: {},
    };
  },
  methods: {
    getCountArticleType() {
      this.$http
        .get("/article/countArticleType")
        .then(({ data }) => {
          if (data.success) {
            this.countArticleType = data.data;
          }
        })
        .catch((res) => {});
    },
    getCountArticle() {
      this.$http
        .get("/article/countArticle")
        .then(({ data }) => {
          if (data.success) {
            this.countArticle = data.data;
          }
        })
        .catch((res) => {});
    },
    getParams() {
      this.$http
        .get("/param/getParams")
        .then(({ data }) => {
          if (data.success) {
            this.param = data.data;
          }
        })
        .catch((resp) => {});
    },
    goArchives(t) {
      this.$router.push(`/archives/${t.time}`);
    },
    goArticleType(t) {
      this.$router.push(`articleType/${t.articleTypeId}/${t.articleTypeName}`);
    },
  },
};
</script>
<style></style>
