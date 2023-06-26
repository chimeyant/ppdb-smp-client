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

    this.gradient.addColorStop(0, "rgba(128, 128,128, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(128, 128, 128, 0.25)");

    this.gradient2.addColorStop(0, "rgba(255, 0, 0, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");

    this.gradient3.addColorStop(0, "rgba(255, 255, 0, 0.9)");
    this.gradient3.addColorStop(0.5, "rgba(255, 255, 0, 0.25)");

    this.gradient4.addColorStop(0, "rgba(0, 255, 0, 0.9)");
    this.gradient4.addColorStop(0.5, "rgba(0, 255, 0, 0.25)");
  },
  methods: {
    fetchdata: async function () {
      try {
        let {
          data: { labels, datas },
        } = await this.http.get("api/dashboard-perstatus");

        this.data = datas;
        this.renderChart(
          {
            labels: labels,
            datasets: [
              {
                backgroundColor: [
                  this.gradient,
                  this.gradient3,
                  this.gradient2,
                  this.gradient4,
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