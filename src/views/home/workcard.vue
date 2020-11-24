<template>
  <v-card
    :elevation="0"
    class="flex-container pa-2"
    @click="showPatientDetail(item)"
  >
    <div class="flex-img">
      <v-avatar>
        <v-img
          :src="url + 'upload/' + item.photographPath"
          lazy-src="./../../../public/static/noImage.png"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="500"
          max-height="500"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-avatar>
    </div>
    <div class="flex-content">
      <ul>
        <li>
          <span class="right-time">{{
            item.startTime | date('%Y-%m-%d %T')
          }}</span>
          <span class="patient-name">{{ item.patientName }}</span>
        </li>
        <li>放疗号：{{ item.radiotherapyNum }}</li>
        <li>
          治疗医师：{{ ChiefDoctorsForRead(item.chiefDoctorId) }} 状态：{{
            item.state
          }}
        </li>
        <v-divider dark></v-divider>
      </ul>
      <!-- <div class="flex-content-top">
          <div class="flex-content-top-name">{{item.patientName}}</div>
          <div class="flex-content-top-time">{{item.birthDay}} 11:12:52</div>
        </div>
      <div class="flex-content-bottom">扫描部位：头颅 设备：CTSIM 技师：刘三好</div>-->
    </div>
  </v-card>
</template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Util from '@/lib/util';
import url from '@/lib/url';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import moment from 'moment';

@Component({
  components: {},
})
export default class workCard extends AbpBase {
  @Prop() item: any;
  @Prop({type: String}) cardName: String;
  @Prop({default: 'reviewTargetingApplication'}) subText: string;
  get url() {
    return url;
  }
  get ChiefDoctors() {
    return this.$store.state.patient.chiefDoctors;
  }
  ChiefDoctorsForRead(id) {
    if (this.ChiefDoctors && this.ChiefDoctors.length) {
      let readItem = (this.ChiefDoctors as any).filter(
        item => item.value === id
      );
      if (readItem.length) {
        return readItem[0].text;
      }
    }
  }

  showpatientResource() {
    this.$router.push({
      name: 'patientTreatmentList',
    });
  }

  showMoreReviewTargetingApplication() {
    this.$store.commit(
      'targetResource/setRouterName',
      'reviewTargetingApplication'
    );
    this.$router.push({
      name: 'moreTargetApplication',
    });
  }
  showMoreReviewPlanApplication() {
    this.$store.commit('targetResource/setRouterName', 'planApplication');
    this.$router.push({
      name: 'morePlanApplication',
    });
  }
  showMoreApprovePlan() {
    this.$store.commit('targetResource/setRouterName', 'approvePlan');
    this.$router.push({
      name: 'moreApprovePlan',
    });
  }
  showMoreApprovaltTreatment() {
    this.$store.commit('targetResource/setRouterName', 'approvaltTreatment');
    this.$router.push({
      name: 'moreApprovaltTreatment',
    });
  }
  showMoreExamineLocationResult() {
    this.$store.commit('targetResource/setRouterName', 'examineLocationResult');
    this.$router.push({
      name: 'moreExamineLocationResult',
    });
  }

  //申请定位
  async showHistoryPatientPosition(id, radiotherapyNum) {
    let success = await this.$store.dispatch({
      type: 'patientResource/getDiagnosisInfoAndListDto',
      data: {radiotherapyNum: radiotherapyNum},
    });
    if (success) {
      let success = await this.$store.dispatch({
        type: 'targetingApplication/persionListQueryAsync',
        data: {radiotherapyNum: radiotherapyNum, LocationId: id},
      });
      if (success) {
        this.$router.push({
          name: 'creatTargetingApplication',
        });
      }
    }
  }
  //申请计划
  async showHistoryPatientPlan(id, radiotherapyNum) {
    let success = await this.$store.dispatch({
      type: 'patientResource/getDiagnosisInfoAndListDto',
      data: {radiotherapyNum: radiotherapyNum},
    });
    if (success) {
      let success = await this.$store.dispatch('planApplication/getPlanOrder', {
        RadiotherapyNum: radiotherapyNum,
        Id: id,
      });

      if (success) {
        this.$router.push({
          name: 'historyPlanApplication',
        });
      }
    }
  }

