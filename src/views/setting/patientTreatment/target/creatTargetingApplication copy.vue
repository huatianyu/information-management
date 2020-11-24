<template>
  <div>
    <Affix v-if="searchBarFixed" class="target-affixPosition" :offset-top="72">
      <div class="target-flex-container">
        <Button
          v-if="isEdit"
          @click="handleListenEvent('applicationFormValidateSave')"
          style="margin-left: 8px"
          type="primary"
        >
          <span>提交</span>
        </Button>
        <Button type="primary" v-else @click="handleListenEvent('applicationFormValidateEdit')">
          <span>修改</span>
        </Button>
        <Button
          style="margin-left: 8px"
          type="primary"
          v-print="'#printTargetingApplication'"
          v-if="!isEdit"
        >打印</Button>
        <Button style="margin-left: 8px" type="primary" @click="goback">
          <span>返回</span>
        </Button>
      </div>
    </Affix>
    <Card title="定位申请单" style="overflow-y:auto;" dis-hover>
      <a href="#" slot="extra">
        <Button
          v-if="isEdit"
          @click="handleListenEvent('applicationFormValidateSave')"
          type="primary"
          style="margin-left: 8px"
        >
          <span>提交</span>
        </Button>
        <Button type="primary" v-else @click="handleListenEvent('applicationFormValidateEdit')">
          <span>修改</span>
        </Button>
        <Button
          style="margin-left: 8px"
          class="flex-item"
          type="primary"
          v-print="'#printTargetingApplication'"
          v-if="!isEdit"
        >打印</Button>
        <Button style="margin-left: 8px" type="primary" @click="goback">
          <span>返回</span>
        </Button>
      </a>

      <div class="page-body">
        <div id="printTargetingApplication">
          <Form
            ref="applicationFormValidate"
            :aria-disabled="false"
            :model="applicationFormValidate"
            :rules="ruleValidate"
            :label-width="80"
          >
            <div class="table" cellspacing="0">
              <Collapse v-model="value1" class="hidden-border">
                <Panel hide-arrow name="1">
                  <div style="text-align:center">
                    <b>定位申请单</b>
                  </div>
                  <p slot="content">
                    <formBasic :patient="applicationFormValidate.ctsimPatients"></formBasic>
                  </p>
                </Panel>
              </Collapse>

              <Collapse v-model="value2" class="hidden-border">
                <Panel hide-arrow name="1">
                  <div style="text-align:center">
                    <b>体位固定要求</b>
                  </div>
                  <p slot="content">
                    <Row :gutter="10">
                      <Col span="6">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('是否制模')+':'"
                          style=" width:100%"
                        >
                          <RadioGroup v-model="applicationFormValidate.ctsimOrder.isFixed">
                            <Radio :label="1">是</Radio>
                            <Radio :label="0">否</Radio>
                          </RadioGroup>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('是否制模')+':'"
                          style=" width:100%"
                        >
                          <label
                            for="isFixed"
                          >{{applicationFormValidate.ctsimOrder.isFixed == 0?'是':'否'}}</label>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="10" v-if="applicationFormValidate.ctsimOrder.isFixed">
                      <Col span="24">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('固定部位')+':'"
                          style="width:100%"
                          prop="ctsimOrder.fixedPosition"
                        >
                          <Input
                            :disabled="applicationFormValidate.ctsimOrder.isFixed ? false : 'true'"
                            v-model="applicationFormValidate.ctsimOrder.fixedPosition"
                            :placeholder="L('输入固定部位')"
                          ></Input>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('固定部位')+':'"
                          style="width:100%"
                        >
                          <label
                            for="fixedPosition"
                          >{{applicationFormValidate.ctsimOrder.fixedPosition}}</label>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="24">
                        <FormItem v-if="isEdit" :labelWidth="110" :label="L('体位')+':'">
                          <RadioGroup v-model="applicationFormValidate.ctsimOrder.bodyPosition">
                            <Radio :label="0">仰卧</Radio>
                            <Radio :label="1">俯卧</Radio>
                            <Radio :label="2">左侧卧</Radio>
                            <Radio :label="3">右侧卧</Radio>
                            <Radio :label="4">其他</Radio>
                          </RadioGroup>

                          <Input
                            style="width:100px"
                            v-if="applicationFormValidate.ctsimOrder.bodyPosition!==4 ? false : 'true'"
                            :placeholder="L('输入体位')"
                          ></Input>
                        </FormItem>
                        <FormItem v-else :labelWidth="110" :label="L('体位')+':'">
                          <RadioGroup v-model="applicationFormValidate.ctsimOrder.bodyPosition">
                            <Radio disabled :label="0">仰卧</Radio>
                            <Radio disabled :label="1">俯卧</Radio>
                            <Radio disabled :label="2">左侧卧</Radio>
                            <Radio disabled :label="3">右侧卧</Radio>
                            <Radio disabled :label="4">其他</Radio>
                          </RadioGroup>
                          <Input
                            disabled
                            style="width:100px"
                            v-if="applicationFormValidate.ctsimOrder.bodyPosition!==4 ? false : 'true'"
                            :placeholder="L('输入体位')"
                          ></Input>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="24">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('特殊要求')+':'"
                          style="width:100%"
                          prop="ctsimOrder.requirements"
                        >
                          <Input
                            v-model="applicationFormValidate.ctsimOrder.requirements"
                            :placeholder="L('输入特殊要求')"
                          ></Input>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('特殊要求')+':'"
                          style="width:100%"
                          prop="ctsimOrder.requirements"
                        >
                          <label>{{applicationFormValidate.ctsimOrder.requirements}}</label>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="24">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('固定装置')+':'"
                          style="width:100%"
                          prop="ctsimOrder.fixedEquipment"
                        >
                          <Input
                            v-model="applicationFormValidate.ctsimOrder.fixedEquipment"
                            :placeholder="L('输入固定装置')"
                          ></Input>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('固定装置')+':'"
                          style="width:100%"
                          prop="ctsimOrder.fixedEquipment"
                        >
                          <label>{{applicationFormValidate.ctsimOrder.fixedEquipment}}</label>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="24">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('备注')+':'"
                          style="width:100%"
                          prop="ctsimOrder.remarks"
                        >
                          <Input
                            v-model="applicationFormValidate.ctsimOrder.remarks"
                            :placeholder="L('输入备注')"
                          ></Input>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('备注')+':'"
                          style="width:100%"
                          prop="ctsimOrder.remarks"
                        >
                          <label for="remarks">{{applicationFormValidate.ctsimOrder.remarks}}</label>
                        </FormItem>
                      </Col>
                    </Row>
                  </p>
                </Panel>

                <Panel hide-arrow name="2">
                  <div style="text-align:center">
                    <b>CT扫描要求</b>
                  </div>
                  <p slot="content">
                    <Row :gutter="10">
                      <Col span="10">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('计划系统')+':'"
                          style="width:100%"
                          prop="ctsimOrder.planningSystem"
                        >
                          <Select
                            v-model="applicationFormValidate.ctsimOrder.planningSystem"
                            :placeholder="L('请选择计划系统')"
                          >
                            <Option v-for="item in PlanningSystem" :value="item.id">{{item.value}}</Option>
                          </Select>
                        </FormItem>

                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('计划系统')+':'"
                          style="width:100%"
                          prop="ctsimOrder.planningSystem"
                        >
                          <label
                            for="planningSystem"
                          >{{ PlanningSystemForRead(applicationFormValidate.ctsimOrder.planningSystem)}}</label>
                        </FormItem>
                      </Col>
                      <Col span="14">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('扫描目的')+':'"
                          style="width:100%"
                          prop="ctsimOrder.scanningPurpose"
                        >
                          <Input
                            v-model="applicationFormValidate.ctsimOrder.scanningPurpose"
                            :placeholder="L('输入扫描目的')"
                          ></Input>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('扫描目的')+':'"
                          style="width:100%"
                          prop="ctsimOrder.scanningPurpose"
                        >
                          <label
                            for="scanningPurpose"
                          >{{applicationFormValidate.ctsimOrder.scanningPurpose}}</label>
                        </FormItem>
                      </Col>
                    </Row>

                    <Row :gutter="10">
                      <Col span="10">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('扫描设备')+':'"
                          style="width:100%"
                          prop="ctsimOrder.scanningEquipment"
                        >
                          <Select
                            v-model="applicationFormValidate.ctsimOrder.scanningEquipment"
                            :placeholder="L('请选择扫描设备')"
                          >
                            <Option
                              v-for="item in ScanningEquipment"
                              :value="item.id"
                            >{{item.value}}</Option>
                          </Select>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('扫描设备')+':'"
                          style="width:100%"
                          prop="ctsimOrder.scanningEquipment"
                        >
                          <label
                            for="scanningEquipment"
                          >{{ScanningEquipmentForRead(applicationFormValidate.ctsimOrder.scanningEquipment) }}</label>
                        </FormItem>
                      </Col>
                      <Col span="14">
                        <Row>
                          <Col span="11">
                            <FormItem
                              v-if="isEdit"
                              :labelWidth="110"
                              :label="L('预约日期')+':'"
                              style="width:100%"
                              prop="ctsimOrder.appointmentTime"
                            >
                              <DatePicker
                                type="date"
                                value-format="yyyy-MM-dd"
                                v-model="applicationFormValidate.ctsimOrder.appointmentTime"
                                :placeholder="L('请输入预约日期')"
                              ></DatePicker>
                            </FormItem>
                            <FormItem
                              v-else
                              :labelWidth="110"
                              :label="L('预约日期')+':'"
                              style="width:100%"
                              prop="ctsimOrder.appointmentTime"
                            >
                              <label
                                for="appointmentTime"
                              >{{applicationFormValidate.ctsimOrder.appointmentTime | date('%Y-%m-%d') }}</label>
                            </FormItem>
                          </Col>
                          <Col span="11">
                            <FormItem
                              v-if="isEdit"
                              :labelWidth="110"
                              :label="L('预约时间')+':'"
                              style="width:100%"
                              prop="ctsimOrder.appointmentTimeTwo"
                            >
                              <TimePicker
                                type="time"
                                v-model="applicationFormValidate.ctsimOrder.appointmentTimeTwo"
                                placeholder="选择时间"
                              ></TimePicker>
                            </FormItem>
                            <FormItem
                              v-else
                              :labelWidth="110"
                              :label="L( '预约时间')+':'"
                              style="width:100%"
                              prop="ctsimOrder.appointmentTimeTwo"
                            >
                              <label
                                for="appointmentTimeTwo"
                              >{{ applicationFormValidate.ctsimOrder.appointmentTimeTwo }}</label>
                            </FormItem>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="10">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('扫描部位')+':'"
                          style="width:100%"
                          prop="ctsimOrder.scanningLocation"
                        >
                          <Select
                            v-model="applicationFormValidate.ctsimOrder.scanningLocation"
                            :placeholder="L('请选择部位')"
                          >
                            <Option v-for="item in ScanningLocation" :value="item.id">{{item.value}}</Option>
                          </Select>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('扫描部位')+':'"
                          style="width:100%"
                          prop="ctsimOrder.scanningLocation"
                        >
                          <label
                            for="scanningLocation"
                          >{{ ScanningLocationForRead(applicationFormValidate.ctsimOrder.scanningLocation) }}</label>
                        </FormItem>
                      </Col>
                      <Col span="10">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('扫描范围')+':'"
                          style="width:100%"
                          prop="ctsimOrder.scanningRange"
                        >
                          <Input
                            v-model="applicationFormValidate.ctsimOrder.scanningRange"
                            :placeholder="L('输入范围')"
                          ></Input>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('扫描范围')+':'"
                          prop="ctsimOrder.scanningRange"
                        >
                          <Row>
                            <Col span="6">
                              <label
                                for="scanningRange"
                              >{{applicationFormValidate.ctsimOrder.scanningRange }}</label>
                            </Col>
                          </Row>
                        </FormItem>
                      </Col>
                    </Row>

                    <Row :gutter="10">
                      <Col span="10">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('扫描方式')+':'"
                          style=" width:100%"
                        >
                          <RadioGroup v-model="applicationFormValidate.ctsimOrder.scanningMode">
                            <Radio :label="0">平扫</Radio>
                            <Radio :label="1">增强</Radio>
                            <Radio :label="2">平扫增强</Radio>
                          </RadioGroup>
                        </FormItem>

                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('扫描方式')+':'"
                          style=" width:100%"
                        >
                          <RadioGroup v-model="applicationFormValidate.ctsimOrder.scanningMode">
                            <Radio disabled :label="0">平扫</Radio>
                            <Radio disabled :label="1">增强</Radio>
                            <Radio disabled :label="2">平扫增强</Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>

                      <Col span="14">
                        <Col span="6">
                          <FormItem
                            v-if="isEdit"
                            :labelWidth="110"
                            :label="L('扫描厚度')+':'"
                            style=" width:100%"
                          >
                            <InputNumber
                              :max="10"
                              :min="1"
                              v-model="applicationFormValidate.ctsimOrder.scanningLayerThickness"
                              :formatter="value => `${value}mm`"
                              :parser="value => value.replace('mm', '')"
                            ></InputNumber>
                          </FormItem>

                          <FormItem
                            v-else
                            :labelWidth="110"
                            :label="L('扫描厚度')+':'"
                            style=" width:100%"
                          >
                            <label>{{applicationFormValidate.ctsimOrder.scanningLayerThickness + 'mm'}}</label>
                          </FormItem>
                        </Col>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="10">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('扫描过程')+':'"
                          style=" width:100%"
                        >
                          <RadioGroup v-model="applicationFormValidate.ctsimOrder.scanningProcess">
                            <Radio :label="0">头先进</Radio>
                            <Radio :label="1">脚先进</Radio>
                            <Radio :label="2">扫描时确定</Radio>
                          </RadioGroup>
                        </FormItem>

                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('扫描过程')+':'"
                          style=" width:100%"
                        >
                          <RadioGroup v-model="applicationFormValidate.ctsimOrder.scanningProcess">
                            <Radio disabled :label="0">头先进</Radio>
                            <Radio disabled :label="1">脚先进</Radio>
                            <Radio disabled :label="2">扫描时确定</Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                      <Col span="10">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('碘过敏试验')+':'"
                          style=" width:100%"
                        >
                          <RadioGroup
                            v-model="applicationFormValidate.ctsimOrder.iodineAllergyTest"
                          >
                            <Radio :label="0">阳性</Radio>
                            <Radio :label="1">阴性</Radio>
                            <Radio :label="2">未作</Radio>
                          </RadioGroup>
                        </FormItem>
                        <FormItem
                          v-else
                          :labelWidth="110"
                          :label="L('碘过敏试验')+':'"
                          style=" width:100%"
                        >
                          <RadioGroup
                            v-model="applicationFormValidate.ctsimOrder.iodineAllergyTest"
                          >
                            <Radio disabled :label="0">阳性</Radio>
                            <Radio disabled :label="1">阴性</Radio>
                            <Radio disabled :label="2">未作</Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row :gutter="10">
                      <Col span="24">
                        <FormItem
                          v-if="isEdit"
                          :labelWidth="110"
                          :label="L('其他要求')+':'"
                          style="width:100%"
                          prop="ctsimOrder.otherRequirements"
                        >
                          <Input
                            v-model="applicationFormValidate.ctsimOrder.otherRequirements"
                            :placeholder="L('输入其他要求')"
                          ></Input>
                        </FormItem>
                        <FormItem
                          v-else
                          prop="ctsimOrder.otherRequirements"
                          :labelWidth="110"
                          :label="L('其他要求')+':'"
                          style="width:100%"
                        >
                          <label
                            for="otherRequirements"
                          >{{applicationFormValidate.ctsimOrder.otherRequirements}}</label>
                        </FormItem>
                      </Col>
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
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";
import Component from "vue-class-component";

