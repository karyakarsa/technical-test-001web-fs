<template>
  <h1 class="text-h4" v-if="level == 1">{{ text }}</h1>
  <h2 class="text-h5" v-else-if="level == 2">{{ text }}</h2>
  <h3 class="text-h6" v-else-if="level == 3">{{ text }}</h3>
  <h4 class="text-h7" v-else-if="level == 4">{{ text }}</h4>
  <h5 class="text-h8" v-else-if="level == 5">{{ text }}</h5>
  <h6 class="text-h9" v-else-if="level == 6">{{ text }}</h6>
  <span v-else></span>
</template>

<script>

export default {
  name: "PostContentHeading",
  props: {
    text: {
      type: String,
      required: false,
    },
    level: {
      type: Number,
      required: false,
      default: 1,
    },
  },
};
</script>
