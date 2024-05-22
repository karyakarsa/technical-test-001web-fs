<template>
  <q-item data-testid="postItem" clickable :to="url">
    <q-item-section v-if="loading" avatar>
      <q-skeleton width="64px" height="64px" type="QAvatar" />
    </q-item-section>

    <q-item-section
      data-testid="postThumbnailItemSection"
      v-if="!loading && thumbnailUrl"
      avatar
    >
      <q-img
        data-testid="postThumbnail"
        :src="thumbnailUrl"
        width="64px"
        draggable="false"
        class="rounded-borders"
      />
    </q-item-section>
    <q-item-section v-if="loading">
      <q-skeleton type="text" />
      <q-skeleton type="text" />
    </q-item-section>
    <q-item-section v-else>
      <div data-testid="postTitle" class="text-h6">{{ title }}</div>

      <p data-testid="postDescription" class="wrap">
        {{ description }}
      </p>
    </q-item-section>

    <q-item-section v-if="loading" avatar>
      <q-skeleton text />
    </q-item-section>
    <q-item-section v-else avatar>{{ publishedAt }}</q-item-section>
  </q-item>
</template>

<script>
import Post from "src/lib/domain/entities/post";

export default {
  name: "PostListItem",
  props: {
    loading: {
      type: Boolean,
      default: false,
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
    description() {
      if (!this.post) return undefined;
      return this.post.description;
    },
    thumbnailUrl() {
      if (!this.post) return undefined;
      return this.post.thumbnailUrl;
    },
    url() {
      if (!this.post) return undefined;
      return this.post.url;
    },
    publishedAt() {
      if (!this.post) return "";

      return new Date(this.post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
};
</script>
