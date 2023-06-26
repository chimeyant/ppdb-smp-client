<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">volunteer_activism</v-icon>
      <v-subheader class="text-h6">
        <h4>VERIFIKASI PERMOHONAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2"></div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title class="flex flex-row-reverse purple lighten-1">
            <v-spacer></v-spacer>
            <div class="white--text">Formulir Verifikasi Pemohon</div>
          </v-card-title>
          <v-card-text>
            <v-row class="pa-4">
              <v-col :cols="device.mobile ? `12` : `8`">
                <v-row dense>
                  <v-col
                    v-show="!device.desktop"
                    :cols="device.mobile ? `12` : `4`"
                  >
                    <v-row class="justify-end pa-10">
                      <v-img :src="record.path"></v-img>
                    </v-row>
                  </v-col>
                  <v-col :cols="device.mobile ? `12` : `8`">
                    <v-card class="mx-auto" elevation="0">
                      <v-row class="fill-height pt-1">
                        <v-card-title>BIODATA</v-card-title>

                        <v-spacer></v-spacer>
                      </v-row>

                      <v-list three-line wrap>
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-account-circle
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>{{
                              record.nama
                            }}</v-list-item-title>
                            <v-list-item-subtitle>Nama</v-list-item-subtitle>
                            <v-list-item-title>{{
                              record.jenis_kelamin
                            }}</v-list-item-title>
                            <v-list-item-subtitle
                              >Jenis Kelamin</v-list-item-subtitle
                            >
                            <v-list-item-title>{{
                              record.ttl
                            }}</v-list-item-title>
                            <v-list-item-subtitle
                              >Tempat Tanggal Lahir</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-credit-card
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>{{
                              record.nip
                            }}</v-list-item-title>
                            <v-list-item-subtitle
                              >Nomor Induk Pegawai (NIP)</v-list-item-subtitle
                            >
                            <v-list-item-title>{{
                              record.nik
                            }}</v-list-item-title>
                            <v-list-item-subtitle
                              >Nomor Induk Kependudukan
                              (NIK)</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-school
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>{{
                              record.pendidikan
                            }}</v-list-item-title>
                            <v-list-item-title>{{
                              record.jurusan
                            }}</v-list-item-title>
                            <v-list-item-title>{{
                              record.sekolah
                            }}</v-list-item-title>
                            <v-list-item-subtitle
                              >Pendidikan/Jurusan</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-office-building
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>{{
                              record.instansi_asal
                            }}</v-list-item-title>
                            <v-list-item-title>{{
                              record.perangkat_daerah_pemohon
                            }}</v-list-item-title>
                            <v-list-item-title>{{
                              record.jabatan_asal
                            }}</v-list-item-title>
                            <v-list-item-subtitle
                              >Instansi Asal/Jabatan</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-map-marker
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{ record.alamat }}</v-list-item-title
                            >

                            <v-list-item-subtitle
                              >DESA {{ record.desa }}, KEC.
                              {{ record.kecamatan }}</v-list-item-subtitle
                            >
                            <v-list-item-subtitle>
                              {{ record.kabupaten }}, {{ record.provinsi }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-phone
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>{{
                              record.telp
                            }}</v-list-item-title>
                            <v-list-item-subtitle>Telp/HP</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-mail
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>
                              <v-text-field
                                label=""
                                outlined
                                :color="theme"
                                v-model="record.pesan"
                                :key="record.id"
                              ></v-text-field>
                            </v-list-item-title>
                            <v-list-item-subtitle
                              >Kirim Pesan</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>
                      </v-list>
                      <v-card-actions class="justify-center  ">
                        <v-btn
                          outlined
                          small
                          color="grey"
                          @click="$router.push({ name: `lowongan-permohonan` })"
                          >Kembali</v-btn
                        >

                        <v-btn
                          small
                          color="green"
                          outlined
                          @click="postUpdateDiterima"
                          >TERVERIFIKASI</v-btn
                        >
                        <v-btn
                          small
                          outlined
                          color="orange"
                          @click="postUpdatePerbaikan"
                          >PERBAIKI</v-btn
                        >
                        <v-btn
                          small
                          outlined
                          color="red"
                          @click="postUpdateDitolak"
                          >DITOLAK</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col
                    v-show="device.desktop"
                    :cols="device.mobile ? `12` : `4`"
                  >
                    <v-row class="justify-end pa-10">
                      <v-img
                        :src="record.path"
                        style="width:80;height:120; border-radius:10px "
                      ></v-img>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col :cols="device.mobile ? `12` : `4`">
                <v-card max-width="600" class="mx-auto">
                  <v-toolbar color="grey darken-1" dark>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>Dokumen Persyaratan</v-toolbar-title>

                    <v-spacer></v-spacer>
                  </v-toolbar>

                  <v-list subheader two-line>
                    <v-list-item
                      v-for="file in record.dokumens"
                      :key="file.title"
                    >
                      <v-list-item-avatar>
                        <v-icon color="red" dark>mdi-file-pdf</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{ file.name }} </v-list-item-title>

                        <v-list-item-subtitle color="red"
                          ><v-chip
                            small
                            :color="
                              file.status == 'Belum Diverifikasi'
                                ? 'yellow'
                                : file.status == 'Sudah Diverifikasi'
                                ? 'green'
                                : 'red'
                            "
                            >{{ file.status }}</v-chip
                          ></v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          v-text="file.wajib"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn icon @click="openPdf(file.id, file.path)">
                          <v-icon color="green lighten-1">preview</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="80%"
          height="100%"
          persistent
          hide-overlay
        >
          <v-card>
            <v-card-title class="purple white--text subtitle-1" dense
              >DOKUMEN VIEW <v-spacer></v-spacer>
              <v-tooltip color="purple" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn small icon v-on="on">
                    <v-icon color="white" @click="postUpdateDokumenDiTerima"
                      >verified</v-icon
                    >
                  </v-btn>
                </template>
                <span>Diterima</span>
              </v-tooltip>
              <v-tooltip color="purple" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn small icon v-on="on">
                    <v-icon color="white" @click="postUpdateDokumenDiTolak"
                      >info</v-icon
                    >
                  </v-btn>
                </template>
                <span>Ditolak</span>
              </v-tooltip>

              <v-tooltip color="purple" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn small icon v-on="on">
                    <v-icon color="white" @click="dialog = false"
                      >highlight_off</v-icon
                    >
                  </v-btn>
                </template>
                <span>Tutup</span>
              </v-tooltip>
            </v-card-title>

            <vue-pdf-app
              style="height:900px;width:100%"
              :pdf="pdf"
            ></vue-pdf-app>
          </v-card>
        </v-dialog>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VuePdfApp from "vue-pdf-app";
