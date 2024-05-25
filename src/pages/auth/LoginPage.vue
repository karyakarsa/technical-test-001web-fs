<template>
  <q-page
    class="flex justify-center items-center"
    style="min-height: 100vh"
    padding
  >
    <q-card style="max-width: 600px" class="full-width">
      <q-card-section>
        <div class="text-h5 text-center q-pb-md">Login</div>
        <p class="text-center text-subtitle">
          Enter your email address and we'll send you a magic link
        </p>
      </q-card-section>
      <q-card-section>
        <LoginForm :redirectTo="link" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import LoginForm from "src/components/molecules/auth/LoginForm.vue";
import { mapGetters } from "vuex";

export default {
  components: { LoginForm },
  name: "LoginPage",
  data() {
    return {
      link: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.link = from.fullPath;
    });
  },
  watch: {
    isAuthenticated(val) {
      if (val) {
        this.$router.replace("/");
      }
    },
  },
};
</script>
