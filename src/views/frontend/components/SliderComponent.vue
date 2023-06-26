<template>
  <v-row class="justify-center">

    <v-carousel
      cycle
      :height="device.desktop ? `500` : `300`"
      :style="device.desktop ? `width: 100%`: `width:100%`"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in sliders"
        :key="i"
        :src="slide.path"
      >

      </v-carousel-item>
    </v-carousel>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "SliderComponent",
  data: () => ({
    sliders: [],
  }),
  mounted() {
    this.setPage({
      crud: false,
    });
    this.fetchSlider();
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