<template>
  <v-container
    fluid
    class="pt-0 grid-list-xl"
  >
    <v-flex
      row
      class="pl-3 pb-2 pt-5"
    >
      <v-icon :color="theme">dashboard</v-icon>
      <v-subheader class="text-h6"> DASHBOARD PESERTA </v-subheader>
    </v-flex>
    <v-row :class="device.desktop ? `pl-10 pt-5` : `pl-3 pt-5 pr-3`">
      <v-alert
        dense
        border="left"
        type="error"
        v-show="!peserta.nomor_register"
      >
        Hai {{ peserta.nama }}, Anda belum melakukan pendaftaran penerimaan
        siswa baru tahun 2022/2023
        <v-btn
          text
          @click="$router.push({ name: 'peserta-pendaftaran' })"
        >Klik disini untuk mendaftar</v-btn>
      </v-alert>
    </v-row>

    <v-row class="pa-1">
      <v-col class="stats-widget-v3">
        <v-card
          class="mx-auto"
          max-width="500"
        >
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Identitas Peserta</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card
            class="mx-auto overflow-y-auto"
            height="500"
            max-width="500"
          >
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-card-title>{{ peserta.nomor_register }}</v-card-title>
                  <v-card-subtitle class="mt-o justify-content-between">Nomor Register
                  </v-card-subtitle>
                </v-col>
                <v-spacer></v-spacer>
                <v-col
                  cols="6"
                  class="mt-8"
                >

                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :color="theme"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>print</v-icon>
                        &nbsp;&nbsp;CETAK BUKTI
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="printBuktiPendaftaran">
                        <v-list-item-title>Bukti Pendaftaran</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :disabled="!peserta.status"
                        @click="printBukti"
                      >
                        <v-list-item-title>Bukti Diterima</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>

              <v-divider></v-divider>
              <table class="ml-3">
                <tr>
                  <td>NISN</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{{ peserta.nisn }}</td>
                </tr>
                <tr>
                  <td>NAMA</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td> <span style="font-weight: 800 ;">
                      {{ peserta.nama }}
                    </span></td>
                </tr>
                <tr>
                  <td>TTL</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{{ peserta.ttl }}</td>
                </tr>
                <tr>
                  <td>ASAL SEKOLAH</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{{ peserta.nama_sekolah_asal }}</td>
                </tr>
                <tr>
                  <td>PILIHAN 1</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{{ peserta.pil1 }}</td>
                </tr>
                <tr>
                  <td>PILIHAN 2</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>{{ peserta.pil2 }}</td>
                </tr>
                <tr>
                  <td>STATUS</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>
                    <v-chip
                      :color="peserta.status_color"
                      small
                    >{{
                      peserta.status_text
                    }}</v-chip>
                  </td>
                </tr>
                <tr>
                  <td>KETERANGAN</td>
                  <td>&nbsp;:&nbsp;</td>
                  <td>
                    {{ peserta.pesan }}
                  </td>
                </tr>
              </table>
              <div class="ml-1 mt-5">
                <v-col cols="4">
                  <v-img
                    :class="[theme + ' lighten-2 with-backdrop']"
                    :aspect-ratio="3 / 4"
                    :src="peserta.path"
                    :lazy-src="peserta.path"
                  >
                    <div
                      class="
                        d-flex
                        flex-column
                        align-center
                        justify-center
                        user-select-none
                      "
                      style="height: 100%"
                    >
                      <div style="
                          position: absolute;
                          right: 8px;
                          bottom: 8px;
                          height: 36px;
                          width: 36px;
                        "></div>
                    </div>
                  </v-img>
                </v-col>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col class="stats-widget-v3">
        <v-card
          class="mx-auto"
          max-width=500
        >
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Jadwal Ujian</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card
            class="mx-auto overflow-y-auto"
            height="300"
          >
            <v-list three-line>
              <template v-for="(item, index) in jadwals">
                <v-list-item :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.jadwal"
                      class="font-weight-bold text-subtitle-2"
                    ></v-list-item-title>
                    <v-list-subtitle>
                      TANGGAL : {{ item.tanggal }}
                    </v-list-subtitle>
                    <v-list-item-subtitle>JAM: {{ item.jam_mulai }} s.d
                      {{ item.jam_selesai }}</v-list-item-subtitle>
                    <v-list-item-subtitle>Waktu : {{ item.waktu }} Menit</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-chip
                      small
                      :disabled="!item.aktif"
                      :color="!item.aktif ? `grey` : `green`"
                      @click="postKonfirmasiUjian(item.jadwal_ujian_id)"
                    >
                      {{ item.aktif ? "BUKA" : "TUTUP" }}
                    </v-chip>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-card>
      </v-col>
      <v-col class="stats-widget-v3">
        <v-card
          class="mx-auto"
          max-width="500"
        >
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Pesan</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card
            class="mx-auto overflow-y-auto"
            height="500"
            max-width="500"
          >
            <v-list three-line>
              <template v-for="(item, index) in pesans">
                <v-list-item :key="item.id">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.from_name"
                      class="font-weight-bold text-subtitle-2"
                    ></v-list-item-title>
                    <v-list-item-subtitle v-html="item.title"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="item.body"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-chip
                      small
                      @click="openDialogMessage(item.from_id)"
                    >
                      Balas
                    </v-chip>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="pa-1">
      <v-col class="stats-widget-v3">
        <v-card
          class="mx-auto"
          max-width=500
        >
          <v-toolbar
            :color="theme"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title class="white--text">Persyaratan</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card
            class="mx-auto overflow-y-auto"
            height="300"
          >
            <v-list three-line>
              <template v-for="(item, index) in dokumens">
                <v-list-item :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.title"
                      class="font-weight-bold text-subtitle-2"
                    ></v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle}}</v-list-item-subtitle>

                  </v-list-item-content>

                  <v-list-item-action>
                    <v-chip
                      small
                      :dark="thememode"
                      color="green"
                      @click="postDownload(item.path)"
                      v-show="item.hasfile"
                    >
                      Unduh
                    </v-chip>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-card>
      </v-col>

    </v-row>

    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title class="headline purple darken-1 white--text">
            PESAN
          </v-card-title>

          <v-card-text class="pt-3">
            <v-text-field
              label="Judul"
              :color="theme"
              v-model="record.title"
              outlined
            ></v-text-field>
            <v-textarea
              label="Pesan"
              :color="theme"
              outlined
              v-model="record.body"
            ></v-textarea>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="postDialogMessage"
            >
              Kirim
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            > Batal </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import jsPDF from "jspdf";
import QRious from "qrious";
import { mapActions, mapState } from "vuex";

