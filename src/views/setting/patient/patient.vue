<template>
  <div class="form-height">
    <v-row class="purple-input px-7">
      <v-col sm="12" md="12" xl="3" lg="3" cols="12">
        <Affix :offset-top="100">
          <timeline :dataList="data"></timeline>
        </Affix>
      </v-col>
      <v-col sm="12" md="12" xl="9" lg="9" cols="12">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";
import headerBtn from "./headerBtn.vue";
import patientSearchItem from "./../../customize/patientSearchItem.vue";
import timeline from "@/components/timeline/lib/timeline.vue";
import registration from "./registration.vue";

class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null;
  from: Date;
  to: Date;
}

@Component({
  components: { headerBtn, patientSearchItem, timeline, registration }
})
export default class Patients extends AbpBase {
  data() {
    return {
      components: {
        timeline
      },
      data: [
        {
          img: "img/icons/state1.png",
          doctorImg: "dengji.jpg",
          title: "患者登记",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: true
        },
        {
          time: "2018-03-30 14:36:35",
          img: "img/icons/state2.png",
          doctorImg: "jiezhen.jpg",
          title: "接诊",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: true
        },
        {
          img: "img/icons/state3.png",
          doctorImg: "shenhe.jpg",
          title: "审核批准",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: false
        },
        {
          img: "img/icons/state4.png",
          doctorImg: "paicheng.png",
          title: "排程",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: false
        },
        {
          img: "img/icons/state5.png",
          doctorImg: "yuyue.jpg",
          title: "预约",
          content: "放疗信息管理系统中患者阶段信息",
          icon: "放疗信息管理系统中患者阶段信息",
          isShow: true
        }
      ]
    };
  }
}
</script>


<style lang="scss"  scoped>
.header-btn {
  display: flex;
}

.form-height {
  height: 100%;

}
</style>