import Patient from "../../../../store/entities/patient";
import FormBasic from "../../../basicInfo/formBasic.vue";

import TargetingApplication from "../../../../store/entities/patientTreatment/targetingApplication";

@Component({
  components: { FormBasic }
})
export default class TargetingApplications extends AbpBase {
  // applicationFormValidate: TargetingApplication = new TargetingApplication();

  get applicationFormValidate() {
    return Util.getUpdatePageObj(
      this.$store.state.targetingApplication.editTargetingApplication,
      "DIAGNOSTICBLOCK-EDITTARGETTINGAPPLICATION",
      this.$store.state.patientResource.patientResource.patientInfo.patient
        .radiotherapyNum
    );
  }

  // set applicationFormValidate(value) {
  //   this.$store.state.targetingApplication.editTargetingApplication = value;
  // }

  // tempApplication: TargetingApplication = new TargetingApplication();
  applicationForm: String = "applicationForEdit";
  affixInit = false;
  affixTop = 100;
  searchBarFixed = false;
  status: Number;
  isEdit = true;
  value1 = ["1"];
  value2 = ["1", "2"];

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
  goback() {
    this.$router.go(-1); //返回上一层
  }

  handleSubmit(name) {
    (this.$refs.applicationFormValidate as any).validate(
      async (valid: boolean) => {
        if (valid) {
          await this.$store.dispatch({
            type: "patientResource/createSimulatedPositioningAsync",
            data: this.applicationFormValidate
          });
          this.isEdit = false;
          this.$Message.success("录入成功");
        }
      }
    );
  }

