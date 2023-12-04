<template>
  <div>
    <BlogHeader />
    <div class="row">
      <div class="col-md-12">
        <img src="../assets/image/see.jpg" style="width: 100%" class="img-fluid" />
        <div class="card my-3">
          <div class="card-body">
            <h2 class="card-title text-center my-3">{{ articleTypeName }}</h2>
            <div class="mx-3">
              <p v-for="(t, i) in articles">
                <a href="JavaScript:void(0);" @click="goArticleDetailPage(t)" class="text-decoration-none">
                  <h5>{{ ++i }}.{{ t.articleName }}</h5>
                </a>
              </p>
            </div>
            <hr class="my-4" />
            <div class="row">
              <div class="col-md-10">
                转载声明：本博客由波波老师创作。可自由转载、引用，但需署名作者且注明文章出处。如转载至微信公众号，请在文未添加作者微信二维码。
              </div>
              <div class="col-md-2">
                <img src="../assets/image/CSDN.png" class="img-fluid" />
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
export default {
  name: "BlogArticleType",
  components: { BlogHeader },
  mounted() {
    this.articleTypeId = this.$route.params.articleTypeId;
    this.articleTypeName = this.$route.params.articleTypeName;
    this.getArticleByArticleType();
  },
  data() {
    return {
      articleTypeId: null,
      articles: [],
      articleTypeName: "",
    };
  },
  watch: {
    $route(to, from) {
      this.$router.push(to.path);
      this.articleTypeId = to.params.articleTypeId;
      this.articleTypeName = to.params.articleTypeName;
      this.getArticleByArticleType();
    },
  },
  methods: {
    getArticleByArticleType() {
      this.$http
        .get(`/article/getArticleByArticleType/${this.articleTypeId}`)
        .then(({ data }) => {
          if (data.success) {
            this.articles = data.data;
          }
        })
        .catch((resp) => {});
    },
    // 跳转到文章详情
    goArticleDetailPage(t) {
      this.$router.push(`/detail/${t.id}`);
    },
  },
};
</script>
<style></style>
