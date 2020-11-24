<template>
  <material-card light :color="color" class="v-card-profile">
    <v-avatar slot="offset" class="mx-auto d-block" size="130">
      <v-img :src="url + 'upload/' + patient.photographPath"></v-img>
    </v-avatar>
    <v-card-text class="text-xs-center">
      <h6 class="category text-gray font-weight-thin mb-3">当前患者</h6>
      <h4 class="card-title font-weight-light">
        <v-text-field
          dark
          label="姓名"
          class="purple-input py-0"
          disabled
          v-model="patient.patientName"
        />
      </h4>
      <p class="card-description font-weight-light">
        <v-row>
          <v-col md="3">
            <v-text-field
              label="年龄"
              dark
              class="purple-input py-0"
              disabled
              v-model="patient.age"
            />
          </v-col>

          <v-col md="3">
            <v-text-field
              label="性别"
              dark
              class="purple-input py-0"
              disabled
              v-model="sex"
            />
          </v-col>
          <v-col md="6">
            <v-text-field
              label="生日"
              dark
              class="purple-input py-0"
              disabled
              v-model="birthDay"
            ></v-text-field>
          </v-col>
          <v-col md="4">
            <v-text-field
              label="病区"
              dark
              class="purple-input py-0"
              disabled
              v-model="patient.inpatientArea"
            />
          </v-col>
          <v-col md="8">
            <v-text-field
              label="放疗号"
              dark
              class="purple-input py-0"
              disabled
              v-model="patient.radiotherapyNum"
            />
          </v-col>
        </v-row>
      </p>
      <!-- <v-btn color="#4dc9a875" round class="font-weight-light">点击查询</v-btn> -->
    </v-card-text>
  </material-card>
</template>

<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import url from '@/lib/url';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import moment from 'moment';
import Patient from '../../../store/entities/review/approvePlan/patient';

@Component({
  components: {},
})
export default class currentPatientCard extends AbpBase {
  @Prop({type: Object}) patient: Patient;
  @Prop({type: String}) color: String;
  get url() {
    return url;
  }
  get sex() {
    return this.patient.sex == '0' ? '男' : '女';
  }

  get birthDay() {
    return moment(this.patient.birthDay).format('YYYY-DD-MM');
  }

  data() {
    return {};
  }
}
</script>

<style scoped>
.patient-info {
  display: flex;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 100%;
}
.patient-info-item {
  height: 120px;
  width: 50%;
  padding: 0 60px;
}
.patient-info-item-text {
  height: 140px;
  width: 50%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  color: #999eaa;
  font-family: '仿宋';
  font-size: 16px;
}

.patient-info-item-text .name {
  font-size: 22px;
  color: #17233d;
  margin-bottom: 5px;
}

.card-description > span {
  margin-right: 5px;
}
</style>
