<template>
  <!-- 顶部导航栏 -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="../assets/image/itsource-w.png" style="height: 40px" />
      </a>
      <!-- 右边移动端按钮 -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <!-- 按钮图标 -->
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 
            可收缩的导航菜单
            justify-content-between:两端对齐
            ms-5:margin-left/padding-left:1rem * 3
         -->
      <div class="collapse navbar-collapse justify-content-between ms-5" id="navmenu">
        <!-- 导航内容 -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" href="/" id="home-link">
              <i class="bi bi-house-door"></i>
              首页
            </a>
          </li>
          <li class="nav-item">
            <a href="JavaScript:void(0);" class="nav-link" @click="goArchives">
              <i class="bi bi-alarm"></i>
              归档
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-card-list"></i>
              分类
            </a>
            <!-- 
                dropdown-menu-dark:下拉列表暗黑模式
               -->
            <ul class="dropdown-menu dropdown-menu-dark">
              <li v-for="t in countArtucleType">
                <a class="dropdown-item" href="JavaScript:void(0);" @click="goArticleTypePage(t)">
                  {{ t.articleTypeName }}({{ t.articleTypeCount }})
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" id="about-me-link">
              <i class="bi bi-people"></i>
              关于我
            </a>
          </li>
        </ul>

        <div class="navbar-nav">
          <!-- 搜索框 -->
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" v-model="keywords" placeholder="请输入..." />
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="doGetArticle">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "BlogHeader",
  mounted() {
    this.getCountArticleType();
  },
  data() {
    return {
      countArtucleType: [],
      keywords: "",
    };
  },
  methods: {
    getCountArticleType() {
      this.$http
        .get("/article/countArticleType")
        .then(({ data }) => {
          if (data.success) {
            this.countArtucleType = data.data;
          }
        })
        .catch((res) => {});
    },
    doGetArticle() {
      // 触发组件上的方法
      this.$emit("doGetArticles", this.keywords);
    },
    goArchives() {
      this.$router.push("/archives/all");
    },
    // 文章分类跳转
    goArticleTypePage(t) {
      this.$router.push(`/articleType/${t.articleTypeId}/${t.articleTypeName}`);
    },
  },
};
</script>
<style></style>
