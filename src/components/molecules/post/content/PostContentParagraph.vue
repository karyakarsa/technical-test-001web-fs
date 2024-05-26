<template>
  <p v-html="text"></p>
</template>

<script>

export default {
  name: "PostContentParagraph",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
};
</script>
