<template>
  <div class="form-height">
    <v-row class="purple-input px-7">
      <v-col xs="12" sm="12" md="12" xl="3" lg="3">
        <v-row>
          <current-patient-card :patient="patient"></current-patient-card>
        </v-row>
      </v-col>
      <v-col xs="12" sm="12" md="12" xl="9" lg="9">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import PageRequest from '@/store/entities/page-request';
import headerBtn from '../../setting/patient/headerBtn.vue';
import patientSearchItem from './../../customize/patientSearchItem.vue';
import timeline from '@/components/timeline/lib/timeline.vue';
import registration from '../../setting/patient/registration.vue';
import currentPatientCard from './../patientTreatment/currentPatientCard.vue';
import diagnosticInfoCard from './../patientTreatment/diagnosticInfoCard.vue';
import diagnosticBlock from './../patientTreatment/diagnosticBlock.vue';
import consent from './../patientTreatment/consent/consent.vue';

class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null;
  from: Date;
  to: Date;
}

@Component({
  components: {
    headerBtn,
    patientSearchItem,
    timeline,
    registration,
    currentPatientCard,
    diagnosticInfoCard,
    diagnosticBlock,
    consent,
  },
})
export default class PatientResource extends AbpBase {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      components: {
        timeline,
      },
      data: [
        {
          time: 1522372393000,
          img: 'img/icons/state1.png',
          patienTimg: 'img/touxiang.jpg',
          title: '张三丰',
          content: '性别：男 出生日期：1965/5/8',
          icon: '放疗信息管理系统中患者阶段信息',
          isShow: true,
        },
        {
          time: '2018-03-30 14:36:35',
          img: 'img/icons/state2.png',
          patienTimg: 'img/touxiang.jpg',

          title: '标题',
          content: '放疗信息管理系统中患者阶段信息',
          icon: '放疗信息管理系统中患者阶段信息',
          isShow: true,
        },
        {
          time: 1522372393000,
          img: 'img/icons/state3.png',
          patienTimg: 'img/touxiang.jpg',

          title: '标题',
          content: '放疗信息管理系统中患者阶段信息',
          icon: '放疗信息管理系统中患者阶段信息',
          isShow: false,
        },
        {
          time: 1522372393000,
          img: 'img/icons/state4.png',
          patienTimg: 'img/touxiang.jpg',

          title: '标题',
          content: '放疗信息管理系统中患者阶段信息',
          icon: '放疗信息管理系统中患者阶段信息',
          isShow: false,
        },
        {
          time: 1522372393000,
          img: 'img/icons/state5.png',
          patienTimg: 'img/touxiang.jpg',

          title: '标题',
          content: '放疗信息管理系统中患者阶段信息',
          icon: '放疗信息管理系统中患者阶段信息',
          isShow: true,
        },
      ],
    };
  }

  get patient() {
    return this.$store.state.patientResource.patientInfo;
  }
  // async activated() {

  // }

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (to.params.params) {
  //       vm.formValidate = JSON.parse(to.params.params)["patientDetail"];
  //       localStorage.setItem("planApplication", to.params.params);
  //     }
  //     vm.isEdit = true;
  //     vm.searchBarFixed = false;

  //     //防止刷新页面数据消失
  //     if (from.fullPath === "/") {
  //       vm.formValidate = JSON.parse(localStorage.getItem("planApplication"))[
  //         "patientDetail"
  //       ];
  //     }
  //   });
  // }
}
</script>

<style scoped>
.header-btn {
  display: flex;
}

.form-height {
  height: 100%;
}
</style>
