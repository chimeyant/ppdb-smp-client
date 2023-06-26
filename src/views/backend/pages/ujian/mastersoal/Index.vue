<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon>description</v-icon>
      <v-subheader class="text-h6">
        <h4>MANAJEMEN MASTER SOAL</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Daftar Seluruh Soal Yang Tersedia</div>
    </v-flex>

    <v-row>
      <v-col col="8">
        <v-card>
          <v-card-title :class="`flex flex-row-reverse ` + theme">
            <v-btn icon @click="fetchRecords"
              ><v-icon color="white">add_circle</v-icon></v-btn
            >
            <v-btn icon @click="fetchRecords"
              ><v-icon color="white">autorenew</v-icon></v-btn
            >
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
              solo
              :color="theme"
            ></v-text-field>
          </v-card-title>
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
            <template v-slot:item.id="{ value }">
              <v-tooltip color="blue" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="blue" @click="openButirSoal(value)"
                      >drag_indicator</v-icon
                    >
                  </v-btn>
                </template>
                <span>Majemen Butir Soal</span>
              </v-tooltip>
              <v-tooltip color="green" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="green" @click="previewSoal(value)"
                      >preview</v-icon
                    >
                  </v-btn>
                </template>
                <span>Pratinjau Soal</span>
              </v-tooltip>
              <v-tooltip color="orange" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="orange" @click="editRecord(value)"
                      >create</v-icon
                    >
                  </v-btn>
                </template>
                <span>Edit Data</span>
              </v-tooltip>
              <v-tooltip color="red" bottom>
                <template v-slot:activator="{ on }">
                  <v-btn text small icon v-on="on">
                    <v-icon color="red" @click="postConfirmDelete(value)"
                      >delete</v-icon
                    >
                  </v-btn>
                </template>

                <span>Hapus Data</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <v-col col="4">
        <v-card>
          <v-card-title :class="theme"> Formulir Master Soal </v-card-title>
          <v-card-subtitle :class="theme">
            Formulir untuk mendaftarkan/merubah Master Soal
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-text>
            <v-row :no-gutters="device.mobile">
              <v-col cols="12">
                <v-text-field
                  label="Mata Pelajaran"
                  :color="theme"
                  hide-details="device.desktop"
                  autocomplete="off"
                  v-model="record.mapel"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  label="Keterangan"
                  :color="theme"
                  v-model="record.keterangan"
                  hide-details
                  rows="5"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="flex flex-row-reverse">
            <v-btn
              outlined
              :color="theme"
              @click="postAddNewRecord"
              v-show="!event.update"
              >TAMBAH</v-btn
            >
            <v-btn
              outlined
              :color="theme"
              @click="postUpdateRecord"
              v-show="event.update"
              >UBAH</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
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
        text: "MATA PELAJARAN",
        align: "start",
        sortable: false,
        value: "mapel",
      },
      { text: "KETERANGAN", value: "keterangan" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
    path: null,
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "record",
      "records",
      "loading",
      "event",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/master-soal",
    });
    this.fetchRecords();
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
      "assignFileBrowse",
      "setRecord",
    ]),

    addNew: function () {
      this.setRecord({});
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
      });
    },
    editRecord: function (val) {
      this.postEdit(val);
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },

    uploadFile: function () {
      this.assignFileBrowse({
        fileType: [".pdf"],
        query: {
          doctype: "peraturan",
        },
        callback: (response) => {
          setTimeout(() => {
            this.path = response.name;
            this.record.path = response.name;
          }, 500);
        },
      });
    },

    openButirSoal: function (val) {
      this.$router.push({
        name: "ujian-master-soal-detail",
        params: { id: val },
      });
    },

    previewSoal: function (val) {
      this.$router.push({
        name: "ujian-master-soal-detail-preview",
        params: { id: val },
      });
    },
  },
};
</script>
