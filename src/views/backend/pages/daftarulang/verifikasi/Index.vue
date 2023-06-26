<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">how_to_reg</v-icon>
      <v-subheader class="text-h6">
        <h4>VERIFIKASI DAFTAR ULANG {{ title }}</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Daftar Seluruh Peserta Yang Tersedia</div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title
            :class="`flex flex-row-reverse ` + theme + ` lighten-1`"
          >
            <v-tooltip :color="theme" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon
                    color="white"
                    @click="$router.push({ name: 'daftar-ulang-jurusan' })"
                    >mdi-close-circle</v-icon
                  >
                </v-btn>
              </template>
              <span>Close</span>
            </v-tooltip>

            <v-tooltip :color="theme" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="downloadExcel"
                    >mdi-file-excel</v-icon
                  >
                </v-btn>
              </template>
              <span>Download Data Peserta</span>
            </v-tooltip>
            <v-tooltip :color="theme" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="fetchRecords">autorenew</v-icon>
                </v-btn>
              </template>
              <span>Refresh Data</span>
            </v-tooltip>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              solo
              :color="theme"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="records"
            :items-per-page="10"
            class="elevation-2"
            :color="theme"
            :loading="loading.table"
            loading-text="Loading... Please wait"
            :search="search"
          >
            <v-progress-linear
              slot="progress"
              :color="theme"
              height="1"
              indeterminate
            ></v-progress-linear>
            <template v-slot:item.order_person_status="{ value }">
              <v-icon small color="red" v-show="value">start </v-icon>
            </template>
            <template v-slot:item.id="{ value }">
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="green" @click="openFormEdit(value)"
                      >verified_user</v-icon
                    >
                  </v-btn>
                </template>
                <span>Verifikasi</span>
              </v-tooltip>
            </template>
            <template v-slot:item.status="{ value }">
              <v-chip small :color="value == 'L' ? 'green' : 'red'"
                >{{ value }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.edit"
        :max-width="device.desktop ? `800px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar :color="theme" dark
            >Formulir Verifikasi Daftar Ulang</v-toolbar
          >
          <v-card-title>
            <v-row class="justify-center"> BIODATA CALON SISWA </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-list two-line>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="theme"> mdi-account-card-details </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ record.nama }}</v-list-item-title>
                      <v-list-item-subtitle
                        >NISN: {{ record.nisn }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >NIK: {{ record.nik }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="theme"> mdi-gender-female </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        record.gen
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{
                        record.ttl
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="theme"> mdi-school </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        record.sekolah
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle>Sekolah Asal</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="theme"> mdi-crosshairs-gps </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        record.alamat
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle
                        >Desa {{ record.desa }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Kec {{ record.kecamatan }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Kab {{ record.kabupaten }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="theme"> mdi-whatsapp </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle>{{
                        record.wa
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{
                        record.telp
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="theme"> mdi-folder </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle>AKTE LAHIR</v-list-item-subtitle>
                      <v-list-item-subtitle>Dokumen</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          :color="theme + ` lighten-1`"
                          @click="postDownload(record.dok_akte_lahir)"
                          >mdi-monitor</v-icon
                        >
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon> </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        >KARTU KELUARGA</v-list-item-subtitle
                      >
                      <v-list-item-subtitle>Dokumen</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          :color="theme + ` lighten-1`"
                          @click="postDownload(record.dok_kartu_keluarga)"
                          >mdi-monitor</v-icon
                        >
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon> </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle>SKL</v-list-item-subtitle>
                      <v-list-item-subtitle>Dokumen</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          :color="theme + ` lighten-1`"
                          @click="postDownload(record.dok_skl)"
                          >mdi-monitor</v-icon
                        >
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon> </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-subtitle
                        >PERNYATAAN CALON SISWA</v-list-item-subtitle
                      >
                      <v-list-item-subtitle>Dokumen</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          :color="theme + ` lighten-1`"
                          @click="postDownload(record.daftar_ulang_dokumen)"
                          >mdi-monitor</v-icon
                        >
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="theme"> mdi-verified </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-col cols="12">
                        <v-textarea
                          label="Keterangan/Pesan"
                          :color="theme"
                          dense
                          outlined
                          hide-details
                          v-model="record.verifikasi_keterangan"
                          rows="3"
                        >
                          {{ record.keterangan }}
                        </v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          label="Status Verifikasi :"
                          dense
                          outlined
                          :color="theme"
                          hide-details
                          v-model="record.daftar_ulang_status"
                          :items="verifikasis"
                        ></v-select>
                      </v-col>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="4">
                <v-col cols="12">
                  <v-row class="justify-end mt-4">
                    <img
                      :src="record.foto"
                      height="180"
                      width="150"
                      alt="FOTO"
                    />
                  </v-row>
                </v-col>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme"
              v-show="!edit"
              @click="postUpdateRecord"
              >SIMPAN</v-btn
            >
            <v-btn
              outlined
              :color="theme"
              v-show="edit"
              @click="postUpdateRecord"
              >Ubah</v-btn
            >
            <v-btn outlined color="grey" @click="form.edit = false"
              >Batal</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import XLSX from "xlsx";

export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num" },
      { text: "NISN", value: "nisn" },
      { text: "NAMA", value: "nama" },
      { text: "L/P", value: "jenis_kelamin" },
      { text: "ASAL SEKOLAH", value: "sekolah" },
      { text: "DAFTAR ULANG", value: "daftar_ulang_status" },
      { text: "VERIFIKASI", value: "daftar_ulang_verifikasi_status" },
      { text: "OPSI", value: "id" },
    ],

    form: {
      edit: false,
      dialog: false,
    },

    title: null,

    search: null,
    path: null,
    verifikasis: [
      { text: "BERKAS DITERIMA", value: "BERKAS DITERIMA" },
      { text: "BERKAS PERBAIKAN", value: "BERKAS PERBAIKAN" },
      { text: "BERKAS DITOLAK", value: "BERKASI DITOLAK" },
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
      dataUrl: "api/daftar-ulang-verifikasi/" + this.$route.params.jurusan_id,
    });
    this.fetchInfoJurusan();
    this.fetchRecords();
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
      "setLoading",
    ]),
    openFormEdit: function (val) {
      this.postEdit(val);
      this.form.edit = true;
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.form.edit = false;
        this.fetchRecords();
      });
    },

    fetchInfoJurusan: async function () {
      let { data } = await this.http.get(
        "api/program-keahlian/" + this.$route.params.jurusan_id
      );

      this.title = data.name;
    },

    downloadExcel: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses Download Data",
        });
        let { data } = await this.http.post("api/olah-nilai-export", {
          id: this.$route.params.jurusan_id,
        });

        var dataxls = XLSX.utils.json_to_sheet(data);

        // A workbook is the name given to an Excel file
        var wb = XLSX.utils.book_new(); // make Workbook of Excel

        // add Worksheet to Workbook
        // Workbook contains one or more worksheets
        XLSX.utils.book_append_sheet(wb, dataxls, "daftar perserta"); // sheetAName is name of Worksheet
        //XLSX.utils.book_append_sheet(wb, pokemonWS, "pokemons");

        // export Excel file
        XLSX.writeFile(wb, "daftar-passing-grade.xlsx"); // name of the file is 'book.xlsx'
      } catch (error) {
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },

    postDownload(val) {
      window.open(val, "__blank");
    },
  },
};
</script>
