<template>
  <div class="section-footer">
    <v-container>
      <v-row>
        <v-col :cols="device.desktop ? `6`:`12`">
          <div class="footer-title">{{info.company}}</div>
          <div class="address">{{info.alamat}}</div>
        </v-col>
        <v-col :cols="device.desktop ? `3`:`12`">
          <div class="konten-kontak">
            <div class="kontak">Kontak</div>
            <div class="kontak-item">
              <v-icon color="blue">mdi-phone</v-icon>&nbsp; {{ info.telepon }}
            </div>
          </div>
        </v-col>
        <v-col :cols="device.desktop ? `3`:`12`">
          <div class="sosial-media">Sosial Media</div>
          <div class="sosial-media-item">
            <v-icon color="blue">mdi-facebook</v-icon>&nbsp;Facebook
          </div>
          <div class="sosial-media-item">
            <v-icon color="pink">mdi-instagram</v-icon>&nbsp;Instagram
          </div>
        </v-col>

      </v-row>
      <v-row>
        <v-col
          cols="12"
          class="copyright"
        >
          Copyright &copy;2020-2022
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FooterComponent",
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
.footer-title {
  font-size: 20px;
  font-weight: 600;
}
.copyright.col.col-12 {
  font-size: 8pt;
  color: grey;
}
.address {
  font-size: 10pt;
  font-family: none;
  font-weight: 200;
}
.kontak {
  margin-bottom: 5px;
}
.kontak-item {
  font-size: 14px;
  color: grey;
  padding: 2px;
}
.sosial-media {
  margin-bottom: 5px;
}
.sosial-media-item {
  font-size: 14px;
  color: grey;
  padding: 2px;
}
</style>