<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">volunteer_activism</v-icon>
      <v-subheader class="text-h6">
        <h4>DAFTAR FORMASI</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Formasi yang tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title class="flex flex-row-reverse purple lighten-1">
            <v-tooltip color="green" bottom>
              <template v-slot:activator="{ on }">
                <v-btn text small icon v-on="on">
                  <v-icon color="white" @click="fetchRecords">refresh</v-icon>
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
              <v-chip small :color="value ? `red` : `yellow`">{{
                value ? "Wajib" : "Opsional"
              }}</v-chip>
            </template>
            <template v-slot:item.id="{ value }">
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="green " @click="postAddNewRecord(value)"
                      >send</v-icon
                    >
                  </v-btn>
                </template>

                <span>Kirim Permohonan</span>
              </v-tooltip>
              <v-tooltip color="orange" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="orange" @click="editRecord(value)"
                      >search</v-icon
                    >
                  </v-btn>
                </template>

                <span>Lihat Detail Formasi</span>
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
          <v-toolbar :color="theme" dark>Informasi Detail Formasi</v-toolbar>
          <v-card-title>
            SATUAN KERJA
          </v-card-title>
          <v-card-subtitle>
            DINAS KOMUNIKASI
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-title>
            Jenis Jabatan
          </v-card-title>
          <v-card-subtitle>{{ record.jenis_jabatan }}</v-card-subtitle>

          <v-card-title>
            Nama Jabatan
          </v-card-title>
          <v-card-subtitle>{{ record.nama_jabatan }}</v-card-subtitle>

          <v-card-title>
            Pendidikan Yang dipersyaratkan
          </v-card-title>
          <v-card-subtitle>
            <v-row>
              <div
                class="pl-3"
                v-for="item in record.detjurusan"
                :key="item.name"
              >
                {{ item.name }} ,
              </div>
            </v-row>
          </v-card-subtitle>
          <v-card-title>
            Deskripsi
          </v-card-title>
          <v-card-subtitle>{{ record.keterangan }}</v-card-subtitle>

          <v-card-title>
            Jumlah
          </v-card-title>
          <v-card-subtitle>{{ record.jumlah }} Orang</v-card-subtitle>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Tanggal Pendaftaran</v-card-title>

          <v-card-text>
            <v-chip color="green">{{ record.tanggal_mulai }}</v-chip>
            &nbsp;

            <v-chip color="red">{{ record.tanggal_selesai }}</v-chip>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn outlined color="grey" @click="add = false">TUTUP</v-btn>
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
      { text: "#", value: "num" },

      { text: "JABATAN", value: "nama_jabatan" },
      { text: "JENIS", value: "jenis_jabatan" },

      { text: "OPD", value: "opd" },
      { text: "TANGGAL", value: "tanggal" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    path: null,

    add: false,
    edit: false,
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
      dataUrl: "api/formasi",
    });
    this.fetchRecords();
    this.fetchOpds();
    this.fetchPendidikans();
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

    addNewRecord: function() {
      this.setRecord({});
      this.add = true;
      this.edit = false;
    },
    postAddNewRecord: async function(val) {
      let {
        data: { status, message },
      } = await this.http.post("api/peserta/permohonan", { formasi_id: val });

      if (!status) {
        this.snackbar.color = "red";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.$router.push({ name: "peserta-permohonan" });
        return;
      }

      this.snackbar.color = "green";
      this.snackbar.text = message;
      this.snackbar.state = true;

      this.$router.push({ name: "peserta-permohonan" });
      return;
    },

    editRecord: function(val) {
      this.postEdit(val);
      this.add = true;
      this.edit = true;
    },

    postUpdateRecord: function() {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.add = false;
        this.edit = false;
      });
    },

    uploadFile: function() {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "permohonan",
        },
        callback: (response) => {
          setTimeout(() => {
            this.path = response.name;
            this.record.path = response.name;
          }, 500);
        },
      });
    },

    fetchOpds: async function() {
      let { data: data } = await this.http.post("api/opd-combo");
      this.opds = data;
    },

    fetchPendidikans: async function() {
      let { data: data } = await this.http.post("api/pendidikan-combo");
      this.pendidikans = data;
    },

    fetchJurusans: async function() {
      let { data: data } = await this.http.post("api/jurusan-combo", {
        pendidikan_id: this.record.pendidikan_id,
      });

      this.jurusans = data;
    },

    postDownload(val) {
      window.open(val, "__blank");
    },
  },

  watch: {
    "record.jurusans": function() {
      this.fetchJurusans();
    },
  },
};
</script>
