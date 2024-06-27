<template>
  <v-container>
    <v-row class="mt-10">
      <v-col :cols="device.desktop ? `6` :`12`">
        <v-row class="justify-center vertical_align_center">
          <img
            src="images/pengumuman_2.png"
            alt=""
            srcset=""
            width="60%"
            height="90%"
          >
        </v-row>
      </v-col>
      <v-col :cols="device.desktop ? `6` :`12`">
        <v-row class="justify-center mt-5 pl-3 pr-3">
          <div class="justify-center title">
            Cek Pengumuman
          </div>
          <div class="justify-center">
            Silahkan masukan Nomor Induk Siswa Nasional (NISN) Anda, untuk melakukan pengecekan pengumuman
          </div>
          <div class="justify-center">
            <Countdown end="July 1, 2024 16:00:00"></Countdown>
          </div>

        </v-row>

        <v-sheet class="elevation-2 mt-10 pb-5">
          <v-col cols="12">
            <v-row>
              <v-col :cols="device.desktop ?8:8">
                <v-text-field
                  class="mt-5"
                  outlined
                  dense
                  hide-details
                  label="NISN"
                  maxlength="10"
                  v-model="record.nisn"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="mt-5 elevation-5"
                  color="blue"
                  outlined
                  @click="postCari"
                >Cari</v-btn>
              </v-col>
            </v-row>

          </v-col>

          <v-col
            cols="12"
            v-show="record.show"
          >
            <v-row class="pl-3 pr-3">
              <div class="col-5 pa-0">Nama</div>
              <div class="col-1 pa-0">:</div>
              <div class="col-6 pa-0 font-weight-bold">{{ record.nama }}</div>
              <div class="col-5 pa-0">Tempat, Tgl. Lahir</div>
              <div class="col-1 pa-0">:</div>
              <div class="col-6 pa-0">{{ record.ttl }}</div>
              <div class="col-5 pa-0">NISN</div>
              <div class="col-1 pa-0">:</div>
              <div class="col-6 pa-0">{{ record.nisn }}</div>
              <div class="col-5 pa-0">No. Pendaftaran</div>
              <div class="col-1 pa-0">:</div>
              <div class="col-6 pa-0">{{ record.nopend }}</div>
              <div class="col-5 pa-0">Jalur</div>
              <div class="col-1 pa-0">:</div>
              <div class="col-6 pa-0">{{ record.jalur }} </div>
              <div
                class="col-5 pa-0"
                v-show="record.show_jarak"
              >Jarak</div>
              <div
                class="col-1 pa-0"
                v-show="record.show_jarak"
              >:</div>
              <div
                class="col-6 pa-0"
                v-show="record.show_jarak"
              >{{ record.jarak }}</div>

              <div class="col-5 pa-0">Asal Sekolah</div>
              <div class="col-1 pa-0">:</div>
              <div class="col-6 pa-0">{{ record.asal_sekolah }}</div>
            </v-row>
            <v-row class="justify-center mt-8">
              DINYATAKAN :
            </v-row>
            <v-row
              v-show="record.status_lulus"
              class="justify-center mt-3"
              style="font-size:30px; color: blue ; font-weight: 900;"
            >
              DITERIMA
            </v-row>
            <v-row
              v-show="!record.status_lulus "
              class="justify-center mt-3"
              style="font-size:30px; color: red ; font-weight: 900;"
            >
              BELUM DITERIMA
            </v-row>
            <v-row
              class="justify-end pa-2 mt-10"
              v-show="record.status_lulus"
            >
              <v-btn
                color="blue"
                class="white--text elevation-5"
                outlined
                @click="printBuktiPendaftaran"
              >Cetak Bukti
                <v-icon class="ml-4">mdi-printer</v-icon>
              </v-btn>
            </v-row>

          </v-col>

        </v-sheet>
      </v-col>
    </v-row>
    <v-col
      cols="12"
      class="mt-10"
      v-show="false"
    >
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
          <v-chip color="green">{{ value }}</v-chip>
        </template>
      </v-data-table>
    </v-col>

  </v-container>
</template>

