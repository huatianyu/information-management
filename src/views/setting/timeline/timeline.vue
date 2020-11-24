<template>
  <div>
    <Card dis-hover>
      <timeline timelineColor="#fff" timeContentColor="#fff" :dataList="data"></timeline>
    </Card>
  </div>
</template>

<script>

// import { parseTime } from '@/components/timeline/hzqing-vue-timeline.vue'
import timeline from "@/components/timeline/lib/timeline";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
          components: {
      hzqingVueTimeline
    },
      data: [
        {
          time: 1522372393000,
          img: "img/icons/state1.png",
          patienTimg: "img/icons/state1.png",
          title: "张三丰",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: true
        },
        {
          time: "2018-03-30 14:36:35",
          img: "img/icons/state2.png",
          patienTimg: "img/icons/state1.png",

          title: "标题",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: true
        },
        {
          time: 1522372393000,
          img: "img/icons/state3.png",
          patienTimg: "img/icons/state1.png",

          title: "标题",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: false
        },
        {
          time: 1522372393000,
          img: "img/icons/state4.png",
          patienTimg: "img/icons/state1.png",

          title: "标题",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: false
        },
        {
          time: 1522372393000,
          img: "img/icons/state5.png",
          patienTimg: "img/icons/state1.png",

          title: "标题",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: true
        }
      ]
    };
  }
};
</script>

