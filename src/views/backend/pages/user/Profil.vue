<template>
  <div class="home pa-6">
    <v-flex row class="pb-2">
      <v-icon :color="theme">accessibility</v-icon>
      <v-subheader class="text-h6">
        <h4>PROFIL PENGGUNA</h4>
      </v-subheader>
    </v-flex>
    <v-flex class="pb-5 pl-7">
      <div class="grey--text mb-2">Formulir Profil Pengguna</div>
    </v-flex>

    <v-row class="pa-1">
      <v-spacer></v-spacer>
      <v-col :cols="device.desktop ? `6` : `12`">
        <v-card>
          <v-card-title :class="`white--text ` + theme + ` Plighten-1`"
            >PROFIL PENGGUNA</v-card-title
          >

          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-row class="justify-center">
                  <v-avatar size="150">
                    <v-img
                      :class="[theme + ' lighten-2 with-backdrop']"
                      :aspect-ratio="3 / 4"
                      :src="foto"
                      :lazy-src="foto"
                    >
                      <div
                        class="
                          d-flex
                          flex-column
                          align-center
                          justify-center
                          user-select-none
                        "
                        style="height: 100%"
                      >
                        <div class="pl-14">
                          <v-btn icon dark @click="uploadFoto">
                            <v-icon>photo_camera</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-img>
                  </v-avatar>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-col cols="12">
                  <v-text-field
                    label="Nama Lengkap"
                    :color="theme"
                    v-model="record.username"
                    dense
                    outlined
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="NIP|EMAIL"
                    :color="theme"
                    v-model="record.email"
                    dense
                    outlined
                    disabled
                    :hide-details="device.desktop"
                  ></v-text-field>
                </v-col>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-action class="mt-5">
            <v-divider></v-divider>

            <v-col class="text-right">
              <v-btn outlined :color="theme" @click="fetchUpdate">SIMPAN</v-btn>
            </v-col>
          </v-card-action>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "perusahaan-index",
  data: () => ({
    foto: "/",
  }),
  computed: {
    ...mapState([
      "theme",
      "http",
      "device",
      "records",
      "loading",
      "event",
      "snackbar",
    ]),
  },
  created() {
    this.setPage({
      crud: true,
      dataUrl: "api/",
    });

    this.fetchRecord();
  },
  mounted() {},
  methods: {
    ...mapActions(["setPage", "assignFileBrowse", "getUserInfo"]),
    fetchRecord: async function () {
      let { data } = await this.http.get("api/user-info");

      this.record = data;

      this.foto = data.avatar;
    },
    fetchUpdate: async function () {
      try {
        let {
          data: { status, message, data },
        } = await this.http.post("api/update-profil", this.record);

        if (!status) {
          this.snackbar.color = "red";
          this.snackbar.text = message;
          this.snackbar.state = true;
        }

        this.snackbar.color = "green";
        this.snackbar.text = message;
        this.snackbar.state = true;

        this.record = data;
        this.fetchRecord();
        this.getUserInfo();
      } catch (error) {
        this.snackbar.color = "red";
        this.snackbar.text = error;
        this.snackbar.state = true;
      }
    },

    uploadFoto: function () {
      this.assignFileBrowse({
        fileType: [".jpg", ".jpeg", ".png"],
        query: {
          doctype: "avatar",
        },
        callback: (response) => {
          setTimeout(() => {
            this.foto = response.path;
            this.record.avatar = response.name;
          }, 1000);
        },
      });
    },
  },
  watch: {
    "record.province_id": function () {
      this.fetchKabupatens();
    },
    "record.regency_id": function () {
      this.fetchKecamatans();
    },
    "record.district_id": function () {
      this.fetchDesa();
    },
    "reocrd.pendidikan_id": function () {
      this.fetchJurusan();
    },
  },
};
</script>

<style></style>
