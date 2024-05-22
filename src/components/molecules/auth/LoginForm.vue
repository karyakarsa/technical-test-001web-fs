<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      filled
      v-model="email"
      label="Email *"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Email is required',
        (val) => val.includes('@') || 'Please enter a valid email',
      ]"
    />
    <q-btn type="submit" :loading="loading" size="md" color="primary"
      >Send me your magic link!</q-btn
    >
  </q-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
    };
  },
  computed: {
    ...mapState("auth", ["loading", "error"]),
  },
  methods: {
    ...mapActions("auth", ["sendMagicLink"]),
    async onSubmit() {
      const result = await this.sendMagicLink(this.email);

      if (result) {
        // show toast
        this.$q.notify({
          color: "positive",
          message: "Check your email for the magic link",
        });
      }
    },
  },
};
</script>
