<template>
  <section class="row" id="post-detail-section" data-testid="postDetailSection">
    <div class="col-12 content-container">
      <div class="section-header-detail q-pa-md">
        <div class="text-h4" data-testid="postTitle" v-if="loading">
          <q-skeleton type="text" width="50%" />
        </div>
        <div class="text-h4" data-testid="postTitle" v-else>{{ title }}</div>
        <div
          class="text-subtitle2"
          data-testid="postDescription"
          v-if="isMobile && loading"
        >
          <q-skeleton type="text" width="30%" />
        </div>
        <div
          class="text-subtitle2"
          data-testid="postDescription"
          v-if="isMobile && !loading"
        >
          {{ description }}
        </div>
        <div class="text-subtitle2" data-testid="postAuthor" v-else>
          Author : {{ publishedAt }}
        </div>
      </div>
      <div class="thumbnail" data-testid="postThumbnail" v-if="loading">
        <q-skeleton width="200px" height="200px" type="QAvatar" />
      </div>
      <div class="thumbnail" data-testid="postThumbnail" v-else>
        <q-img :src="thumbnailUrl" alt="Post thumbnail" class="rounded-img" />
      </div>
    </div>
    <div class="col-12 bg-white q-pa-md">
      <div class="content content-container">
        <div data-testid="postContent" v-if="loading">
          <q-skeleton type="text" />
          <q-skeleton type="text" />
          <q-skeleton type="text" />
          <q-skeleton type="text" />
          <q-skeleton type="text" />
        </div>
        <div data-testid="postContent" v-else v-html="postContent"></div>
      </div>
      <div class="content content-container" v-if="haveProtectedContent">
        <div
          data-testid="postContentProtected"
          v-if="isAuthenticated"
          v-html="postContentProtected"
        ></div>
        <div v-else>
          <div class="section-protection" data-testid="unlockContent">
            <q-btn
              color="primary"
              label="Please login to see full content"
              @click="unlockContent"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PostDetailSection",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    post: {
      type: null,
      require: true,
    },
  },
  data() {
    return {
      isMobile: false,
    };
  },
  created() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkIfMobile);
  },
  methods: {
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768; // Change 768 to your mobile breakpoint
    },
    unlockContent() {
      this.$router.replace("/login");
    },
  },
  computed: {
    title() {
      if (!this.post) return undefined;
      return this.post.title;
    },
    description() {
      if (!this.post) return undefined;
      return this.post.description;
    },
    thumbnailUrl() {
      if (!this.post) return undefined;
      return this.post.thumbnailUrl;
    },
    publishedAt() {
      if (!this.post) return "";
      return this.post.postPublishedAt;
    },
    postContent() {
      if (!this.post) return undefined;
      return this.post.postContent;
    },
    postContentProtected() {
      if (!this.post) return undefined;
      return this.post.postContentProtected;
    },
    haveProtectedContent() {
      if (!this.post) return undefined;
      return this.post.haveProtectedContent;
    },
    ...mapGetters("auth", ["isAuthenticated"]),
  },
};
</script>

<style scoped>
.content-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative; /* Add this */
  margin-top: 20px;
}

.thumbnail {
  position: absolute;
  top: 100%;
  right: 0;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  z-index: 1;
  border-radius: 10px;
  background-color: #fe9494;
}

.rounded-img {
  border-radius: 10px;
  object-fit: cover;
}

@media (max-width: 600px) {
  .thumbnail {
    position: static;
    transform: none;
    width: 100%;
    height: auto;
    border-radius: 0;
  }
  .rounded-img {
    border-radius: 0;
  }
}
</style>
