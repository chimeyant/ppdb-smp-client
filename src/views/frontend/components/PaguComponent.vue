<template>
  <div>
    <v-container>
      <v-row class="mt-10">
        <v-col :cols="device.desktop ? `6` :`12`">
          <v-row class="justify-center">
            <img
              src="../../../assets/images/Pagu.png"
              alt=""
              srcset=""
              width="60%"
              height="90%"
            >
          </v-row>
        </v-col>
        <v-col :cols="device.desktop ? `6` :`12`">
          <h2 class="mb-3">Program Keahlian</h2>
          <v-data-table
            :headers="info.showpagu ? headers: headers2"
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
              <v-chip :color="
                      value == 'Pengajuan'
                        ? 'grey'
                        : value == 'Perbaikan Berkas'
                        ? 'yellow'
                        : value == 'Pengajuan Perbaikan'
                        ? 'yellow'
                        : value == 'Berkas Diterima'
                        ? 'green'
                        : 'red'
                    ">{{ value }}</v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "PaguComponent",
  data: () => ({
    headers: [
      { text: "#", value: "num", sortable: false },
      { text: "PRO. KEAHLIAN", value: "nama", sortable: false },
      { text: "PAGU/KUOTA", value: "pagu", sortable: false },
      { text: "WARNA MAP", value: "warna", sortable: false },
    ],
    headers2: [
      { text: "#", value: "num", sortable: false },
      { text: "PRO. KEAHLIAN", value: "nama", sortable: false },
      { text: "WARNA MAP", value: "warna", sortable: false },
    ],
    records: [],
    search: "",
  }),
  mounted() {
    this.setPage({
      crud: false,
    });
    this.fetchFormasi();
  },
  computed: {
    ...mapState(["device", "theme", "info", "table", "loading", "http"]),
  },
  methods: {
    ...mapActions(["setPage"]),
    fetchFormasi: async function () {
      let { data } = await this.http.get("pagu");

      this.records = data;
    },
  },
  watch: {},
};
</script>

<style>
</style>