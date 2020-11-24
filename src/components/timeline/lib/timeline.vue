<template>
  <material-list-card color="#4dc9a875" :showMordBtn="false" title="入院指南">
    <div id="hzqing" ref="timeline">
      <div class="timeline">
        <div
          class="timeline-row"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="timeline-img">
            <Avatar
              style="border-radius: 50%; background: pink;"
              :src="item.img"
              size="large"
            ></Avatar>
          </div>
          <div class="timeline-content shaky">
            <div class="content-body">
              <v-img :src="'../../img/icons/' + item.doctorImg"></v-img>
              <div>
                <b>{{ item.title }}</b>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </material-list-card>
</template>

<script>
import {parseTime} from '../utils/index';

export default {
  name: 'timeline',
  components: {},
  data() {
    let self = this;
    return {
      timeItemList: [],
    };
  },
  props: {
    dataList: {
      type: Array,
      default: self.timeItemList,
    },
    timelineColor: {
      // 组建背景颜色
      type: String,
      default: '#fff',
    },
    timeContentColor: {
      type: String,
      default: '#F7F7F7',
    },
  },
  filters: {
    formatDate(time) {
      return parseTime(time, '{y}年{m}月{d}');
    },
  },
  mounted() {
    const timeline = this.$refs.timeline;
    timeline.style.setProperty('--timelineColor', this.timelineColor);
    timeline.style.setProperty('--timeContentColor', this.timeContentColor);
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
div::-webkit-scrollbar {
  width: 0px;
}

#hzqing {
  list-style: none;
  position: relative;
  padding: 10px;
  height: calc(65vh);
  overflow: scroll;
  font-family: '微软雅黑', Arial, Helvetica, sans-serif;
  .timeline-row {
    padding-left: 50%;
    z-index: 10;
    height: 100%;
    position: relative;
    .timeline-time {
      position: absolute;
      right: 50%;
      text-align: right;
      margin-right: 60px;
      font-size: 17px;
      line-height: 35px;
      top: 40px;
    }
    .timeline-img {
      position: absolute;
      top: 30px;
      left: 46%;
      margin-left: -15px;
      width: 60px;
      height: 60px;
      text-align: center;
      overflow: hidden;
      padding: 3px;
      font-size: 14px;
      z-index: 100;
    }
    .timeline-content {
      position: relative;
      background: rgba(0, 0, 0, 0);
      color: #ffffff;
      border-radius: 5px;
      border: 1px #dcdee2 solid;

      margin-right: 0px;
      margin-left: 60px;
      margin-bottom: 20px;
      min-height: 80px;
      .content-body {
        padding: 15px 15px 2px;
        position: relative;
        z-index: 10;
        b {
          font-size: 16px;
          margin-bottom: 12px;
          margin-top: 0;
          line-height: 15px;
          font-weight: 600;
        }
        p {
          margin: 0px 0px 15px;
        }
      }
    }
    // .timeline-content:after {
    //   content: '';
    //   position: absolute;
    //   top: 50px;
    //   left: -60px;
    //   height: 4px;
    //   width: 60px;
    //   background-color: #4dc9a875;
    //   z-index: -1;
    // }
  }
  .timeline-row:nth-child(odd) {
    // 奇数样式
    padding-left: 0;
    padding-right: 50%;
    .timeline-time {
      right: auto;
      left: 50%;
      text-align: left;
      margin-right: 0;
      margin-left: 60px;
    }
    .timeline-content {
      margin-right: 60px;
      margin-left: 0px;
    }
    // .timeline-content:after {
    //   left: auto;
    //   right: -60px;
    // }
  }
  @media screen and (max-width: 1200px) {
    .timeline {
      .timeline-row {
        position: relative;
        right: auto;
        top: 0;
        margin: 0 0 6px 56px;
        padding: 0;
        margin-bottom: 16px;
      }
      .timeline-row:nth-child(odd) {
        padding-right: 0;
        .timeline-content {
          margin-right: 0px;
          margin-left: 40px;
        }
        .timeline-time {
          position: relative;
          right: auto;
          left: auto;
          top: 0;
          text-align: left;
          margin: 0 0 0px 40px;
        }
      }
      .timeline-img {
        top: 10px;
        left: -55px;
        margin-left: 0;
        padding: 0px;
      }
      .timeline-time {
        position: relative;
        right: auto;
        left: auto;
        top: 0;
        text-align: left;
        font-size: 15px;
        margin: 0 0 0px 40px;
      }
      .timeline-content {
        margin-left: 40px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        position: relative;
      }
      .timeline-content:after {
        right: auto !important;
        left: -65px !important;
        top: 30px;
      }
    }
    .timeline:after {
      left: 50px;
    }
  }
}

.timeline:after {
  content: '';
  position: absolute;
  top: 60px;
  left: 50%;
  background-color: #4dc9a875;
  height: 1100px;
  width: 4px;
  border-radius: 2px;
  margin-left: -2px;
  display: block;
}


</style>
