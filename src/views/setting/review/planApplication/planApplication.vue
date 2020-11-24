<template>
  <div class="form-height">
    <material-card
      :color="currentColor"
      title="计划申请书"
      :showBackBtn="true"
      text="计划申请书审批内容表单"
    >
      <v-form ref="formValidate">
        <v-container py-0>
          <Affix :offset-top="350">
            <v-row>
              <v-col>
                <v-navigation-drawer
                  height="280"
                  color="#222629c9"
                  permanent
                  absolute
                  right
                  expand-on-hover
                >
                  <template v-slot:prepend>
                    <v-row class="purple-input px-2">
                      <v-col cols="12" md="12">
                        <v-textarea
                          label="备注"
                          placeholder="输入备注"
                          filled
                          background-color="amber lighten-4"
                          class="purple-input pa-0"
                          v-model="formValidate.remarks"
                        ></v-textarea>
                        <v-btn @click="agree()" color="#4dc9a875"
                          >审核通过</v-btn
                        >
                        <v-btn color="brown" @click="disagree()">拒绝</v-btn>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </template>
                </v-navigation-drawer>
              </v-col>
            </v-row>
          </Affix>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="title font-weight-light">基本信息</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <formBasic :patient="formValidate.patientTop"></formBasic>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="formValidate.list.length != 0">
              <v-expansion-panel-header>
                <span class="title font-weight-light">处方信息</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div
                  v-bind:is="'List'"
                  :dataSource="formValidate.list"
                  :isEdit="isEdit"
                  class="positionFormItem"
                ></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
import VueRouter from 'vue-router';

@Component({
  components: {List, FormBasic},
})
export default class PlanApplications extends AbpBase {
  isEdit: boolean = true;
  value1 = ['1'];
  value2 = ['1'];
  panel = [0, 1, 2];
  get currentColor() {
    return this.$store.state.targetResource.color;
  }
  get remarkDisabled() {
    return this.$store.state.planApplication.remarkDisabled;
  }

  set remarkDisabled(value) {
    this.$store.state.planApplication.remarkDisabled = value;
  }
  get formValidate() {
    return this.$store.state.targetResource.planApplication;
  }
  set formValidate(value) {
    this.$store.state.targetResource.planApplication = value;
  }

  async agree() {
    var success = await this.$store.dispatch({
      type: 'planApplication/planExamine',
      data: {
        Remarks: this.formValidate.remarks,
        sessionId: this.formValidate.id,
        radiotherapyNum: this.formValidate.patientTop.radiotherapyNum,
      },
    });

    if (success) {
      this.$Message.success('操作成功');
    }
  }

  async disagree() {
    var success = await this.$store.dispatch({
      type: 'planApplication/planCancellation',
      data: {
        Remarks: this.formValidate.remarks,
        sessionId: this.formValidate.id,
        radiotherapyNum: this.formValidate.patientTop.radiotherapyNum,
      },
    });

    if (success) {
      this.$Message.success('操作成功');
    }
  }
  goback() {
    this.$router.go(-1); //返回上一层
  }

  activated() {
    this.remarkDisabled = false;
  }
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isEdit = true;
    });
  }
}
</script>

<style scoped>
.font-weight-light {
  color: #fff;
}
.form-height {
  height: calc(80vh) !important;
  overflow: auto;
  padding: 0px 20px;
}
</style>
