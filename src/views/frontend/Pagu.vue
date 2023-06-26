<template>
  <PaguComponent />
</template>

<script>
import { mapState, mapActions } from "vuex";
import PaguComponent from "../frontend/components/PaguComponent.vue";

export default {
  name: "pagu",
  components: { PaguComponent },
  data: () => ({}),
  mounted() {
    this.setPage({
      crud: true,
    }).then(() => {
      this.getAppInfo().then(() => {
        this.getAppInfo().then(() => {
          window.document.title = this.info.company;
          const favicon = window.document.getElementById("favicon");
          favicon.href = this.info.apps_logo;
        });
      });
    });
  },
  computed: {
    ...mapState(["device", "theme", "info"]),
  },
  methods: {
    ...mapActions(["setPage", "getAppInfo", ""]),
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