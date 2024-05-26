<template>
  <PostContentHeading v-if="block.type == 'header'" :text="block.data.text" :level="block.data.level" />
  <PostContentParagraph v-else-if="block.type == 'paragraph'" :text="block.data.text" />
  <PostContentLink v-else-if="block.type == 'link'" :link="block.data.link" :meta="block.data.meta" />
</template>

<script>
import PostBlock from "src/lib/domain/entities/post_block";
import PostContentHeading from "src/components/molecules/post/content/PostContentHeading.vue";
import PostContentParagraph from "src/components/molecules/post/content/PostContentParagraph.vue";
import PostContentLink from "src/components/molecules/post/content/PostContentLink.vue";

export default {
  components: { PostContentHeading, PostContentParagraph, PostContentLink },
  name: "PostContentBlock",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    block: {
      type: PostBlock,
      required: true,
    },
  },
};
</script>
