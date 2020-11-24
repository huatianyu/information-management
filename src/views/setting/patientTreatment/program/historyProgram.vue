<template>
  <material-card color="#4dc9a875" title="制定方案" :status="status" :showBackBtn="true" text="制定方案内容表单">
    <div id="printHistoryProgram">
      <v-form ref="formValidate" v-model="valid" lazy-validation :v-text-field-width="80">
        <form-basic :patient="headerPatientInfo"></form-basic>
        <v-row class="pa-4">
          <v-col>
            <v-radio-group
              label="射线类型"
              dark
              class="purple-input pa-0"
              v-model="formValidate.rayType"
              row
              :disabled="!status"
            >
              <v-radio label="质子" :value="0"></v-radio>
              <v-radio label="光子" :value="1"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col>
            <v-select
              dark
              v-model="formValidate.irradiationPosition"
              :items="IrradiationPosition"
              class="purple-input pa-0"
              :disabled="!status"
              menu-props="auto"
              hide-details
              label="照射部位"
              placeholder="请选择照射部位"
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              dark
              v-model="formValidate.treatmentMethod"
              :items="TreatmentMethod"
              class="purple-input pa-0"
              :disabled="!status"
              prepend-icon="mdi-anchor"
              menu-props="auto"
              hide-details
              label="治疗方式"
              placeholder="请选择治疗方式"
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              dark
              label="总剂量"
              class="purple-input pa-0"
              suffix="cGy"
              placeholder="请输入总剂量"
              type="number"
              :disabled="!status"
              v-model="formValidate.prescribedDose"
            />
          </v-col>
        </v-row>
        <v-row class="pa-4">
          <v-col xl="3" md="6" sm="12" cols="12">
            <v-text-field
              dark
              label="分割次数"
              class="purple-input pa-0"
              suffix="次"
              placeholder="请输入分割次数"
              type="number"
              :disabled="!status"
              v-model="formValidate.fraction"
            />
          </v-col>
          <v-col xl="3" md="6" sm="12" cols="12">
            <v-text-field
              dark
              label="备注"
              class="purple-input pa-0"
              placeholder="输入备注"
              :disabled="!status"
              v-model="formValidate.remarks"
            />
          </v-col>
        </v-row>
      </v-form>
    </div>
    <v-card elevation="0">
      <v-row class="purple-input pa-7">
        <v-btn v-if="isEdit" @click="handleSubmit('formValidateEdit')" color="#4dc9a875">
          <span>提交</span>
        </v-btn>
        <v-btn color="#4dc9a875" v-else @click="handleSubmit('formValidateSave')">
          <span>修改</span>
        </v-btn>
        <v-btn color="#4dc9a875" v-print="'#printHistoryProgram'" v-if="!isEdit">打印</v-btn>
        <v-btn color="#4dc9a875" @click="handleSubmit('formValidateDrafSave')">
          <span>草稿</span>
        </v-btn>
        <v-btn color="#4dc9a875" @click="goback()">
          <span>返回</span>
        </v-btn>
      </v-row>
    </v-card>
  </material-card>
</template>

