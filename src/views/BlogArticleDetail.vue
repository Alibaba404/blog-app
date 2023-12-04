<template>
  <div class="article-detail">
    <!-- 顶部导航栏 -->
    <div id="header-box"><BlogHeader /></div>
    <div class="row">
      <div class="col-md-12">
        <img src="../assets/image/see.jpg" class="img-fluid" style="width: 100%" />
        <div class="card my-3">
          <div class="card-body">
            <h2 class="card-title text-center my-3">{{ article.articleName }}</h2>
            <!-- 标题下面图标 -->
            <div class="icons-data text-center opacity-50">
              <span class="me-1">
                <i class="bi bi-folder2-open"></i>
                {{ article.articleTypeName }}
              </span>
              <span class="me-1">
                <i class="bi bi-tags"></i>
                {{ article.articleTag }}
              </span>
              <span class="me-1">
                <i class="bi bi-clock"></i>
                {{ article.createTime }}
              </span>
              <span class="me-1">
                <el-link :underline="false" @click.once="doStarClick">
                  <i class="el-icon-star-off fs-5" v-if="!article.isStarClick"></i>
                  <i class="el-icon-star-on fs-5" v-if="article.isStarClick"></i>
                </el-link>
                {{ article.articleStarNum }}
              </span>
              <span class="me-1">
                <i class="bi bi-book-half"></i>
                {{ article.articleReadCount }}
              </span>
            </div>
            <hr />
            <p class="px-3" v-html="article.articleContent"></p>
            <hr />
            <div>
              <h3>相关文章</h3>
              <ul>
                <li class="my-3" v-for="t in relatedArticles">
                  <a href="JavaScript:void(0);" @click="getArticleDetail(t)" class="text-decoration-none">
                    {{ t.articleName }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- 评论区 -->
            <div>
              <!-- 评论输入 -->
              <div class="text-bg-light py-3">
                <div class="row">
                  <div class="col-md-1 text-end pe-0">
                    <img src="../assets/image/p28.jpg" class="img-fluid rounded-circle" style="max-width: 45px" />
                  </div>
                  <div class="col-md-11 d-flex justify-content-between">
                    <input type="text" class="form-control" v-model="content" placeholder="请输入评论..." />
                    <button class="btn btn-primary mx-3" style="width: 120px" @click="submitArticleComment">
                      发表评论
                    </button>
                  </div>
                </div>
                <hr />
              </div>
              <!-- 文章评论列表 -->
              <div class="comment-item row" v-for="o in articleComments">
                <div class="col-md-1 text-end pe-0">
                  <img src="../assets/image/p28.jpg" class="img-fluid rounded-circle" style="max-width: 45px" />
                </div>
                <div class="col-md-11 d-flex flex-column align-items-start">
                  <div class="col-md-12 d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">游客:{{ o.nickname }}</h6>
                    <!-- 删除文章评论图标 -->
                    <span @click="delArticleComment(o.id)" class="me-3" style="cursor: pointer">
                      <el-tooltip class="item" effect="dark" content="删除当前评论" placement="bottom">
                        <i class="bi bi-trash3-fill fs-5"></i>
                      </el-tooltip>
                    </span>
                  </div>
                  <p class="text-body-tertiary mb-1">{{ o.createTime }}</p>
                  <p>{{ o.content }}</p>
                </div>
                <hr />
              </div>
              <!-- 评论分页条 -->
              <el-pagination
                layout="prev, pager, next"
                :total="totals"
                :page-size="pageSize"
                :current-page="page"
                @current-change="changePage"
              ></el-pagination>
              <div class="row">
                <div class="col-md-10">
                  转载声明：本博客由波波老师创作。可自由转载、引用，但需署名作者且注明文章出处。如转载至微信公众号，请在文未添加作者微信二维码。
                </div>
                <div class="col-md-2">
                  <img v-if="param.user_weixin_url" :src="param.user_weixin_url" class="img-fluid" />
                  <img v-else src="../assets/image/CSDN.png" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogHeader from "@/components/BlogHeader.vue";
import { nanoid } from "nanoid";
export default {
  name: "BlogArticleDetail",
  components: { BlogHeader },
  mounted() {
    // 传过来的文章Id
    this.articleId = this.$route.params.articleId;
    // 查询文章信息方法
    this.getArticle();
    this.getParams();
    //获取相关文章列表
    this.getRelatedArticles();
    // 获取文章评论
    this.getArticleComments();
    //增加阅读量:应该先缓存到本地,在未来的某个时间节点统一更新到数据库
    this.addArticleReadCount();
  },
  data() {
    return {
      articleId: null,
      article: {},
      param: {},
      // 当前文章的相关文章
      relatedArticles: [],
      // 用户评论
      content: "",
      // 文章评论列表
      articleComments: [],
      // // 是否点赞
      // isStarClick: false,
      totals: 10,
      page: 1,
      pageSize: 5,
    };
  },
  methods: {
    getArticle() {
      this.$http
        .get(`/article/${this.articleId}`)
        .then(({ data }) => {
          if (data.success) {
            this.article = data.data;
          }
        })
        .catch((resp) => {});
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
    // 获取相关文章列表
    getRelatedArticles() {
      this.$http
        .get(`/article/getRelatedArticles/${this.articleId}`)
        .then(({ data }) => {
          if (data.success) {
            this.relatedArticles = data.data;
          }
        })
        .catch((resp) => {});
    },
    getArticleDetail(t) {
      this.$router.push(`/detail/${t.id}`);
      this.articleId = t.id;
      this.getArticle();
      this.getRelatedArticles();
    },
    // 获取文章所有评论
    getArticleComments() {
      if (this.articleId) {
        let articleCommentQuery = {
          currentPage: this.page,
          pageSize: this.pageSize,
          articleId: this.articleId,
        };
        this.$http
          .post(`/article/getArticleCommentPage`, articleCommentQuery)
          .then(({ data }) => {
            if (data.success) {
              this.articleComments = data.data.content;
              this.totals = data.data.totalElements;
            }
          })
          .catch((resp) => {});
      }
    },
    // 提交评论信息
    submitArticleComment() {
      let articleCommentObj = {
        content: this.content,
        nickname: nanoid(),
        articleId: this.articleId,
      };
      this.$http
        .put("/article/addNewArticleComment", articleCommentObj)
        .then(({ data }) => {
          if (data.success) {
            // 更新文章评论
            this.getArticleComments();
          } else {
            this.$message.error(data.message);
          }
          // 清空评论输入框
          this.content = "";
        })
        .catch((resp) => {});
    },
    // 删除评论
    delArticleComment(articleCommentId) {
      if (articleCommentId) {
        this.$http
          .delete(`/article/delArticleComment/${articleCommentId}`)
          .then(({ data }) => {
            if (data.success) {
              //删除成功
              this.getArticleComments();
              this.$message.success("评论删除成功!");
            }
          })
          .catch((resp) => {});
      }
    },
    // 增加文章阅读量
    addArticleReadCount() {
      if (this.articleId) {
        this.$http
          .post(`/article/addArticleReadCount/${this.articleId}`)
          .then(({ data }) => {})
          .catch((res) => {});
      }
    },
    // 点赞
    doStarClick() {
      if (this.articleId) {
        this.article.isStarClick = true;
        this.$http
          .post(`/article/addArticleStarNum/${this.articleId}`)
          .then(({ data }) => {
            if (data.success) {
              if (data.data) {
                this.$message.success("感谢您喜欢这篇文章!");
                // 不用再次请求
                this.article.articleStarNum++;
              }
            }
          })
          .catch((res) => {});
      }
    },
    // 改变评论分页
    changePage(page) {
      this.page = page;
      this.getArticleComments();
    },
  },
};
</script>
<style></style>
