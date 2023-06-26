<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">description</v-icon>
      <v-subheader class="text-h6">
        <h4>LAPORAN PENERIMAAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">LAPORAN PENERIMAAN</div>
    </v-flex>

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `6` : `12`">
        <v-card>
          <v-card-title class="white--text purple lighten-1"
            >LAPORAN PENERIMAAN</v-card-title
          >
          <v-card-text>
            <v-col>
              Pencetakan Laporan Penerimaan Mutasi Pegawai Negeri Sipil Antar
              Daerah
            </v-col>
          </v-card-text>
          <v-card-actions class="mt-5">
            <v-col class="text-right">
              <v-btn outlined :color="theme" @click="printReport">CETAK</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import jsPDF from "jspdf";

export default {
  name: "perusahaan-index",
  data: () => ({
    foto: "/",
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/",
    });

    this.fetchRecord();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "assignFileBrowse", "getUserInfo"]),

    printReport: async function () {
      let { data } = await this.http.get("api/laporan-penerimaan", {});

      this.data = data;

      var doc = new jsPDF("l", "mm", [297, 210]);
      doc.fromHTML(data);
    },

    fetchRecord: async function () {
      let { data } = await this.http.get("api/user-info");

      this.record = data;

      this.foto = data.avatar;
    },
    fetchUpdate: async function () {
      try {
        let {
          data: { status, message, data },
        } = await this.http.post("api/update-profil", this.record);

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.record = data;
        this.fetchRecord();
        this.getUserInfo();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "avatar",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.avatar = response.name;
          }, 1000);
        },
      });
    },
  },
  watch: {
    "record.province_id": function () {
      this.fetchKabupatens();
    },
    "record.regency_id": function () {
      this.fetchKecamatans();
    },
    "record.district_id": function () {
      this.fetchDesa();
    },
    "reocrd.pendidikan_id": function () {
      this.fetchJurusan();
    },
  },
};
</script>

<style></style>
op