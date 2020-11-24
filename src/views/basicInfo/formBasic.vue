<template>
  <v-container py-0>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          dark
          class="purple-input pa-0"
          label="姓名"
          disabled
          v-model="patient.patientName"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field dark class="purple-input pa-0" label="性别" disabled v-model="sex" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field dark label="年龄" class="purple-input pa-0" disabled v-model="patient.age" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          dark
          label="放疗号"
          class="purple-input pa-0"
          disabled
          v-model="patient.radiotherapyNum"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          dark
          label="病历号"
          class="purple-input pa-0"
          disabled
          v-model="patient.clinicPatientId"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          dark
          label="病区"
          class="purple-input pa-0"
          disabled
          v-model="patient.inpatientArea"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          dark
          label="联系方式"
          class="purple-input pa-0"
          disabled
          v-model="patient.phoneNumber"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          dark
          label="临床诊断"
          class="purple-input pa-0"
          disabled
          v-model="patient.ClinicalDiagnosis"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          dark
          class="purple-input pa-0"
          label="住院号"
          type="number"
          disabled
          v-model="patient.clinicPatientId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
  Emit,
  Watch,
  Model
} from "vue-property-decorator";
import AbpBase from "@/lib/abpbase";
import Patient from "../../store/entities/patientTreatment/headerPatientInfo";

@Component
export default class FormBasic extends AbpBase {
  @Prop() private patient: Patient;
    get sex() {
    return this.patient.sex == 0 ? "男" : "女";
  }
}
</script>
