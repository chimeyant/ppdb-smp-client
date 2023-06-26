<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme">mdi-whatsapp</v-icon>
      <v-subheader class="text-h6">
        <h4>WA BLAST</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Daftar Seluruh WA Blast Yang Tersedia</div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title :class="`flex flex-row-reverse ` + theme + ` lighten-1`">
            <v-tooltip
              color="purple draken-4"
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
                    @click="postDeleteRecord(1)"
                  >delete</v-icon>
                </v-btn>
              </template>
              <span>Hapus Data</span>
            </v-tooltip>
            <v-tooltip
              color="purple draken-4"
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
                    @click="addNewRecord"
                  >add_circle</v-icon>
                </v-btn>
              </template>
              <span>Tambah Wa</span>
            </v-tooltip>

            <v-tooltip
              color="green"
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
                  >refresh</v-icon>
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
            <template v-slot:item.status="{ value }">
              <v-tooltip
                color="orange"
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-chip
                    small
                    :color="value ? `green` : `red`"
                  >{{
                    value ? "TERKIRIM" : "BELUM TERKIRIM"
                  }}</v-chip>
                </template>
                <span>Kirim Ulang Pesan</span>
              </v-tooltip>
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
                      @click="kirimulang(value)"
                    >mail</v-icon>
                  </v-btn>
                </template>
                <span>Kirim Ulan</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme"
            dark
          >Formulir Wa Blast</v-toolbar>
          <v-card-title class="justify-center">DATA WA</v-card-title>
          <v-card-text>
            <v-col cols="12">
              <v-select
                label="Jenis Infomasi"
                outlined
                dense
                hide-details
                v-model="record.jenis_informasi"
                :items="jenisinformasis"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                label="Jurusan"
                :color="theme"
                outlined
                dense
                hide-details
                v-model="record.program_keahlian_id"
                :items="jurusans"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Pesan"
                :color="theme"
                outlined
                dense
                hide-details
                v-model="record.pesan"
                rows="4"
              ></v-textarea>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme"
              v-show="!edit"
              @click="postKirimInformasi"
            >Kirim</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="add = false"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num", width: 50, align: "right" },
      { text: "NAMA", value: "name" },
      { text: "NOMOR", value: "nomor", width: 150 },
      { text: "JENIS", value: "jenis_informasi", width: 150 },
      { text: "PESAN", value: "pesan" },
      { text: "STATUS", value: "status", width: 100, align: "center" },
      {
        text: "AKSI",
        value: "id",
        width: 50,
        align: "center",
        sortable: false,
      },
    ],

    search: null,
    path: null,

    add: false,
    edit: false,

    jurusans: [],

    jenisinformasi: "",

    jenisinformasis: [{ text: "Umum", value: "informasi-umum" }],
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
      dataUrl: "api/utility-wa",
    });
    this.fetchJurusan();
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

    fetchJurusan: async function () {
      let { data: data } = await this.http.post("api/program-keahlian-combo");

      this.jurusans = data;
    },
    kirimulang: async function (val) {
      try {
        this.setLoading({ dialog: true, text: "Proses kirim pesan...!" });
        let {
          data: { status, message },
        } = await this.http.post("api/utility-wa-kirim-ulang", { id: val });

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
    addNewRecord: function () {
      this.setRecord({});
      this.add = true;
      this.edit = false;
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.add = false;
      });
    },
    editRecord: function (val) {
      this.postEdit(val);
      this.add = true;
      this.edit = true;
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.add = false;
        this.edit = false;
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    postKirimInformasi: async function () {
      try {
        this.setLoading({ dialog: true, text: "Proses kirim pesan...!" });
        let {
          data: { status, message },
        } = await this.http.post("api/utility-kirim-informasi", this.record);
        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }
        this.snackbar.color = this.theme;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.fetchRecords();
        this.add = false;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },

    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".docx", ".pdf", ".jpeg", ".jpg", ".png"],
        query: {
          doctype: "peraturan",
        },
        callback: (response) => {
          setTimeout(() => {
            this.path = response.name;
            this.record.path = response.name;
          }, 500);
        },
      });
    },

    postDownload(val) {
      window.open(val, "__blank");
    },
  },
};
</script>
