<template>
  <div v-if="loading">
    <q-skeleton  type="rect" width="200px" />
    <q-skeleton  type="text"  width="150px"/>
  </div>
  <div v-else>
    <div class="text-h4">{{ title }}</div>

    <div class="text-subtitle1">{{ author }} - {{ publishedAt }}</div>
  </div>
</template>

<script>
import Post from "src/lib/domain/entities/post";
export default {

  components: {  },
  name: "PostDetailHeader",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    post: {
      type: Post,
      required: false,
    },
  },
  computed: {
    title() {
      if (!this.post) return undefined;
      return this.post.title;
    },
    author() {
      if (!this.post) return undefined;
      return this.post.author;
    },
    publishedAt() {
      if (!this.post) return "";
      return new Date(this.post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      });
    },
  }
};
</script>
