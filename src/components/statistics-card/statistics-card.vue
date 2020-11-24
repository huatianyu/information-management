<template>
  <material-statistics-card
    :color="!heightLight ? color : '#4dc9a875'"
    :icon="icon"
    :title="title"
    :value="value"
  ></material-statistics-card>
</template>

<script>
import CommonIcon from '@/components/common-icon';
export default {
  name: 'StatisticsCard',
  components: {
    CommonIcon,
  },
  props: {
    left: {
      type: Number,
      default: 36,
    },

    color: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    heightLight: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    show1() {
      return this.icon === 'logo-apple';
    },
    show2() {
      return this.icon === 'ios-people';
    },

    leftWidth() {
      return `${this.left}%`;
    },
    rightWidth() {
      return `${100 - this.left}%`;
    },
  },
};
</script>