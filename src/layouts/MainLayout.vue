<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <leftDrawer :show="left" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import leftDrawer from "src/components/organisms/leftDrawer.vue";
import { supabase } from "src/lib/common/supabaseClient";
export default {
  components: { leftDrawer },
  name: "MainLayout",
  mounted() {
    // this.$store.commit("setShowLeftDrawer", true);
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
  data() {
    return {
      left: false,
    };
  },
};
</script>
