<template>
  <div>
    <Affix v-if="searchBarFixed" class="plan-affixPosition" :offset-top="72">
      <div class="plan-flex-container">
        <Button
          v-if="isEdit"
          @click="handleSubmit('formValidateEdit')"
          style="margin-left: 8px"
          type="primary"
        >
          <span>提交</span>
        </Button>
        <Button type="primary" v-else @click="handleSubmit('formValidateSave')">
          <span>修改</span>
        </Button>
        <Button
          style="margin-left: 8px"
          class="flex-item"
          type="primary"
          v-print="'#printPlanApplication'"
          v-if="!isEdit"
        >打印</Button>
        <Button
          style="margin-left: 8px"
          type="primary"
          @click="handleSubmit('formValidateDrafSave')"
        >
          <span>草稿</span>
        </Button>
        <Button style="margin-left: 8px" type="primary" @click="goback">
          <span>返回</span>
        </Button>
      </div>
    </Affix>
    <Card title="放疗方案" dis-hover>
      <a href="#" slot="extra">
        <Button
          v-if="isEdit"
          @click="handleSubmit('formValidateEdit')"
          style="margin-left: 18px"
          type="primary"
        >
          <span>提交</span>
        </Button>
        <Button
          style="margin-left: 8px"
          type="primary"
          v-else
          @click="handleSubmit('formValidateSave')"
        >
          <span>修改</span>
        </Button>
        <Button
          style="margin-left: 8px"
          class="flex-item"
          type="primary"
          v-print="'#printPlanApplication'"
          v-if="!isEdit"
        >打印</Button>
        <Button
          style="margin-left: 8px"
          type="primary"
          @click="handleSubmit('formValidateDrafSave')"
        >
          <span>草稿</span>
        </Button>
        <Button style="margin-left: 8px" type="primary" @click="goback">
          <span>返回</span>
        </Button>
      </a>
      <div id="printPlanApplication">
        <Form ref="formValidate" :aria-disabled="false" :model="formValidate" :label-width="80">
          <div class="page-body">
            <div class="table" cellspacing="0">
              <Collapse v-model="value1" class="hidden-border">
                <Panel hide-arrow name="1">
                  <div style="text-align:center">
                    <b>放疗方案</b>
                  </div>
                  <p slot="content">
                    <form-basic :patient="headerPatientInfo"></form-basic>

                    <Row :gutter="10">
                      <Col span="6">
                        <FormItem
                          :labelWidth="110"
                          v-if="status"
                          :label="L('射线类型')+':'"
                          style="width:100%"
                          prop="patient.sex"
                        >
                          <RadioGroup v-model="formValidate.rayType">
                            <Radio style="color:#515a6e" :label="0">
                              <span>质子</span>
                            </Radio>
                            <Radio style="color:#515a6e" :label="1">
                              <span>光子</span>
                            </Radio>
                          </RadioGroup>
                        </FormItem>

                        <FormItem v-else :labelWidth="110" :label="L('射线类型')+':'">
                          <Label>{{RadiationTypeForRead(formValidate.rayType)}}</Label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem
                          v-if="status"
                          :labelWidth="110"
                          :label="L('照射部位')+':'"
                          style=" width:100%"
                        >
                          <Select v-model="formValidate.irradiationPosition">
                            <Option
                              v-for="item in IrradiationPosition"
                              :value="item.id"
                            >{{item.value}}</Option>
                          </Select>
                        </FormItem>
                        <FormItem v-else :label="L('照射部位')+':'" :labelWidth="110">
                          <Label>{{IrradiationPositionForRead(formValidate.irradiationPosition) }}</Label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem
                          v-if="status"
                          :labelWidth="110"
                          :label="L('治疗方式')+':'"
                          style=" width:100%"
                        >
                          <Select v-model="formValidate.treatmentMethod">
                            <Option v-for="item in TreatmentMethod" :value="item.id">{{item.value}}</Option>
                          </Select>
                        </FormItem>
                        <FormItem v-else :labelWidth="110" :label="L('治疗方式')+':'">
                          <Label>{{TreatmentMethodForRead(formValidate.treatmentMethod) }}</Label>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem
                          v-if="status"
                          :labelWidth="110"
                          :label="L('总剂量')+':'"
                          style=" width:100%"
                        >
                          <InputNumber
                            type="number"
                            :max="1000"
                            :min="0"
                            :placeholder="L('请输入总剂量')"
                            v-model="formValidate.prescribedDose"
                          ></InputNumber>
                        </FormItem>
                        <FormItem v-else :labelWidth="110" :label="L('总剂量')+':'">
                          <Label>{{formValidate.prescribedDose }}</Label>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="6">
                        <FormItem
                          v-if="status"
                          :labelWidth="110"
                          :label="L('分割次数')+':'"
                          style=" width:100%"
                        >
                          <InputNumber
                            type="number"
                            :max="1000"
                            :min="0"
                            :placeholder="L('请输入分割次数')"
                            v-model="formValidate.fraction"
                          ></InputNumber>
                        </FormItem>
                        <FormItem v-else :labelWidth="110" :label="L('分割次数')+':'">
                          <Label>{{formValidate.fraction }}</Label>
                        </FormItem>
                      </Col>
                      <Col span="18">
                        <FormItem v-if="status" :label="L('备注')+':'" :labelWidth="110">
                          <Input
                            v-model="formValidate.remarks"
                            :readonly="status ? false : 'readonly'"
                            clearable
                            :placeholder="L('备注')"
                          ></Input>
                        </FormItem>
                        <FormItem v-else :label="L('备注')+':'" :labelWidth="110">
                          <Label>{{ formValidate.remarks }}</Label>
                        </FormItem>
                      </Col>
                    </Row>
                  </p>
                </Panel>
              </Collapse>
            </div>
          </div>
        </Form>
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
import HeaderClass from "../../../../store/entities/patientTreatment/header";
import Patient from "../../../../store/entities/patient";
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
export default class Program extends AbpBase {
  // formValidate: Prescription = new Prescription();
  isEdit: boolean = true;
  searchBarFixed = false;
  value1 = ["1"];
  value2 = ["1"];

