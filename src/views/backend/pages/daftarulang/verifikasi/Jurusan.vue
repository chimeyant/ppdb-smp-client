<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">fact_check</v-icon>
      <v-subheader class="text-h6">
        <h4>VERIFIKASI DAFTAR ULANG PESERTA</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Daftar Seluruh Daftar Ulang Peserta Yang Tersedia</div>
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
              <v-tooltip color="blue" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="blue" @click="openFormOlahNilai(value)"
                      >mdi-login-variant</v-icon
                    >
                  </v-btn>
                </template>
                <span>Olah Nilai Jurusan Terkait</span>
              </v-tooltip>
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
      { text: "PROG.KEAHLIAN", value: "name" },
      { text: "PAGU", value: "pagu" },
      { text: "PESERTA", value: "jumlah" },
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
      dataUrl: "api/olah-nilai-jurusan",
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
    openFormOlahNilai: function (val) {
      this.$router.push({
        name: "daftar-ulang-verifikasi",
        params: { jurusan_id: val },
      });
    },
  },
};
</script>
