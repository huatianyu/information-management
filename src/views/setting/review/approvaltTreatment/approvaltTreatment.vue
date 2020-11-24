<template>
  <material-card
    :color="currentColor"
    title="批准治疗"
    :showBackBtn="true"
    text="批准治疗内容表单"
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
                      <v-btn @click="agree()" color="#4dc9a875">审核通过</v-btn>
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
              <span class="title font-weight-light">排程及预约文件</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-form>
  </material-card>
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
class positionItem {
  id: Number;
  title: String;
  name: String;
}
@Component({
  components: {List, FormBasic, patientSearchItem},
})
export default class ApprovaltTreatment extends AbpBase {
  isEdit: boolean = true;
  searchBarFixed = false;
  value1 = ['1'];
  value2 = ['1'];
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
  get RadiotherapyMachine() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.RadiotherapyMachine;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict')).All
      .RadiotherapyMachine;
  }

  RadiotherapyMachineForRead(id) {
    if (this.RadiotherapyMachine && this.RadiotherapyMachine.length) {
      let readItem = this.RadiotherapyMachine.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get TreatmentMethod() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.TreatmentMethod;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict')).All
      .TreatmentMethod;
  }

  TreatmentMethodForRead(id) {
    if (this.TreatmentMethod && this.TreatmentMethod.length) {
      let readItem = this.TreatmentMethod.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get RadiationType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.RadiationType;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict')).All
      .RadiationType;
  }

  RadiationTypeForRead(id) {
    if (this.RadiationType && this.RadiationType.length) {
      let readItem = this.RadiationType.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get PlanningSystem() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.PlanningSystem;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict')).All
      .PlanningSystem;
  }

  PlanningSystemForRead(id) {
    if (this.PlanningSystem && this.PlanningSystem.length) {
      let readItem = this.PlanningSystem.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  get panel() {
    return [0, 1, 2];
  }
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      time: null,
    };
  }

  @Prop({default: false}) public initshow!: boolean;
  private name = 111;
  private deletecomponents: Set<any> = new Set();

  removePrescription() {
    this.formValidate.list.pop();
  }

  addPrescription() {
    this.formValidate.list.push(new list());
  }
  getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    });
  }

  async formValidateEdit() {
    (this.$refs.formValidate as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: 'planApplication/updateState',
          data: this.formValidate,
        });
        this.$Message.success('录入成功');
        this.isEdit = false;
      }
    });
  }
  formValidateReview() {
    (this.$refs.formValidate as any).validate(async (valid: boolean) => {
      if (valid) {
        var data = await this.$store.dispatch({
          type: 'planApplication/updateState',
          // data: { id: this.formValidate.planningDesignOrderInfo.id }
        });
        if (data['success']) {
          this.$Message.success('审核成功');
          // this.formValidateReviewSuccess = 1;
        }
      }
    });
  }
  async agree() {
    var success = await this.$store.dispatch({
      type: 'planApplication/approvedTreatment',
      data: {
        Remarks: this.formValidate.remarks,
        sessionId: this.$store.state.targetResource.test.id,
        radiotherapyNum: this.$store.state.targetResource.test.radiotherapyNum,
      },
    });

    if (success) {
      this.$Message.success('操作成功');
    }
  }

  async disagree() {
    var success = await this.$store.dispatch({
      type: 'planApplication/approvedCabckeTreatment',
      data: {
        Remarks: this.formValidate.remarks,
        sessionId: this.$store.state.targetResource.test.id,
        radiotherapyNum: this.$store.state.targetResource.test.radiotherapyNum,
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
      if (to.params.params) {
        // vm.formValidate = JSON.parse(to.params.params)["patientDetail"];
        // localStorage.setItem("planApplication", to.params.params);
      }
      vm.isEdit = false;
      vm.searchBarFixed = false;

      //防止刷新页面数据消失
      if (from.fullPath === '/') {
        // vm.formValidate = JSON.parse(localStorage.getItem("planApplication"))[
        //   "patientDetail"
        // ];
      }
    });
  }
}
</script>

<style scoped>
.affixPosition {
  position: relative;
  margin-right: 30px;
}

.td {
  border: solid #f8f8f9;
  border-width: 0px 1px 1px 0px;
  padding: 30px 20px 0px 0px;
}
th {
  height: 38px;
  border: 1px solid #dcdee2;
}

.table {
  border: solid #dcdee2;
  border-width: 0px 1px 1px 1px;
  width: 100%;
  margin: auto;
  margin-top: 70px;
}

.hidden-border {
  border-left: 0px;
  border-right: 0px;
}
</style>

<style lang="less">
.ivu-card-shadow {
  -webkit-box-shadow: 5px 10px 10px 1px rgba(0.1, 0.1, 0.1, 0.1);
  box-shadow: 5px 5px 10px 1px rgba(0.1, 0.1, 0.1, 0.1);
}

.targetTitle {
  text-align: center;
  text-decoration: underline;
  font-size: 16px !important;
}

.sub-targetTitle {
  position: relative;
  left: -45px;
}

.formItemLeft {
  position: relative;
  left: -45px;
  width: 100%;
}

.positionFormItem {
  margin-bottom: 10px;
  width: 100%;
}
</style>
<style scoped>
.plan-affixPosition {
  margin-right: 0px;
  float: right;
}
.plan-flex-container {
  float: right;
  width: 235px;
}
.font-weight-light {
  color: #fff;
}
</style>
