<template>
  <v-container class="pt-15">
    <v-row>
      <v-col cols="12">
        <v-row class="flex-column align-content-center">
          <h2 class="intro-text">Selamat Datang Di PPDB SMP</h2>
          <h2 class="
        intro-subtitle">{{info.company}}</h2>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        class="mt-11 mb-11"
      >
        <v-row class="justify-center">
          <v-btn
            outlined
            color="green"
            @click="$router.push('registrasi')"
            v-show="info.apps_pendaftaran"
          >REGISTRASI SEKARANG</v-btn>
        </v-row>
      </v-col>

      <v-col cols="
            6">
        <v-row justify="center">
          <img
            src="images/siswa_smp_cewe.png"
            alt=""
            width="30%"
            srcset=""
          >

        </v-row>
      </v-col>
      <v-col cols="6">
        <v-row class="justify-center">

          <img
            src="images/siswa_smp_laki.png"
            alt=""
            width="35%"
            srcset=""
          >
        </v-row>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "HeroCommponent",
  data: () => ({}),
  mounted() {},
  computed: {
    ...mapState(["device", "theme", "info"]),
  },
  methods: {},
  watch: {},
};
</script>

<style>
h2.intro-text {
  font-size: 40px;
  font-weight: 800;
  font-family: initial;
  color: black;
  text-align: center;
}

.content-header.col-lg-12.col {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: center; */
  padding: 0px;
  gap: 188px;
}

h2.intro-subtitle {
  font-size: 30px;
  font-weight: 200;
  text-align: center;
}
</style>