<template>
  <v-container>
    <v-row class="mt-10">
      <v-col :cols="device.desktop ? `6` :`12`">
        <v-row class="justify-center">
          <img
            src="../../../assets/images/DaftarPeserta.png"
            alt=""
            srcset=""
            width="60%"
            height="90%"
          >
        </v-row>
      </v-col>
      <v-col :cols="device.desktop ? `6` :`12`">
        <h2 class="mb-3">Daftar Peserta</h2>
        Berikut adalah peserta yang telah melakukan pendaftaran di {{ info.company }} , berikut kami tampilkan status tahapan yang telah dilalui oleh peserta PPDB
        <br>
        <br>
        Berikut adalah pengertian dari setiap tahapan status:
        <ul>
          <li>
            Pengajuan : Berkas pengajuan sudah masuk
          </li>
          <li>
            Perbaikan Berkas : Pengajuan berkas harus diperbaiki
          </li>
          <li>
            Pengajuan perbaikan : Pengajuan berkas perbaikan
          </li>
          <li>
            Berkas Diterima : Pengajuan Berkas diterima & Terverifikasi
          </li>
          <li>Cabut Berkas : Berkas dicabut dari pendaftaran</li>
        </ul>
      </v-col>
    </v-row>
    <v-col
      cols="12"
      class="mt-10"
    >
      <v-col cols=12>
        <v-row class="justify-end">

          <p style="font-size:14px ;font-weight:400 ;">Data per tanggal : {{ timestamps }}</p>

        </v-row>
        <v-row class="justify-end">
          <p style="font-size:12px ;">Data ini di perbaharui per 5 menit</p>
        </v-row>

      </v-col>

      <v-row class="mb-5">
        <v-tooltip
          :color="theme + ` darken-4`"
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
                @click="fetchPendaftars"
              >refresh</v-icon>
            </v-btn>
          </template>
          <span>Refresh Data</span>
        </v-tooltip>

        <v-col
          :cols="device.desktop ? `4` : `10`"
          class="pa-0"
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pencarian"
            single-line
            hide-details
            solo
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="records"
        :items-per-page="10"
        class="elevation-2"
        :loading="loading.table"
        loading-text="Loading... Please wait"
        :color="theme"
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
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "DaftarPeserta",
  components: {},
  data: () => ({
    headers: [
      { text: "#", value: "num", sortable: false },
      { text: "NISN", value: "nisn", sortable: false },
      { text: "Nama Peserta", value: "nama", sortable: false },
      { text: "Asal Sekolah", value: "nama_sekolah_asal", sortable: false },
      { text: "Pil. 1", value: "pil1", sortable: false },
      { text: "Pil. 2", value: "pil2", sortable: false },
      { text: "STATUS", value: "status", sortable: false },
    ],
    records: [],
    search: "",
    timestamps: null,
  }),
  mounted() {
    this.setPage({
      crud: false,
    });
    this.fetchPendaftars();
  },
  computed: {
    ...mapState(["device", "theme", "info", "table", "loading", "http"]),
  },
  methods: {
    ...mapActions(["setPage"]),
    fetchPendaftars: async function () {
      let {
        data: { timestamps, datas },
      } = await this.http.get("pendaftars");
      this.timestamps = timestamps;
      this.records = datas;
    },
  },
  watch: {},
};
</script>

<style>
</style>