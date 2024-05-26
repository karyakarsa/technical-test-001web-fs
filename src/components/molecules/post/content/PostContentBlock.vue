<template>
  <PostContentHeading v-if="block.type == 'header'" :text="block.data.text" :level="block.data.level" />
  <PostContentParagraph v-else-if="block.type == 'paragraph'" :text="block.data.text" />
</template>

<script>
import PostBlock from "src/lib/domain/entities/post_block";
import PostContentHeading from "src/components/molecules/post/content/PostContentHeading.vue";
import PostContentParagraph from "src/components/molecules/post/content/PostContentParagraph.vue";

export default {
  components: { PostContentHeading, PostContentParagraph },
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
