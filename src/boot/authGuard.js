// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ router, store }) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  router.beforeEach((to, from, next) => {
    next();
  });
};
