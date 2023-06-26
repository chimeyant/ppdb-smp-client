<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">edit</v-icon>
      <v-subheader class="text-h6">
        <h4>INPUT SOAL</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Formulir Input Soal</div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title :class="theme + ` darken-2 white--text `">
            Formulir Tambah Soal
          </v-card-title>
          <v-card-subtitle :class="theme + ` darken-2 white--text`">
            Formulir untuk menambah soal baru
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-text>
            <v-row :no-gutters="device.mobile">
              <v-col cols="12">
                <h4>SOAL :</h4>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor"
                  :color="theme"
                  outlined
                  dense
                  width="20px"
                  hide-details
                  v-model="soal.nomor"
                ></v-text-field>
              </v-col>

              <v-col cols="9">
                <template>
                  <tinymce id="d1" v-model="soal.soal"></tinymce>
                </template>
              </v-col>
              <v-col cols="3">
                <v-img
                  :class="[theme + ' lighten-2 with-backdrop']"
                  :aspect-ratio="4 / 4"
                  :src="soal.soal_gambar_path"
                  :lazy-src="soal.soal_gambar_path"
                >
                  <div
                    class="
                      d-flex
                      flex-column
                      align-center
                      justify-center
                      user-select-none
                    "
                    style="height: 100%"
                  >
                    <div
                      style="
                        position: absolute;
                        right: 8px;
                        bottom: 8px;
                        height: 36px;
                        width: 36px;
                      "
                    >
                      <v-btn icon dark @click="uploadFotoSoal">
                        <v-icon>photo_camera</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-img>
                <center>Gambar Max: 2Mb</center>
              </v-col>
              <v-col cols="12">
                <h4>PILIHAN :</h4>
              </v-col>
              <v-col cols="10">
                <v-textarea
                  label="Pilihan A"
                  v-model="soal.pilihan_a"
                  outlined
                  dense
                  hide-details
                  rows="3"
                  :color="theme"
                >
                </v-textarea>
              </v-col>
              <v-col cols="2">
                <v-img
                  :class="[theme + ' lighten-2 with-backdrop']"
                  :aspect-ratio="4 / 2"
                  :src="soal.pilihan_a_gambar_path"
                  :lazy-src="soal.pilihan_a_gambar_path"
                >
                  <div
                    class="
                      d-flex
                      flex-column
                      align-center
                      justify-center
                      user-select-none
                    "
                    style="height: 100%"
                  >
                    <div
                      style="
                        position: absolute;
                        right: 8px;
                        bottom: 8px;
                        height: 36px;
                        width: 36px;
                      "
                    >
                      <v-btn icon dark @click="uploadImageA">
                        <v-icon>photo_camera</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-img>
                <center>Gambar Max: 2Mb</center>
              </v-col>
              <v-col cols="10">
                <v-textarea
                  label="Pilihan B"
                  v-model="soal.pilihan_b"
                  outlined
                  dense
                  hide-details
                  rows="3"
                  :color="theme"
                >
                </v-textarea>
              </v-col>
              <v-col cols="2">
                <v-img
                  :class="[theme + ' lighten-2 with-backdrop']"
                  :aspect-ratio="4 / 2"
                  :src="soal.pilihan_b_gambar_path"
                  :lazy-src="soal.pilihan_b_gambar_path"
                >
                  <div
                    class="
                      d-flex
                      flex-column
                      align-center
                      justify-center
                      user-select-none
                    "
                    style="height: 100%"
                  >
                    <div
                      style="
                        position: absolute;
                        right: 8px;
                        bottom: 8px;
                        height: 36px;
                        width: 36px;
                      "
                    >
                      <v-btn icon dark @click="uploadImageB">
                        <v-icon>photo_camera</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-img>
                <center>Gambar Max: 2Mb</center>
              </v-col>
              <v-col cols="10">
                <v-textarea
                  label="Pilihan C"
                  v-model="soal.pilihan_c"
                  outlined
                  dense
                  hide-details
                  rows="3"
                  :color="theme"
                >
                </v-textarea>
              </v-col>
              <v-col cols="2">
                <v-img
                  :class="[theme + ' lighten-2 with-backdrop']"
                  :aspect-ratio="4 / 2"
                  :src="soal.pilihan_c_gambar_path"
                  :lazy-src="soal.pilihan_c_gambar_path"
                >
                  <div
                    class="
                      d-flex
                      flex-column
                      align-center
                      justify-center
                      user-select-none
                    "
                    style="height: 100%"
                  >
                    <div
                      style="
                        position: absolute;
                        right: 8px;
                        bottom: 8px;
                        height: 36px;
                        width: 36px;
                      "
                    >
                      <v-btn icon dark @click="uploadImageC">
                        <v-icon>photo_camera</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-img>
                <center>Gambar Max: 2Mb</center>
              </v-col>
              <v-col cols="10">
                <v-textarea
                  label="Pilihan D"
                  v-model="soal.pilihan_d"
                  outlined
                  dense
                  hide-details
                  rows="3"
                  :color="theme"
                >
                </v-textarea>
              </v-col>
              <v-col cols="2">
                <v-img
                  :class="[theme + ' lighten-2 with-backdrop']"
                  :aspect-ratio="4 / 2"
                  :src="soal.pilihan_d_gambar_path"
                  :lazy-src="soal.pilihan_d_gambar_path"
                >
                  <div
                    class="
                      d-flex
                      flex-column
                      align-center
                      justify-center
                      user-select-none
                    "
                    style="height: 100%"
                  >
                    <div
                      style="
                        position: absolute;
                        right: 8px;
                        bottom: 8px;
                        height: 36px;
                        width: 36px;
                      "
                    >
                      <v-btn icon dark @click="uploadImageD">
                        <v-icon>photo_camera</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-img>
                <center>Gambar Max: 2Mb</center>
              </v-col>
              <v-col cols="10">
                <v-textarea
                  label="Pilihan E"
                  v-model="soal.pilihan_e"
                  outlined
                  dense
                  hide-details
                  rows="3"
                  :color="theme"
                >
                </v-textarea>
              </v-col>
              <v-col cols="2">
                <v-img
                  :class="[theme + ' lighten-2 with-backdrop']"
                  :aspect-ratio="4 / 2"
                  :src="soal.pilihan_e_gambar_path"
                  :lazy-src="soal.pilihan_e_gambar_path"
                >
                  <div
                    class="
                      d-flex
                      flex-column
                      align-center
                      justify-center
                      user-select-none
                    "
                    style="height: 100%"
                  >
                    <div
                      style="
                        position: absolute;
                        right: 8px;
                        bottom: 8px;
                        height: 36px;
                        width: 36px;
                      "
                    >
                      <v-btn icon dark @click="uploadImageE">
                        <v-icon>photo_camera</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-img>
                <center>Gambar Max: 2Mb</center>
              </v-col>

              <v-col cols="2">
                <label for="">Jawaban</label>
                <v-select
                  Label="Jawaban Benar"
                  :items="jawabans"
                  v-model="soal.jawaban"
                  :hide-details="device.desktop"
                  :color="theme"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="flex flex-row-reverse">
            <v-btn color="blue dark-3" outlined @click="postAddNewRecord"
              >SIMPAN</v-btn
            >
            <v-btn class="ma-2" outlined color="red dark-3" @click="batal">
              Batal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HomeCreate",

  data: () => ({
    num: 1,

    search: null,
    soal: {
      master_soal_id: null,
      nomor: null,
      soal: null,
      soal_gambar: null,
      soal_gambar_path: null,
      pilihan_a: null,
      pilihan_a_gambar: null,
      pilihan_a_gambar_path: "/",
      pilihan_b: null,
      pilihan_b_gambar: null,
      pilihan_b_gambar_path: "/",
      pilihan_c: null,
      pilihan_c_gambar: null,
      pilihan_c_gambar_path: "/",
      pilihan_d: null,
      pilihan_d_gambar: null,
      pilihan_d_gambar_path: "/",
      pilihan_e: null,
      pilihan_e_gambar: null,
      pilihan_e_gambar_path: "",
      jawaban: null,
    },

    jawabans: [
      { text: "A", value: "A" },
      { text: "B", value: "B" },
      { text: "C", value: "C" },
      { text: "D", value: "D" },
      { text: "E", value: "E" },
    ],
  }),
  computed: {
    ...mapState([
      "theme",
      "thememode",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/master-soal-header/" + this.$route.params.master_soal_id,
    });
    this.getAppInfo();

    this.soal.master_soal_id = this.$route.params.master_soal_id;
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "fetchRecords",
      "postAddNew",
      "postEdit",
      "postUpdate",
      "postConfirmDelete",
      "assignFileBrowse",
      "getAppInfo",
    ]),
    postAddNewRecord: async function () {
      this.record.master_soal_id = this.soal.master_soal_id;
      this.record.nomor = this.soal.nomor;
      this.record.soal = this.soal.soal;
      this.record.pilihan_a = this.soal.pilihan_a;
      this.record.pilihan_b = this.soal.pilihan_b;
      this.record.pilihan_c = this.soal.pilihan_c;
      this.record.pilihan_d = this.soal.pilihan_d;
      this.record.pilihan_e = this.soal.pilihan_e;
      this.record.jawaban = this.soal.jawaban;
      let {
        data: { status, message },
      } = await this.http.post(
        "api/master-soal-detail/" + this.soal.master_soal_id,
        this.record
      );

      if (!status) {
        this.snackbar.color = "red";
        this.snackbar.text = message;
        this.snackbar.state = true;
        return;
      }

      this.snackbar.color = "green";
      this.snackbar.text = message;
      this.snackbar.state = true;

      this.$router.go(-1);
    },

    editRecord: function (val) {
      this.postEdit(val);
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.$router.push({ name: "buku" });
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    fetchJabatans: async function () {
      let { data: data } = await this.http.post("api/master-jabatan-combo");

      this.jabatans = data;
    },

    fetchPendidikans: async function () {
      let { data: data } = await this.http.post("api/master-pendidikan-combo");

      this.pendidikans = data;
    },

    uploadFotoSoal: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "soals",
        },
        callback: (response) => {
          setTimeout(() => {
            this.soal.soal_gambar_path = response.path;
            this.record.soal_gambar = response.name;
          }, 1000);
        },
      });
    },

    uploadImageA: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "soals",
        },
        callback: (response) => {
          setTimeout(() => {
            this.soal.pilihan_a_gambar_path = response.path;
            this.record.pilihan_a_gambar = response.name;
          }, 1000);
        },
      });
    },

    uploadImageB: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "soals",
        },
        callback: (response) => {
          setTimeout(() => {
            this.soal.pilihan_b_gambar_path = response.path;
            this.record.pilihan_b_gambar = response.name;
          }, 1000);
        },
      });
    },

    uploadImageC: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "soals",
        },
        callback: (response) => {
          setTimeout(() => {
            this.soal.pilihan_c_gambar_path = response.path;
            this.record.pilihan_c_gambar = response.name;
          }, 1000);
        },
      });
    },

    uploadImageD: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "soals",
        },
        callback: (response) => {
          setTimeout(() => {
            this.soal.pilihan_d_gambar_path = response.path;
            this.record.pilihan_d_gambar = response.name;
          }, 1000);
        },
      });
    },

    uploadImageE: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "soals",
        },
        callback: (response) => {
          setTimeout(() => {
            this.soal.pilihan_e_gambar_path = response.path;
            this.record.pilihan_e_gambar = response.name;
          }, 1000);
        },
      });
    },

    batal: function () {
      this.$router.push({
        name: "ujian-master-soal-detail",
        params: { id: this.soal.master_soal_id },
      });
    },
  },
};
</script>
