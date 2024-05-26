<template>

  <div @click="openLink" class="posts-detail-content-link">
    <div class="row">
      <div class="col-10">
        <strong>{{ title }}</strong>
        <p>{{ description }}</p>
      </div>
      <div class="col-2">
        <q-img
          :src="image"
          width="100%"
          draggable="false"
          class="rounded-borders" />
      </div>
    </div>
  </div>
</template>

<script>
import PostContentLinkMeta from "src/lib/domain/entities/post_content_link_meta";
export default {
  name: "PostContentLink",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      required: false,
    },
    meta: {
      type: PostContentLinkMeta,
      required: false,
    }
  },
  methods: {
    openLink() {
      if (!this.link) return;
      window.open(this.link, "_blank");
    },
  },
  computed: {
    title() {
      if (!this.meta) return undefined;
      return this.meta.title;
    },
    description() {
      if (!this.meta) return undefined;
      return this.meta.description;
    },
    image() {
      if (!this.meta) return undefined;
      if (!this.meta.image) return undefined;
      if (!this.meta.image.url) return undefined;
      return this.meta.image.url;
    },
  },
};
</script>

<style lang="scss">
  .posts-detail-content-link {
    color: #000;
    text-decoration: none;
    border: 1px solid #ddd;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;

  }
  .posts-detail-content-link:hover {
    border-color:#000;
  }
</style>
