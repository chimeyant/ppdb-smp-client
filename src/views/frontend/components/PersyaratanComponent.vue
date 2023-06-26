<template>

  <v-container class="mt-10">
    <v-row class="">
      <v-col
        lg="6"
        md="12"
        sm="12"
        xs="12"
        class="hidden-xs-only"
      >
        <v-row class="pesyaratan-image">
          <img
            src="../../../assets/images/Report 1.png"
            alt=""
            srcset=""
            width="90%"
            height="60%"
          >
        </v-row>
      </v-col>
      <v-col
        lg="6"
        md="12"
        sm="12"
        xs="12"
      >
        <v-row class="justify-center">
          <div class="persyaratan-title">Persyaratan Pendaftaran</div>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            v-for="item in persyaratans"
            :key="item.id"
          >
            <div class="pesyaratan-items">{{ item.description}}</div>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "PersyaratanComponent",
  data: () => ({
    persyaratans: [],
  }),
  mounted() {
    this.setPage({
      crud: false,
    }),
      this.fetchPersyaratans();
  },
  computed: {
    ...mapState(["http"]),
  },
  methods: {
    ...mapActions(["setPage"]),
    fetchPersyaratans: async function () {
      try {
        let { data } = await this.http.get("persyaratans");
        this.persyaratans = data;
      } catch (error) {}
    },
  },
};
</script>

<style>
.persyaratan-title {
  font-size: 25px;
  margin-bottom: 50px;
}

.pesyaratan-items {
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24px 32px;
  gap: 8px;

  /* Neutral/ 10 */
  background: #ffffff;
  /* Neutral/ 40 */
  border: 1px solid #e0e0e0;
  border-radius: 7px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  /* Text-base/Regular */
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */

  /* Neutral/ 90 */
  color: #404040;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 1;
}
.row.pesyaratan-image {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.footer-title {
  font-size: 25px;
  font-weight: 500;
}
</style>