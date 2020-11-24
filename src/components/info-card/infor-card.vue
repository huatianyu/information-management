<template>
  <material-stats-card
    :color=" !heightLight ?color :'green'"
    :icon="icon"
    :title="title"
    :value="value"
  ></material-stats-card>
</template>

<script>
import CommonIcon from "@/components/common-icon";
export default {
  name: "InforCard",
  components: {
    CommonIcon
  },
  props: {
    left: {
      type: Number,
      default: 36
    },

    color: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    },
    heightLight: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    show1() {
      return this.icon === "logo-apple";
    },
    show2() {
      return this.icon === "ios-people";
    },

    leftWidth() {
      return `${this.left}%`;
    },
    rightWidth() {
      return `${100 - this.left}%`;
    }
  }
};
</script>

<style lang="less">
.common {
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size {
  width: 100%;
  height: 100%;
}
.middle-center {
  display: table-cell;
  vertical-align: middle;
}
.right-area-content {
  padding-right: 30px;
  text-align: right;
}
.info-card-wrapper {
  .size;
  overflow: hidden;
  .ivu-card-body {
    .size;
  }
  .content-con {
    .size;
    position: relative;
    .left-area {
      .common;
      & > .icon {
        .middle-center;
      }
    }
    .right-area {
      .common;
      & > div {
        .right-area-content;

        .middle-center;
      }
    }
  }
}
</style>