  // 修改
  handleEdit(name) {
    // if (!this.$store.state.patient.status) {
    //   this.$store.commit("patient/isEdit");
    //   return;
    // }
  }

  handleListenEvent(name) {
    switch (name) {
      case "applicationFormValidateEdit":
        this.applicationForm = "applicationForEdit";
        this.isEdit = true;
        break;
      case "applicationFormValidateSave":
        this.handleSubmit(name);
        break;
      default:
        break;
    }
  }
  handleReset(name) {
    this.$store.commit("patient/isCreat");
    (this.$refs[name] as any).resetFields();
    // this.applicationFormValidate = new TargetingApplication();
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

    20 > offsetTop
      ? (this.searchBarFixed = true)
      : (this.searchBarFixed = false);
    // console.log(offsetTop);

  }
  beforeRouteLeave(to, from, next) {
    (this.$refs["applicationFormValidate"] as any).resetFields();
    // this.applicationFormValidate = new TargetingApplication();
    next();
  }
  // beforeRouteEnter(to, from, next) {
  //   ;
  //   next(vm => {
  //     vm.isEdit = true;
  //   });
  // }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      // // vm.applicationFormValidate = JSON.parse(to.params.prrams);
      // if (to.params.params) {
      //   vm.applicationFormValidate = JSON.parse(to.params.params);
      vm.isEdit = true;
      vm.searchBarFixed = false;
      //   localStorage.setItem("creatApplicationFormValidate", to.params.params);
      //   // localStorage.setItem("targetingApplicationisReview", );
      // }
      // vm.applicationForm = "applicationForEdit";
      // vm.value1 = ["1", "2", "3"];
      // //防止刷新页面数据消失
      // if (from.fullPath === "/") {
      //   vm.applicationFormValidate = JSON.parse(
      //     localStorage.getItem("creatApplicationFormValidate")
      //   );
      // }
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
  margin-right: 16px;
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
</style>




