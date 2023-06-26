<template>
  <v-row
    class="justify-center justify-content-center"
    style="height:200px;padding-top: 50px ;"
  >
    <v-col cols="12">
      <v-row class="justify-center">
        <div style="font-size: 18px;font-weight:800 ;">

          Sebelum mendaftar diri sebagai peserta PPDB silahkan membuat akun terlebih dahulu
        </div>
      </v-row>

    </v-col>
    <div>
      <v-btn
        class="blue"
        dark
        large
        outlined
        @click="$router.push({ name: 'registrasi' })"
      >
        DAFTAR SEKARANG
      </v-btn>
    </div>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HomeRegisterVue",
  mounted() {
    this.setPage({
      crud: false,
    });
  },
  computed: {
    ...mapState(["http", "info", "device"]),
  },
  methods: {
    ...mapActions(["setPage"]),
    fetchSlider: async function () {
      try {
        let { data } = await this.http("sliders");
        this.sliders = data;
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>