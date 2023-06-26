import { mapActions, mapState } from "vuex";

export const baseMixins = {
  computed: {
    ...mapState(["upload"]),
  },

  methods: {
    ...mapActions(["initUploadLibrary"]),
  },

  mounted() {
    this.initUploadLibrary({
      baseEndpoint: "http://127.0.0.1:3333/api/media",
      //baseEndpoint: "https://api.ppdb.antsoftmedia.com/api/media",
    });
  },
};
