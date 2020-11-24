<template>
  <div id="printTargetingApplication" class="form-height">
    <material-card
      color="#4dc9a875"
      :title="'定位申请单'"
      :showBackBtn="true"
      :text="'定位申请单审批内容表单'"
      icon="mdi-store"
      :status="status"
      value="定位申请单"
      sub-icon="mdi-calendar"
      sub-text="reviewTargetingApplication"
    >
      <v-form ref="applicationFormValidate" :value="true" lazy-validation :v-text-field-width="80">
        <v-container py-0>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="title font-weight-light">基本信息</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <formBasic :patient="applicationFormValidate.leftPatients.patient"></formBasic>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-card light>
                <v-expansion-panel-header>
                  <span class="title font-weight-light">体位固定要求</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-radio-group
                        dark
                        class="purple-input py-0"
                        label="是否制模"
                        v-model="applicationFormValidate.ctsimOrder.isFixed"
                        row
                        :disabled="!status"
                      >
                        <v-radio label="是" :value="0"></v-radio>
                        <v-radio label="否" :value="1"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row v-if="applicationFormValidate.ctsimOrder.isFixed">
                    <v-col cols="12" md="4">
                      <v-text-field
                        dark
                        label="固定部位"
                        class="purple-input py-0"
                        placeholder="输入固定部位"
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.fixedPosition"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-radio-group
                        dark
                        label="体位"
                        v-model="applicationFormValidate.ctsimOrder.bodyPosition"
                        row
                        class="purple-input py-0"
                        :disabled="!status"
                      >
                        <v-radio label="仰卧" :value="0"></v-radio>
                        <v-radio label="俯卧" :value="1"></v-radio>
                        <v-radio label="左侧卧" :value="2"></v-radio>
                        <v-radio label="右侧卧" :value="3"></v-radio>
                        <v-radio label="其他" :value="4"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        dark
                        label="特殊要求"
                        class="purple-input py-0"
                        placeholder="输入特殊要求"
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.requirements"
                      />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        dark
                        label="固定装置"
                        class="purple-input py-0"
                        placeholder="输入固定装置"
                        required
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.fixedEquipment"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        dark
                        label="备注"
                        class="purple-input py-0"
                        placeholder="输入备注"
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.remarks"
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-card>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-card
                light
                img="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568198290176&di=15b1879501f574837cb008f02fbcd48a&imgtype=0&src=http%3A%2F%2Fp2.so.qhmsg.com%2Ft0196719dc261f1f6c7.jpg"
              >
                <v-expansion-panel-header>
                  <span class="title font-weight-light">CT扫描要求</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-select
                        dark
                        v-model="applicationFormValidate.ctsimOrder.planningSystem"
                        :items="PlanningSystem"
                        :disabled="!status"
                        prepend-icon="mdi-anchor"
                        menu-props="auto"
                        hide-details
                        label="计划系统"
                        placeholder="选择计划系统"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        dark
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.scanningEquipment"
                        :items="ScanningEquipment"
                        prepend-icon="mdi-air-conditioner"
                        menu-props="auto"
                        hide-details
                        label="扫描设备"
                        placeholder="请选择扫描设备"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        dark
                        v-model="applicationFormValidate.ctsimOrder.scanningLocation"
                        :items="ScanningLocation"
                        :disabled="!status"
                        prepend-icon="mdi-baby"
                        menu-props="auto"
                        hide-details
                        label="扫描部位"
                        placeholder="请选择部位"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <!-- <v-col cols="12" md="4">
                      <v-menu
                        v-model="menu3"
                        :close-on-content-click="false"pa
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="applicationFormValidate.ctsimOrder.appointmentTime"
                            label="预约日期"
                            placeholder="请选择预约日期"
                            readonly
                            prepend-icon="mdi-alarm-snooze"
                            v-on="on"
                            :disabled="!status"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          header-color="#4dc9a875"
                          v-model="applicationFormValidate.ctsimOrder.appointmentTime"
                          @input="menu3 = false"
                          dark
                          locale="zh-cn"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="applicationFormValidate.ctsimOrder.appointmentTimeTwo"
                            label="预约时间"
                            readonly
                            placeholder="请选择预约时间"
                            prepend-icon="mdi-watch"
                            v-on="on"
                            :disabled="!status"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          dark
                          header-color="#4dc9a875"
                          locale="zh-cn"
                          v-if="menu2"
                          v-model="applicationFormValidate.ctsimOrder.appointmentTimeTwo"
                          full-width
                          @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>-->
                    <v-col cols="12" md="4">
                      <v-text-field
                        dark
                        label="扫描目的"
                        class="purple-input pa-3"
                        placeholder="输入扫描目的"
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.scanningPurpose"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="3">
                      <v-text-field
                        dark
                        label="扫描范围"
                        class="purple-input pa-0"
                        placeholder="输入扫描范围"
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.scanningRange"
                      />
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-radio-group
                        dark
                        label="扫描方式"
                        v-model="applicationFormValidate.ctsimOrder.scanningMode"
                        row
                        :disabled="!status"
                      >
                        <v-radio label="平躺" :value="0"></v-radio>
                        <v-radio label="增强" :value="1"></v-radio>
                        <v-radio label="平扫增强" :value="2"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-text-field
                        dark
                        label="扫描厚度"
                        class="purple-input pa-0"
                        suffix="mm"
                        placeholder="输入扫描厚度"
                        :disabled="!status"
                        type="number"
                        v-model="applicationFormValidate.ctsimOrder.scanningLayerThickness"
                      />
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-radio-group
                        dark
                        label="扫描过程"
                        v-model="applicationFormValidate.ctsimOrder.scanningProcess"
                        row
                        :disabled="!status"
                      >
                        <v-radio label="头先进" :value="0"></v-radio>
                        <v-radio label="脚先进" :value="1"></v-radio>
                        <v-radio label="扫描时确定" :value="2"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-radio-group
                        dark
                        label="碘过敏试验"
                        v-model="applicationFormValidate.ctsimOrder.iodineAllergyTest"
                        row
                        :disabled="!status"
                      >
                        <v-radio label="阳性" :value="0"></v-radio>
                        <v-radio label="阴性" :value="1"></v-radio>
                        <v-radio label="未作" :value="2"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        dark
                        label="其他要求"
                        class="purple-input pa-3"
                        placeholder="输入其他要求"
                        :disabled="!status"
                        v-model="applicationFormValidate.ctsimOrder.otherRequirements"
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-card>
            </v-expansion-panel>
            <v-expansion-panel>
              <!-- <Affix v-if="searchBarFixed">
                <v-card :disabled="remarkDisabled" >
                  <v-row class="purple-input pa-7">
                    <v-col cols="12" md="12">
                      <v-text-field
                        label="备注"
                        color="black"
                        class="purple-input pa-0"
                        placeholder="输入备注"
                        v-model="applicationFormValidate.ctsimPatients.sessionRemarks"
                      />
                      <v-btn @click="agree()" color="#4dc9a875">同意</v-btn>
                      <v-btn color="red" @click="disagree()">不同意</v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </Affix>-->
              <v-card elevation="0">
                <v-row class="purple-input pa-7">
                  <v-col cols="12" md="12">
                    <v-btn
                      color="#4dc9a875"
                      v-if="status"
                      @click="handleListenEvent('applicationFormValidateSave')"
                    >
                      <span>提交</span>
                    </v-btn>
                    <v-btn
                      color="#4dc9a875"
                      v-else
                      @click="handleListenEvent('applicationFormValidateEdit')"
                    >
                      <span>修改</span>
                    </v-btn>
                    <v-btn
                      color="#4dc9a875"
                      v-print="'#printTargetingApplication'"
                      v-if="!status"
                    >打印</v-btn>
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
import PageRequest from "@/store/entities/page-request";
import Patient from "../../../../store/entities/patient";
import FormBasic from "../../../basicInfo/formBasic.vue";
import TargetingApplication from "../../../../store/entities/patientTreatment/targetingApplication";
import patientSearchItem from "./../../../customize/patientSearchItem.vue";
import patient from "../../../../store/entities/patientTreatment/headerPatientInfo";

