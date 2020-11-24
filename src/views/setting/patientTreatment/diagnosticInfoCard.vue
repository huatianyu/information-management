<template>
  <material-card :color="color" title="诊断信息" text="诊断信息描述内容">
    <div class="patient-info">
      <div class="patient-info-item-text">
        <v-form
          ref="formValidate"
          :aria-disabled="false"
          :v-text-field-width="80"
        >
          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.hisPatientType"
                disabled
                label="患者类型"
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.ClinicPatientId"
                label="编号"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.inpatientArea"
                label="病区"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                label="房间号"
                v-model="diagnosis.patientDiagnosis.sickRoomNumber"
                disabled
                >101</v-text-field
              >
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.sickBedNumber"
                label="床号"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.payment"
                label="付款方式"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.diseaseType"
                label="病发类型"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.primaryPosition"
                label="原发部位"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.diseasesClassification"
                label="疾病类型"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.clinicalDiagnosis"
                label="临床诊断"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.pathologicalType"
                label="病理类型"
                disabled
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="4">
              <v-text-field
                dark
                v-model="diagnosis.patientDiagnosis.pathologicalDiagnosis"
                label="病理诊断"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="12">
              <div
                v-bind:is="'List'"
                :dataSource="diagnosis.planOrder"
                :isEdit="true"
              ></div>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </div>
  </material-card>
</template>

<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import targetInfoCard from './target//targetInfoCard.vue';
import planInfoCard from './plan/planInfoCard.vue';
import Diagnosis from '../../../store/entities/review/approvePlan/diagnosis';
import List from '../../setting/patientTreatment/plan/List.vue';

@Component({
  components: {targetInfoCard, planInfoCard, List},
})
export default class DiagnosticInfoCard extends AbpBase {
  @Prop({type: String, default: '#4dc9a875'}) color: String;
  @Prop() diagnosis: Diagnosis;
}
</script>

<style scoped>
div::-webkit-scrollbar {
  width: 0px;
}
.patient-info {
  height: 200px;
  overflow: hidden;
  display: flex;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
.patient-info-item {
  height: 120px;
  width: 50%;
  padding: 0 60px;
}
.patient-info-item-text {
  height: 250px;
  overflow: hidden scroll;
  width: 100%;
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
</style>