<script lang="ts">
import { Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import HeaderClass from "../../../../store/entities/patientTreatment/header";
import Patient from "../../../../store/entities/patient";
// import TreeSelect from "@/components/tree-select";
import Header from "../../../basicInfo/header.vue";
import FormBasic from "../../../basicInfo/formBasic.vue";
import Prescription from "../../../../store/entities/patientTreatment/prescription";

import VueRouter from "vue-router";
class positionItem {
  id: Number;
  title: String;
  name: String;
}
@Component({
  components: { Header, FormBasic }
})
export default class HistoryProgram extends AbpBase {
  // formValidate: Prescription = new Prescription();
  isEdit: boolean;
  editDraf: boolean;
  searchBarFixed = false;
  value1 = ["1"];
  value2 = ["1"];
  status = false;
  valid = true;
  // get formValidate() {
  //   return this.$store.state.patientResource.prescription;
  // }
  // formValidateReviewSuccess = false;

  get headerPatientInfo() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.prescriptionDetail.patientTop,
      "HISTORYPROGRAM-PATIENTTOP",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }

  get formValidate() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.prescriptionDetail.info,
      "HISTORYPROGRAM-INFO",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }
  // get status() {
  //   return this.$store.state.program.status;
  // }

  // set status(value) {
  //   this.$store.state.program.status = value;
  // }

  get courseId() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.patientResource.courseId,
      "DIAGNOSTICBLOCK-COURSEID",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
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
  get IrradiationPosition() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.IrradiationPosition;
    }
    return JSON.parse(localStorage.getItem("content.state.rtisDict"))
      .PatientInfo.IrradiationPosition;
  }

  IrradiationPositionForRead(id) {
    if (this.IrradiationPosition && this.IrradiationPosition.length) {
      let readItem = this.IrradiationPosition.filter(item => item.id === id);
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
  get Nation() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.Nation;
    } else {
      return JSON.parse(localStorage.getItem("content.state.rtisDict"))
        .PatientInfo.Nation;
    }
  }

  NationForRead(id) {
    if (this.Nation && this.Nation.length) {
      let readItem = this.Nation.filter(item => item.id === id);
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

  // positionItems: positionItem[] = [
  //   {
  //     id: 1,
  //     title: "头部",
  //     name: "Header"
  //   },
  //   {
  //     id: 2,
  //     title: "胸部",
  //     name: "Chest"
  //   }
  // ];
  data() {
    return {};
  }

  @Prop({ default: false }) public initshow!: boolean;
  private name = 111;
  private currentView = "first";
  private first = "first"; // 导航栏文本1
  private second = "Second"; // 导航栏文本2
  private third = "Third";
  private deletecomponents: Set<any> = new Set();

  handleSubmit(name) {
    switch (name) {
      case "formValidateEdit":
        this.formValidateEdit();
        break;
      case "formValidateSave":
        this.isEdit = true;
        this.status = true;
        break;
      case "formValidateReview":
        // this.formValidateReview();
        break;
      case "formValidateDrafEdit":
        this.formValidateDrafEdit();
        break;
      case "formValidateDrafSave":
        this.formValidateDrafSave();
        break;
      default:
        break;
    }
  }

  async formValidateEdit() {
    // (this.$refs.formValidate as any).validate(async (valid: boolean) => {
    //   if (valid) {

    this.formValidate.action = 1;
    this.formValidate.courseId = this.courseId;

    await this.$store.dispatch({
      type: "patientResource/createAndUpdatePrescription",
      data: this.formValidate
    });
    this.isEdit = false;
    this.status = false;
    this.$Message.success("录入成功");
    // }
    // });
  }

  async formValidateDrafSave() {
    this.formValidate.action = 0;
    this.formValidate.courseId = this.courseId;

    await this.$store.dispatch({
      type: "patientResource/createAndUpdatePrescription",
      data: this.formValidate
    });

    this.$Message.success("录入成功");
  }

  async formValidateDrafEdit() {}

  // formValidateReview() {
  //   (this.$refs.formValidate as any).validate(async (valid: boolean) => {
  //     if (valid) {
  //       var data = await this.$store.dispatch({
  //         type: "planApplication/updateState",
  //         data: { id: this.formValidate.planningDesignOrderInfo.id }
  //       });
  //       if (data["success"]) {
  //         this.$Message.success("审核成功");
  //       }
  //     }
  //   });
  // }

  // 修改

  handleReset(name) {
    this.$store.commit("patient/isCreat");
    (this.$refs[name] as any).resetFields();
  }
  // goback() {
  //   this.$router.go(-1); //返回上一层
  // }

  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
  }

  handleScroll() {
    let offsetTop = (this.$refs.formValidate as any).$el.getBoundingClientRect()
      .top;

    20 > offsetTop
      ? (this.searchBarFixed = true)
      : (this.searchBarFixed = false);

  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.status = false;
      vm.isEdit = false;
      vm.searchBarFixed = false;

      vm.editDraf = false;
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
  /* margin-top: 70px; */
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
  width: 200px;
  float: right;
}
</style>













