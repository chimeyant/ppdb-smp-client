<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon>mdi-account-group-outline</v-icon>
      <v-subheader class="text-h6">
        <h4>MASTER DATA KELULUSAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Data Kelulusan Yang Tersedia
      </div>
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
                    @click="openBulkDelete"
                  >mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Hapus Semua</span>
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
                    @click="openFormImportData"
                  >mdi-cloud-upload</v-icon>
                </v-btn>
              </template>
              <span>Import Data Excel</span>
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

            <template v-slot:item.id="{ value }">
              <v-menu
                bottom
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    :color="theme"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-dots-vertical-circle-outline
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item @click="editRecord(value)">
                    <v-list-item-title>
                      <v-icon color="orange">mdi-pencil-circle</v-icon>
                      Edit
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="postDeleteRecord(value)">
                    <v-list-item-title>
                      <v-icon color="red">mdi-delete-circle</v-icon>
                      Hapus
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
          >Formulir Data Kelulusan</v-toolbar>
          <v-card-title class="justify-center">DATA PESERTA</v-card-title>
          <v-card-text>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="NOMOR"
                v-model="record.nomor"
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="NO. Pendaftaran"
                v-model="record.nopend"
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="NISN"
                v-model="record.nisn"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Nama"
                v-model="record.nama"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Jalur"
                v-model="record.jalur"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="JARAK"
                v-model="record.jarak"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Verifikasi"
                v-model="record.verifikasi"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="STATUS"
                v-model="record.status"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Asal Sekolah"
                v-model="record.asal_sekolah"
                dense
              ></v-text-field>
            </v-col>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme"
              @click="postUpdateRecord"
            >Simpan</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="form.edit = false"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="dataimport.form.show"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme"
            dark
          >
            <v-icon class="mr-1">mdi-circle</v-icon> Formulir Import Data
          </v-toolbar>
          <v-card-title class="justify-center grey--text">
            IMPORT DATA PESERTA
          </v-card-title>
          <v-card-text>
            <v-col
              cols="12"
              class=""
            >
              <v-text-field
                label="File  XLS, XLSX (Max: 2 MB)"
                append-outer-icon="attachment"
                outlined
                dense
                hide-details
                v-model="dataimport.path"
                :color="theme"
                @click:append-outer="uploadFile"
              ></v-text-field>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">

            <v-btn
              outlined
              :color="theme"
              @click="postImport"
            >Kirim</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="dataimport.form.show = false"
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
      { text: "#", value: "nomor", width: 60 },
      {
        text: "NO. PENDF",
        align: "start",
        sortable: false,
        value: "nopend",
        width: 100,
      },
      {
        text: "NISN",
        align: "start",
        sortable: false,
        value: "nisn",
        width: 75,
      },
      { text: "NAMA", value: "nama" },
      { text: "TTL", value: "ttl" },
      { text: "JALUR", value: "jalur" },
      {
        text: "STATUS",
        value: "status",
        sortable: false,
        width: 75,
        align: "center",
      },
      {
        text: "AKSI",
        value: "id",
        width: 75,
        align: "center",
        sortable: false,
      },
    ],

    form: {
      edit: false,
    },

    search: null,
    path: null,

    dataimport: {
      form: {
        show: false,
      },
      path: null,
    },
    bulkdelete: {
      form: { show: false },
    },
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
      dataUrl: "api/master-kelulusan",
    });
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

    addNew: function () {
      this.setRecord({});
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
      });
    },
    editRecord: function (val) {
      this.form.edit = true;
      this.postEdit(val);
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.form.edit = false;
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".xls", ".xlsx"],
        query: {
          doctype: "datas",
        },
        callback: (response) => {
          setTimeout(() => {
            this.dataimport.path = response.name;
            this.record.file_excel = response.name;
          }, 500);
        },
      });
    },

    postDownloadExcel: async function () {},

    openFormImportData: function () {
      this.dataimport.form.show = true;
    },

    postImport: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses import data kelulusan...",
        });
        let {
          data: { status, message },
        } = await this.http.post("api/master-kelulusan-import", this.record);

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = this.theme;
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.dataimport.form = false;
        this.fetchRecords();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },

    openBulkDelete: async function () {
      try {
        this.setLoading({ dialog: true, text: "Proses hapus semua data..." });
        let {
          data: { status, message },
        } = await this.http.post("api/master-kelulusan-bulk-delete");
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
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
        this.fetchRecords();
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
  },
};
</script>
