<template>
  <div class="form-height">
    <material-card
      :color="currentColor"
      title="批准计划"
      :showBackBtn="true"
      text="批准计划内容表单"
    >
      <v-form ref="formValidate">
        <v-container py-0>
          <v-expansion-panels focusable v-model="panel">
            <v-expansion-panel v-for="(plan, index) in formValidate">
              <v-expansion-panel-header disable-icon-rotate>
                <template v-slot:actions>
                  <v-icon
                    v-if="plan.fileState == '已审核'"
                    title="已审核"
                    color="#fff"
                    >mdi-playlist-check</v-icon
                  >
                  <v-icon
                    v-else-if="plan.fileState == '未审核'"
                    title="未审核"
                    color="#fff"
                    >mdi-playlist-edit</v-icon
                  >
                  <v-icon v-else title="未通过" color="red"
                    >mdi-playlist-remove</v-icon
                  >
                </template>
                <v-row>
                  <v-col title="加入对比" class="" cols="1">
                    <v-checkbox
                      @click.stop="checked = !checked"
                      v-model="checked"
                      dark
                      required
                    ></v-checkbox>
                  </v-col>

                  <v-col cols="11">
                    <v-row>
                      <v-col class="font-weight-black" cols="3">
                        <v-label dark>
                          Target Volume:{{ plan.targetVolume }}</v-label
                        >
                      </v-col>
                      <v-col class="font-weight-black" cols="5">
                        <v-label dark>
                          Primary Reference Point:{{
                            plan.primaryReferencePoint
                          }}</v-label
                        >
                      </v-col>
                      <v-col class="font-weight-black" cols="4">
                        <v-label dark>
                          Prescribed Dose Percentage:{{
                            plan.prescribedDosePercentage
                          }}</v-label
                        >
                      </v-col>

                      <v-col class="font-weight-black" cols="5">
                        <v-label dark>
                          PlanNormalization Value:{{
                            plan.planNormalizationValue
                          }}</v-label
                        >
                      </v-col>
                      <v-col class="pa-0 font-weight-black" cols="7">
                        <v-treeview dark :items="treeItems"></v-treeview>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="6">
                    <div :class="`picture  zoomDVH${index}`">
                      <DVH
                        :data="dvhjson(plan.dvhjson)"
                        :OHIFViewerName="`zoomDVH${index}`"
                      ></DVH>
                    </div>
                    <v-btn icon>
                      <v-icon
                        @click="fullScreenClick(`zoomDVH${index}`)"
                        title="全屏"
                        class="my-1"
                      >
                        mdi-arrow-expand-all
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-label dark>文件名:{{ plan.planName }}</v-label>
                  </v-col>
                  <v-col cols="3">
                    <v-label dark
                      >创建时间：{{
                        plan.planBuildTime | date('%Y-%m-%d %T')
                      }}</v-label
                    ></v-col
                  >
                </v-row>
                <v-row class="purple-input px-2">
                  <v-col cols="12" md="12">
                    <v-textarea
                      label="备注"
                      placeholder="输入备注"
                      filled
                      background-color="amber lighten-4"
                      rows="1"
                      class="purple-input pa-0"
                      v-model="plan.remarks"
                    ></v-textarea>
                    <v-btn
                      @click="agree(plan)"
                      :disabled="plan.fileState != '未审核'"
                      color="#4dc9a875"
                      dark
                      >审核通过</v-btn
                    >
                    <v-btn
                      color="brown"
                      dark
                      :disabled="plan.fileState != '未审核'"
                      @click="disagree(plan)"
                      >拒绝</v-btn
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card>
            <v-row>
              <v-col offset="5">
                <v-btn dark>对比计划</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-form>
    </material-card>
  </div>
</template>

<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import List from '../../patientTreatment/plan/List.vue';
import FormBasic from '../../../basicInfo/formBasic.vue';
import PlanApplication from '../../../../store/entities/plan/planApplication';
import list from './../../../../store/entities/plan/list';
import patientSearchItem from './../../../customize/patientSearchItem.vue';
import VueRouter from 'vue-router';
import DVH from '../DVH.vue';

@Component({
  components: {List, FormBasic, patientSearchItem, DVH},
})
export default class ExamineLocationResult extends AbpBase {
  checked: boolean = true;
  panel: [] = [];

  data() {
    return {
      treeItems: [
        {
          id: 1,
          name: 'Fractionation:B',
          children: [
            {id: 2, name: 'Prescribed Dose:3000.0 cGy(300.0 cGy/ fraction)'},
            {
              id: 3,
              name:
                'Dose at primary reference point:3000.0 cGy(300.0 cGy/ fraction)',
            },
            {id: 4, name: 'Number of Fractions:10'},
          ],
        },
      ],
    };
  }

  get currentColor() {
    return this.$store.state.targetResource.color;
  }

  get formValidate() {
    return this.$store.state.targetResource.approvePlan.rigthApproving;
  }

  dvhjson(json) {
    return JSON.parse(json);
  }

  get remarkDisabled() {
    return this.$store.state.planApplication.remarkDisabled;
  }

  set remarkDisabled(value) {
    this.$store.state.planApplication.remarkDisabled = value;
  }
  async agree(plan) {
    var success = await this.$store.dispatch({
      type: 'planApplication/approvingPlanAgreeAsync',
      data: {
        planId: plan.planId,
        remarks: plan.remarks,
        sessionId: plan.sessionId,
        radiotherapyNum: plan.radiotherapyNum,
      },
    });
    if (success) {
      plan.fileState = '已审核';
      this.$Message.success('操作成功');
    }
  }

  async disagree(plan) {
    var success = await this.$store.dispatch({
      type: 'planApplication/approvingPlanDisagreeAsync',
      data: {
        planId: plan.planId,
        remarks: plan.remarks,
        sessionId: plan.sessionId,
        radiotherapyNum: plan.radiotherapyNum,
      },
    });
    if (success) {
      plan.fileState = '已拒绝';

      this.$Message.success('操作成功');
    }
  }
  goback() {
    this.$router.go(-1); //返回上一层
  }

  fullScreenClick(className) {
    this.requestFullScreen($('.' + className)[0]);
  }
  // 全屏
  requestFullScreen(element) {
    var requestMethod =
      element.requestFullScreen || //W3C
      element.webkitRequestFullScreen || //Chrome等
      element.mozRequestFullScreen || //FireFox
      element.msRequestFullScreen; //IE11
    if (requestMethod) {
      requestMethod.call(element);
    } else if (typeof (window as any).ActiveXObject !== 'undefined') {
      //for Internet Explorer
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  activated() {
    this.remarkDisabled = false;
  }
}
</script>

<style scoped>
.form-height {
  padding: 0px 20px;
  height: calc(80vh) !important;
  overflow: auto;
}
.picture {
  overflow: auto;
}
</style>
