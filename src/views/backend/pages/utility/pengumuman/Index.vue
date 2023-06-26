<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">mic</v-icon>
      <v-subheader class="text-h6">
        <h4>PENGUMUMAN SEKOLAH</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Daftar Seluruh Pengumuman Yang Tersedia</div>
    </v-flex>

    <v-row>
      <v-col col="6">
        <v-card>
          <v-card-title
            :class="`flex flex-row-reverse ` + theme + ` lighten-1`"
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
              dense
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
            <template v-slot:item.status="{ value }">
              <v-icon :color="value ? `green` : `red`">circle</v-icon>
            </template>
            <template v-slot:item.id="{ value }">
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
                    <v-icon color="red" @click="postDeleteRecord(value)"
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
      <v-col col="6">
        <v-card>
          <v-card-title :class="theme + ` lighten-1 white--text`">
            Formulir Manajemen Penguman
          </v-card-title>
          <v-card-subtitle :class="theme + ` lighten-1 white--text`">
            Formulir untuk mendaftarkan/merubah pengumuman
          </v-card-subtitle>
          <v-divider></v-divider>

          <v-card-text>
            <v-row :no-gutters="device.mobile">
              <v-col cols="12">
                <v-text-field
                  label="Judul"
                  :color="theme"
                  hide-details="device.desktop"
                  autocomplete="off"
                  v-model="record.title"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Isi Pengumuman"
                  :color="theme"
                  v-model="record.body"
                  :hide-details="device.desktop"
                >
                  {{ record.body }}
                </v-textarea>
              </v-col>

              <v-col cols="5">
                <v-switch
                  label="Publish"
                  :color="theme"
                  v-model="record.status"
                  :hide-details="device.desktop"
                ></v-switch>
              </v-col>
            </v-row>
          </v-card-text>
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
              color="blue dark-3"
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
        text: "JUDUL",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "PUBLISH", value: "status" },
      { text: "OPSI", value: "id" },
    ],
    status: [
      { text: "Aktif", value: 0 },
      { text: "Non Aktif", value: 1 },
    ],
    authents: [
      { text: "Administrator", value: "administrator" },
      { text: "Peserta", value: "peserta" },
    ],
    search: null,
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
      dataUrl: "api/pengumuman",
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
    ]),
    postAddNewRecord: function () {
      this.postAddNew(this.record).then(() => {
        this.fetchRecords();
      });
    },
    editRecord: function (val) {
      this.postEdit(val);
    },

    postUpdateRecord: function () {
      this.postUpdate(this.record).then(() => {
        this.fetchRecords();
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },
  },
};
</script>
