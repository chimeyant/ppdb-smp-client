<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon>schedule_send</v-icon>
      <v-subheader class="text-h6">
        <h4>KONFIMASI DAFTAR ULANG</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Formulir konfirmasi daftar ulang</div>
    </v-flex>

    <v-row>
      <v-spacer v-if="device.desktop"></v-spacer>
      <v-col cols="device.desktop ? 12 : 12">
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="150px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>KONFIMASI DAFTAR ULANG</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <v-col cols="12">
              <v-text-field
                label="Surat Pernyataan Calon Siswa Baru File PDF (Max: 2 MB)"
                append-outer-icon="attachment"
                v-model="path"
                :color="theme"
                @click:append-outer="uploadFile"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-show="false">
              <v-text-field
                label="Bukti Transfer  File PDF (Max: 2 MB)"
                append-outer-icon="attachment"
                v-model="bukti"
                :color="theme"
                @click:append-outer="uploadFileBukti"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" v-show="false">
              <v-switch
                label="Telah Melakukan Pembayaran Koperasi"
                v-model="record.koperasi_status"
              >
              </v-switch>
            </v-col>
          </v-card-text>

          <v-card-actions>
            <v-btn :color="theme" text @click="postSend"> Kirim </v-btn>
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

    path: null,
    bukti: null,
  }),
  computed: {
    ...mapState(["theme", "http", "device", "record", "snackbar"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/master-tingkat",
    });
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "assignFileBrowse", "setLoading"]),
    postSend: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses kirim data",
        });

        let {
          data: { status, message },
        } = await this.http.post(
          "api/peserta/konfirmasi-daftar-ulang",
          this.record
        );

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
        this.snackbar.text = "Opps..., terjadi kesalahan " + error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({
          dialog: false,
          text: "",
        });
      }
    },

    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.path = response.name;
            this.record.daftar_ulang_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileBukti: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.bukti = response.name;
            this.record.koperasi_dokumen = response.name;
          }, 500);
        },
      });
    },
  },
};
</script>
