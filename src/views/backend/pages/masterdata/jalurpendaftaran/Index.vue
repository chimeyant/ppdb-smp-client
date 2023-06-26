<template>
  <div class="home pa-6">
    <v-flex
      row
      class="pb-2"
    >
      <v-icon>description</v-icon>
      <v-subheader class="text-h6">
        <h4>MANAJEMEN JALUR PENDAFTARAN</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">
        Daftar Seluruh Jalur Pendaftaran Yang Tersedia
      </div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title :class="`flex flex-row-reverse ` + theme">
            <v-btn
              icon
              @click="fetchRecords"
            >
              <v-icon color="white">autorenew</v-icon>
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
            <template v-slot:item.id="{ value }">
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
                    >create</v-icon>
                  </v-btn>
                </template>
                <span>Edit Data</span>
              </v-tooltip>
            </template>
            <template v-slot:item.is_active="{ value }">
              <v-icon v-show="value">mdi-check</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-col col="12">
      <v-dialog
        transition="dialog-bottom-transition"
        v-model="form.edit"
        :max-width="device.desktop ? `600px` : `100%`"
        persistent
      >
        <v-card>
          <v-toolbar
            :color="theme"
            dark
          >Formulir Dokumen Persyaratans</v-toolbar>
          <v-card-title class="justify-center">DATA DOKUMEN</v-card-title>
          <v-card-text>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Nama Dokumen"
                v-model="record.name"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Keterangan"
                outlined
                :color="theme"
                rows="3"
                dense
                v-model="record.keterangan"
                :hide-details="device.desktop"
              >{{ record.keterangan }}
              </v-textarea>
            </v-col>
            <v-col col="12">
              <v-text-field
                outlined
                :color="theme"
                :hide-details="device.desktop"
                label="Kuota"
                v-model="record.kuota"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-switch
                label="Aktif"
                dense
                :color="theme"
                v-model="record.is_active"
                :hide-details="device.desktop"
              ></v-switch>
            </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              :color="theme"
              @click="postUpdateRecord"
            >Simpan</v-btn>
            <v-btn
              outlined
              color="grey"
              @click="form.edit = false"
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
      { text: "#", value: "num", width: 50 },
      {
        text: "JALUR",
        align: "start",
        sortable: false,
        value: "name",
        width: 200,
      },
      { text: "KETERANGAN", value: "keterangan" },
      { text: "KUOTA", value: "kuota", width: 100 },
      {
        text: "STATUS",
        value: "is_active",
        width: 100,
        sortable: false,
        align: "center",
      },
      { text: "AKSI", value: "id", width: 100 },
    ],

    form: {
      edit: false,
    },

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
      dataUrl: "api/jalur-pendaftaran",
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
      this.form.edit = true;
      this.postEdit(val);
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
        this.path = "";
        this.form.edit = false;
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
