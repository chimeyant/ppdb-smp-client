<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme">home</v-icon>
      <v-subheader class="text-h6">
        <h4>PROFIL SEKOLAH</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Formulir Profil Sekolah</div>
    </v-flex>

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `6` : `12`">
        <v-card>
          <v-card-title :class="`white--text ` + theme + ` lighten-1`">PROFIL SEKOLAH</v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-img
                  :class="[theme + ' lighten-2 with-backdrop']"
                  :aspect-ratio="16 / 9"
                  src="bg"
                >
                  <v-row
                    class="justify-center"
                    style="height: 100%"
                  >
                    <v-col
                      v-show="false"
                      cols="3"
                      class="pa-0 mt-5"
                    >
                      <div
                        class="
                          d-flex
                          flex-column
                          align-left
                          justify-center
                          user-select-none
                        "
                        style="height: 100%"
                      >
                        <div style="height: 100%">
                          <v-img
                            :src="bg_nav"
                            style="height: 100%"
                          >
                            <v-fade-transition>
                              <v-overlay
                                opacity="0.01"
                                absolute
                              >
                                <v-btn
                                  icon
                                  @click="editSidebar"
                                >
                                  <v-icon>photo_camera</v-icon>
                                </v-btn>
                              </v-overlay>
                            </v-fade-transition>
                          </v-img>
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="8">
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
                        <div style="max-width: 128px; max-height: 128px;width: 128px; height: 128px;">
                          <v-hover>
                            <template v-slot:default="{ hover }">
                              <v-img
                                :src="foto"
                                style="max-width: 128px"
                                placeholder="logo"
                              >

                                <v-fade-transition>
                                  <v-overlay
                                    opacity="0.01"
                                    absolute
                                    v-if="hover"
                                  >
                                    <v-btn
                                      icon
                                      @click="uploadFoto"
                                    >
                                      <v-icon>photo_camera</v-icon>
                                    </v-btn>
                                  </v-overlay>

                                </v-fade-transition>
                                <v-col>
                                  <center>Logo Sekolah</center>
                                </v-col>
                              </v-img>
                            </template>
                          </v-hover>
                        </div>
                        <div style="
                            position: absolute;
                            right: 8px;
                            bottom: 8px;
                            height: 36px;
                            width: 36px;
                          ">
                          <v-btn
                            icon
                            dark
                            @click="editBackground"
                          >
                            <v-icon>edit</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-img>
              </v-col>
              <v-col cols="12">
                <v-col cols="12">
                  <v-text-field
                    label="NPSN"
                    :color="theme"
                    v-model="record.npsn"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NAMA SEKOLAH"
                    :color="theme"
                    v-model="record.nama"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    label="SLOGAN | VISI MISI"
                    :color="theme"
                    v-model="record.program_keahlian"
                    dense
                    outlined
                    :hide-details="device.desktop"
                    rows="3"
                  >{{ record.program_keahlian }}</v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Provinsi"
                    :color="theme"
                    v-model="record.province_id"
                    :items="provinsis"
                    outlined
                    dense
                    :hide-details="device.desktop"
                    @change="fetchKabupatens"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-select
                    label="Kabupaten/Kota"
                    :color="theme"
                    v-model="record.regency_id"
                    :items="kabupatens"
                    outlined
                    dense
                    :hide-details="device.desktop"
                    @change="fetchKecamatans"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Kecamatan"
                    :color="theme"
                    v-model="record.district_id"
                    :items="kecamatans"
                    outlined
                    dense
                    :hide-details="device.desktop"
                    @change="fetchDesa"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Desa/Kelurahan"
                    :color="theme"
                    v-model="record.village_id"
                    :items="desas"
                    outlined
                    dense
                    :hide-details="device.desktop"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Alamat"
                    :color="theme"
                    v-model="record.alamat"
                    dense
                    :hide-details="device.desktop"
                    outlined
                    rows="3"
                  >{{ record.alamat }}</v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Nomor Telpon"
                    :color="theme"
                    v-model="record.telpon"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email"
                    :color="theme"
                    v-model="record.email"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Facebook"
                    :color="theme"
                    v-model="record.facebook"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Twitter"
                    :color="theme"
                    v-model="record.twitter"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Instagram"
                    :color="theme"
                    v-model="record.instagram"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Nama Kepala Sekolah"
                    :color="theme"
                    v-model="record.kepalasekolah"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NIP"
                    :color="theme"
                    v-model="record.nip"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Tanggal Mulai Pendaftaran"
                    :color="theme"
                    v-model="record.tanggal_mulai"
                    :hide-details="device.desktop"
                    outlined
                    dense
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Tanggal Selesai Pendaftaran"
                    :color="theme"
                    v-model="record.tanggal_selesai"
                    :hide-details="device.desktop"
                    outlined
                    dense
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Jam Dibuka Pendaftaran (Per hari)"
                    :color="theme"
                    v-model="record.jam_mulai"
                    :hide-details="device.desktop"
                    outlined
                    dense
                    type="time"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Jam Ditutp Pendaftaran (Per hari)"
                    :color="theme"
                    v-model="record.jam_selesai"
                    :hide-details="device.desktop"
                    outlined
                    dense
                    type="time"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Tanggal Pengumuman"
                    :color="theme"
                    v-model="record.tanggal_pengumuman"
                    :hide-details="device.desktop"
                    outlined
                    dense
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Jam Pengumuman"
                    :color="theme"
                    v-model="record.jam_pengumuman"
                    :hide-details="device.desktop"
                    outlined
                    dense
                    type="time"
                  ></v-text-field>
                </v-col>

                <v-col>
                  <div class="subtitle-1">Kebutuhan Khusus</div>

                  <v-row>
                    <v-col cols="6">
                      <v-switch
                        label="Wajib Ada SKCK/SKKB"
                        :color="theme"
                        v-model="record.skck"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="6">
                      <v-switch
                        label="Tidak Buta Warna"
                        :color="theme"
                        v-model="record.butawarna"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="6">
                      <v-switch
                        label="Pagu"
                        :color="theme"
                        v-model="record.pagu"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="6">
                      <v-switch
                        label="Wajib Materai"
                        :color="theme"
                        v-model="record.materai"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="4">
                      <v-switch
                        label="WA Blast"
                        :color="theme"
                        v-model="record.sms"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        label="API Key"
                        :color="theme"
                        v-model="record.apikey"
                        :hide-details="device.desktop"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-switch
                        label="Tampilkan Pagu / Kuota"
                        :color="theme"
                        v-model="record.showpagu"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="6">
                      <v-switch
                        label="Tampilkan Slider"
                        :color="theme"
                        v-model="record.slider"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col
                      cols="6"
                      v-show="false"
                    >
                      <v-switch
                        label="Tidak Mewajibkan Upload Berkas"
                        :color="theme"
                        v-model="record.tanpa_berkas"
                        dense
                        outlined
                        hide-details
                      >
                      </v-switch>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        label="Register Berdasarkan"
                        outlined
                        dense
                        hide-details
                        v-model="record.regby"
                        :items="regbys"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Peserta Ujian"
                    :color="theme"
                    dense
                    outlined
                    v-model="record.pesertas"
                    :items="pesertas"
                    multiple
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Limit Sesi Ujian"
                    :color="theme"
                    v-model="record.limit_sesi"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Nama Aplikasi"
                    :color="theme"
                    v-model="record.apps_name"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Versi Aplikasi"
                    :color="theme"
                    v-model="record.apps_ver"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Keterangan Aplikasi"
                    :color="theme"
                    v-model="record.apps_desc"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="URL APLIKASI"
                    :color="theme"
                    v-model="record.url"
                    :hide-details="device.desktop"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                    label="Tema"
                    v-model="record.color"
                    :hide-details="device.desktop"
                    :items="temas"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Warna"
                    v-model="record.theme"
                    :hide-details="device.desktop"
                    :items="themes"
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="mt-5">
            <v-col>
              <v-btn
                outlined
                :color="theme"
                @click="openDialogDelete"
              >RESET DATA PENDAFTAR</v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn
                outlined
                :color="theme"
                @click="fetchUpdate"
              >SIMPAN</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-dialog
      v-model="dialog"
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
          <p class="pt-5">Apakah anda yakin akan menghapus data pendaftar..?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="theme"
            text
            @click="closeDialogDelete"
          >Tidak</v-btn>
          <v-btn
            color="red"
            text
            @click="confirmDialog"
          >Ya, Saya Yakin</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "profil-sekolah",
  data: () => ({
    dialog: false,
    foto: "/",
    bg: "/",
    bg_nav: "/image/bg-nav.jpep",
    provinsis: [],
    kabupatens: [],
    kecamatans: [],
    desas: [],
    record: {
      tanggal_mulai: null,
      tanggal_selesai: null,
    },
    themes: [
      { value: "red", text: "Red" },
      { value: "pink", text: "Pink" },
      { value: "purple", text: "Purple" },
      { value: "deep purple", text: "Deep Pruple" },
      { value: "indigo", text: "Indigo" },
      { value: "light blue", text: "Light Blue" },
      { value: "cyan", text: "Cyan" },
      { value: "teal", text: "Teal" },
      { value: "green", text: "Green" },
      { value: "light green", text: "Light Green" },
      { value: "lemon", text: "Lemon" },
      { value: "yellow", text: "Yellow" },
      { value: "amber", text: "Amber" },
      { value: "orange", text: "Orange" },
      { value: "deep orange", text: "Deep Orange" },
      { value: "brown", text: "Brown" },
      { value: "blue grey", text: "Blue Grey" },
      { value: "grey", text: "Grey" },
    ],
    temas: [
      { value: "light", text: "Light" },
      { value: "dark", text: "Dark" },
    ],
    pesertas: [
      { value: 4, text: "Berkas Diterima" },
      { value: 2, text: "Berkas Diperbaiki" },
      { value: 3, text: "Berkas Pengajuan Diperbaiki" },
      { value: 5, text: "Berkas Ditolak" },
      { value: 6, text: "Berkas Dicabut" },
    ],
    regbys: [
      { text: "Email", value: "email" },
      { text: "NISN", value: "nisn" },
    ],
  }),

  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/profil-sekolah",
    });
    this.fetchRecord();
    this.fetchPropinsi();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "assignFileBrowse",
      "getUserInfo",
      "fetchRecords",
      "setTheme",
      "getAppInfo",
    ]),
    fetchPropinsi: async function () {
      try {
        let { data: data } = await this.http.post("api/provinsi-combo");
        this.provinsis = data;
      } catch (error) {
        this.provinsis = [];
      }
    },
    fetchKabupatens: async function () {
      try {
        let { data: data } = await this.http.post(
          "api/kabupaten-combo",
          this.record
        );
        this.kabupatens = data;
      } catch (error) {
        this.kabupatens = [];
      }
    },
    fetchKecamatans: async function () {
      try {
        let { data: data } = await this.http.post(
          "api/kecamatan-combo-by-regency",
          this.record
        );
        this.kecamatans = data;
      } catch (error) {
        this.kecamatans = [];
      }
    },
    fetchDesa: async function () {
      try {
        let { data: data } = await this.http.post(
          "api/desa-combo",
          this.record
        );
        this.desas = data;
      } catch (error) {
        this.desa = [];
      }
    },
    fetchRecord: async function () {
      let { data } = await this.http.get("api/profil-sekolah/1");

      this.record = data;
      this.foto = data.path;
      this.bg = data.path_bg;
      this.bg_nav = data.path_bg_nav;
      this.getAppInfo();
    },
    fetchUpdate: async function () {
      try {
        let {
          data: { status, message, data },
        } = await this.http.post(
          "api/profil-sekolah/1?_method=PUT",
          this.record
        );

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = this.theme;
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.record = data;
        this.fetchRecord();
        this.getUserInfo();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },

    editBackground: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "logo",
        },
        callback: (response) => {
          this.bg = response.path;
          this.record.bg = response.name;
        },
      });
    },

    editSidebar: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "logo",
        },
        callback: (response) => {
          this.bg_nav = response.path;
          this.record.bg_nav = response.name;
        },
      });
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "logo",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.logo = response.name;
          }, 1000);
        },
      });
    },

    openDialogDelete: function () {
      this.dialog = true;
    },
    closeDialogDelete: function () {
      this.dialog = false;
    },
    confirmDialog: async function () {
      try {
        let {
          data: { status, message },
        } = await this.http.post("api/profile-reset-data");

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          this.dialog = false;
          return 0;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.dialog = false;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
        this.dialog = false;
      }
    },
  },
  watch: {
    "record.province_id": function () {
      this.fetchKabupatens();
    },
    "record.regency_id": function () {
      this.fetchKecamatans();
    },
    "record.district_id": function () {
      this.fetchDesa();
    },
    "reocrd.pendidikan_id": function () {
      this.fetchJurusan();
    },
  },
};
</script>

<style></style>
