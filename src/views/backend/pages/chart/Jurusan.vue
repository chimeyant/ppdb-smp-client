<script>
import { Pie } from "vue-chartjs";
import { mapActions, mapState } from "vuex";

export default {
  extends: Pie,
  data: () => ({
    jmll: 0,
    jmlp: 0,
    data: [],
  }),
  computed: {
    ...mapState(["http"]),
  },
  created() {
    this.fetchdata();
  },
  mounted() {
    this.fetchdata();
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient3 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient4 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient5 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient6 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient7 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient8 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient9 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient10 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(0, 0,255, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(0, 0, 255, 0.25)");

    this.gradient2.addColorStop(0, "rgba(0, 128, 0, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 128, 0, 0.25)");

    this.gradient3.addColorStop(0, "rgba(0, 128, 128, 0.9)");
    this.gradient3.addColorStop(0.5, "rgba(0, 128,128, 0.25)");

    this.gradient4.addColorStop(0, "rgba(0, 255, 0, 0.9)");
    this.gradient4.addColorStop(0.5, "rgba(0,255, 0, 0.25)");

    this.gradient5.addColorStop(0, "rgba(0, 255, 255, 0.9)");
    this.gradient5.addColorStop(0.5, "rgba(0,255, 255, 0.25)");

    this.gradient6.addColorStop(0, "rgba(128, 0, 0, 0.9)");
    this.gradient6.addColorStop(0.5, "rgba(128,0, 0, 0.25)");

    this.gradient7.addColorStop(0, "rgba(128, 0, 128, 0.9)");
    this.gradient7.addColorStop(0.5, "rgba(128,0, 128, 0.25)");

    this.gradient8.addColorStop(0, "rgba(128, 128, 0, 0.9)");
    this.gradient8.addColorStop(0.5, "rgba(128,128, 0, 0.25)");

    this.gradient9.addColorStop(0, "rgba(128, 128, 128, 0.9)");
    this.gradient9.addColorStop(0.5, "rgba(128,128, 128, 0.25)");

    this.gradient10.addColorStop(0, "rgba(192, 192, 192, 0.9)");
    this.gradient10.addColorStop(0.5, "rgba(192,192, 192, 0.25)");
  },
  methods: {
    fetchdata: async function () {
      try {
        let {
          data: { labels, datas },
        } = await this.http.get("api/dashboard-perjurusan");

        this.data = datas;
        this.renderChart(
          {
            labels: labels,
            datasets: [
              {
                backgroundColor: [
                  this.gradient,
                  this.gradient2,
                  this.gradient3,
                  this.gradient4,
                  this.gradient5,
                  this.gradient6,
                  this.gradient7,
                  this.gradient8,
                  this.gradient9,
                  this.gradient10,
                  "#00D8FF",
                ],
                data: this.data,
              },
            ],
          },
          {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              position: "bottom",
            },
          }
        );
      } catch (error) {}
    },
  },
};
</script>