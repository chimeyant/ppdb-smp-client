import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../providers/AuthProviders";
import BaseFrontend from "../views/frontend/Base.vue";
import Home from "../views/frontend/Home.vue";

import Pagu from "../views/frontend/Pagu.vue";
import DaftarPeserta from "../views/frontend/DaftarPeserta.vue";
import Pengumuman from "../views/frontend/Pengumuman.vue";
import Registrasi from "../views/frontend/Registrasi.vue";
import Login from "../views/frontend/Login.vue";

//import Login from "../views/auth/Login.vue";
//import Register from "../views/auth/Register.vue";

import Dashboard from "../views/backend/pages/Dashboard.vue";

import Base from "../views/backend/Base.vue";

import User from "../views/backend/pages/User.vue";
import Changepwd from "../views/backend/pages/user/Changepwd.vue";
import ProfilAkun from "../views/backend/pages/user/Profil.vue";

//page master data
import MasterProfilSekolah from "../views/backend/pages/masterdata/profilsekolah/Index.vue";
import MasterKelulusan from "../views/backend/pages/masterdata/kelulusan/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "",
    component: BaseFrontend,
    children: [
      { path: "", redirect: { name: "pengumuman" } },
      {
        path: "pengumuman",
        name: "pengumuman",
        component: Pengumuman,
      },

      {
        path: "login",
        name: "login",
        component: Login,
      },
    ],
  },
  {
    path: "/backend",
    name: "",
    meta: {
      auth: true,
    },
    component: Base,
    children: [
      { path: "", redirect: { name: "dashboard" } },
      { path: "dashboard", name: "dashboard", component: Dashboard },
      { path: "user", name: "user", component: User },
      {
        path: "chngpwd",
        name: "chngpwd",
        component: Changepwd,
      },
      {
        path: "profil-akun",
        name: "profil-akun",
        component: ProfilAkun,
      },
      //route master data
      {
        path: "master-profil-sekolah",
        name: "master-profil-sekolah",
        component: MasterProfilSekolah,
      },
      {
        path: "master-kelulusan",
        name: "master-kelulusan",
        component: MasterKelulusan,
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history",
});

/**
 * router match
 */

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth);
  if (requiresAuth) {
    if (!Auth.check) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (to.name === "login" && Auth.check) {
      if (Auth.user.authent == "peserta") {
        next({ name: "dashboard-peserta" });
      } else {
        next({ name: "dashboard" });
      }
    } else {
      next();
    }
  }
});

export default router;
