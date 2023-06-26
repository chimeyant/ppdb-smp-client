<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">work</v-icon>
      <v-subheader class="text-h6">
        <h4>KELOLA BUTIR SOAL</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Daftar Seluruh Butir Soal Yang Tersedia</div>
    </v-flex>

    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title class="flex flex-row-reverse blue darken-2">
            <v-btn icon @click="$router.push({ name: 'ujian-master-soal' })"
              ><v-icon color="white">highlight_off</v-icon></v-btn
            >
            <v-btn icon @click="openAddNew"
              ><v-icon color="white">add_circle</v-icon></v-btn
            >
            <v-btn icon @click="fetchRecords(this.record)"
              ><v-icon color="white">autorenew</v-icon></v-btn
            >
            <v-spacer></v-spacer>
            <v-col cols="4">
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

            <template v-slot:item.soal="{ value }">
              <p v-html="value"></p>
            </template>
            <template v-slot:item.jawaban="{ value }">
              <v-chip small :color="value == 'A' ? 'green' : 'grey'">A</v-chip
              >&nbsp;
              <v-chip small :color="value == 'B' ? 'green' : 'grey'">B</v-chip
              >&nbsp;
              <v-chip small :color="value == 'C' ? 'green' : 'grey'">C</v-chip
              >&nbsp;
              <v-chip small :color="value == 'D' ? 'green' : 'grey'">D</v-chip
              >&nbsp;
              <v-chip small :color="value == 'E' ? 'green' : 'grey'">E</v-chip
              >&nbsp;
            </template>
            <template v-slot:item.status="{ value }">
              <v-icon
                small
                :color="value == true ? 'green' : 'red'"
                v-show="true"
                >calendar_today</v-icon
              >
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

      { text: "SOAL", value: "soal" },
      { text: "JAWABAN", value: "jawaban" },

      { text: "OPSI", value: "id" },
    ],

    search: null,
    form: {
      addnew: false,
      edit: false,
    },
    master_soal_id: null,
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
      dataUrl: "api/master-soal-detail/" + this.$route.params.id,
    });
    this.master_soal_id = this.$route.params.id;
    this.record.master_soal_id = this.$route.params.id;

    this.fetchRecords(this.record);
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setPage",
      "postAddNew",
      "postUpdate",
      "postEdit",
      "fetchRecords",
      "postConfirmDelete",
    ]),

    openAddNew: function () {
      this.$router.push({
        name: "ujian-master-soal-detail-create",
        params: { master_soal_id: this.master_soal_id },
      });
    },
    closeAddNew: function () {
      this.event.update = false;
      this.form.addnew = false;
    },

    editRecord: function (val) {
      this.$router.push({
        name: "ujian-master-soal-detail-edit",
        params: { master_soal_id: this.master_soal_id, id: val },
      });
    },

    postDeleteRecord: function (val) {
      this.postConfirmDelete(val);
    },
  },
};
</script>