export default {
  name: "Sekolah",

  data: () => ({
    peserta: {},
    pesans: [],
    formasis: [],
    dialog: false,
    from_id: null,
    record: {
      title: null,
      body: null,
    },
    search: null,
    jmlpegawai: 25,

    selected: [2],

    jadwals: [],

    dokumens: [],
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "loading",
      "event",
      "page",
      "snackbar",
      "info",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/dashboard",
    });

    this.getAppInfo();
    this.fetchDashboard();
    this.fetchJadwalUjian();
    this.fetchDokumen();
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
      "getAppInfo",
      "setLoading",
    ]),

    fetchDashboard: async function () {
      let {
        data: { peserta, pesans },
      } = await this.http.get("api/peserta/dashboard");

      this.peserta = peserta;
      this.pesans = pesans;
    },

    openDialogMessage: function (val) {
      this.record.to_id = val;
      this.dialog = true;
    },
    postDialogMessage: async function () {
      try {
        let {
          data: { status, message },
        } = await this.http.post(
          "api/peserta/dashboard-kirim-pesan",
          this.record
        );

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;

          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        this.dialog = false;
        this.record = {};
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps...! " + error;
        this.snackbar.state = true;
      }
    },
    fetchJadwalUjian: async function () {
      try {
        let { data } = await this.http.post(
          "api/peserta/dashboard-jadwal-ujian"
        );

        this.jadwals = data;
      } catch (error) {}
    },
    fetchDokumen: async function () {
      try {
        let { data } = await this.http.post("api/peserta/dashboard-dokumen");

        this.dokumens = data;
      } catch (error) {}
    },
    postDownload(val) {
      window.open(val, "__blank");
    },
    postKonfirmasiUjian: function (val) {
      this.$router.push({
        name: "konfirmasi-mulai-ujian",
        params: { jadwal_ujian_id: val },
      });
    },

    printBuktiPendaftaran: async function () {
      let newLogoProv = new Image();
      newLogoProv.src = "/images/logo-banten.png";

      var qr = new QRious({
        value: this.peserta.nomor_register,
      });

      var doc = new jsPDF();

      var centeredText = function (text, y) {
        var textWidth =
          (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(textOffset, y, text);
      };
      doc.addImage(newLogoProv, "JPEG", 10, 15, 15, 17);
      doc.setFontSize(10);
      doc.setFontStyle("bold");
      doc.text(50, 20, "PEMERINTAH PROVINSI BANTEN");
      doc.text(40, 25, "DINAS PENDIDIKAAN DAN KEBUDAYAAN");
      doc.text(125, 20, "BUKTI PENDAFTARAN");
      doc.setFontStyle("regular");
      doc.text(125, 25, "PESERTA DIDIK SMK NEGERI");
      doc.text(125, 30, "TAHUN PELAJARAN 2022/2023");
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(30, 28, this.info.alamat);
      doc.text(75, 31, "Banten");

      doc.setLineWidth(0.4);
      doc.line(185, 19, 200, 19);
      doc.line(185, 23, 200, 23);
      doc.line(185, 19, 185, 33);
      doc.line(200, 19, 200, 33);
      doc.line(185, 33, 200, 33);
      doc.text(186, 22, "LEMBAR");
      doc.setFontStyle("bold");
      doc.setFontSize(15);
      doc.text(191, 30, "1");
      doc.setLineWidth(0.4);
      doc.line(10, 35, 200, 35);
      //Area Kiri

      //data peserta
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(20, 45, "No. Daftar ");
      doc.text(50, 45, ":");
      doc.setFontStyle("bold");
      doc.text(52, 45, this.peserta.nomor_register);
      doc.setFontStyle("regular");
      doc.text(20, 50, "Nama Lengkap");
      doc.text(50, 50, ":");
      doc.text(52, 50, this.peserta.nama);
      doc.text(20, 55, "Asal Sekolah");
      doc.text(50, 55, ":");
      doc.text(52, 55, this.peserta.nama_sekolah_asal);
      doc.text(20, 60, "Daerah Asal");
      doc.text(50, 60, ":");
      doc.text(52, 60, this.peserta.daerah_asal);

      doc.text(20, 75, "Pilihan I");
      doc.text(50, 75, ":");
      doc.setFontStyle("bold");
      doc.text(52, 75, this.peserta.pil1);
      doc.setFontStyle("regular");

      doc.text(20, 80, "Pilihan II");
      doc.text(50, 80, ":");
      doc.setFontStyle("bold");
      if (this.peserta.pil2) {
        doc.text(52, 80, this.peserta.pil2);
      }

      //Sisi Kanan
      doc.setFontStyle("regular");
      doc.text(110, 45, "Jenis Kelamin");
      doc.text(135, 45, ":");
      doc.text(
        137,
        45,
        this.peserta.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan"
      );

      doc.text(110, 50, "Tanggal Lahir");
      doc.text(135, 50, ":");
      doc.text(137, 50, this.peserta.tanggal_lahir);

      doc.text(110, 75, "Lokasi Pendaftaran");
      doc.text(135, 75, ":");
      doc.setFontStyle("bold");
      doc.text(137, 75, this.info.company);

      doc.setFontStyle("regular");

      doc.text(110, 80, "Waktu Pendaftaran");
      doc.text(135, 80, ":");
      doc.text(137, 80, this.peserta.waktu_pendaftaran);

      doc.text(20, 90, this.info.alamat);

      //Sisi Kiri
      //doc.text(45, 105, "Panitia,");
      //doc.text(20, 130, "Operator " + this.info.company);

      //Sisi Kanan
      doc.text(127, 100, "Banten,");
      doc.text(127, 105, "Calon Peserta Didik,");
      if (this.info.materai) {
        doc.text(130, 115, "Materai 10000");
      }
      doc.text(127, 130, this.peserta.nama);

      doc.setFontStyle("bold");

      doc.text(10, 140, "Lembar 1 Untuk Sekolah");
      doc.setFontStyle("regular");
      doc.text(
        10,
        145,
        "Informasi PPDB SMK Online 2022 kunjungi " + this.info.apps_url
      );

      doc.setLineDash([7, 3, 1, 3], 10);
      doc.line(10, 150, 200, 150);
      doc.setLineDash([0], 0);

      //lembar 2
      doc.addImage(newLogoProv, "JPEG", 10, 155, 15, 17);
      doc.setFontSize(10);
      doc.setFontStyle("bold");
      doc.text(50, 160, "PEMERINTAH PROVINSI BANTEN");
      doc.text(40, 165, "DINAS PENDIDIKAAN DAN KEBUDAYAAN");

      doc.text(125, 160, "BUKTI PENDAFTARAN");
      doc.setFontStyle("regular");
      doc.text(125, 165, "PESERTA DIDIK SMK NEGERI");
      doc.text(125, 170, "TAHUN PELAJARAN 2022/2023");
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(30, 170, this.info.alamat);
      doc.text(75, 31, "Banten");
      doc.setLineWidth(0.4);
      doc.line(185, 159, 200, 159);
      doc.line(185, 163, 200, 163);
      doc.line(185, 159, 185, 173);
      doc.line(200, 159, 200, 173);
      doc.line(185, 173, 200, 173);
      doc.text(186, 162, "LEMBAR");
      doc.setFontStyle("bold");
      doc.setFontSize(15);
      doc.text(191, 170, "2");
      doc.setLineWidth(0.4);
      doc.line(10, 175, 200, 175);

      //Area Kiri

      //data peserta
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(20, 185, "No. Daftar ");
      doc.text(50, 185, ":");
      doc.setFontStyle("bold");
      doc.text(52, 185, this.peserta.nomor_register);
      doc.setFontStyle("regular");
      doc.text(20, 190, "Nama Lengkap");
      doc.text(50, 190, ":");
      doc.text(52, 190, this.peserta.nama);
      doc.text(20, 195, "Asal Sekolah");
      doc.text(50, 195, ":");
      doc.text(52, 195, this.peserta.nama_sekolah_asal);
      doc.text(20, 200, "Daerah Asal");
      doc.text(50, 200, ":");
      doc.text(52, 200, this.peserta.daerah_asal);

      doc.text(20, 215, "Pilihan I");
      doc.text(50, 215, ":");
      doc.setFontStyle("bold");
      doc.text(52, 215, this.peserta.pil1);
      doc.setFontStyle("regular");

      doc.text(20, 220, "Pilihan II");
      doc.text(50, 220, ":");
      doc.setFontStyle("bold");
      if (this.peserta.pil2) {
        doc.text(52, 220, this.peserta.pil2);
      }

      doc.setFontStyle("regular");
      doc.text(110, 185, "Jenis Kelamin");
      doc.text(135, 185, ":");
      doc.text(
        137,
        185,
        this.peserta.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan"
      );

      doc.text(110, 190, "Tanggal Lahir");
      doc.text(135, 190, ":");
      doc.text(137, 190, this.peserta.tanggal_lahir);

      doc.text(110, 215, "Lokasi Pendaftaran");
      doc.text(135, 215, ":");
      doc.setFontStyle("bold");
      doc.text(137, 215, this.info.company);

      doc.setFontStyle("regular");

      doc.text(110, 220, "Waktu Pendaftaran");
      doc.text(135, 220, ":");
      doc.text(137, 220, this.peserta.waktu_pendaftaran);

      doc.text(
        20,
        230,
        "Saya telah mengisi data di atas dengan benar dan siap untuk didiskualifikasi jika terbukti terdapat kecurangan atau rekayasa data"
      );

      //Sisi Kiri
      //doc.text(45, 245, "Panitia,");
      //doc.text(20, 270, "Operator " + this.info.company);

      //Sisi Kanan
      doc.text(127, 240, "Banten,");
      doc.text(127, 245, "Calon Peserta Didik,");
      //doc.text(127, 270, this.peserta.nama);
      if (this.info.materai) {
        doc.text(130, 260, "Materai 10000");
      }
      doc.text(127, 275, this.peserta.nama);

      doc.setFontStyle("bold");

      doc.text(10, 285, "Lembar 2 Untuk Calon Siswa");
      doc.setFontStyle("regular");
      doc.text(
        10,
        290,
        "Informasi PPDB SMK Online 2022 kunjungi " + this.info.apps_url
      );

      doc.save(this.peserta.nomor_register + ".pdf");
    },

    printBukti: function () {
      let newLogoProv = new Image();
      newLogoProv.src = "/images/logo-banten.png";

      var qr = new QRious({
        value: this.peserta.nomor_register,
      });

      var doc = new jsPDF();

      var centeredText = function (text, y) {
        var textWidth =
          (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(textOffset, y, text);
      };
      doc.addImage(newLogoProv, "JPEG", 10, 15, 15, 17);
      doc.setFontSize(10);
      doc.setFontStyle("bold");
      doc.text(50, 20, "PEMERINTAH PROVINSI BANTEN");
      doc.text(40, 25, "DINAS PENDIDIKAAN DAN KEBUDAYAAN");
      doc.text(125, 20, "BUKTI DITERIMA");
      doc.setFontStyle("regular");
      doc.text(125, 25, "PESERTA DIDIK SMK NEGERI");
      doc.text(125, 30, "TAHUN PELAJARAN 2022/2023");
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(30, 28, this.info.alamat);
      doc.text(75, 31, "Banten");

      doc.setLineWidth(0.4);
      doc.line(185, 19, 200, 19);
      doc.line(185, 23, 200, 23);
      doc.line(185, 19, 185, 33);
      doc.line(200, 19, 200, 33);
      doc.line(185, 33, 200, 33);
      doc.text(186, 22, "LEMBAR");
      doc.setFontStyle("bold");
      doc.setFontSize(15);
      doc.text(191, 30, "1");
      doc.setLineWidth(0.4);
      doc.line(10, 35, 200, 35);
      //Area Kiri

      //data peserta
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(20, 45, "No. Daftar ");
      doc.text(50, 45, ":");
      doc.setFontStyle("bold");
      doc.text(52, 45, this.peserta.nomor_register);
      doc.setFontStyle("regular");
      doc.text(20, 50, "Nama Lengkap");
      doc.text(50, 50, ":");
      doc.text(52, 50, this.peserta.nama);
      doc.text(20, 55, "Asal Sekolah");
      doc.text(50, 55, ":");
      doc.text(52, 55, this.peserta.nama_sekolah_asal);
      doc.text(20, 60, "Daerah Asal");
      doc.text(50, 60, ":");
      doc.text(52, 60, this.peserta.daerah_asal);

      doc.text(20, 75, "Pilihan I");
      doc.text(50, 75, ":");
      doc.setFontStyle("bold");
      doc.text(52, 75, this.peserta.pil1);
      doc.setFontStyle("regular");

      doc.text(20, 80, "Pilihan II");
      doc.text(50, 80, ":");
      doc.setFontStyle("bold");
      if (this.peserta.pil2) {
        doc.text(52, 80, this.peserta.pil2);
      }

      //Sisi Kanan
      doc.setFontStyle("regular");
      doc.text(110, 45, "Jenis Kelamin");
      doc.text(135, 45, ":");
      doc.text(
        137,
        45,
        this.peserta.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan"
      );

      doc.text(110, 50, "Tanggal Lahir");
      doc.text(135, 50, ":");
      doc.text(137, 50, this.peserta.tanggal_lahir);

      doc.text(110, 75, "Lokasi Pendaftaran");
      doc.text(135, 75, ":");
      doc.setFontStyle("bold");
      doc.text(137, 75, this.info.company);

      doc.setFontStyle("regular");

      doc.text(110, 80, "Waktu Pendaftaran");
      doc.text(135, 80, ":");
      doc.text(137, 80, this.peserta.waktu_pendaftaran);

      doc.text(
        20,
        90,
        "Selamat anda telah diterima di " +
          this.info.company +
          " di " +
          this.peserta.diterima
      );

      //Sisi Kiri
      //doc.text(45, 105, "Panitia,");
      //doc.text(20, 130, "Operator " + this.info.company);

      //Sisi Kanan
      doc.text(127, 100, "Banten,");
      doc.text(127, 105, "PANITIA PENERIMAAN PPDB,");

      //doc.text(127, 130, "PANITIA");

      doc.setFontStyle("bold");

      doc.text(10, 140, "Lembar 1 Untuk Sekolah");
      doc.setFontStyle("regular");
      doc.text(
        10,
        145,
        "Informasi PPDB SMK Online 2021 kunjungi " + this.info.apps_url
      );

      doc.setLineDash([7, 3, 1, 3], 10);
      doc.line(10, 150, 200, 150);
      doc.setLineDash([0], 0);

      //lembar 2
      doc.addImage(newLogoProv, "JPEG", 10, 155, 15, 17);
      doc.setFontSize(10);
      doc.setFontStyle("bold");
      doc.text(50, 160, "PEMERINTAH PROVINSI BANTEN");
      doc.text(40, 165, "DINAS PENDIDIKAAN DAN KEBUDAYAAN");

      doc.text(125, 160, "BUKTI DITERIMA");
      doc.setFontStyle("regular");
      doc.text(125, 165, "PESERTA DIDIK SMK NEGERI");
      doc.text(125, 170, "TAHUN PELAJARAN 2022/2023");
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(30, 170, this.info.alamat);
      doc.text(75, 31, "Banten");
      doc.setLineWidth(0.4);
      doc.line(185, 159, 200, 159);
      doc.line(185, 163, 200, 163);
      doc.line(185, 159, 185, 173);
      doc.line(200, 159, 200, 173);
      doc.line(185, 173, 200, 173);
      doc.text(186, 162, "LEMBAR");
      doc.setFontStyle("bold");
      doc.setFontSize(15);
      doc.text(191, 170, "2");
      doc.setLineWidth(0.4);
      doc.line(10, 175, 200, 175);

      //Area Kiri

      //data peserta
      doc.setFontSize(9);
      doc.setFontStyle("regular");
      doc.text(20, 185, "No. Daftar ");
      doc.text(50, 185, ":");
      doc.setFontStyle("bold");
      doc.text(52, 185, this.peserta.nomor_register);
      doc.setFontStyle("regular");
      doc.text(20, 190, "Nama Lengkap");
      doc.text(50, 190, ":");
      doc.text(52, 190, this.peserta.nama);
      doc.text(20, 195, "Asal Sekolah");
      doc.text(50, 195, ":");
      doc.text(52, 195, this.peserta.nama_sekolah_asal);
      doc.text(20, 200, "Daerah Asal");
      doc.text(50, 200, ":");
      doc.text(52, 200, this.peserta.daerah_asal);

      doc.text(20, 215, "Pilihan I");
      doc.text(50, 215, ":");
      doc.setFontStyle("bold");
      doc.text(52, 215, this.peserta.pil1);
      doc.setFontStyle("regular");

      doc.text(20, 220, "Pilihan II");
      doc.text(50, 220, ":");
      doc.setFontStyle("bold");
      if (this.peserta.pil2) {
        doc.text(52, 220, this.peserta.pil2);
      }

      doc.setFontStyle("regular");
      doc.text(110, 185, "Jenis Kelamin");
      doc.text(135, 185, ":");
      doc.text(
        137,
        185,
        this.peserta.jenis_kelamin == "L" ? "Laki-laki" : "Perempuan"
      );

      doc.text(110, 190, "Tanggal Lahir");
      doc.text(135, 190, ":");
      doc.text(137, 190, this.peserta.tanggal_lahir);

      doc.text(110, 215, "Lokasi Pendaftaran");
      doc.text(135, 215, ":");
      doc.setFontStyle("bold");
      doc.text(137, 215, this.info.company);

      doc.setFontStyle("regular");

      doc.text(110, 220, "Waktu Pendaftaran");
      doc.text(135, 220, ":");
      doc.text(137, 220, this.peserta.waktu_pendaftaran);

      doc.text(
        20,
        230,
        "Selamat anda telah diterima di " +
          this.info.company +
          " di " +
          this.peserta.diterima
      );

      //Sisi Kiri
      //doc.text(45, 245, "Panitia,");
      //doc.text(20, 270, "Operator " + this.info.company);

      //Sisi Kanan
      doc.text(127, 240, "Banten,");
      doc.text(127, 245, "PANITA PPDB 2022/2023,");
      //doc.text(127, 270, this.peserta.nama);

      //doc.text(127, 275, "PANITIA");

      doc.setFontStyle("bold");

      doc.text(10, 285, "Lembar 2 Untuk Calon Siswa");
      doc.setFontStyle("regular");
      doc.text(
        10,
        290,
        "Informasi PPDB SMK Online 2022 kunjungi " + this.info.apps_url
      );

      doc.save(this.peserta.nomor_register + ".pdf");
    },
  },
};
</script>
