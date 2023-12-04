<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div id="header-box"><BlogHeader @doGetArticles="getArticles" /></div>
    <!-- 中间内容区 -->
    <main class="container" style="margin-top: 80px" id="main-container">
      <div class="row mt-3">
        <!-- 左边内容文章区 -->
        <div class="col-md-8">
          <!-- 卡片 -->
          <div class="card mb-3" v-for="a in articles">
            <!-- 上半部分 -->
            <div class="row">
              <div class="col-md-3 text-center">
                <img :src="a.articlePic" class="img-fluid m-3" @click="readArticle(a)" />
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">
                    <!-- 绑定点击事件id -->
                    <a href="JavaScript:void(0);" class="text-decoration-none" id="detail-link" @click="readArticle(a)">
                      {{ a.articleName }}
                    </a>
                  </h5>
                  <p class="card-text opacity-50" style="font-family: Georgia">• {{ a.createTime }}</p>
                  <p class="card-text">
                    <small class="text-muted">{{ a.articleRemark }}</small>
                  </p>
                </div>
              </div>
            </div>
            <hr class="mx-3 m-0 mt-3" />
            <!-- 下半部分 -->
            <div class="d-flex justify-content-between align-items-center m-3">
              <div class="d-flex">
                <div class="me-2">
                  <span>
                    <i class="bi bi-folder2-open"></i>
                    &nbsp;{{ a.articleTypeName }}
                  </span>
                </div>
                <div class="me-2">
                  <span>
                    <i class="bi bi-tags"></i>
                    &nbsp;{{ a.articleTag }}
                  </span>
                </div>
              </div>
              <button class="btn btn-primary" @click="readArticle(a)">阅读全文</button>
            </div>
          </div>

          <!-- 分页条 -->
          <div id="ui-pagination" class="text-end mb-3 overflow-auto">
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[3, 5, 10, 15]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totals"
              @current-change="handleCurrentPage"
              @size-change="handlePageSize"
            ></el-pagination>
          </div>
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
// @ is an alias to /src
import BlogHeader from "@/components/BlogHeader.vue";
import BlogSidebar from "@/components/BlogSidebar.vue";

export default {
  name: "Home",
  mounted() {
    this.getArticles(this.keywords);
  },
  components: { BlogHeader, BlogSidebar },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totals: 0,
      articles: [],
      articleState: 1,
      keywords: "",
    };
  },
  methods: {
    handleCurrentPage(page) {
      this.currentPage = page;
      this.getArticles(this.keywords);
    },
    handlePageSize(pageSize) {
      this.pageSize = pageSize;
      this.getArticles(this.keywords);
    },
    getArticles(keywords) {
      this.keywords = keywords;
      this.$http
        .post("/article", {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          articleState: this.articleState,
          keywords: this.keywords,
        })
        .then(({ data }) => {
          if (data.success) {
            this.articles = data.data.list;
            this.totals = data.data.total;
          }
        });
    },
    // 阅读全文
    readArticle(article) {
      this.$router.push(`/detail/${article.id}`);
    },
  },
};
</script>
