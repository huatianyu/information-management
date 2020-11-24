<template >
  <div class="form-height">
    <v-row class="purple-input px-7">
      <v-col xs="12" sm="4" v-if="!md" md="3">
        <Affix>
          <v-row>
            <current-patient-card :patient="leftPatientInfo.patient"></current-patient-card>
          </v-row>
          <v-row>
            <diagnostic-info-card :color="currentColor" :diagnosis="leftPatientInfo.diagnosis"></diagnostic-info-card>
          </v-row>
        </Affix>
      </v-col>
      <v-col xs="12" sm="8" :md="md?12:9">
        <keep-alive>
          <router-view></router-view>
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
import currentPatientCard from "../patientTreatment/currentPatientCard.vue";
import examineLocationResult from "./../review/applicationResult/examineLocationResult.vue";
import reviewTargetingApplication from "./../review/targetApplication/reviewTargetingApplication.vue";
import diagnosticInfoCard from "./../patientTreatment/diagnosticInfoCard.vue";
import planApplication from "./../review/planApplication/planApplication.vue";
import approvePlan from "./../review/approvePlan/approvePlan.vue";
import approvaltTreatment from "./../review/approvaltTreatment/approvaltTreatment.vue";
import diagnosticBlock from "./../patientTreatment/diagnosticBlock.vue";

class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null;
  from: Date;
  to: Date;
}

@Component({
  components: {
    currentPatientCard,
    diagnosticInfoCard,
    examineLocationResult,
    reviewTargetingApplication,
    planApplication,
    approvePlan,
    approvaltTreatment,
    diagnosticBlock
  }
})
export default class TargetResource extends AbpBase {
  get md() {
    return this.$store.state.targetResource.zoom 
  }
  get routerName() {
    return this.$store.state.app.currentPageName;
  }

  get leftPatientInfo() {
    return this.$store.state.targetResource.leftPatientInfo;
  }

  get currentColor() {
    return this.$store.state.targetResource.color;
  }
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










