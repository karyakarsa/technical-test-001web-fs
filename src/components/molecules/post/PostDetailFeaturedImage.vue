<template>
  <div v-if="imageUrl == ''"></div>
  <div v-else>
    <q-img :src="imageUrl" :height="variableHeight" :width="variableWidth" />
  </div>
</template>

<script>
import Post from "src/lib/domain/entities/post";
export default {
  components: {  },
  name: "PostDetailFeaturedImage",
  data() {
    return {
      height: '200px',
      width: '100%',
    }
  },
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
    imageUrl() {
      if (!this.post) return '';
      return this.platform == 'mobile' ? this.post.coverImageUrl : this.post.thumbnailUrl;
    },
    variableHeight() {
      return this.platform == 'mobile' ? '200px' : '150px';
    },
    variableWidth() {
      return this.platform == 'mobile' ? '100%' : '150px';
    }
  },
};
</script>
