<template>
  <q-page class="flex justify-center items-center" padding>
    <posts-list-section />
  </q-page>
</template>

<script>
import PostsListSection from "components/organisms/post/PostsListSection.vue";

export default {
  name: "PageHome",
  components: { PostsListSection },
};
</script>
