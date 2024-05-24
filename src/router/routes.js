const routes = [
  {
    path: "/",
    component: () => import("layouts/DetailLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/login", component: () => import("pages/auth/LoginPage.vue") },
    ],
  },
  {
    path: "/posts/:slug",
    component: () => import("layouts/DetailLayout.vue"),
    children: [
      { path: "", component: () => import("pages/post/PostDetailPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
