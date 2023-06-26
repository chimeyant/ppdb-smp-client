<template>
  <v-app
    id="inspire"
    v-cloak
  >
    <v-app-bar
      class="transparent"
      elevation="0"
      absolute
    >
      <v-toolbar-title
        :class="device.mobile ? `pl-2` : `pl-0`"
        v-if="!device.mobile"
      >
        <span class="font-weight-bold white--text">{{ info.company }}</span><br />
        <span class="font-weight-light text-xs white--text">{{
          info.slogan
        }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        icon
        class="pa-5 mr-5"
        @click="$router.push({ name: 'home' })"
      >
        <v-icon color="white">home</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="session-wrapper">
      <v-main
        class="grey lighten-4"
        :class="{ 'with-backdrop': device.desktop }"
        :style="contentStyle"
      >
        <v-responsive height="100vh">
          <v-container class="pa-0">
            <v-row
              :class="device.mobile ? `flex-column` : `flex-row`"
              align="center"
              justify="center"
              style="height: 100vh"
              no-gutters
            >
              <v-col :class="{ 'flex-grow-0': device.mobile }">
                <div
                  class="d-block"
                  v-if="device.mobile"
                >
                  <v-img
                    class="with-backdrop"
                    :aspect-ratio="2 / 1"
                    :src="info.apps_background"
                  >
                    <div class="d-flex flex-column fill-height">
                      <div class="d-flex align-center flex-grow-1 justify-center">
                        <div class="d-flex flex-column align-center">
                          <div
                            class="d-block mb-1 pt-12"
                            style="max-width: 112px"
                          ></div>

                          <div class="d-block text-center">
                            <div class="d-block text-uppercase headline">
                              <span class="
                                  blue-grey--text
                                  text--lighten-5
                                  font-weight-bold
                                ">{{ info.apps_title }}</span>
                              <span class="
                                  blue-grey--text
                                  text--lighten-5
                                  font-weight-light
                                ">
                                {{ info.apps_ver }}</span>
                            </div>

                            <div class="d-block text-uppercase body-2">
                              <span class="
                                  blue-grey--text
                                  text--lighten-5
                                  font-weight-normal
                                ">{{ info.apps_desc }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="v-moui__card_top_corner flex-grow-0"></div>
                    </div>
                  </v-img>
                </div>

                <div
                  class="d-block"
                  v-else
                >
                  <v-img :aspect-ratio="16 / 9">
                    <div class="d-flex flex-column fill-height">
                      <div class="d-flex align-center flex-grow-1">
                        <div class="d-flex flex-column">
                          <div
                            class="d-block mb-5"
                            style="max-width: 112px"
                          >
                            <v-img :src="info.apps_logo"></v-img>
                          </div>

                          <div
                            class="d-block text-left"
                            style="max-width: 480px"
                          >
                            <div class="d-block display-1">
                              <span class="
                                  blue-grey--text
                                  text--lighten-5
                                  font-weight-light
                                ">
                              </span>
                              <span class="
                                  blue-grey--text
                                  text--lighten-5
                                  font-weight-bold
                                  mr-3
                                ">{{ info.apps_title }} </span><span class="blue-grey--text text--lighten-5">
                                {{ info.apps_ver }}</span>
                            </div>
                            <div class="d-block text-uppercase body-2 mt-1">
                              <span class="
                                  blue-grey--text
                                  text--lighten-5
                                  font-weight-normal
                                ">{{ info.apps_desc }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-img>
                </div>
              </v-col>
              <v-col :class="{ 'flex-grow-0': device.desktop }">
                <v-card
                  :class="{ 'v-card--with-border animated animate__flipInY': device.desktop }"
                  :elevation="device.mobile ? 0 : 1"
                  :height="device.mobile ? `100%` : `auto`"
                  :width="device.mobile ? `100%` : `360px`"
                >
                  <v-sheet
                    :color="theme + ` darken-1`"
                    class="pa-4 mx-auto elevation-0"
                    max-width="calc(100% - 48px)"
                    style="margin-top: -24px"
                    v-if="device.desktop"
                  >
                    <span class="
                        d-block
                        text-uppercase
                        font-weight-medium
                        text-center
                        line-height-1
                        letter-space-1
                        white--text
                      ">login</span>
                    <span class="
                        d-block
                        headline
                        font-weight-light
                        letter-space-1
                        text-uppercase text-center
                        mt-2
                        line-height-1
                        white--text
                      ">{{ info.apps_title }}
                    </span>
                  </v-sheet>

                  <v-card-text
                    class="px-6"
                    :class="device.mobile ? `pt-0` : `pt-3 pb-2`"
                  >
                    <v-row no-gutters>
                      <v-col cols="12">
                        <!-- v-mask="umask" -->
                        <v-text-field
                          class="title font-weight-light"
                          :color="theme + `  draken-1`"
                          label="Email | Pengguna"
                          prepend-inner-icon="mail"
                          autocomplete="off"
                          hide-details
                          single-line
                          v-model="uname"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        class="mt-4"
                      >
                        <v-text-field
                          class="title font-weight-light"
                          :color="theme + `  draken-1`"
                          label="Kata Sandi"
                          prepend-inner-icon="lock_open"
                          autocomplete="off"
                          hide-details
                          single-line
                          @click:append="visible = !visible"
                          :append-icon="
                            visible ? 'visibility' : 'visibility_off'
                          "
                          :type="visible ? 'text' : 'password'"
                          v-model="upass"
                        ></v-text-field>
                      </v-col>

                      <v-col
                        cols="12"
                        class="mt-9 mb-3"
                      >
                        <v-btn
                          :color="theme + `  draken-1`"
                          block
                          depressed
                          large
                          dark
                          @click="postAuthent"
                        >MASUK</v-btn>
                      </v-col>
                      <v-col
                        cols="7"
                        class="mt-4"
                      >
                        <label
                          for=""
                          style="font-size: 10pt"
                          v-show="info.apps_pendaftaran"
                        >Anda belum memiliki akun ?
                        </label>
                      </v-col>
                      <v-col
                        cols="4"
                        class="mt-2 mb-3"
                      >
                        <v-btn
                          v-show="info.apps_pendaftaran"
                          :color="theme + ` lighten-1`"
                          text
                          @click="postRegister"
                        >Daftar</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-responsive>
      </v-main>
    </div>
    <v-snackbar
      v-model="snackbar.state"
      :color="snackbar.color"
      :timeout="3500"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        text
        @click.stop="snackbarClose"
      >Tutup</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "animate.css";

export default {
  name: "Login",
  data: () => ({
    uname: "",
    upass: "",
    visible: false,
    color: "purple darken-1",
  }),
  mounted() {
    this.setPage({
      crud: true,
    }).then(() => {
      this.getAppInfo().then(() => {
        window.document.title = this.info.company;
        const favicon = window.document.getElementById("favicon");
        favicon.href = this.info.apps_logo;
      });
    });
  },
  computed: {
    ...mapState(["device", "info", "snackbar", "auth", "http", "theme"]),

    contentStyle: function () {
      if (!this.device.mobile && this.info.apps_background) {
        return `background: url(${this.info.apps_background});
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-size: cover;`;
      }
      return ``;
    },
  },
  methods: {
    ...mapActions([
      "setPage",
      "getAppInfo",
      "signIn",
      "snackbarClose",
      "clearMenu",
      "getMenus",
    ]),
    postAuthent: function () {
      this.signIn({
        username: this.uname.replace(/ /g, ""),
        userpass: this.upass,
      }).then((pass) => {
        if (!pass) {
          console.clear();
          return;
        }
        try {
          this.clearMenu();
          this.getMenus();
          if (this.auth.user.user.authent == "administrator") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "supervisor") {
            this.$router.push({ name: "dashboard" });
          }
          if (this.auth.user.user.authent == "operator") {
            this.$router.push({ name: "dashboard" });
          }

          if (this.auth.user.user.authent == "peserta") {
            this.$router.push({ name: "dashboard-peserta" });
          }
        } catch (error) {}
      });
    },
    postRegister: function () {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style lang="sass">
@import '../../sass/card'
@import '../../sass/moui.sass'
@import '../../sass/textField.sass'
@import "../../assets/style.css"
@import "../../assets/wow.css"
</style>
