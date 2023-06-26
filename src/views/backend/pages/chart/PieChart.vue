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

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
  },
  methods: {
    fetchdata: async function () {
      try {
        let {
          data: { jmll, jmlp },
        } = await this.http.get("api/dashboard-perjeniskelamin");

        this.data = [jmll, jmlp];

        this.renderChart(
          {
            labels: ["Laki-laki", "Perempuan"],
            datasets: [
              {
                backgroundColor: [this.gradient, this.gradient2, "#00D8FF"],
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