  showPatientDetail(item) {
    this.$store.commit('targetResource/setCurrentColor', '#4dc9a875');
    switch (this.subText) {
      case 'locationCtismList':
        this.showHistoryPatientPosition(-1, item.radiotherapyNum);
        break;
      case 'planOrderList':
        this.showHistoryPatientPlan(-1, item.radiotherapyNum);
        break;
      case 'reviewTargetingApplication':
        this.showTarget(item.id, item.radiotherapyNum);
        break;
      case 'planApplication':
        this.showPlan(item.id, item.radiotherapyNum);
        break;
      case 'examineLocationResult':
        this.showExamineLocationResult(item.id, item.radiotherapyNum);
        break;
      case 'approvePlan':
        this.showApprovePlan(item.id, item.radiotherapyNum);
        break;
      case 'approvaltTreatment':
        this.showApprovaltTreatment(item.id, item.radiotherapyNum);
        break;
      case 'scheduleList':
        this.showSchedule(item.id, item.radiotherapyNum);
        break;
      case 'appointmentList':
        this.showAppointment(item.id, item.radiotherapyNum);
        break;
    }
  }
  showTarget(id, radiotherapyNum) {
    // this.$store.commit("targetResource/setRouterName", this.subText);
    this.$store.dispatch('targetResource/getExaminePatientListQueryAsync', {
      id: id,
      radiotherapyNum: radiotherapyNum,
    });

    this.$router.push({
      name: this.subText,
    });
  }

  showPlan(id, radiotherapyNum) {
    this.$store.dispatch('targetResource/getPlanOrder', {
      id: id,
      radiotherapyNum: radiotherapyNum,
    });

    this.$router.push({
      name: this.subText,
    });
  }

  showExamineLocationResult(id, radiotherapyNum) {
    this.$store.dispatch('targetResource/getExamineResultQueryAsync', {
      LocationId: id,
      RadiotherapyNum: radiotherapyNum,
    });
    this.$router.push({
      name: this.subText,
    });
  }

  showApprovePlan(id, radiotherapyNum) {
    this.$store.dispatch('targetResource/getApprovingPlanInfoAsync', {
      id: id,
      radiotherapyNum: radiotherapyNum,
    });
    // this.$store.commit("targetResource/setRouterName", this.subText);
    // 临时 待修改
    this.$store.commit('targetResource/test', {
      id: id,
      radiotherapyNum: radiotherapyNum,
    });

    this.$router.push({
      name: this.subText,
    });
  }

  showApprovaltTreatment(id, radiotherapyNum) {
    // this.$store.commit("targetResource/setRouterName", this.cardName);
    // this.$store.dispatch("targetResource/getPlanOrder", {
    //   id: id,
    //   radiotherapyNum: radiotherapyNum
    // });

    this.$store.dispatch('targetResource/getApprovedTreatmentInfoAsync', {
      id: id,
      radiotherapyNum: radiotherapyNum,
    });
    // this.$store.commit("targetResource/setRouterName", this.subText);
    this.$store.commit('targetResource/test', {
      id: id,
      radiotherapyNum: radiotherapyNum,
    });
    this.$router.push({
      name: this.subText,
    });
  }

  showSchedule(id, radiotherapyNum) {
    this.$router.push({
      name: 'scheduleTable',
      params: {
        sessionId: id,
        radiotherapyNum: radiotherapyNum,
        type: '0',
      },
    });
  }

  showAppointment(id, radiotherapyNum) {
    this.$router.push({
      name: 'arrangementTable',
      params: {
        SessionId: id,
        RadiotherapyNum: radiotherapyNum,
        type: '0',
      },
    });
  }
}
</script>

<style scoped lang="less">
.flex-container {
  display: -webkit-flex;
  display: flex;
  color: #90a4ae;
  font-size: 12px;
}

.flex-img {
  width: 60px;
  height: 60px;
  margin: 10px 0px 0px 0px;
}

.flex-content {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 80%;
  height: 100%;
  font-weight: normal;
  color: #e0dfdf;
  line-height: 200%;
}
.flex-content ul {
  list-style: none;
  margin: 0px;
}

.flex-content span.patient-name {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.flex-content span.right-time {
  float: right;
  padding-right: 30px;
  font-size: 12px;
}

/* .flex-content-top {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  width: 100%;
}

.flex-content-top-name {
  width: 50%;  
  color: #115581;
  font-weight: bold;
}
.flex-content-top-time {
  width: 50%;
  height: 100%;
}

.flex-content-bottom {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  width: 100%;  
} */
</style>
