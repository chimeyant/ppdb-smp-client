<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :color="theme + `  darken-1`"
      src="info.apps_background_nav"
      app
      dark
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> SIM-PPDB </v-list-item-title>
          <v-list-item-subtitle> Ver.2.01 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="user.avatar"></v-img>
        </v-list-item-avatar>
        <!--<v-list-item-title>{{ user.username }} </v-list-item-title>-->
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.username }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <template v-for="(menu, index) in menus">
          <v-list-item
            :active-class="`white--text`"
            :to="menu.route"
            :key="index"
            v-if="menu.type === 'item'"
          >
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-subheader
            :class="menu.class"
            :key="index"
            class="overline mt-3"
            style="height: 24px"
            v-else-if="menu.type === 'subheader'"
          >{{ menu.title }}</v-subheader>
        </template>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      app
      :color="theme + ` lighten-1`"
      dark
    >

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        class="white--text"
        v-show="device.desktop"
      >
        {{
        info.company 
      }}</v-toolbar-title>

      <v-toolbar-title
        v-show="device.mobile"
        class="white--text"
      >SIM-PPDB</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">

          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="26">
              <v-img
                v-show="user.avatar"
                :src="user.avatar"
              ></v-img>
              <v-icon v-show="!user.avatar">mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list :color="theme + ` lighten-2`">
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  v-show="user.avatar"
                  :src="user.avatar"
                ></v-img>
                <v-icon v-show="!user.avatar">mdi-account-circle</v-icon>

              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="white--text">{{user.username ? user.username : "NO NAME"}}</v-list-item-title>
                <v-list-item-subtitle class="white--text">{{user.authent}}</v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item @click="$router.push({name:'profil-akun'})">
              <v-list-item-action>
                <v-icon>mdi-account-edit-outline</v-icon>
              </v-list-item-action>
              <v-list-item-title>Profil Akun</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push({name:'chngpwd'})">
              <v-list-item-action>
                <v-icon>mdi-account-key</v-icon>
              </v-list-item-action>
              <v-list-item-title>Ganti Kata Sandi</v-list-item-title>
            </v-list-item>

          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="theme"
              text
              @click="signout"
            >
              <v-icon color="red">mdi-logout</v-icon> Keluar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <div class="upload-wrapper">
      <div id="upload-button"></div>
    </div>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="3500"
      multi-line
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarClose"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialog.delete"
      persistent
      max-width="300px"
    >
      <v-card>
        <v-card-title
          class="headline red white--text"
          light
        >
          <v-icon
            color="white"
            class="pr-3"
          >report_problem</v-icon>
          <span>Konfirmasi</span>
        </v-card-title>
        <v-card-text>
          <p class="pt-5">Apakah anda yakin akan menghapus data tersebut...?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme"
            text
            @click="dialogDeleteClose"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="deleteRecord"
          >Ya, Saya Yakin</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center">
      <v-dialog
        v-model="loading.dialog"
        persistent
        width="300"
      >
        <v-card
          :color="theme"
          dark
        >
          <v-card-text class="pa-2">
            {{ loading.text }}
            <br />
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-center">
      <v-dialog
        v-model="upload.progress"
        persistent
        width="300"
      >
        <v-card>
          <v-card-title class="purple darken-1 pa-1 white--text subtitle-1">UPLOAD PROGRESS</v-card-title>
          <br />

          <v-card-text class="pa-2">
            <v-progress-linear
              v-model="upload.percent"
              color="purple darken-1"
              height="20"
              reactive
              dark
            >
            </v-progress-linear>
            <div class="text-center">{{ upload.percent }} %</div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import { baseMixins } from "../../mixings/BaseMixins";
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    drawer: null,
    vertical: true,
    bg: "",
    menu: false,
  }),

  mixins: [baseMixins],

  computed: {
    ...mapState([
      "snackbar",
      "theme",
      "thememode",
      "dialog",
      "user",
      "menus",
      "page",
      "device",
      "loading",
      "upload",
      "info",
    ]),
  },
  created() {
    this.bg = this.page.domainUrl + "images/bg-nav-purple-3.jpg";
  },
  mounted() {
    this.getAppInfo().then(() => {
      window.document.title = this.info.company;
      const favicon = window.document.getElementById("favicon");
      favicon.href = this.info.apps_logo;
    });
    this.getUserInfo();
    this.getMenus();
  },
  methods: {
    ...mapActions([
      "signOut",
      "snackbarClose",
      "postDelete",
      "dialogDeleteClose",
      "fetchRecords",
      "initUploadLibrary",
      "getUserInfo",
      "getMenus",
      "clearMenu",
      "getAppInfo",
    ]),

    signout: function () {
      this.clearMenu();
      this.signOut();
      this.$router.push({ name: "pengumuman" });
    },
    deleteRecord: function () {
      this.postDelete().then(() => {
        this.fetchRecords();
        this.dialogDeleteClose();
      });
    },
  },
};
</script>
