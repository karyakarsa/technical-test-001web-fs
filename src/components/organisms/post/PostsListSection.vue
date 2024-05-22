<template>
  <section class="flex justify-center" id="posts-list-section">
    <q-card class="posts-container">
      <q-card-section>
        <div class="text-h6">Posts</div>

        <div class="text-subtitle2">Posts that I've written</div>
      </q-card-section>

      <q-scroll-area style="height: 460px">
        <q-list v-if="loading">
          <PostListItem :loading="true" />
          <PostListItem :loading="true" />
          <PostListItem :loading="true" />
        </q-list>
        <q-list v-else>
          <PostListItem v-for="post in posts" :key="post.id" :post="post" />
        </q-list>
      </q-scroll-area>
    </q-card>
  </section>
</template>

<script>
import PostListItem from "src/components/molecules/post/PostListItem.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { PostListItem },
  name: "PostsListSection",
  async mounted() {
    await this.getPosts();
  },
  computed: {
    ...mapState("post", ["posts", "loading", "error"]),
  },
  methods: {
    ...mapActions("post", ["getPosts"]),
  },
};
</script>

<style lang="scss">
#posts-list-section {
  width: 100%;
  max-width: 600px;
  .posts-container {
    width: 100%;
    max-width: 512px;
  }
}
</style>
