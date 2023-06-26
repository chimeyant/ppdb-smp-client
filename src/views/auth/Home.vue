<template>
  <v-app
    id="inspire"
    light
    v-cloak
    v-scroll="onScroll"
  >
    <v-app-bar
      :elevation="lightToolbar ? 0 : 6"
      :class="lightToolbar ? `transparent` : info.apps_theme + ` lighten-1`"
      fixed
    >
      <v-app-bar-nav-icon>
        <img
          class="ml-10"
          :src="info.apps_logo"
          alt="logo"
          height="48"
        />
      </v-app-bar-nav-icon>

      <v-toolbar-title
        :class="{ 'pl-1': device.mobile }"
        v-if="!device.mobile"
      >
        <span class="font-weight-bold pl-5 white--text">{{ info.company }}</span><br />
        <span class="text-xs pl-5 white--text">{{ info.slogan }}</span>
      </v-toolbar-title>

      <v-toolbar-title
        :class="{ 'pl-2': device.mobile }"
        v-if="device.mobile"
      >
        <span class="font-weight-bold pl-5 white--text">{{
          info.company
        }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="pr-5">
        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
        >BERANDA</v-btn>
        <v-btn
          text
          class="white--text"
          v-show="device.desktop && info.pagu"
          @click="$router.push({ name: 'pagu' })"
        >PAGU</v-btn>
        <v-btn
          text
          class="white--text"
          @click="$router.push({ name: 'pendaftar' })"
          v-show="device.desktop"
        >PENDAFTAR</v-btn>

        <v-btn
          text
          class="white--text"
          v-show="device.desktop"
          @click="$router.push({ name: 'pengumuman' })"
        >PENGUMUMAN</v-btn>
        <!--<v-btn flat>Blog</v-btn>-->

        <v-btn
          text
          @click="$router.push({ name: 'login' })"
          class="white--text"
          v-show="device.desktop"
        >LOGIN</v-btn>
      </v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="device.mobile"
            color="white"
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
            <v-list-item-title @click="$router.push({ name: 'home' })">
              Beranda
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-show="info.pagu">
            <v-list-item-title @click="$router.push({ name: 'pagu' })">
              Pagu
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="$router.push({ name: 'pendaftar' })">
              Pendaftar
            </v-list-item-title>
          </v-list-item>
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
    <v-main>
      <section>
        <v-carousel
          cycle
          :height="device.desktop ? `500` : `400`"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in sliders"
            :key="i"
            :src="slide.path"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <v-layout
                column
                align-center
                justify-center
                class="white--text"
              >
                <h1
                  class="white--text mb-2 display-1 text-xs-center"
                  style="font-weight: 900; text-shadow: 3px 2px #000000"
                >
                  SELAMAT DATANG
                </h1>
                <div
                  class="white--text subheading mb-3 text-xs-center"
                  style="font-weight: 900; text-shadow: 2px 2px #000000"
                >
                  Laman Resmi Sistem Penerimaan Peserta Didik Baru
                </div>

                <div
                  class="white--text subheading mb-3 text-xs-center"
                  style="font-weight: 900; text-shadow: 2px 2px #000000"
                >
                  Tahun Pelajaran 2022/2023
                </div>

                <div
                  class="white--text subheading ml-4 mr-4 mb-3 text-center mt-5"
                  style="
                    font-weight: 900;
                    font-size: 15pt;
                    text-shadow: 2px 2px #000000;
                  "
                  v-show="!info.apps_pendaftaran"
                >
                  Pendaftaran Belum Dibuka
                </div>

                <v-btn
                  :class="theme + ` darken-1 mt-5`"
                  dark
                  large
                  @click="$router.push({ name: 'register' })"
                  v-show="info.apps_pendaftaran"
                >
                  DAFTAR SEKARANG
                </v-btn>
              </v-layout>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </section>
      <secion>
        <dir class="jadwal">
          <v-col cols="12">
            <v-row>
              <v-col :cols="device.desktop ? 3: 12">
                <v-img
                  src="images/bullet.png"
                  max-width="200"
                  max-height="200"
                ></v-img>
                <div class="jadwal heading">
                  Mulai Pendaftaran
                </div>
                <div class="jadwal subheading">
                  15 s.d 20 Juni 2022
                </div>
                <div class="jadwal-title">
                  Peserta bisa mulai melakukan registrasi akun dan mengisi formulir pendaftaran
                </div>
              </v-col>
              <v-col :cols=" device.desktop ? 3:12">
                <v-img
                  src="images/bullet.png"
                  max-width="200"
                  max-height="200"
                ></v-img>
                <div class="jadwal heading">
                  Uji Kompetensi
                </div>
                <div class="jadwal subheading">
                  21 s.d 29 Juni 2022
                </div>
                <div class="jadwal-title">
                  Peserta diwajibkan untuk mengikuti uji kompetensi atau tes khusus yang merupakan salah satu persyaratan masuk
                </div>

              </v-col>
              <v-col :cols="device.desktop ? 3: 12">
                <v-img
                  src="images/bullet.png"
                  max-width="200"
                  max-height="200"
                ></v-img>
                <div class="jadwal heading">
                  Verifikasi & Rekonsiliasi Data
                </div>
                <div class="jadwal subheading">
                  21 Juni s.d 1 Juli 2022
                </div>
                <div class="jadwal-title">
                  Panita melakukan verifikasi data berkas yang peserta kirim seklaigus melakukan rekonsiliasi data jika ada berkas yang tidak memenuhi persyaratan
                </div>
              </v-col>
              <v-col :cols="device.desktop ? 3: 12">
                <v-img
                  src="images/bullet.png"
                  max-width="200"
                  max-height="200"
                ></v-img>
                <div class="jadwal heading">
                  Daftar Ulang
                </div>
                <div class="jadwal subheading">
                  5 s.d 7 Juli 2022
                </div>
                <div class="jadwal-title">
                  Peserta yang berhasil melewati semua tahapan, dapat melakukan daftar ulang dengan membawa berkas yang di persyaratankan
                </div>
              </v-col>
            </v-row>
          </v-col>
        </dir>
        <div class="persyaratan">
          <v-col col="12">
            <v-row>
              <v-col
                cols="12"
                v-show="device.mobile"
              >
                <v-row
                  justify="center"
                  style="font-weight:bold ;"
                >
                  Pesyaratan Pendaftaran
                </v-row>
              </v-col>
              <v-col
                :cols="device.desktop ? 6 :12"
                v-show="device.desktop"
              >
                <div class="persyaratan-title">
                  Persyaratan Pendaftaran
                </div>
                <div class="persyaratan-list">
                  <ul class="persyaratan li">
                    <li>Ijazah SMP/MTs/Sederajat atau surat keterangan penghargaan sama dengan Ijazah SMP/MTs/Ijazah program paket B/Ijazah satuan pendidikan Luar Negeri yang dinilai atau dihargai sama/setingkat dengan SMP</li>
                    <li class="persyaratan li">Nilai Rapor SMP/MTs/sederajat semester 1 sampai dengan semester 5</li>
                    <li class="persyaratan li">Sertifikat/Piagam Penghargaan/Surat Keterangan Prestasi/Penghargaan akademik/non akademik</li>
                    <li class="persyaratan li">Akta Kelahiran dengan batas usia paling tinggi 21 (dual puluh satu) tahun pada tanggal 15 Juni 2022</li>
                    <li class="persyaratan li">Kartu Keluarga</li>
                    <li class="persyaratan li">Pas foto berwarna ukuran 4x3 sebanyak 2 (dua) lembar</li>
                    <li class="persyaratan li">SKL Asli atau Surat Keterangan Lulus Asli dari SMP/MTs/Sederajat</li>
                  </ul>
                </div>
              </v-col>
              <v-col :cols="device.desktop ? 6 :12">
                <v-img src="images/persyaratan.png"></v-img>
              </v-col>
            </v-row>
          </v-col>
        </div>

      </secion>
      <!--
      <section
        class=""
        v-show="info.pagu"
      >
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout
                row
                wrap
                align-center
              >
                <v-flex
                  xs12
                  md4
                >
                  <v-card class="box-statistik">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4 white--text">
                          PESERTA LAKI-LAKI
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{ jmllakilaki }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Orang</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        size="100"
                        class="elevation-2"
                        color="white"
                      >
                        <v-img
                          src="images/siswa.png"
                          contain
                        ></v-img>
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn
                        rounded
                        text
                        class="white--text"
                      >

                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-card class="box-statistik">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4 white--text">
                          PESERTA PEREMPUAN
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{ jmlperempuan }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Orang</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        size="100"
                        class="elevation-4"
                        color="white"
                      >
                        <v-img
                          src="images/siswi.png"
                          contain
                          style="padding: 10px"
                        ></v-img>
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn
                        rounded
                        text
                        class="white--text"
                      >

                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-card class="box-statistik">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4 white--text">
                          TOTAL PENDAFTAR
                        </div>
                        <v-list-item-title class="headline mb-1 white--text">
                          {{ jmlpendaftar }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="white--text">Orang</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        size="100"
                        class="elevation-2"
                        color="white"
                      >
                        <v-img
                          src="images/siwasiswi3.png"
                          contain
                        ></v-img>
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn
                        rounded
                        text
                        dark
                      > </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      -->

    </v-main>
    <section class="footer">
      <v-row class="pt-5 pl-10 pr-5">
        <v-col :cols="device.desktop ? `4` : `12`">
          <div class="title">
            SMK Negeri 4 Kabupaten Tangerang
          </div>
          <div class="address">
            Jl. Lingkar Luar Pasar Pinang
            <br>
            Kab. Tangerang - Provinsi Banten 15720
          </div>

        </v-col>
        <v-col :cols="device.desktop ? `4` : `12`"></v-col>
        <v-col :cols="device.desktop ? `4` : `12`">
          <div class="title">
            IKUTI KAMI
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-facebook</v-icon> Facebook
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-instagram</v-icon> Instagram
          </div>
          <div class="social-media">
            <v-icon class="icon">mdi-whatsapp</v-icon> Whatsapp
          </div>
        </v-col>
      </v-row>
      <v-layout
        column
        wrap
      >
        <v-flex class="pb-0 my-2 white--text align-center">
          <div class="copyright pl-10">
            SMK Negeri 4 Kab. Tangerang &copy; 2021 - 2022
          </div>
        </v-flex>
      </v-layout>
    </section>

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

export default {
  name: "Login",
  data: () => ({
    uname: "",
    upass: "",
    visible: false,
    color: "purple darken-3",
    jmlpendaftar: 0,
    jmllakilaki: 0,
    jmlperempuan: 0,
    lightToolbar: true,

    pengumuman: {
      title: null,
      body: null,
    },
    sliders: [],
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
    this.fetchSliders();
    this.fetchDashboard();
    this.fetchSummarydata();
    this.fetchPengumuman();
  },
  computed: {
    ...mapState(["device", "info", "snackbar", "device", "http", "theme"]),

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
      "getAppInfo",
    ]),
    onScroll: function (event) {
      if (window.pageYOffset >= window.innerHeight - 350) {
        if (this.lightToolbar === true) this.lightToolbar = false;
      } else {
        if (this.lightToolbar === false) this.lightToolbar = true;
      }
    },
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
          this.$router.push({ name: "dashboard" });
        } catch (error) {}
      });
    },
    postRegister: function () {
      this.$router.push({ name: "register" });
    },
    fetchDashboard: async function () {
      let {
        data: { jmlformasi, jmlpelamar },
      } = await this.http.get("api/dashboard-index");
      this.jmlformasi = jmlformasi;
      this.jmlpelamar = jmlpelamar;
    },
    fetchPengumuman: async function () {
      let { data } = await this.http.get("api/pengumuman-topnews");

      this.pengumuman = data;
    },
    fetchSliders: async function () {
      let { data } = await this.http.get("sliders");

      this.sliders = data;
    },
    fetchSummarydata: async function () {
      let {
        data: { jmlpendaftar, jmllakilaki, jmlperempuan },
      } = await this.http.get("summarydata");

      this.jmllakilaki = jmllakilaki;
      this.jmlperempuan = jmlperempuan;
      this.jmlpendaftar = jmlpendaftar;
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
