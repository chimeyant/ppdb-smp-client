<template>
  <div :class="device.desktop ? `home pa-6` : `home pt-6`">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon :color="theme">follow_the_signs</v-icon>
      <v-subheader class="text-h6">
        <h4>FORMULIR PENDAFTARAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Formulir Pendaftaran Peserta</div>
    </v-flex>

    <v-row class="pa-1">
      <v-col cols="12">
        <v-card>
          <v-card-title :class="`white--text ` + theme + ` lighten-1`">FORMULIR PESERTA PPDB</v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-stepper
              v-model="e6"
              vertical
            >
              <v-stepper-step
                editable
                :complete="e6 > 1"
                step="1"
                :color="theme"
              >
                PILIH KOMPETENSI KEAHLIAN
                <small>Wajib Diisi Peserta</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col
                    cols="12"
                    v-show="false"
                  >
                    <v-text-field
                      label="Nomor Pendaftaran (Terisi Otomatis Sistem)"
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      v-model="record.nomor_register"
                      v-show="false"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="PILIHAN 1"
                      outlined
                      dense
                      hide-details
                      :color="theme"
                      v-model="record.jurusan_id_1"
                      :items="programkeahlians"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      label="PILIHAN 2"
                      outlined
                      dense
                      hide-details
                      :color="theme"
                      v-model="record.jurusan_id_2"
                      :items="programkeahlians"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 2"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>

              <v-stepper-step
                editable
                :color="theme"
                :complete="e6 > 2"
                step="2"
              >
                A. DATA ASAL SEKOLAH CALON PESERTA DIDIK
              </v-stepper-step>
              <v-stepper-content step="2">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col cols="12">
                    <v-select
                      label="Daerah Asal"
                      outlined
                      dense
                      hide-details
                      :color="theme"
                      v-model="record.daerah_asal"
                      :items="daerahasals"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    v-show="
                      record.daerah_asal == 'DALAM PROVINSI' ? true : false
                    "
                  >
                    <v-autocomplete
                      label="Asal Sekolah (Ketik Nama Sekolah Anda)"
                      outlined
                      dense
                      hint="Ketik nama sekolah anda"
                      :color="theme"
                      v-model="record.ref_sekolah_id"
                      :items="refsekolahs"
                      @change="fetchRecordRefSekolah"
                    ></v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12"
                    v-show="
                      record.daerah_asal != 'DALAM PROVINSI' ? true : false
                    "
                  >
                    <v-text-field
                      label="Nama Sekolah Asal"
                      v-model="record.nama_sekolah_asal"
                      :color="theme"
                      hide-details
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col v-show="pkbm">
                    <v-text-field
                      label="Nama PKBM"
                      v-model="record.nama_sekolah_asal"
                      :color="theme"
                      hide-details
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    lg="6"
                    md="12"
                    xs="12"
                  >
                    <v-text-field
                      label="NPSN Sekolah Asal (8 Digit)"
                      v-model="record.npsn"
                      :color="theme"
                      outlined
                      dense
                      maxLength="8"
                      hint="Panjang NPSN adalah 8 Digit"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 3"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 1"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>

              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 3"
                step="3"
              >
                B. DATA IDENTITAS PESERTA DIDIK
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-layout row>
                  <v-col :cols="device.desktop ? `9` : `12`">
                    <v-col cols="12">
                      <v-text-field
                        label="Nama Calon Peserta Didik"
                        v-model="record.nama"
                        :color="theme"
                        hide-details
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        label="Jenis Kelamin"
                        v-model="record.jenis_kelamin"
                        :color="theme"
                        hide-details
                        outlined
                        dense
                        :items="jeniskelamins"
                      ></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Tempat lahir"
                        v-model="record.tempat_lahir"
                        :color="theme"
                        hide-details
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Tanggal Lahir"
                        v-model="record.tanggal_lahir"
                        :color="theme"
                        hide-details
                        outlined
                        dense
                        type="date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        label="Agama"
                        v-model="record.agama"
                        :color="theme"
                        hide-details
                        outlined
                        dense
                        :items="agamas"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="NISN"
                        v-model="record.nisn"
                        :color="theme"
                        maxLength="10"
                        outlined
                        dense
                        hint="Panjang NISN adalah 10 Digit"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        label="Tahun Lulus"
                        v-model="record.tahun_lulus"
                        :color="theme"
                        hide-details
                        outlined
                        dense
                        :items="tahunlulus"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        label="Jenis Lulusan"
                        v-model="record.jenis_lulusan"
                        :color="theme"
                        hide-details
                        outlined
                        dense
                        :items="jenislulusans"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="No HP (Aktif WA)"
                        :color="theme"
                        outlined
                        dense
                        v-model="record.nomor_hp"
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-col>
                  <v-col :cols="device.desktop ? `3` : `12`">
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
                            ">
                            <v-btn
                              icon
                              dark
                              @click="uploadFoto"
                            >
                              <v-icon>photo_camera</v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </v-img>
                      <center>Foto 3x4 Max: 2Mb</center>
                    </v-col>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 4"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 2"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-layout>
              </v-stepper-content>

              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 4"
                step="4"
              >
                C. DATA KEPENDUDUKAN PESERTA DIDIK
              </v-stepper-step>
              <v-stepper-content step="4">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col cols="12">
                    <v-text-field
                      label="NIK (Nomor KTP)"
                      v-model="record.nik"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Nomor Kartu Keluarga"
                      v-model="record.nokk"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Kartu Keluarga PDF/Foto (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.dok_kartu_keluarga"
                      :color="theme"
                      @click:append-outer="uploadFileKartuKeluarga"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      label="Akte Lahir PDF/Foto (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.dok_akte_lahir"
                      :color="theme"
                      @click:append-outer="uploadFileAkteLahir"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 5"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 3"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 5"
                step="5"
              >
                D. DATA ALAMAT TEMPAT TINGGAL
                <small>Sesuai dengan Kartu Keluarga/Domisili </small>
              </v-stepper-step>
              <v-stepper-content step="5">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-select
                      label="Provinsi"
                      v-model="record.province_id"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                      :items="provinsis"
                      @change="fetchKabupatens"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      label="Kabupaten"
                      v-model="record.regency_id"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                      :items="kabupatens"
                      @change="fetchKecamatans"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      label="Kecamatan"
                      v-model="record.district_id"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                      :items="kecamatans"
                      @change="fetchDesa"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      label="Desa"
                      v-model="record.village_id"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                      :items="desas"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col cols="5">
                        <v-text-field
                          label="RT"
                          :color="theme"
                          outlined
                          dense
                          v-model="record.rt"
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col cols="5">
                        <v-text-field
                          label="RW"
                          :color="theme"
                          outlined
                          dense
                          v-model="record.rw"
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-textarea
                      label="Alamat"
                      :color="theme"
                      outlined
                      dense
                      v-model="record.alamat"
                      hide-details
                      rows="3"
                    >{{ record.alamat }}</v-textarea>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Kode Pos"
                      :color="theme"
                      outlined
                      dense
                      v-model="record.kode_pos"
                      hide-details
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      label="Jarak Kesekolah (Meter)"
                      :color="theme"
                      outlined
                      dense
                      v-model="record.jarak_kesekolah"
                      hide-details
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 6"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 4"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 6"
                step="6"
              >
                E. DATA ORANG TUA PESERTA
              </v-stepper-step>
              <v-stepper-content step="6">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-text-field
                      label="Nama Ayah"
                      :color="theme"
                      outlined
                      dense
                      hide-details
                      v-model="record.nama_ayah"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Nama Ibu Kandung"
                      :color="theme"
                      outlined
                      dense
                      hide-details
                      v-model="record.nama_ibu"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="No. HP Orang Tua (Aktif)"
                      :color="theme"
                      outlined
                      dense
                      v-model="record.telpon_rumah"
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select
                      label="Pekerjaan"
                      v-model="record.pekerjaan_id"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                      :items="pekerjaans"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 7"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 5"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 7"
                step="7"
              >
                F. NILAI RAPOR SEMESTER I
                <small>Ilmu Pengetahuan</small>
              </v-stepper-step>
              <v-stepper-content step="7">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-text-field
                      label="Pendidikan Agama dan Budi Pekerti"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_1_pai"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      label="Pendidikan Kewarganegaraan"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_1_pkn"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Indonesia"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_1_bindo"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Inggris"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_1_bing"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Matematika"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_1_mtk"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Alam"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_1_ipa"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Sosial"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_1_ips"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Upload Rapor SMT 1 PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.smt_1_dokumen"
                      :color="theme"
                      @click:append-outer="uploadFileRaporSmt1"
                      outlined
                      dense
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 8"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 6"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>

              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 8"
                step="8"
              >
                G. NILAI RAPOR SEMESTER II
                <small>Ilmu Pengetahuan</small>
              </v-stepper-step>
              <v-stepper-content step="8">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-text-field
                      label="Pendidikan Agama dan Budi Pekerti"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_2_pai"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Pendidikan Kewarganegaraan"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_2_pkn"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Indonesia"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_2_bindo"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Inggris"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_2_bing"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Matematika"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_2_mtk"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Alam"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_2_ipa"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Sosial"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_2_ips"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Upload Rapor SMT 2 PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.smt_2_dokumen"
                      :color="theme"
                      @click:append-outer="uploadFileRaporSmt2"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 9"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 7"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>

              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 9"
                step="9"
              >
                H. NILAI RAPOR SEMESTER III
                <small>Ilmu Pengetahuan</small>
              </v-stepper-step>
              <v-stepper-content step="9">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-text-field
                      label="Pendidikan Agama dan Budi Pekerti"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_3_pai"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Pendidikan Kewarganegaraan"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_3_pkn"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Indonesia"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_3_bindo"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Inggris"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_3_bing"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Matematika"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_3_mtk"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Alam"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_3_ipa"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Sosial"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_3_ips"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Upload Rapor SMT 3 PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.smt_3_dokumen"
                      :color="theme"
                      @click:append-outer="uploadFileRaporSmt3"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 10"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 8"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 10"
                step="10"
              >
                I. NILAI RAPOR SEMESTER IV
                <small>Ilmu Pengetahuan</small>
              </v-stepper-step>
              <v-stepper-content step="10">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-text-field
                      label="Pendidikan Agama dan Budi Pekerti"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_4_pai"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Pendidikan Kewarganegaraan"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_4_pkn"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Indonesia"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_4_bindo"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Inggris"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_4_bing"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Matematika"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_4_mtk"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Alam"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_4_ipa"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Sosial"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_4_ips"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Upload Rapor SMT 4 PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.smt_4_dokumen"
                      :color="theme"
                      @click:append-outer="uploadFileRaporSmt4"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 11"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 9"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 11"
                step="11"
              >
                J. NILAI RAPOR SEMESTER V
                <small>Ilmu Pengetahuan</small>
              </v-stepper-step>
              <v-stepper-content step="11">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-text-field
                      label="Pendidikan Agama dan Budi Pekerti"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_5_pai"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Pendidikan Kewarganegaraan"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_5_pkn"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Indonesia"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_5_bindo"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Bahasa Inggris"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_5_bing"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Matematika"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_5_mtk"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Alam"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_5_ipa"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Ilmu Pengetahuan Sosial"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.smt_5_ips"
                      type="number"
                      hint="Pengisian Nilai 2 Digit Contoh (80)"
                      autocomplete="off"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Upload Rapor SMT 5 PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.smt_5_dokumen"
                      :color="theme"
                      @click:append-outer="uploadFileRaporSmt5"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 12"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 10"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 12"
                step="12"
              >
                K. SURAT KETERANGAN LULUS
                <small>Ilmu Pengetahuan</small>
              </v-stepper-step>
              <v-stepper-content step="12">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col cols="12">
                    <v-text-field
                      label="DOK. SKL PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.dok_skl"
                      :color="theme"
                      @click:append-outer="uploadFileDokSkl"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 13"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 11"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 13"
                step="13"
              >
                L. PRESTASI
                <small>Bagi Yang Memiliki</small>
              </v-stepper-step>
              <v-stepper-content step="13">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-select
                      label="Jenis Prestasi"
                      v-model="record.param_prestasi_id"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                      :items="prestasis"
                      :disabled="!record.prestasi_status"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Penyelenggara"
                      :color="theme"
                      outlined
                      dense
                      hide-details
                      v-model="record.prestasi_penyelenggara"
                      :disabled="!record.prestasi_status"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Prestasi"
                      :color="theme"
                      outlined
                      dense
                      hide-details
                      v-model="record.prestasi_nama"
                      :disabled="!record.prestasi_status"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="DOK. PRESTASI PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.prestasi_dokumen"
                      :color="theme"
                      @click:append-outer="uploadFilePrestasiDokumen"
                      outlined
                      dense
                      hide-details
                      readonly
                      :disabled="!record.prestasi_status"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch
                      label="Memiliki Prestasi"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.prestasi_status"
                      hide-details
                    ></v-switch>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 14"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 12"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 14"
                step="14"
              >
                M. DOKUMEN KIP/PKH/KKS/KPS/JAMSOSRATU
                <small>Bagi Yang Memiliki</small>
              </v-stepper-step>
              <v-stepper-content step="14">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-select
                      label="Jenis Bantuan"
                      v-model="record.afirmasi_jenis_bantuan"
                      :color="theme"
                      hide-details
                      outlined
                      dense
                      :items="jenisbantuans"
                      :disabled="!record.afirmasi_status"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Nama Bantuan"
                      :color="theme"
                      outlined
                      dense
                      hide-details
                      v-model="record.afirmasi_nama"
                      :disabled="!record.afirmasi_status"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Nomor Kartu/Lainnya"
                      :color="theme"
                      outlined
                      dense
                      hide-details
                      v-model="record.afirmasi_nomor"
                      :disabled="!record.afirmasi_status"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="DOK/KARTU BANTUAN PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.afirmasi_dokumen"
                      :color="theme"
                      @click:append-outer="uploadFileAfirmasiDokumen"
                      outlined
                      dense
                      hide-details
                      :disabled="!record.afirmasi_status"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-switch
                      label="Memiliki Bantuan Dari Pemerintah"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.afirmasi_status"
                      hide-details
                    ></v-switch>
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 15"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 13"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 15"
                step="15"
              >
                N. SURAT KETERANGAN
                <small>Bagi Yang Memiliki</small>
              </v-stepper-step>
              <v-stepper-content step="15">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <v-text-field
                      label="Tinggi Badan (cm)"
                      :color="theme"
                      outlined
                      dense
                      hide-details
                      v-model="record.tinggi_badan"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    v-show="info.skck"
                  >
                    <v-text-field
                      label="UPLOAD SKKB/SKCK PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.dok_skck"
                      :color="theme"
                      @click:append-outer="uploadFileSKCK"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="UPLOAD SK Sehat PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.dok_surat_keterangan_sehat"
                      :color="theme"
                      @click:append-outer="uploadFileDokSuratKeteranganSehat"
                      outlined
                      dense
                      hide-details
                      readonly
                      :v-show="info.skck"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    v-show="info.butawarna"
                  >
                    <v-text-field
                      label="UPLOAD SK Tidak Buta Warna  PDF/FOTO (Max: 2 MB)"
                      append-outer-icon="attachment"
                      v-model="record.dok_surat_keterangan_buta_warna"
                      :color="theme"
                      @click:append-outer="uploadFileSuratKeteranganButaWarna"
                      outlined
                      dense
                      hide-details
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      @click="e6 = 16"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 14"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-step
                :color="theme"
                editable
                :complete="e6 > 16"
                step="16"
              >
                O. PERNYATAAN
              </v-stepper-step>
              <v-stepper-content step="16">
                <v-card
                  flat
                  color="white lighten-1"
                  class="mb-2"
                >
                  <v-col>
                    <div class="subtitle-1 justify-content-lg-around">
                      Saya telah mengisi data diatas dengan benar dan tidak melakukan rekayasa data dan siap untuk di diskulaifikasi jika terjadi kecurangan atau rekayasa data
                    </div>
                  </v-col>
                  <v-col>
                    <v-switch
                      label="Ya, Saya Setuju"
                      outlined
                      dense
                      :color="theme"
                      v-model="record.pernyataan_status"
                      hide-details
                    ></v-switch>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      small
                      outlined
                      dense
                      :color="theme"
                      @click="e6 = 15"
                    >
                      <v-icon>mdi-chevron-double-up</v-icon>
                    </v-btn>
                    &nbsp;
                    <v-btn
                      small
                      outlined
                      hide-details
                      dense
                      :color="theme"
                      :disabled="!record.pernyataan_status"
                      @click="postUpdate"
                    >Kirim Data<v-icon>send</v-icon>
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
            </v-stepper>
          </v-card-text>
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
    e6: 1,
    programkeahlians: [],
    daerahasals: [
      { value: "DALAM PROVINSI", text: "DALAM PROVINSI" },
      { value: "LUAR DAERAH", text: "LUAR PROVINSI" },
    ],
    refsekolahs: [],
    provinsis: [],
    jeniskelamins: [
      { value: "P", text: "Perempuan" },
      { value: "L", text: "Laki-laki" },
    ],
    agamas: [
      { value: "ISLAM", text: "ISLAM" },
      { value: "PROTESTAN", text: "PROTESTAN" },
      { value: "KATHOLIK", text: "KATHOLIK" },
      { value: "HINDU", text: "HINDU" },
      { value: "BUDHA", text: "BUDHA" },
      { value: "KONG HUCU", text: "KONG HUCU" },
    ],
    tahunlulus: [
      { value: 2018, text: "2018" },
      { value: 2019, text: "2019" },
      { value: 2020, text: "2020" },
      { value: 2021, text: "2021" },
      { value: 2022, text: "2022" },
    ],
    jenislulusans: [
      { value: "umum", text: "Umum" },
      { value: "mts", text: "MTs" },
      { value: "paket", text: "Paket B SLB Lain-lain" },
    ],

    kabupatens: [],
    kecamatans: [],
    desas: [],
    pekerjaans: [],
    prestasis: [],
    jenisbantuans: [
      { value: "pkh", text: "Program Keluarga Harapan (PKH)" },
      { value: "kip", text: "Kartu Indonesia Pintar (KIP)" },
      { value: "kks", text: "Kartu Keluarga Sejahtera (KKS)" },
      { value: "kps", text: "Kartu Perlindungan Sosial" },
      { value: "jamsosratu", text: "JAMSOSRATU" },
    ],

    golongans: [],
    foto: "/",

    pkbm: false,

    record: {
      jurusan_id_1: null,
      jurusan_id_2: null,
      daerah_asal: null,
      nama_sekolah_asal: null,
      npsn: null,
      nama: null,
      jenis_kelamin: null,
      agama: null,
      tahun_lulus: null,
      jenis_lulusan: null,
      nik: null,
      nokk: null,
      dok_kartu_keluarga: null,
      dok_akte_lahir: null,
      dok_domisili: null,
      province_id: null,
      regency_id: null,
      district_id: null,
      village_id: null,
      rt: null,
      rw: null,
      alamat: null,
      kode_pos: null,
      telepon_rumah: null,
      telepon_hp: null,
      jarak_kesekolah: null,
      nama_ayah: null,
      nama_ibu: null,
      pekerjaan_id: null,
      smt_1_pai: null,
      smt_1_pkn: null,
      smt_1_bindo: null,
      smt_1_bing: null,
      smt_1_mtk: null,
      smt_1_ipa: null,
      smt_1_ips: null,
      smt_1_dokumen: null,
      smt_2_pai: null,
      smt_2_pkn: null,
      smt_2_bindo: null,
      smt_2_bing: null,
      smt_2_mtk: null,
      smt_2_ipa: null,
      smt_2_ips: null,
      smt_2_dokumen: null,
      smt_3_pai: null,
      smt_3_pkn: null,
      smt_3_bindo: null,
      smt_3_bing: null,
      smt_3_mtk: null,
      smt_3_ipa: null,
      smt_3_ips: null,
      smt_3_dokumen: null,
      smt_4_pai: null,
      smt_4_pkn: null,
      smt_4_bindo: null,
      smt_4_bing: null,
      smt_4_mtk: null,
      smt_4_ipa: null,
      smt_4_ips: null,
      smt_4_dokumen: null,
      smt_5_pai: null,
      smt_5_pkn: null,
      smt_5_bindo: null,
      smt_5_bing: null,
      smt_5_mtk: null,
      smt_5_ipa: null,
      smt_5_ips: null,
      smt_5_dokumen: null,
      dok_skl: null,
      prestasi_status: false,
      prestasi_param_prestasi_id: null,
      prestasi_penyelenggara: null,
      prestasi_nama: null,
      prestasi_dokumen: null,
      afirmasi_status: false,
      afirmasi_jenis_bantuan: null,
      afirmasi_nama: null,
      afirmasi_nomor: null,
      afirmasi_dokumen: null,
      butawarna_status: false,
      tinggi_badan: null,
      dok_surat_keterangan_sehat: null,
      dok_surat_keterangan_buta_warna: null,
      dok_skck: null,
      pernyataan_status: false,
      pernyataan_dokumen:
        "Saya telah mengisi data diatas dengan benar dan tidak melakukan rekayasa data dan siap untuk di diskulaifikasi jika terjadi kecurangan atau rekayasa data.",
    },
    gens: [
      { text: "Laki-laki", value: "L" },
      { text: "Perempuan", value: "P" },
    ],
    pendidikans: [],

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
      "info",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/peserta/biodata",
    });
    this.fetchProgramKeahlians();
    this.fetchRefSekolahs();
    this.fetchProvinsis();
    this.fetchPekerjaans();
    this.fetchPrestasis();
    this.fetchRecord();
    this.getAppInfo();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "assignFileBrowse", "setLoading", "getAppInfo"]),
    fetchProgramKeahlians: async function () {
      let { data } = await this.http.post("api/program-keahlian-combo");

      this.programkeahlians = data;
    },
    fetchRefSekolahs: async function () {
      let { data } = await this.http.post("api/ref-sekolah-combo");

      this.refsekolahs = data;
    },
    fetchRecordRefSekolah: async function () {
      let { data } = await this.http.get(
        "api/ref-sekolah/" + this.record.ref_sekolah_id
      );

      this.record.nama_sekolah_asal = data.name;
      this.record.npsn = data.npsn;
      if (this.data.id == 999) {
        this.pkbm = true;
      } else {
        this.pkbm = false;
      }
    },
    fetchPekerjaans: async function () {
      let { data } = await this.http.post("api/pekerjaan-combo");
      this.pekerjaans = data;
    },
    fetchPrestasis: async function () {
      let { data } = await this.http.post("api/param-prestasi-combo");
      this.prestasis = data;
    },
    fetchProvinsis: async function () {
      let { data: data } = await this.http.post("api/provinsi-combo");
      this.provinsis = data;
    },
    fetchKabupatens: async function () {
      let { data: data } = await this.http.post(
        "api/kabupaten-combo",
        this.record
      );
      this.kabupatens = data;
    },
    fetchKecamatans: async function () {
      let { data: data } = await this.http.post(
        "api/kecamatan-combo-by-regency",
        this.record
      );

      this.kecamatans = data;
    },
    fetchDesa: async function () {
      let { data: data } = await this.http.post("api/desa-combo", this.record);

      this.desas = data;
    },

    fetchRecord: async function () {
      let { data } = await this.http.get("api/peserta/pendaftaran");

      this.record = data;

      this.foto = data.path;
    },

    postUpdate: async function () {
      try {
        this.setLoading({
          dialog: true,
          text: "Proses Kirim Formuir Pendaftaran..",
        });
        let {
          data: { status, message, data },
        } = await this.http.post("api/peserta/pendaftaran", this.record);

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

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.foto = response.name;
          }, 1000);
        },
      });
    },
    uploadFileKartuKeluarga: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.dok_kartu_keluarga = response.name;
          }, 500);
        },
      });
    },
    uploadFileAkteLahir: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.dok_akte_lahir = response.name;
          }, 500);
        },
      });
    },
    uploadFileDomisili: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.dok_domisili = response.name;
          }, 500);
        },
      });
    },
    uploadFileRaporSmt1: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.smt_1_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileRaporSmt2: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.smt_2_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileRaporSmt3: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.smt_3_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileRaporSmt4: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.smt_4_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileRaporSmt5: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.smt_5_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileDokSkl: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.dok_skl = response.name;
          }, 500);
        },
      });
    },
    uploadFilePrestasiDokumen: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.prestasi_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileAfirmasiDokumen: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.afirmasi_dokumen = response.name;
          }, 500);
        },
      });
    },
    uploadFileDokSuratKeteranganSehat: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.dok_surat_keterangan_sehat = response.name;
          }, 500);
        },
      });
    },
    uploadFileSuratKeteranganButaWarna: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.dok_surat_keterangan_buta_warna = response.name;
          }, 500);
        },
      });
    },
    uploadFileSKCK: function () {
      this.assignFileBrowse({
        fileType: [".pdf", ".jpg", ".jpeg", ".png"],
        query: {
          doctype: "peserta",
        },
        callback: (response) => {
          setTimeout(() => {
            this.record.dok_skck = response.name;
          }, 500);
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
    "record.pendidikan_id": function () {
      this.fetchJurusan();
    },
    "record.ref_sekolah_id": function () {
      if (this.record.ref_sekolah_id === 9999) {
        this.pkbm = true;
      } else {
        this.pkbm = false;
      }
    },
  },
};
</script>

<style></style>