<script>
import jsPDF from "jspdf";
import QRious from "qrious";
import { mapState, mapActions } from "vuex";
import Countdown from "vuejs-countdown";
export default {
  name: "PengumumanComponent",
  components: {
    Countdown,
  },
  data: () => ({
    headers: [
      { text: "#", value: "num", sortable: false },
      { text: "NISN", value: "nisn", sortable: false },
      { text: "NAMA PESERTA", value: "nama", sortable: false },
      { text: "ASAL SEKOLAH", value: "sekolah", sortable: false },
    ],
    records: [],
    search: "",

    record: {
      nisn: null,
      nama: null,
      nisn: null,
      no_pendaftaran: null,
      jalur: null,
      jarak: null,
      status_verikasi: null,
      asal_sekolah: null,
      show: false,
    },
  }),
  created() {
    this.setPage({
      crud: false,
    });
  },
  mounted() {
    this.fetchPengumuman();
  },
  computed: {
    ...mapState([
      "device",
      "theme",
      "info",
      "table",
      "loading",
      "http",
      "snackbar",
    ]),
  },
  methods: {
    ...mapActions(["setPage", "setLoading"]),
    fetchPengumuman: async function () {
      let { data } = await this.http.get("pengumuman");
      this.records = data;
    },
    postCari: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses pencarian data pengumuman",
        });

        let {
          data: { status, message, data },
        } = await this.http.post("pengumuman", { nisn: this.record.nisn });
        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          this.record = data;
          return;
        }

        this.record = data;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = "Opps..., terjadi kesalahan...! " + error;
        this.snackbar.state = true;
        this.record.nisn = null;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },

    printBuktiPendaftaran: async function () {
      let newLogoProv = new Image();
      newLogoProv.src = "/images/logo-kab.png";

      let newLogoSMP = new Image();
      newLogoSMP.src = "/images/logo-smp.png";

      let ttd = new Image();
      ttd.src = "/images/ttd.jpeg";

      var qr = new QRious({
        value: this.record.nopend,
      });

      var doc = new jsPDF({ orientation: "p", format: "legal" });

      var centeredText = function (text, y) {
        var textWidth =
          (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor;
        var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(textOffset, y, text);
      };
      doc.addImage(newLogoProv, "JPEG", 15, 15, 25, 30);
      doc.addImage(newLogoSMP, "JPEG", 175, 15, 30, 30);
      doc.setFontSize(16);
      doc.setFontStyle("bold");
      doc.text(50, 20, "PEMERINTAH KABUPATEN TANGERANG");
      doc.setFontSize(18);
      doc.text(75, 27, "DINAS PENDIDIKAN");
      doc.setFontSize(17);
      doc.text(60, 34, "UPT SMP NEGERI 2 TIGARAKSA");

      doc.setFontSize(10);
      doc.setFontStyle("regular");
      doc.text(
        60,
        38,
        "Jl. Arya Jaya Sentika Kec. Tigaraksa, Kab. Tangerang Prov. Banten"
      );
      doc.text(75, 43, "No. Telp. (021) 5993341Kode Pos 15720");
      doc.text(73, 48, "website : https://smpn2-tigaraksa.sch.id");
      doc.setLineWidth(0.4);
      doc.line(15, 53, 200, 53);
      doc.setLineWidth(1);
      doc.line(15, 54, 200, 54);
      //doc.text(75, 31, "Banten");

      doc.setFontSize(12);
      doc.setFontStyle("bold");
      doc.text("Surat Keputusan", 85, 65);
      doc.text(65, 70, "Kepala UPT SMP Negeri 2 Tigaraksa");
      doc.text(60, 75, "Nomor : 421.3/421.5/184/VII/SMPN2-TGRS/2023");
      doc.text("Tentang", 95, 80);
      doc.text(53, 85, "Hasil Seleksi Penerimaan Peserta Didik Baru (PPDB)");
      doc.text(50, 90, "Jalur Zonasi, Afirmasi, Perpindahan Tugas Orang Tua ");
      doc.text(80, 95, "Tahun Pelajaran 2023/2024");
      doc.setFontStyle("regular");
      doc.text(75, 110, "Kepala UPT SMP Negeri 2 Tigaraksa");
      doc.setFontStyle("bold");
      doc.text("Menimbang :", 15, 120);
      doc.setFontStyle("regular");
      doc.text(
        "a. Bahwa setelah melalui tahapan pendaftaran dan verifikasi data Penerimaan Peserta",
        50,
        120
      );
      doc.text(
        "Didik Baru (PPDB) di UPT SMP Neger 2 Tigaraksa, Perlu dilakukan seleksi; ",
        54,
        125
      );
      doc.text(
        "b. Bahwa Berdasarkan Pertimbangan Sebagaimana Dimaksud Pada Huruf a Diatas, Perlu ",
        50,
        130
      );
      doc.text(
        "Menetapkan Keputusan Kepala UPT SMP Negeri 2 Tigaraksa Tentang Hasil Seleksi",
        54,
        135
      );
      doc.text(
        "Penerimaan Peserta Didik Baru (PPDB) Jalur Zonasi, Afirmasi, Perpidahan Tugas Orang ",
        54,
        140
      );
      doc.text(
        "Tua dan Jalur Prestasi (Akademik dan Non Akademik) Tahun Pelajaran 2023/2024.",
        54,
        145
      );

      doc.setFontStyle("bold");
      doc.text("Mengingat :", 15, 155);
      doc.setFontStyle("regular");
      doc.text(
        "Rapat Pleno Seleksi Penetapan Penerimaan Peserta Didik Baru (PPDB) Jalur Zonasi,",
        50,
        155
      );
      doc.text(
        "Afirmasi, Perpindahan Tugas Orang Tua dan Prestasi (Akademik dan non Akademik) di UPT",
        50,
        160
      );
      doc.text(
        "SMP Negeri 2 Tigaraksa yang dilaksanakan pada tanggal 05 Juli 2023.",
        50,
        165
      );

      doc.setFontStyle("bold");
      doc.text("Memutuskan", 50, 175);

      doc.text("Menetapkan :", 15, 185);
      doc.setFontStyle("regular");
      doc.text("Nomor Pendaftaran", 50, 190);
      doc.text(" : ", 100, 190);
      doc.text(this.record.nopend, 105, 190);
      doc.text("Nama", 50, 195);
      doc.text(" : ", 100, 195);
      doc.text(this.record.nama, 105, 195);
      doc.text("Tempat/Tgl.Lahir", 50, 200);
      doc.text(" : ", 100, 200);
      doc.text(this.record.ttl, 105, 200);
      doc.text("NISN", 50, 205);
      doc.text(" : ", 100, 205);
      doc.text(this.record.nisn, 105, 205);
      doc.text("Asal Sekolah", 50, 210);
      doc.text(" : ", 100, 210);
      doc.text(this.record.asal_sekolah, 105, 210);
      doc.text("Jalur Pendaftaran", 50, 215);
      doc.text(" : ", 100, 215);
      doc.text(this.record.jalur, 105, 215);
      doc.text("Dinyatakan", 50, 225);
      doc.text(" : ", 100, 225);
      doc.setFontStyle("bold");
      doc.text(
        this.record.status_lulus ? "DITERIMA" : "BELUM DITERIMA",
        105,
        225
      );
      doc.setFontStyle("regular");
      doc.text(
        "Sebagai Peserta Didik Baru kelas " +
          this.record.kelas +
          " di UPT SMP Negeri 2 Tigaraksa Tahun Pelajaran",
        50,
        235
      );
      doc.text("2023/2024. ", 50, 240);

      doc.text(
        "Surat Keputusan ini di putuskan pada tanggal ditetapkan.",
        15,
        250
      );

      doc.text("Ditetapkan di", 130, 260);
      doc.text(": Tigaraksa ", 160, 260);
      doc.text("Pada Tanggal", 130, 265);
      doc.text(": 05 Juli 2023 ", 160, 265);
      doc.addImage(ttd, "JPEG", 115, 265, 40, 30);
      doc.setFontStyle("bold");
      doc.text("Plt. Kepala Sekolah,", 130, 270);
      doc.text("JARKASIH, S.Pd", 130, 290);
      doc.setFontStyle("regular");
      doc.text("Pembina Utama Muda, IV/c", 130, 295);
      doc.text("NIP. 196411281988031010", 130, 300);

      doc.text("Catatan :", 15, 310);
      doc.setFontStyle("regular");
      doc.setFontSize("10");

      doc.text(
        "1. Bagi yang diterima, dipersilahkan untuk lapor diri/daftar ulang, dengan membawa print out tanda bukti DITERIMA;",
        15,
        315
      );
      doc.text(
        "2. Waktu pelaksanaan lapor diri/daftar ulang, tanggl 06-08 Juli 2023, mulai pk. 08.00 s.d 14.00 di UPT SMP Negeri 2 Tigaraksa;",
        15,
        320
      );
      doc.text(
        "3. Saat daftar ulang siswa wajib hadir didampingi orang tua/wali;",
        15,
        325
      );
      doc.text("4. Membawa Materai 10.000 2 Lembar;", 15, 330);
      doc.text(
        "5. Apabila tidak melakukan lapor diri / Daftar Ulang sampai dengan tanggal yg telah ditentukan dianggap mengundurkan diri.",
        15,
        335
      );

      /*

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
      */

      doc.save(this.record.nopend + ".pdf");
    },
  },

  watch: {},
};
</script>

<style>
.v-application .justify-center {
  justify-content: center !important;
  text-align: center;
}
</style>