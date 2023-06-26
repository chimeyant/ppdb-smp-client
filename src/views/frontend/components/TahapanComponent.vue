<template>
  <div :class="info.slider ? `section-tahapan-with-slider` : `section-tahapan`">
    <v-container class="pl-5 pt-5">
      <v-row class="section-tahapan-title">
        Jadwal Pendaftaran
      </v-row>
      <v-row
        class="white--text mb-3 pb-3"
        v-for="jadwal in jadwals"
        :key="jadwal"
      >
        <v-col cols="4">
          <v-row class="white--text jadwal-label">
            <v-icon
              class="mr-2"
              color="white"
            >mdi-calendar</v-icon>
            <span>{{jadwal.tanggal}}</span>
          </v-row>
          <v-row class="white--text jadwal-label mt-3">

            <span>{{jadwal.title}}</span>
          </v-row>
        </v-col>
        <v-col cols="8">
          {{ jadwal.descriptions }}
        </v-col>

      </v-row>

    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TahapanComponent",
  data: () => ({
    jadwals: [],
  }),
  mounted() {
    this.setPage({
      crud: false,
    });
    this.fetchJadwal();
  },
  computed: {
    ...mapState(["http", "info"]),
  },
  methods: {
    ...mapActions(["setPage"]),
    fetchJadwal: async function () {
      try {
        let { data } = await this.http.get("jadwals");
        this.jadwals = data;
      } catch (error) {}
    },
  },
};
</script>

<style>
.section-tahapan {
  background-color: rgb(78, 65, 196);
  max-width: 100%;
  margin-top: 30px;
}
.section-tahapan-with-slider {
  background-color: rgb(78, 65, 196);
  max-width: 100%;
  margin-top: 0px;
}

.row.section-tahapan-title {
  justify-content: center;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-bottom: 30px;
  margin-top: 20px;
}
.row.white--text.jadwal-label {
  font-size: 15px;
  font-weight: 600;
}
</style>