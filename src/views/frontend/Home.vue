<template>
  <div>
    <!--section Slider Component-->
    <SliderComponentVue v-show="info.slider" />

    <!--section home regioster-->
    <HomeRegisterVue v-show="info.slider ? info.apps_pendaftaran ? true:false:false" />

    <!--section Hero Component-->

    <HeroCompponent v-show="!info.slider" />
    <!--tahapan section-->
    <TahapanComponent />
    <!--section Persyaratan-->
    <PersyaratanComponent />

    <!--pengumamn-->
    <div class="text-center">
      <v-dialog
        v-model="dialogpengumuman"
        width="500"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Informasi Sekolah
          </v-card-title>

          <v-card-text class="mt-3">
            {{ pengumuman.body }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="theme"
              text
              @click="dialogpengumuman = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HeroCompponent from "./components/HeroCompponent.vue";
import TahapanComponent from "./components/TahapanComponent.vue";
import PersyaratanComponent from "./components/PersyaratanComponent.vue";
import SliderComponentVue from "./components/SliderComponent.vue";
import HomeRegisterVue from "./components/HomeRegister.vue";
export default {
  name: "home",
  data: () => ({
    pengumuman: {},
    dialogpengumuman: false,
  }),
  components: {
    HeroCompponent,
    TahapanComponent,
    PersyaratanComponent,
    SliderComponentVue,
    HomeRegisterVue,
  },
  mounted() {
    this.setPage({
      crud: false,
    });
    this.fetchPengumuman();
  },
  computed: {
    ...mapState(["device", "theme", "info", "http"]),
  },
  methods: {
    ...mapActions(["setPage"]),
    fetchPengumuman: async function () {
      try {
        let { data } = await this.http.get("splash-info");
        this.pengumuman = data;
        if (this.pengumuman) {
          this.dialogpengumuman = true;
        }
      } catch (error) {}
    },
  },
  watch: {},
};
</script>

<style>
.section-footer {
  background-color: #e8e8e8;
  margin-top: 30px;
}
</style>