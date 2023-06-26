<template>
  <daftar-peserta-vue />
</template>

<script>
import { mapState, mapActions } from "vuex";
import DaftarPesertaVue from "./components/DaftarPeserta.vue";
export default {
  name: "DaftarPeserta",
  components: {
    DaftarPesertaVue,
  },
  data: () => ({}),
};
</script>

<style>
</style>