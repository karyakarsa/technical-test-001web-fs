<template>
  <q-page>
    <PostDetailSection :post="post" :loading="loading" />
  </q-page>
</template>

<script>
import PostDetailSection from "src/components/molecules/post/PostDetailSection.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "PostDetailPage",
  components: { PostDetailSection },
  async mounted() {
    await this.getPostDetail(this.$route.params.slug);
  },
  computed: {
    ...mapState("post", ["post", "loading", "error"]),
  },
  methods: {
    ...mapActions("post", ["getPostDetail"]),
  },
};
</script>