// import this to use default icons for buttons
import "vue-pdf-app/dist/icons/main.css";
export default {
  name: "Home",
  components: {
    VuePdfApp,
  },
  data: () => ({
    num: 1,
    dialog: false,
    pdf: null,
    dokumen_id: null,
    status_dokumen: null,
    files: [
      {
        color: "blue",
        icon: "mdi-clipboard-text",
        subtitle: "Jan 20, 2014",
        title: "KTP dan KK",
      },
      {
        color: "amber",
        icon: "mdi-gesture-tap-button",
        subtitle: "Jan 10, 2014",
        title: "Ijazah",
      },
    ],
  }),
  computed: {
    ...mapState([
      "theme",
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
      dataUrl: "api/permohonan",
    });

    this.postEdit(this.$route.params.id);
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
      "setRecord",
    ]),

    postUpdateDiterima: function() {
      this.record.status = "TERVERIFIKASI";
      this.postUpdate(this.record).then(() => {
        this.$router.push({ name: "lowongan-permohonan" });
      });
    },

    postUpdatePerbaikan: function() {
      this.record.status = "PERBAIKAN";
      this.postUpdate(this.record).then(() => {
        this.$router.push({ name: "lowongan-permohonan" });
      });
    },

    postUpdateDitolak: function() {
      this.record.status = "DITOLAK";
      this.postUpdate(this.record).then(() => {
        this.$router.push({ name: "lowongan-permohonan" });
      });
    },

    postDownload(val) {
      window.open(val, "__blank");
    },

    postUpdateDokumenDiTolak: async function() {
      try {
        this.status_dokumen = 2;
        let {
          data: { status, message },
        } = await this.http.post("api/permohonan-dokumen/" + this.dokumen_id, {
          status: this.status_dokumen,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          this.dialog = false;
          this.dokumen_id = null;

          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.dialog = false;
        this.dokumen_id = null;
        this.postEdit(this.$route.params.id);
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.dialog = false;
        this.dokumen_id = null;
      }
    },

    postUpdateDokumenDiTerima: async function() {
      try {
        this.status_dokumen = 1;
        let {
          data: { status, message },
        } = await this.http.post("api/permohonan-dokumen/" + this.dokumen_id, {
          status: this.status_dokumen,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          this.dialog = false;
          this.dokumen_id = null;

          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.dialog = false;
        this.dokumen_id = null;
        this.postEdit(this.$route.params.id);
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.dialog = false;
        this.dokumen_id = null;
      }
    },

    openPdf(id, val) {
      this.dokumen_id = id;
      this.pdf = val;
      this.dialog = true;
    },
  },

  watch: {
    "record.pendidikan_id": function() {
      this.fetchJurusans();
    },
    "record.opd_id": function() {
      this.fetchUnkers();
    },
    "record.unit_kerja_id": function() {
      this.fetchNjab();
    },
  },
};
</script>
