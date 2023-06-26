<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme">how_to_reg</v-icon>
      <v-subheader class="text-h6">
        <h4>OLAH NILAI {{ title }}</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Daftar Seluruh Peserta Yang Tersedia</div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title :class="`flex flex-row-reverse ` + theme + ` lighten-1`">
            <v-tooltip
              :color="theme"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="white"
                    @click="$router.push({ name: 'olahnilai-jurusan' })"
                  >mdi-close-circle</v-icon>
                </v-btn>
              </template>
              <span>Close</span>
            </v-tooltip>

            <v-tooltip
              :color="theme"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="white"
                    @click="downloadExcel"
                  >mdi-file-excel</v-icon>
                </v-btn>
              </template>
              <span>Download Data Peserta</span>
            </v-tooltip>

            <v-tooltip
              :color="theme"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="white"
                    @click="openDialogGrade2"
                  >mdi-format-columns</v-icon>
                </v-btn>
              </template>
              <span>Passing Grade 2</span>
            </v-tooltip>

            <v-tooltip
              :color="theme"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="white"
                    @click="postGrade"
                  >mdi-filter-variant</v-icon>
                </v-btn>
              </template>
              <span>Passing Grade 1</span>
            </v-tooltip>

            <v-tooltip
              :color="theme"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="white"
                    @click=""
                  >mail</v-icon>
                </v-btn>
              </template>
              <span>Kirim Pesan Pengumuman</span>
            </v-tooltip>

            <v-tooltip
              :color="theme"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  small
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="white"
                    @click="fetchRecords"
                  >autorenew</v-icon>
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
              <v-icon
                small
                color="red"
                v-show="value"
              >start </v-icon>
            </template>
            <template v-slot:item.id="{ value }">
              <v-tooltip
                color="orange"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    text
                    small
                    icon
                    v-on="on"
                  >
                    <v-icon
                      color="orange"
                      @click="openFormEdit(value)"
                    >mdi-calculator</v-icon>
                  </v-btn>
                </template>
                <span>Olah Nilai</span>
              </v-tooltip>
              <v-tooltip
                color="orange"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    text
                    small
                    icon
                    v-on="on"
                  >
                    <v-icon
                      color="orange"
                      @click="sendPrivateMessage(value)"
                    >mail</v-icon>
                  </v-btn>
                </template>
                <span>Kirim Pesan</span>
              </v-tooltip>
              <v-tooltip
                color="blue"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    text
                    small
                    icon
                    v-on="on"
                  >
                    <v-icon
                      color="blue"
                      @click="postManualGrade(value)"
                    >school</v-icon>
                  </v-btn>
                </template>
                <span>Set Kelulusan Manual</span>
              </v-tooltip>
            </template>
            <template v-slot:item.status="{ value }">
              <v-chip
                small
                :color="value == 'L' ? 'green' : 'red'"
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
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme"
            dark
          >Formulir Penilaian</v-toolbar>
          <v-card-title class="justify-content-between">{{ record.nama }} <v-spacer></v-spacer>{{ record.asal }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-col cols="12">
                  <v-text-field
                    label="NILAI PRESTASI"
                    :color="theme"
                    dense
                    outlined
                    hide-details
                    v-model="record.prestasi_skor"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NILAI RAPOR"
                    :color="theme"
                    dense
                    outlined
                    hide-details
                    v-model="record.nilai_rapor"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NILAI TEORI"
                    :color="theme"
                    dense
                    outlined
                    hide-details
                    v-model="record.nilai_teori"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NILAI WAWANCARA"
                    :color="theme"
                    dense
                    outlined
                    hide-details
                    v-model="record.nilai_wawancara"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="6">
                <v-col cols="12">
                  <v-switch
                    label="Siswa Kebutuhan Khusus"
                    v-model="record.order_person_status"
                    :color="theme"
                    hide-details
                  ></v-switch>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Penanggung Jawab"
                    :color="theme"
                    dense
                    outlined
                    hide-details
                    :disabled="!record.order_person_status"
                    v-model="record.order_person_name"
                  ></v-text-field>
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
            >SIMPAN</v-btn>
            <v-btn
              outlined
              :color="theme"
              v-show="edit"
              @click="postUpdateRecord"
            >Ubah</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="form.edit = false"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="form.dialog"
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
            <p class="pt-5">
              Apakah anda yakin akan melakukan passing grade pilihan ke 2 ..? ,
              sebelum melakukan pastikan passing grade 1 di seluruh jurusan
              telah selesai !
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="theme"
              text
              @click="dialogGrade2Close"
            >Tidak</v-btn>
            <v-btn
              color="red"
              text
              @click="postGrade2"
            >Ya, Saya Yakin</v-btn>
            <v-spacer></v-spacer>
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
      { text: "PIL", value: "pil1" },
      { text: "N.P", value: "np" },
      { text: "N.R", value: "nr" },
      { text: "N.T", value: "nt" },
      { text: "N.W", value: "nw" },
      { text: "N.A", value: "na" },
      { text: "STATUS", value: "status" },
      { text: "KET", value: "prioritas" },
      { text: "ORDER", value: "order_person_status" },
      { text: "OPSI", value: "id" },
    ],

    form: {
      edit: false,
      dialog: false,
    },

    title: null,

    search: null,
    path: null,
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
      dataUrl: "api/olah-nilai/" + this.$route.params.jurusan_id,
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
    fetchInfoJurusan: async function () {
      let { data } = await this.http.get(
        "api/program-keahlian/" + this.$route.params.jurusan_id
      );

      this.title = data.name;
    },
    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.form.edit = false;
        this.postGrade();
        this.fetchRecords();
      });
    },
    postGrade: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Mohon Menunggu Sedang Melakukan Proses Pasing Grade",
        });

        let {
          data: { status, message },
        } = await this.http.post("api/olah-nilai-grade", {
          id: this.$route.params.jurusan_id,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },
    openDialogGrade2: function () {
      this.form.dialog = true;
    },
    closeDialogGrade2: function () {
      this.form.dialog = false;
    },

    postGrade2: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Mohon Menunggu Sedang Melakukan Proses Pasing Grade 2",
        });

        let {
          data: { status, message },
        } = await this.http.post("api/olah-nilai-grade2", {
          id: this.$route.params.jurusan_id,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.closeDialogGrade2();
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
        this.closeDialogGrade2();
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },
    sendPublicMessage: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses kirim pesan",
        });

        let {
          data: { status, message },
        } = await this.http.post("api/olah-nilai-public-send", {
          id: this.$route.params.jurusan_id,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps.., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },

    sendPrivateMessage: async function (val) {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses kirim pesan",
        });

        let {
          data: { status, message },
        } = await this.http.post("api/olah-nilai-private-send", { id: val });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          message: "",
        });
      }
    },

    postManualGrade: async function (val) {
      try {
        this.setLoading({
          dialog: true,
          text: "Mohon Menunggu Sedang Melakukan  Manual Grade ",
        });

        let {
          data: { status, message },
        } = await this.http.post("api/olah-nilai-manual-grade", {
          jurusan_id: this.$route.params.jurusan_id,
          id: val,
        });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
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
  },
  watch: {
    "record.nilai_rapor": function () {
      this.record.nilai_akhir =
        Number(this.record.prestasi_skor) +
        Number(this.record.nilai_rapor) +
        Number(this.record.nilai_teori) +
        Number(this.record.nilai_wawancara);
    },
    "record.nilai_teori": function () {
      this.record.nilai_akhir =
        Number(this.record.prestasi_skor) +
        Number(this.record.nilai_rapor) +
        Number(this.record.nilai_teori) +
        Number(this.record.nilai_wawancara);
    },
    "record.nilai_wawancara": function () {
      this.record.nilai_akhir =
        Number(this.record.prestasi_skor) +
        Number(this.record.nilai_rapor) +
        Number(this.record.nilai_teori) +
        Number(this.record.nilai_wawancara);
    },
  },
};
</script>
