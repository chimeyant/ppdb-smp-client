<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">face</v-icon>
      <v-subheader class="text-h6">
        <h4>BIODATA PESERTA</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Formulir Biodata Peserta
      </div>
    </v-flex>

    <v-row class="pa-1">
      <v-col cols="12">
        <v-card>
          <v-card-title class="white--text purple lighten-1"
            >BIODATA</v-card-title
          >

          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col :cols="device.desktop ? `10` : `12`">
                <v-col cols="12">
                  <v-text-field
                    label="Nama Lengkap"
                    :color="theme"
                    v-model="record.nama"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NIP"
                    :color="theme"
                    v-model="record.nip"
                    dense
                    outlined
                    disabled
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NIK"
                    :color="theme"
                    v-model="record.nik"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col :cols="device.desktop ? `8` : `12`">
                      <v-text-field
                        label="Tempat Lahir"
                        :color="theme"
                        v-model="record.tempat_lahir"
                        dense
                        outlined
                        :hide-details="device.desktop"
                      ></v-text-field>
                    </v-col>

                    <v-col :cols="device.desktop ? `4` : `12`">
                      <v-text-field
                        label="Tanggal Lahir"
                        :color="theme"
                        v-model="record.tanggal_lahir"
                        dense
                        outlined
                        type="date"
                        :hide-details="device.desktop"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Jenis Kelamin"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.jenis_kelamin"
                    :items="gens"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <div class="font-weight-bold grey--text">
                    ALAMAT PEMOHON :
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-select
                    label="Propinsi"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.province_id"
                    :items="provinsis"
                    outlined
                    @change="fetchKabupatens"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Kabupaten"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.regency_id"
                    :items="kabupatens"
                    outlined
                    @change="fetchKecamatans"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-select
                    label="Kecamatan"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.district_id"
                    :items="kecamatans"
                    outlined
                    @change="fetchDesa"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-select
                    label="Desa"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.village_id"
                    :items="desas"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Alamat"
                    :color="theme"
                    v-model="record.alamat_asal"
                    dense
                    :hide-details="device.desktop"
                    rows="3"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Alamat di Kabupaten Tangerang Jika Ada"
                    :color="theme"
                    v-model="record.alamat_domisili"
                    dense
                    :hide-details="device.desktop"
                    rows="3"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="No Telpon"
                    :color="theme"
                    v-model="record.telp"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email *"
                    :color="theme"
                    v-model="record.email"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Golangan/Ruang"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.golongan_id"
                    :items="golongans"
                    outlined
                    @change="fetchKecamatans"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Prestasi"
                    :color="theme"
                    v-model="record.prestasi"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Pendidikan Terakhir"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.pendidikan_id"
                    :items="pendidikans"
                    outlined
                    @change="fetchJurusan"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    label="Jurusan"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.jurusan_id"
                    :items="jurusans"
                    outlined
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Sekolah/PT/Universitas"
                    :color="theme"
                    v-model="record.sekolah"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Instansi Asal"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.jenis_pns"
                    :items="asalinstansi"
                    outlined
                    @change="fetchKecamatans"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Perangkat Daerah Pemohon"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.perangkat_daerah_pemohon"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Jabatan Asal"
                    :color="theme"
                    dense
                    :hide-details="device.desktop"
                    v-model="record.jabatan_asal"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col :cols="device.desktop ? `2` : `12`">
                <div></div>
                <v-spacer></v-spacer>
                <v-col cols="12">
                  <v-img
                    :class="[theme + ' lighten-2 with-backdrop']"
                    :aspect-ratio="3 / 4"
                    :src="foto"
                    :lazy-src="foto"
                  >
                    <div
                      class="d-flex flex-column align-center justify-center user-select-none"
                      style="height: 100%;"
                    >
                      <div
                        style="position: absolute; right: 8px; bottom: 8px; height: 36px; width: 36px;"
                      >
                        <v-btn icon dark @click="uploadFoto">
                          <v-icon>photo_camera</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-img>
                  <center>Foto 3x4 Max: 2Mb</center>
                </v-col>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-action class="mt-5">
            <v-divider></v-divider>

            <v-col class="text-right">
              <v-btn outlined :color="theme" @click="fetchUpdate">SIMPAN</v-btn>
            </v-col>
          </v-card-action>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "perusahaan-index",
  data: () => ({
    provinsis: [],
    kabupatens: [],
    kecamatans: [],
    desas: [],
    golongans: [],
    foto: "/",
    record: {},
    gens: [
      { text: "Laki-laki", value: "L" },
      { text: "Perempuan", value: "P" },
    ],
    pendidikans: [],
    jurusans: [],
    asalinstansi: [
      { text: "PUSAT", value: "PUSAT" },
      { text: "DAERAH", value: "DAERAH" },
    ],
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
      dataUrl: "api/peserta/biodata",
    });
    this.fetchRecord();
    this.fetchProvinsis();
    this.fetchGolongans();
    this.fetchPendidikan();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "assignFileBrowse", "setLoading"]),
    fetchRecord: async function() {
      let { data } = await this.http.get("api/peserta/biodata");

      this.record = data;

      this.foto = data.path;
    },
    fetchUpdate: async function() {
      try {
        this.setLoading({ dialog: true, text: "Update Biodata" });
        let {
          data: { status, message, data },
        } = await this.http.post(
          "api/peserta/biodata/" + this.record.id + "?_method=PUT",
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

        this.record = data;
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      } finally {
        this.setLoading({ dialog: false, text: "" });
      }
    },
    fetchProvinsis: async function() {
      let { data: data } = await this.http.post("api/provinsi-combo");
      this.provinsis = data;
    },
    fetchKabupatens: async function() {
      let { data: data } = await this.http.post(
        "api/kabupaten-combo",
        this.record
      );
      this.kabupatens = data;
    },
    fetchKecamatans: async function() {
      let { data: data } = await this.http.post(
        "api/kecamatan-combo-by-regency",
        this.record
      );

      this.kecamatans = data;
    },
    fetchDesa: async function() {
      let { data: data } = await this.http.post("api/desa-combo", this.record);

      this.desas = data;
    },
    fetchGolongans: async function() {
      let { data: data } = await this.http.post("api/golongan-combo");

      this.golongans = data;
    },
    fetchPendidikan: async function() {
      let { data: data } = await this.http.post("api/pendidikan-combo");

      this.pendidikans = data;
    },
    fetchJurusan: async function() {
      let { data: data } = await this.http.post(
        "api/jurusan-combo",
        this.record
      );
      this.jurusans = data;
    },
    uploadFoto: function() {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.photo = response.name;
          }, 1000);
        },
      });
    },
  },
  watch: {
    "record.province_id": function() {
      this.fetchKabupatens();
    },
    "record.regency_id": function() {
      this.fetchKecamatans();
    },
    "record.district_id": function() {
      this.fetchDesa();
    },
    "record.pendidikan_id": function() {
      this.fetchJurusan();
    },
  },
};
</script>

<style></style>
