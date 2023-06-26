<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">how_to_reg</v-icon>
      <v-subheader class="text-h6">
        <h4>VERIFIKASI DATA PESERTA</h4>
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
            <v-btn icon @click="fetchRecords"
              ><v-icon color="white">autorenew</v-icon></v-btn
            >
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
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="green" @click="openFormVerifikasi(value)"
                      >verified_user</v-icon
                    >
                  </v-btn>
                </template>
                <span>Verifikasi Peserta</span>
              </v-tooltip>
            </template>
            <template v-slot:item.status="{ value }">
              <v-chip small :color="value == '1' ? 'grey' : 'yellow'"
                >{{
                  value == 1
                    ? "PENGAJUAN BARU"
                    : value == 2
                    ? "PERBAIKAN"
                    : "PENGAJUAN PERBAIKAN"
                }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
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
      {
        text: "TANGGAL",
        align: "start",
        sortable: false,
        value: "tanggal_register",
      },
      { text: "NISN", value: "nisn" },
      { text: "NAMA", value: "nama" },
      { text: "L/P", value: "jenis_kelamin" },
      { text: "ASAL SEKOLAH", value: "sekolah" },
      { text: "PIL I", value: "pil1" },
      { text: "STATUS", value: "status" },
      { text: "OPSI", value: "id" },
    ],

    form: {
      edit: false,
    },

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
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/verifikasi",
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
    ]),
    openFormVerifikasi: function (val) {
      this.$router.push({ name: "verifikasi-form", params: { id: val } });
    },
  },
};
</script>
