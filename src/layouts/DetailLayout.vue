<template>
  <q-layout view="lHh Lpr fff" class="layout">
    <q-header class="header">
      <q-toolbar class="content-container">
        <q-btn flat dense v-if="$route.path === '/'"> Title </q-btn>
        <q-btn flat dense round @click="goBack" v-if="$route.path !== '/'">
          <q-icon name="arrow_back" />
        </q-btn>
        <q-space />
        <q-btn flat dense @click="logout" v-if="isAuthenticated">
          Logout
        </q-btn>
        <q-btn flat dense @click="navigateToLogin" v-if="!isAuthenticated">
          Login
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { supabase } from "src/lib/common/supabaseClient";
export default {
  name: "DetailLayout",
  data() {
    return {
      authenticated: false,
    };
  },
  mounted() {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_OUT") {
        this.$store.commit("auth/logout");
      } else {
        if (session && session.user) {
          this.$store.commit("auth/setUser", session.user);
        }
      }
    });
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    logout() {
      this.$store.commit("auth/logout");
    },
    navigateToLogin() {
      if (this.$route.path !== "/login") {
        this.$router.replace("/login");
      }
    },
    ...mapActions("auth", ["logout"]),
  },
};
</script>

<style scoped>
.layout {
  background-color: #f5f5f5;
}

.header {
  background-color: #f5f5f5;
  color: #888888;
  height-hint: 64px;
}
</style>
