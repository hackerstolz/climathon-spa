import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "", redirect: "/overview" },
    { path: "/", redirect: "/overview" },

    // redirects for legacy routes
    { path: "/staff", redirect: "/overview/staff" },
    { path: "/speaker", redirect: "/overview/staff" },
    { path: "/jury", redirect: "/overview/staff" },
    { path: "/mentor", redirect: "/overview/staff" },
    { path: "/challenges", redirect: "/overview/challenges" },
    { path: "/challenges/:id", redirect: "/overview/challenges/:id" },

    // new routes
    {
      path: "/event",
      name: "event",
      components: {
        default: () =>
          import(/* webpackChunkName: "event" */ "./views/Event.vue")
      }
    },
    {
      path: "/overview",
      name: "overview",
      components: {
        default: () =>
          import(/* webpackChunkName: "overview" */ "./views/Overview.vue")
      }
    },
    {
      path: "/overview/:section",
      name: "overview",
      components: {
        default: () =>
          import(/* webpackChunkName: "overview" */ "./views/Overview.vue")
      }
    },
    {
      path: "/overview/:section/:id",
      name: "overviewDetails",
      components: {
        default: () =>
          import(/* webpackChunkName: "overview" */ "./views/Overview.vue")
      }
    }
  ]
});
