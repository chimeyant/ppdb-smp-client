<template>
  <v-app-bar
    app
    color="white"
    light
    elevate-on-scroll
  >
    <v-toolbar-title>

      <img
        :src="info.apps_logo"
        width="30px"
        height="30px"
        alt=""
        srcset=""
        class="mr-2"
      >

      <span
        class="hidden-sm-and-down"
        style="padding-bottom:10px ;"
      >{{ info.company}}</span>
      <span class="hidden-md-and-up">
        {{ info.apps_title }}
      </span>

    </v-toolbar-title>
    <v-spacer />
    <v-list class="d-flex">
      <v-list-item
        class="hidden-sm-and-down"
        link
        v-for="(menu,index) in menus"
        :key="index"
        :to="menu.route"
      >
        <v-list-item-title>{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-btn
      text
      class="hidden-sm-and-down"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-show="device.mobile"
          icon
          light
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>

        <v-list-item>
          <v-list-item-title @click="$router.push({ name: 'pengumuman' })">
            Pengumuman
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title @click="$router.push({ name: 'login' })">
            Login
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "header",
  data: () => ({
    menus: [
      { title: "Pengumuman", route: "/pengumuman" },
      { title: "Login", route: "login" },
    ],
  }),
  mounted() {},
  computed: {
    ...mapState(["device", "theme", "info"]),
  },
};
</script>

<style>
.v-toolbar__title {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: cornflowerblue;
}
</style>