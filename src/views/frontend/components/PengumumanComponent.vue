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
            <Countdown end="July 4, 2025 12:00:00"></Countdown>
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
                @click="printBuktiPendaftaranPrestasi"
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
      ttd.src = "/images/ttd.png";

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
      doc.text(60, 34, "SMP NEGERI 2 TIGARAKSA");

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
      doc.text(65, 70, "Kepala SMP Negeri 2 Tigaraksa");
      doc.text(60, 75, "Nomor : 421.3/Kep/175/VII/SMPN2-TGRS/2025");
      doc.text("Tentang", 95, 80);
      doc.text(53, 85, "Hasil Seleksi Penerimaan Peserta Didik Baru (PPDB)");
      doc.text(50, 90, "Jalur Domisili, Afirmasi, Mutasi, dan Prestasi");
      doc.text(80, 95, "Tahun Ajaran 2025/2026");
      doc.setFontStyle("regular");
      doc.text(75, 110, "Kepala SMP Negeri 2 Tigaraksa");
      doc.setFontStyle("bold");
      doc.text("Menimbang :", 15, 120);
      doc.setFontStyle("regular");
      doc.text(
        "a. Bahwa setelah melalui tahapan pendaftaran dan verifikasi data Penerimaan Peserta",
        50,
        120
      );
      doc.text(
        "Didik Baru (PPDB) di SMP Neger 2 Tigaraksa, Perlu dilakukan seleksi; ",
        54,
        125
      );
      doc.text(
        "b. Bahwa Berdasarkan Pertimbangan Sebagaimana Dimaksud Pada Huruf a Diatas, Perlu ",
        50,
        130
      );
      doc.text(
        "Menetapkan Keputusan Kepala SMP Negeri 2 Tigaraksa Tentang Hasil Seleksi",
        54,
        135
      );
      doc.text(
        "Penerimaan Peserta Didik Baru (PPDB) Jalur Domisili, Afirmasi, Mutasi, dan Prestasi ",
        54,
        140
      );
      doc.text("Tahun Ajaran 2025/2026.", 54, 145);

      doc.setFontStyle("bold");
      doc.text("Mengingat :", 15, 155);
      doc.setFontStyle("regular");
      doc.text(
        "Rapat Pleno Seleksi Sistem Penerimaan Siswa Baru (SPMB) Jalur Domisili, Afirmasi, Mutasi, ",
        50,
        155
      );
      doc.text(
        "dan Prestasi (Akademik dan Non Akademik) Tahun  Ajaran 2025/2026 di  SMP Negeri 2 ",
        50,
        160
      );
      doc.text(
        " Tigaraksa yang dilaksanakan pada Tanggal 3 Juli 2025.",
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
      doc.text(
        this.record.jalur == "Zonasi" ? this.record.jarak : "-",
        105,
        218
      );
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
          " di SMP Negeri 2 Tigaraksa Tahun Ajaran",
        50,
        235
      );
      doc.text("2025/2026. ", 50, 240);

      doc.text(
        "Surat Keputusan ini di putuskan pada tanggal ditetapkan.",
        15,
        250
      );

      doc.text("Ditetapkan di", 130, 260);
      doc.text(": Tigaraksa ", 160, 260);
      doc.text("Pada Tanggal", 130, 265);
      doc.text(": 04 Juli 2025 ", 160, 265);
      doc.addImage(ttd, "JPEG", 129, 272, 25, 25);

      doc.setFontStyle("bold");

      doc.text("Plt. Kepala Sekolah,", 130, 270);
      doc.text("Drs.KENEDI", 130, 300);
      doc.setFontStyle("regular");
      doc.text("Pembina Tk. I, IV/b", 130, 305);
      doc.text("NIP. 1967070819999031001", 130, 310);

      doc.text("Catatan :", 15, 320);
      doc.setFontStyle("regular");
      doc.setFontSize("10");

      doc.text(
        "1. Bagi yang diterima, dipersilahkan untuk lapor diri/daftar ulang, dengan membawa print out tanda bukti DITERIMA;",
        15,
        325
      );
      doc.text(
        "2.	Waktu pelaksanaan lapor diri/daftar ulang, tanggl 7 s.d 9 Juli 2025, mulai pk. 08.00 s.d 14.00 di  SMP Negeri 2 Tigaraksa;",
        15,
        330
      );
      doc.text(
        "3. Saat daftar ulang siswa wajib hadir didampingi orang tua/wali;",
        15,
        335
      );
      doc.text("4. Membawa Materai 10.000 2 Lembar;", 15, 340);
      doc.text(
        "5. Apabila tidak melakukan lapor diri / Daftar Ulang sampai dengan tanggal yg telah ditentukan dianggap mengundurkan diri.",
        15,
        345
      );

      doc.save(this.record.nopend + ".pdf");
    },

    printBuktiPendaftaranPrestasi: async function () {
      let newLogoProv = new Image();
      newLogoProv.src = "/images/logo-kab.png";

      let newLogoSMP = new Image();
      newLogoSMP.src = "/images/logo-smp.png";

      let ttd = new Image();
      ttd.src = "/images/ttd.png";

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
      doc.text(60, 34, "SMP NEGERI 2 TIGARAKSA");

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
      doc.text(65, 70, "Kepala SMP Negeri 2 Tigaraksa");
      doc.text(60, 75, "Nomor : 421.3/Kep/074/VII/SMPN2-TGRS/2024");
      doc.text("Tentang", 95, 80);
      doc.text(53, 85, "Hasil Seleksi Penerimaan Peserta Didik Baru (PPDB)");
      doc.text(50, 90, "Jalur Prestasi Akademik dan Prestasi Non Akademik");
      doc.text(80, 95, "Tahun Pelajaran 2024/2025");
      doc.setFontStyle("regular");
      doc.text(75, 110, "Kepala SMP Negeri 2 Tigaraksa");
      doc.setFontStyle("bold");
      doc.text("Menimbang :", 15, 120);
      doc.setFontStyle("regular");
      doc.text(
        "a. Bahwa setelah melalui tahapan pendaftaran dan verifikasi data Penerimaan Peserta",
        50,
        120
      );
      doc.text(
        "Didik Baru (PPDB) di SMP Neger 2 Tigaraksa, Perlu dilakukan seleksi; ",
        54,
        125
      );
      doc.text(
        "b. Bahwa Berdasarkan Pertimbangan Sebagaimana Dimaksud Pada Huruf a Diatas, Perlu ",
        50,
        130
      );
      doc.text(
        "Menetapkan Keputusan Kepala SMP Negeri 2 Tigaraksa Tentang Hasil Seleksi",
        54,
        135
      );
      doc.text(
        "Penerimaan Peserta Didik Baru (PPDB) Jalur Prestasi Akademik dan Non Akademik  ",
        54,
        140
      );
      doc.text("Tahun Pelajaran 2024/2025.", 54, 145);

      doc.setFontStyle("bold");
      doc.text("Mengingat :", 15, 155);
      doc.setFontStyle("regular");
      doc.text(
        "Rapat Pleno Seleksi Penetapan Penerimaan Peserta Didik Baru (PPDB) Jalur Pretasi",
        50,
        155
      );
      doc.text(
        "Akademik dan Non Akademik yang dilaksanakan pada tanggal 04 Juli 2024.",
        50,
        160
      );
      doc.text("", 50, 165);

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
      doc.setFontSize(7);
      // doc.text(
      //   this.record.jalur == "Zonasi" ? this.record.jarak : "-",
      //   105,
      //   218
      // );
      doc.setFontSize(12);
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
          " di SMP Negeri 2 Tigaraksa Tahun Pelajaran",
        50,
        235
      );
      doc.text("2024/2025. ", 50, 240);

      doc.text(
        "Surat Keputusan ini di putuskan pada tanggal ditetapkan.",
        15,
        250
      );

      doc.text("Ditetapkan di", 130, 260);
      doc.text(": Tigaraksa ", 160, 260);
      doc.text("Pada Tanggal", 130, 265);
      doc.text(": 05 Juli 2024 ", 160, 265);
      doc.addImage(ttd, "JPEG", 129, 272, 25, 25);

      doc.setFontStyle("bold");

      doc.text("Plt. Kepala Sekolah,", 130, 270);
      doc.text("JARKASIH, S.Pd", 130, 300);
      doc.setFontStyle("regular");
      doc.text("Pembina Utama Muda, IV/c", 130, 305);
      doc.text("NIP. 196411281988031010", 130, 310);

      doc.text("Catatan :", 15, 320);
      doc.setFontStyle("regular");
      doc.setFontSize("10");

      doc.text(
        "1. Bagi yang diterima, dipersilahkan untuk lapor diri/daftar ulang, dengan membawa print out tanda bukti DITERIMA;",
        15,
        325
      );
      doc.text(
        "2. Waktu pelaksanaan lapor diri/daftar ulang, tanggl 08-10 Juli 2024, mulai pk. 08.00 s.d 14.00 di SMP Negeri 2 Tigaraksa;",
        15,
        330
      );
      doc.text(
        "3. Saat daftar ulang siswa wajib hadir didampingi orang tua/wali;",
        15,
        335
      );
      doc.text("4. Membawa Materai 10.000 2 Lembar;", 15, 340);
      doc.text(
        "5. Apabila tidak melakukan lapor diri / Daftar Ulang sampai dengan tanggal yg telah ditentukan dianggap mengundurkan diri.",
        15,
        345
      );

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