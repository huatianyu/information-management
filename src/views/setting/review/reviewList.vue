<template>
  <div class="form-height">
    <v-row>
      <v-col cols="8">
        <v-tabs dark vertical>
          <v-tab
            v-if="
              reviewList.projectLocationDetailed &&
                reviewList.projectLocationDetailed.length != 0
            "
          >
            <v-icon left>mdi-credit-card-multiple</v-icon>
            定位申请
          </v-tab>
          <v-tab
            v-if="
              reviewList.projectPlanDetailed &&
                reviewList.projectPlanDetailed.length != 0
            "
          >
            <v-icon left>mdi-access-point</v-icon>
            计划申请
          </v-tab>
          <v-tab
            v-if="
              reviewList.approvaltPlanDetailed &&
                reviewList.approvaltPlanDetailed.length != 0
            "
          >
            <v-icon left>mdi-assistant</v-icon>
            批准计划
          </v-tab>
          <v-tab
            v-if="
              reviewList.approvaltTreatment &&
                reviewList.approvaltTreatment.length != 0
            "
          >
            <v-icon left>mdi-package-variant-closed</v-icon>
            批准治疗
          </v-tab>

          <v-tab
            v-if="
              reviewList.examineLocationResult &&
                reviewList.examineLocationResult.length != 0
            "
          >
            <v-icon left>mdi-credit-card-wireless</v-icon>
            定位结果
          </v-tab>
          <v-tab-item
            v-if="
              reviewList.projectLocationDetailed &&
                reviewList.projectLocationDetailed.length != 0
            "
          >
            <material-list-card
              minHeight="400"
              color="#4dc9a875"
              title="审核定位申请单"
              text="待审核定位申请单列表"
              sub-text="reviewTargetingApplication"
              :items="reviewList.projectLocationDetailed"
            />
          </v-tab-item>
          <v-tab-item
            v-if="
              reviewList.projectPlanDetailed &&
                reviewList.projectPlanDetailed.length != 0
            "
          >
            <material-list-card
              minHeight="400"
              color="#4dc9a875"
              title="审核计划申请单"
              text="待审核计划申请单列表"
              sub-text="planApplication"
              :items="reviewList.projectPlanDetailed"
            />
          </v-tab-item>
          <v-tab-item
            v-if="
              reviewList.approvaltPlanDetailed &&
                reviewList.approvaltPlanDetailed.length != 0
            "
          >
            <material-list-card
              minHeight="400"
              color="#4dc9a875"
              title="批准计划"
              text="待批准计划列表"
              sub-text="approvePlan"
              :items="reviewList.approvaltPlanDetailed"
            />
          </v-tab-item>

          <v-tab-item
            v-if="
              reviewList.approvaltTreatment &&
                reviewList.approvaltTreatment.length != 0
            "
          >
            <material-list-card
              minHeight="400"
              color="#4dc9a875"
              title="批准治疗"
              text="待批准治疗列表"
              sub-text="approvaltTreatment"
              :items="reviewList.approvaltTreatment"
            />
          </v-tab-item>

          <v-tab-item
            v-if="
              reviewList.examineLocationResult &&
                reviewList.examineLocationResult.length != 0
            "
          >
            <material-list-card
              minHeight="400"
              color="#4dc9a875"
              title="审核定位结果"
              text="待审核定位结果的列表"
              sub-text="examineLocationResult"
              :items="reviewList.examineLocationResult"
            />
          </v-tab-item>
        </v-tabs> </v-col
    ></v-row>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import AbpBase from '@/lib/abpbase';

@Component({
  components: {},
})
export default class Patients extends AbpBase {
  get reviewList() {
    return this.$store.state.reviewList.reviewList;
  }
  activated() {
    this.$store.dispatch({
      type: 'reviewList/getExamineCountAsync',
      data: {count: '4'},
    });
  }
  get loading() {
    return this.$store.state.reviewList.loading;
  }
  showMore(name) {
    this.$store.commit('targetResource/setRouterName', name);
    this.$router.push({
      name: 'moreTargetApplication',
    });
  }
}
</script>
<style scoped lang="less">
.form-height {
  height: calc(84vh) !important;
  overflow: auto;
  padding: 0px 20px;
}
</style>
