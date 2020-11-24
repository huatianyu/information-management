<template>
  <div class="Clock">
    <strong>{{ time | date('%Y-%m-%d %T')}}</strong>
  </div>
</template>

<script>
import moment from "moment";
import { setInterval } from "timers";
import anime from "animejs";

export default {
  name: "Clock",
  data() {
    return {
      time: "00:00:00",
      day: "",
      dayNumber: "",
      month: "",
      year: ""
    };
  },
  methods: {
    setTime() {
      const m = moment();
      this.time = m;
    },
    clock() {
      anime({
        targets: document.querySelector(".time"),
        opacity: [0, 1],
        duration: 1000,
        easing: "linear"
      });

      this.setTime();

      setInterval(() => {
        this.setTime();
      }, 1000);
    }
  },
  mounted() {
    this.clock();
  }
};
</script>

<style lang="scss">
.Clock {
  color: white;
  width: 260px;
  font-size: 16px;
  font-weight: 300;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
