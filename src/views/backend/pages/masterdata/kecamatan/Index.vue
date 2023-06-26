<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon>mdi-map</v-icon>
      <v-subheader class="text-h6">
        <h4>MANAJEMEN REFERENSI KECAMATAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Referensi Kecamatan Tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card :color="theme">
          <v-card-title class="flex flex-row-reverse">
            <v-btn
              icon
              @click="$router.push({name:'master-kebupaten',params:{province_id: $route.params.province_id}})"
            >
              <v-icon color="white">mdi-close-circle</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="fetchRecords"
            >
              <v-icon color="white">autorenew</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="addNewRecord"
            >
              <v-icon color="white">mdi-plus-circle</v-icon>
            </v-btn>

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
            <template v-slot:item.aksi="{ value }">
              <v-tooltip
                color="orange"
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
                      color="green"
                      @click="editRecord(value)"
                    >mdi-map</v-icon>
                  </v-btn>
                </template>
                <span>Manajemen Desa</span>
              </v-tooltip>
              <v-tooltip
                color="orange"
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
                      color="orange"
                      @click="editRecord(value)"
                    >mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Kecamatan</span>
              </v-tooltip>
              <v-tooltip
                color="orange"
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
                      color="red"
                      @click="postDeleteRecord(value)"
                    >mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Hapus Data</span>
              </v-tooltip>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="add"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme"
            dark
          >Formulir REFERENSI SEKOLAH</v-toolbar>
          <v-card-title class="justify-center">DATA SEKOLAH</v-card-title>
          <v-card-text>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="KODE"
                v-model="record.id"
                dense
                maxLength="8"
              ></v-text-field>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="KECAMATAN"
                v-model="record.name"
                dense
              ></v-text-field>
            </v-col>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme"
              @click="postAddNewRecord"
              v-show="!edit"
            >Simpan</v-btn>
            <v-btn
              outlined
              :color="theme"
              @click="postUpdateRecord"
              v-show="edit"
            >Simpan</v-btn>
            <v-btn
              outlined
              color="grey"
              @click=" add = false"
            >Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    num: 1,
    headers: [
      { text: "#", value: "num", width: 50, align: "center" },
      {
        text: "KODE",
        align: "start",
        sortable: false,
        value: "id",
        width: 100,
      },
      { text: "SEKOLAH", value: "name" },
      {
        text: "AKSI",
        value: "aksi",
        width: 150,
        align: "center",
        sortable: false,
      },
    ],

    add: false,
    edit: false,

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
      dataUrl: "api/kecamatan/" + this.$route.params.regency_id,
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

    addNewRecord: function () {
      this.setRecord({});
      this.add = true;
      this.edit = false;
    },
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.add = false;
      });
    },
    editRecord: function (val) {
      this.$router.push({
        name: "master-desa",
        params: {
          regency_id: this.$route.params.regency_id,
          district_id: val,
        },
      });
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.add = false;
        this.edit = false;
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
  },
};
</script>
