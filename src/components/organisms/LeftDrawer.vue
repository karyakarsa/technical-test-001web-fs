<template>
  <q-drawer
    show-if-above
    v-model="isShown"
    side="left"
    bordered
    content-class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item v-if="isAuthenticated && user && user.email">
          <q-item-section>
            <q-item-label class="text-h6"> Hello </q-item-label>
            <p>{{ user.email }}</p>
          </q-item-section>
        </q-item>
        <q-item clickable to="/" v-ripple>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section> Home </q-item-section>
        </q-item>
        <q-separator />

        <q-item v-if="!isAuthenticated" clickable to="/login" v-ripple>
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section> Login </q-item-section>
        </q-item>

        <q-item v-else clickable class="text-red" @click="logout" v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> Logout </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "LeftDrawer",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShown: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  mounted() {
    this.isShown = this.show;
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
  watch: {
    show() {
      this.isShown = this.show;
    },
  },
};
</script>
