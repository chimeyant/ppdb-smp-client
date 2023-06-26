<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon>vpn_key</v-icon>
      <v-subheader class="text-h6">
        <h4>GANTI KATA SANDI</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Formulir ganti kata sandi</div>
    </v-flex>

    <v-row>
      <v-spacer v-if="device.desktop"></v-spacer>
      <v-col cols="device.desktop ? 6 : 12">
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="150px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>GANTI KATA SANDI</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <v-text-field
              label="Kata Sandi Baru"
              :color="theme"
              v-model="record.password"
              type="password"
              :hide-details="device.desktop"
            ></v-text-field>
            <v-text-field
              label="Ulang Kata Sandi Baru"
              :color="theme"
              v-model="record.repassword"
              type="password"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn :color="theme" text @click="postChangePassword">
              Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer v-if="device.desktop"></v-spacer>
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
        text: "TINGKAT",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "KETERANGAN", value: "description" },
      { text: "OPSI", value: "id" },
    ],

    search: null,
  }),
  computed: {
    ...mapState(["theme", "http", "device", "record", "snackbar"]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/master-tingkat",
    });
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage"]),
    postChangePassword: async function () {
      try {
        if (this.record.password != this.record.repassword) {
          this.snackbar.color = "red";
          this.snackbar.text = "Opps kata sandi tidak sama";
          this.snackbar.state = true;
          return;
        }
        let {
          data: { status, message },
        } = await this.http.post("api/chngpwd", this.record);

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
          return;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;
        return;
      } catch (error) {}
    },
  },
};
</script>
