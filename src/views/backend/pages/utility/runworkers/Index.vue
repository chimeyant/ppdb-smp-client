<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon>vpn_key</v-icon>
      <v-subheader class="text-h6">
        <h4>RUN WORKERS</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Utility Run Workers</div>
    </v-flex>

    <v-row>
      <v-spacer v-if="device.desktop"></v-spacer>
      <v-col cols="device.desktop ? 6 : 12">
        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-card-title :color="theme">Form Workers</v-card-title>
          <v-card-text class="text--primary">
            <v-select
              label="Workers"
              outlined
              dense
              hide-details
              v-model="worker"
              :items="workers"
            ></v-select>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :color="theme"
              text
              @click="runWoker"
            >
              Jalankan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer v-if="device.desktop"></v-spacer>
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
        text: "TINGKAT",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "KETERANGAN", value: "description" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    worker: null,
    workers: [
      { text: "Pendaftar", value: "pendaftar" },
      { text: "Pengumuman", value: "pengumuman" },
    ],
  }),
  computed: {
    ...mapState(["theme", "http", "device", "record", "snackbar", "theme"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/master-tingkat",
    });
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage"]),
    runWoker: function () {
      if (this.worker == "pendaftar") {
        this.postWorkerPendaftar();
      } else {
        this.postPengumuman();
      }
    },

    postWorkerPendaftar: async function () {
      try {
        let { data, status } = await this.http.post("api/run-job-pendaftars");
        this.snackbar.color = this.theme;
        this.snackbar.text = "Woker berhasil dijalankan";
        this.snackbar.state = true;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      }
    },

    postPengumuman: async function () {
      try {
        let {
          data: { status, message },
        } = await this.http.post("api/run-service-pengumuman");
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
        this.snackbar.state = false;
      }
    },
  },
};
</script>