@Component({
  components: { FormBasic, patientSearchItem }
})
export default class TargetApplicationResource extends AbpBase {
  affixInit = false;
  affixTop = 100;
  remarks: String = "111";
  searchBarFixed: boolean = false;
  isEdit = true;
  value1 = ["1"];
  value2 = ["1", "2"];
  valid: Boolean = true;
  get applicationFormValidate() {
    return Util.getUpdatePageObj(
      this.$store.state.targetingApplication.editTargetingApplication,
      "DIAGNOSTICBLOCK-EDITTARGETTINGAPPLICATION",
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }
  get currentColor() {
    return this.$store.state.targetResource.color;
  }

  get panel() {
    return [0, 1, 2, 3];
  }
  get items() {
    return [
      { text: "State 1", value: "1" },
      { text: "State 2", value: "2" },
      { text: "State 3", value: "3" },
      { text: "State 4", value: "4" },
      { text: "State 5", value: "5" },
      { text: "State 6", value: "6" },
      { text: "State 7", value: "7" }
    ];
  }
  get status() {
    return this.$store.state.patientResource.status;
  }

  set status(value) {
    this.$store.state.patientResource.status = value;
  }

  // get remarkDisabled() {
  //   return this.$store.state.targetResource.remarkDisabled;
  // }

  // set remarkDisabled(value) {
  //   this.$store.state.targetResource.remarkDisabled = value;
  // }
  get ScanningRangeUpper() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.ScanningRangeUpper;
    }
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
      .ScanningRangeUpper;
  }

  ScanningRangeUpperForRead(id) {
    if (this.ScanningRangeUpper && this.ScanningRangeUpper.length) {
      let readItem = this.ScanningRangeUpper.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get ScanningRangeLower() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.ScanningRangeLower;
    }
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
      .ScanningRangeLower;
  }

  ScanningRangeLowerForRead(id) {
    if (this.ScanningRangeLower && this.ScanningRangeLower.length) {
      let readItem = this.ScanningRangeLower.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get ScanningLocation() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.ScanningLocation;
    }
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
      .ScanningLocation;
  }

  ScanningLocationForRead(id) {
    if (this.ScanningLocation && this.ScanningLocation.length) {
      let readItem = this.ScanningLocation.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get ScanningEquipment() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.ScanningEquipment;
    }
    return JSON.parse(localStorage.getItem("content.state.rtisDict")).All
      .ScanningEquipment;
  }

  ScanningEquipmentForRead(id) {
    if (this.ScanningEquipment && this.ScanningEquipment.length) {
      let readItem = this.ScanningEquipment.filter(item => item.id === id);
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
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      time: null,
      ruleValidate: {
        "ctsimOrder.planningSystem": [
          {
            type: "number",
            required: true,
            message: "计划系统不能为空！",
            trigger: "change"
          }
        ],
        "ctsimOrder.scanningPurpose": [
          {
            required: true,
            message: "扫描目的不能为空！",
            trigger: "blur"
          }
        ],
        "ctsimOrder.scanningEquipment": [
          {
            type: "number",
            required: true,
            message: "扫描设备不能为空！",
            trigger: "change"
          }
        ],

        "ctsimOrder.appointmentTime": [
          {
            type: "date",
            required: true,
            message: "预约时间不能为空！",
            trigger: "blur"
          }
        ],
        "ctsimOrder.appointmentTimeTwo": [
          {
            required: true,
            message: "预约时间不能为空！",
            trigger: "change"
          }
        ],

        "ctsimOrder.scanningLocation": [
          {
            type: "number",
            required: true,
            message: "扫描部位不能为空！",
            trigger: "change"
          }
        ],

        "ctsimOrder.scanningRangeUpper": [
          {
            type: "number",
            required: true,
            message: "上界不能为空！",
            trigger: "change"
          }
        ],

        "ctsimOrder.scanningRangeLower": [
          {
            type: "number",
            required: true,
            message: "下界不能为空！",
            trigger: "change"
          }
        ],

        "ctsimOrder.fixedPosition": [
          {
            required: true,
            message: "固定部位不能为空！",
            trigger: "blur"
          }
        ],

        "ctsimOrder.requirements": [
          {
            required: true,
            message: "特殊要求不能为空！",
            trigger: "blur"
          }
        ],
        "ctsimOrder.fixedEquipment": [
          {
            required: true,
            message: "固定装置不能为空！",
            trigger: "blur"
          }
        ]
      }
    };
  }

  get isReview() {
    return true;
  }
  handleListenEvent(name) {
    switch (name) {
      case "applicationFormValidateEdit":
        this.status = true;
        break;
      case "applicationFormValidateSave":
        this.handleSubmit(name);
        break;
      default:
        break;
    }
  }
  async handleSubmit(name) {
    if ((this.$refs.applicationFormValidate as any).validate()) {
      let success = await this.$store.dispatch({
        type: "patientResource/createSimulatedPositioningAsync",
        data: this.applicationFormValidate
      });
      if (success) {
        this.isEdit = false;
        this.$Message.success("录入成功");
      }
    }
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
    let offsetTop = (this.$refs
      .applicationFormValidate as any).$el.getBoundingClientRect().top;

    -100 > offsetTop
      ? (this.searchBarFixed = true)
      : (this.searchBarFixed = false);
    // console.log(offsetTop);

    console.log(this.searchBarFixed);
  }

  beforeRouteLeave(to, from, next) {
    // (this.$refs["applicationFormValidate"] as any).resetFields();
    // this.applicationFormValidate = new TargetingApplication();
    next();
  }
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.status = true;
    });
  }
}
</script>

<style scoped>
.target-affixPosition {
  width: 200px;
  margin-right: 16px;
  float: right;
}
.target-flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: v-row-reverse;
  flex-direction: v-row-reverse;
  float: right;
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

.font-weight-light {
  color: #fff;
}

.form-height {
  padding: 0px 20px;
  height: calc(80vh) !important;
  overflow: auto;
}
</style>

