<template>
  <q-page
    class="flex"
    style="min-height: 100vh"
  >
    <PostDetailSection />
  </q-page>
</template>

<script>
import PostDetailSection from "src/components/organisms/post/PostDetailSection.vue";
import { mapGetters } from "vuex";

export default {
  components: { PostDetailSection },
  name: "PostDetailPage",
  computed: {
    // ...mapGetters("auth", ["isAuthenticated"]),
  },
  watch: {
    isAuthenticated(val) {

    },
  },
};
</script>
