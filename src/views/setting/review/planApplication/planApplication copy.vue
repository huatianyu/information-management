<template>
  <div>
    <Affix v-if="searchBarFixed" class="plan-affixPosition" :offset-top="0">
      <div class="plan-flex-container">
        <v-btn @click="agree()" color="#4dc9a875">同意</v-btn>
        <v-btn color="red" @click="disagree()">不同意</v-btn>
        <v-btn color="blue-grey" @click="goback">返回</v-btn>
      </div>
    </Affix>
    <Card title="计划申请书" dis-hover>
      <a href="#" slot="extra">
        <v-btn @click="agree()" color="#4dc9a875">同意</v-btn>
        <v-btn color="red" @click="disagree()">不同意</v-btn>
        <v-btn color="blue-grey" @click="goback">返回</v-btn>
      </a>
      <div class="page-body">
        <div id="printPlanApplication">
          <Form ref="formValidate" :aria-disabled="false" :model="formValidate" :label-width="80">
            <Row :gutter="10">
              <Col span="24">
                <patient-search-item type="textarea" title="备注" signature="李大庆"></patient-search-item>
              </Col>
            </Row>

            <div class="table" cellspacing="0">
              <Collapse v-model="value1" class="hidden-border">
                <Panel hide-arrow name="1">
                  <div style="text-align:center">
                    <b>计划申请书</b>
                  </div>
                  <p slot="content">
                    <Row :gutter="10">
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('姓名')+':'" style="width:100%">
                          <Label>{{formValidate.patientTop.patientName}}</Label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('性别')+':'" style="width:100%">
                          <Label>{{formValidate.patientTop.sex}}</Label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('年龄')+':'" style="width:100%">
                          <label>{{formValidate.patientTop.age}}</label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('放疗号')+':'" style="width:100%">
                          <label>{{formValidate.patientTop.radiotherapyNum}}</label>
                        </FormItem>
                      </Col>
                      <!-- <Col span="5">
                       <FormItem :labelWidth="110" :label="L('病历号')+':'" style="width:100%">
                          <label>{{formValidate.patientTop.patientName}}</label>
                        </FormItem>
                      </Col>-->
                    </Row>
                    <Row :gutter="10">
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('病区')+':'" style="width:100%">
                          <label>{{formValidate.patientTop.inpatientArea}}</label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('联系方式')+':'" style="width:100%">
                          <label>{{formValidate.patientTop.phoneNumber}}</label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('临床诊断')+':'" style="width:100%">
                          <label>{{formValidate.patientTop.clinicalDiagnosis}}</label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('住院号')+':'" style="width:100%">
                          <label>{{formValidate.patientTop.clinicPatientId}}</label>
                        </FormItem>
                      </Col>
                    </Row>

                    <Row :gutter="10">
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('计划系统')+':'">
                          <!-- <Label>{{PlanningSystemForRead(formValidate.planningDesignOrderInfo.planningSystem) }}</Label> -->
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem :labelWidth="110" :label="L('治疗机')+':'">
                          <!-- <Label>{{RadiotherapyMachineForRead(formValidate.planningDesignOrderInfo.radiotherapyMachine) }}</Label> -->
                        </FormItem>
                      </Col>
                      <Col offset="4" span="2">
                        <FormItem style="width:100%;">
                          <!-- <Button @click="addPrescription">增加处方</Button> -->
                          <Button style="margin-left:8px" @click="removePrescription">移除处方</Button>
                        </FormItem>
                      </Col>
                    </Row>

                    <Row :gutter="10">
                      <div
                        v-bind:is="'List'"
                        :dataSource="formValidate.list"
                        :isEdit="isEdit"
                        class="positionFormItem"
                      ></div>
                    </Row>
                  </p>
                </Panel>
              </Collapse>
            </div>
          </Form>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import List from "../../patientTreatment/plan/List.vue";
import FormBasic from "../../../basicInfo/formBasic.vue";
import PlanApplication from "../../../../store/entities/plan/planApplication";
import list from "./../../../../store/entities/plan/list";
import patientSearchItem from "./../../../customize/patientSearchItem.vue";

import VueRouter from "vue-router";
class positionItem {
  id: Number;
  title: String;
  name: String;
}
@Component({
  components: { List, FormBasic, patientSearchItem }
})
export default class PlanApplications extends AbpBase {
  isEdit: boolean = true;
  searchBarFixed = false;
  value1 = ["1"];
  value2 = ["1"];
  get formValidate() {
    return this.$store.state.targetResource.planApplication;
  }
  get RadiotherapyMachine() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.RadiotherapyMachine;
    }
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
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
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
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
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
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
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
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
  data() {
    return {
      treeSelected: []
    };
  }

  @Prop({ default: false }) public initshow!: boolean;
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
          type: "planApplication/updateState",
          data: this.formValidate
        });
        this.$Message.success("录入成功");
        this.isEdit = false;
      }
    });
  }
  formValidateReview() {
    (this.$refs.formValidate as any).validate(async (valid: boolean) => {
      if (valid) {
        var data = await this.$store.dispatch({
          type: "planApplication/updateState"
          // data: { id: this.formValidate.planningDesignOrderInfo.id }
        });
        if (data["success"]) {
          this.$Message.success("审核成功");
          // this.formValidateReviewSuccess = 1;
        }
      }
    });
  }
  async agree() {
    // var data = await this.$store.dispatch({
    //   type: "planApplication/updateState",
    //   data: { radiotherapyNum: this.formValidate.patientTop.radiotherapyNum ,locationId: }
    // });
  }

  disagree() {}

  goback() {
    this.$router.go(-1); //返回上一层
  }
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  handleScroll() {
    let offsetTop = (this.$refs.formValidate as any).$el.getBoundingClientRect()
      .top;

    100 > offsetTop
      ? (this.searchBarFixed = true)
      : (this.searchBarFixed = false);
  }
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.formValidate = new PlanApplication();

      if (to.params.params) {
        // vm.formValidate = JSON.parse(to.params.params)["patientDetail"];
        // localStorage.setItem("planApplication", to.params.params);
      }
      vm.isEdit = false;
      vm.searchBarFixed = false;

      //防止刷新页面数据消失
      if (from.fullPath === "/") {
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




<style lang="less" >
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
</style>













