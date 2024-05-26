<template>
  <section class="flex" id="posts-detail-section">
    <div class="posts-detail-container">
      <!-- load header section -->
      <q-card>
        <q-card-section>
          <q-icon :name="matArrowBack" size="25px" @click="back"/>
          <div class="posts-detail-header">
            <PostDetailHeader :loading="loading" :post="post" />
          </div>
        </q-card-section>
      </q-card>
      <!-- load image -->
      <div v-bind:class="[mediaQueryPlatform == 'desktop' ? 'posts-detail-image floated': '']">
        <PostDetailFeaturedImage :loading="loading" :post="post" :platform="mediaQueryPlatform" />
      </div>
      <!-- load content -->
      <div class="row">
        <div class="col-md-8 col-sm-9 col-xs-12">
          <PostDetailContent :loading="loading" :post="post" />
          <div v-if="needLogin" class="flex justify-center items-center need-login">
            <q-btn
              size="sm"
              color="primary"
              label="Please login to see full content"
              @click="() => $router.push('/login')" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PostDetailFeaturedImage from "src/components/molecules/post/PostDetailFeaturedImage.vue";
import PostDetailHeader from "src/components/molecules/post/PostDetailHeader.vue";
import PostDetailContent from "src/components/molecules/post/PostDetailContent.vue";
import PostBlock from "src/lib/domain/entities/post_block";
import { mapActions, mapState } from "vuex";
import { matArrowBack } from '@quasar/extras/material-icons'

export default {
  components: {
    PostDetailFeaturedImage,
    PostDetailContent,
    PostDetailHeader
  },
  name: "PostDetailSection",
  async mounted() {
    await this.getPostBySlug(this.$route.params.slug);
    if (!this.post) return this.$router.push("/404");
  },
  computed: {
    ...mapState("post", ["post", "loading", "error"]),
    blocks() {
      if (!this.post.content || this.post.content.blocks.length === 0) return [];
      return this.post.content.blocks.map((block) => PostBlock.fromJson(block));
    },
    needLogin() {
      if (!this.post) return false;
      return this.post.needLogin;
    },
  },
  methods: {
    ...mapActions("post", ["getPostBySlug"]),
    back() {
      this.$router.back();
    },
  },
  created() {
    this.matArrowBack = matArrowBack
    // get media query size
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 600) {
      this.mediaQueryPlatform = "mobile";
    } else {
      this.mediaQueryPlatform = "desktop";
    }
    const self = this;
    window.addEventListener("resize", () => {
      self.screenWidth = window.innerWidth;
    });
  },
  data() {
    return {
      // posts: [],
      mediaQueryPlatform: null,
      screenWidth: 0
    };
  },
  watch: {
    screenWidth(val) {
      if (val < 600) {
        this.mediaQueryPlatform = "mobile";
      } else {
        this.mediaQueryPlatform = "desktop";
      }
    },
  },
};
</script>

<style lang="scss">
#posts-detail-section {
  width: 100%;
  .posts-detail-container {
    width: 100%;
    .posts-detail-header {
       padding: 15px 0;
    }
  }
}

.posts-detail-image.floated {
  position: relative;
  .q-img {
    position: absolute;
    top: -75px;
    right: 30px;
  }
}

.need-login {
  background: #f5f5f5;
  min-height: 150px;
  margin: 5px 10px;
}
</style>