  get formValidate() {
    return this.$store.state.patientResource.prescription;
  }
  set formValidate(value) {
    this.$store.state.patientResource.prescription = value;
  }
  // formValidateReviewSuccess = false;

  get headerPatientInfo() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.headerPatientInfo,
      "DIAGNOSTICBLOCK-HEADERPATIENTINFO",
      this.$store.state.patientResource.patientResource.patientInfo.patient
        .radiotherapyNum
    );
  }

  get status() {
    return this.$store.state.program.status;
  }

  set status(value) {
    this.$store.state.program.status = value;
  }

  get courseId() {
    return Util.getUpdatePageObj(
      this.$store.state.patientResource.patientResource.courseId,
      "DIAGNOSTICBLOCK-COURSEID",
      this.$store.state.patientResource.patientResource.patientInfo.patient
        .radiotherapyNum
    );
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
    if (!this.formValidate.id) {
      this.formValidate.id = 0;
    }

    this.formValidate.courseId = this.courseId;
    let success = await this.$store.dispatch({
      type: "patientResource/createAndUpdatePrescription",
      data: this.formValidate
    });
    if (success) {
      this.status = false;
      this.isEdit = false;
      this.$Message.success("录入成功");
    }

    // }
    // });
  }

  async formValidateDrafSave() {
    this.formValidate.action = 0;
    this.formValidate.courseId = this.courseId;
    if (!this.formValidate.id) {
      this.formValidate.id = 0;
    }
    await this.$store.dispatch({
      type: "patientResource/createAndUpdatePrescription",
      data: this.formValidate
    });

    this.$Message.success("录入成功");
  }
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
    (this.$refs[name] as any).resetFields();
  }
  goback() {
    this.formValidate = new Prescription();
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

    20 > offsetTop
      ? (this.searchBarFixed = true)
      : (this.searchBarFixed = false);
  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.formValidate.id = 0;
      vm.status = true;
      vm.isEdit = true;
      vm.searchBarFixed = false;
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













