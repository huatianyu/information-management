<template>
  <div id="printPlanApplication" class="form-height">
    <material-card color="#4dc9a875" title="计划申请书" :status="!isEdit"  :showBackBtn="true" text="计划申请书审批内容表单">
      <v-form ref="formValidate" v-model="valid" lazy-validation :v-text-field-width="80">
        <v-container py-0>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="title font-weight-light">基本信息</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <formBasic :patient="formValidate.patientTop"></formBasic>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="formValidate.list.length!=0">
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
            <v-expansion-panel>
              <v-card elevation="0">
                <v-row class="purple-input pa-7">
                  <v-col cols="12" md="12">
                    <v-btn
                      color="#4dc9a875"
                      v-if="!isEdit"
                      @click="handleSubmit('formValidateSave')"
                    >
                      <span>提交</span>
                    </v-btn>
                    <v-btn color="#4dc9a875" v-else @click="handleSubmit('formValidateEdit')">
                      <span>修改</span>
                    </v-btn>
                    <v-btn color="#4dc9a875" v-print="'#printPlanApplication'" v-if="isEdit">打印</v-btn>
                    <v-btn color="#4dc9a875" @click="goback">
                      <span>返回</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-form>
    </material-card>
  </div>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import List from "./List.vue";
import FormBasic from "../../../basicInfo/formBasic.vue";
import PlanApplication from "../../../../store/entities/plan/planApplication";
import list from "./../../../../store/entities/plan/list";

import VueRouter from "vue-router";

@Component({
  components: { List, FormBasic }
})
export default class PlanApplications extends AbpBase {
  isEdit: boolean = false;
  searchBarFixed = false;
  value1 = ["1"];
  value2 = ["1"];
  panel = [0, 1, 2];
  valid: Boolean = true;
  get formValidate() {
    return Util.getUpdatePageObj(
      this.$store.state.planApplication.planApplication,
      "DIAGNOSTICBLOCK-PLANAPPLICATION",
      this.$store.state.patientResource.patientResource
        .radiotherapyNum
    );
    // return this.$store.state.planApplication.planApplication;
  }

  get remarkDisabled() {
    return this.$store.state.patientResource.remarkDisabled;
  }

  set remarkDisabled(value) {
    this.$store.state.patientResource.remarkDisabled = value;
  }
  get isEditStatus() {
    return this.$store.state.patientResource.isEditStatus;
  }
  set isEditStatus(value) {
    this.$store.state.patientResource.isEditStatus = value;
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
  handleSubmit(name) {
    switch (name) {
      case "formValidateSave":
        this.formValidateSave();
        break;
      case "formValidateEdit":
        this.isEdit = false;
        break;
      case "formValidateReview":
        this.formValidateReview();
        break;
      default:
        break;
    }
  }

  async formValidateSave() {
    if ((this.$refs.formValidate as any).validate()) {
      var data = await this.$store.dispatch({
        type: "patientResource/createPlanOrder",
        data: this.formValidate
      });
      if (data["success"]) {
        this.$Message.success("录入成功");
        this.isEdit = true;
      }
    }
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

  handleTreeSelectChange(list) {}
  // 修改
  handleEdit(name) {}
  handleTreeCurrentSelect(item) {}
  handleTreeSelectCheckChange(selectedArray, item) {}
  handleTreeSelectClick(selectArray, item) {
    alert(selectArray.length);
  }
  handleReset(name) {
    this.$store.commit("patient/isCreat");
    (this.$refs[name] as any).resetFields();
  }
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
      vm.isEdit = false;
      vm.searchBarFixed = false;
      vm.isEditStatus = false;
    });
  }
}
</script>
<style lang="less" >
.ivu-table-wrapper {
  overflow: visible;
}
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
  width: 200px;
  margin-right: 16px;
  float: right;
}
.plan-flex-container {
  float: right;
}
.font-weight-light {
  color: #fff;
}
.form-height {
  height: calc(80vh) !important;
  overflow: auto;
  padding: 0px 20px;
}
.ivu-btn{
    background-color:rgb(195, 167, 126)!important;
}
</style>











