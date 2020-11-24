<template>
  <Card dis-hover :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="left-area" :style="{background: '#fff', width: leftWidth}">
        <!-- <common-icon class="icon" :type="icon" :color="color" :size="iconSize" /> -->
        <img style="margin-top:50px" height="72px" width="72px" src="../../../public/img/icon1.png" />
      </div>
      <div class="right-area" :style="{width: rightWidth}">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
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
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
.right-area-content{
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
