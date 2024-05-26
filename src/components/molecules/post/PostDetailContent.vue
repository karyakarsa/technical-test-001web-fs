<template>
  <div v-if="loading" style="padding: 5px 10px">
    <q-skeleton type="rect" width="300px" />
    <q-skeleton type="text" width="70%"/>
    <q-skeleton type="text" width="90%" />
    <q-skeleton type="text" width="100%" />
    <q-skeleton type="text" width="90%" />
    <q-skeleton type="text" width="100%" />
    <q-skeleton type="text" width="70%"/>
  </div>
  <div v-else>
    <PostContentBlock  style="padding: 5px 10px" v-for="block in blocks" :key="block.id" :block="block" />
  </div>
</template>

<script>
import PostContentBlock from "src/components/molecules/post/content/PostContentBlock.vue";
import Post from "src/lib/domain/entities/post";
import PostBlock from "src/lib/domain/entities/post_block";
export default {
  components: { PostContentBlock },
  name: "PostDetailContent",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    post: {
      type: Post,
      required: false,
    },
    platform: {
      type: String,
      required: false,
      default: 'mobile'
    },
  },
  computed: {
    blocks() {
      if (!this.post) return [];
      return this.post.content.blocks.map((block) => PostBlock.fromJson(block))
    },
  },
};
</script>
