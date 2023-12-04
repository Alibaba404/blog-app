<template>
  <div>
    <!-- 顶部导航栏 -->
    <BlogHeader />
    <!-- 内容区 -->
    <main class="container" style="margin-top: 80px" id="main-container">
      <div class="row mt-3">
        <!-- 左边内容文章区 -->
        <div class="col-md-8">
          <!-- Section: Timeline -->
          <section style="background-color: #f0f2f5">
            <div class="container">
              <div class="row">
                <div class="timebox card bg-light">
                  <div class="timeline mt-3" v-for="(article, i) in articleArchivist">
                    <h3>{{ article.year }}年</h3>
                    <ul v-for="(subArticle, j) in article.articleList">
                      <li>
                        <h4>
                          {{ subArticle.day }}日
                          <span>{{ subArticle.month }}月</span>
                        </h4>
                        <a href="javascript:void(0);" @click="goArtcleDetail(subArticle)">
                          {{ subArticle.articleName }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- 右边 -->
        <div class="col-md-4">
          <BlogSidebar />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import BlogHeader from "@/components/BlogHeader.vue";
import BlogSidebar from "@/components/BlogSidebar.vue";
export default {
  name: "BlogArchives",
  components: { BlogSidebar, BlogHeader },
  mounted() {
    // 获取时间
    this.time = this.$route.params.time;
    this.getArticleArchivist();
  },
  watch: {
    $route(to, from) {
      this.$router.push(to.path);
      this.time = to.params.time;
      this.getArticleArchivist();
    },
  },
  data() {
    return {
      // 归档列表
      articleArchivist: [],
      time: "",
    };
  },
  methods: {
    // 获取归档文章
    getArticleArchivist() {
      this.$http.get(`/article/getArticleArchivist/${this.time}`).then(({ data }) => {
        if (data.success) {
          this.articleArchivist = data.data;
        }
      });
      // 回到顶部
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    // 文章详情跳转
    goArtcleDetail(article) {
      this.$router.push(`/detail/${article.id}`);
    },
  },
};
</script>
<style scoped>
input.search:focus {
  outline: none;
  box-shadow: none;
}

#demo li:hover {
  background: #99ccff;
}

.read:hover {
  background-color: black;
}

.timebox {
  width: 100%;
  background: url(../assets/image/timeline.gif) repeat-y 212px 0;
}

.timebox h3 {
  height: 44px;
  line-height: 44px;
  color: #666666;
  font-weight: bold;
  padding-left: 75px;
  background: url(../assets/image/timeline-clock.gif) rgba(248, 249, 250) no-repeat 179px 0;
}

.timeline ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline ul li {
  background: url(../assets/image/timeline-dot.gif) no-repeat 193px 5px;
  padding-bottom: 20px;
}

.timeline ul li h4 {
  float: left;
  width: 180px;
  text-align: right;
}

.timeline ul li h4 span {
  color: #666666;
  font-size: 14px;
}

.timeline ul li a {
  margin-left: 41px;
  margin-top: 5px;
  font-size: 16px;
  color: #505050;
}

.timeline ul li a:hover {
  text-decoration: none;
  color: #29afec;
}
</style>
