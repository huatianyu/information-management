<template>
  <div class="form-height">
    <material-card
      color="#4dc9a875"
      title="患者登记表"
      :showBackBtn="false"
      text="患者登记内容表单"
    >
      <v-form
        ref="formValidate"
        dark
        v-model="valid"
        lazy-validation
        :v-text-field-width="80"
      >
        <v-row class="pa-6">
          <v-col xl="9" md="9" sm="10" cols="12">
            <v-row>
              <v-col>
                <v-text-field
                  label="姓名"
                  class="purple-input pa-0"
                  placeholder="输入姓名"
                  :disabled="!status"
                  dark
                  v-model="formValidate.patient.patientName"
                  :rules="[v => !!v || '请输入姓名']"
                />
              </v-col>
              <v-col>
                <v-select
                  dark
                  v-model="formValidate.patient.idType"
                  :items="IDType"
                  class="purple-input pa-0"
                  menu-props="auto"
                  hide-details
                  label="证件类型"
                  :disabled="!status"
                  placeholder="请选择类型"
                  :rules="[v => !!v || '请选择类型']"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  label="证件号"
                  class="purple-input pa-0"
                  placeholder="输入证件号"
                  :disabled="!status"
                  dark
                  v-model="formValidate.patient.idNumber"
                  :rules="idNumber"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="年龄"
                  class="purple-input pa-0"
                  placeholder="请输入年龄"
                  type="number"
                  :disabled="!status"
                  :rules="[v => !!v || '请输入年龄']"
                  dark
                  v-model="formValidate.patient.age"
                />
              </v-col>
              <v-col>
                <v-radio-group
                  label="性别"
                  dark
                  v-model="formValidate.patient.sex"
                  row
                  :rules="sex"
                  :disabled="!status"
                  class="purple-input pa-0"
                >
                  <v-radio label="男" :value="0"></v-radio>
                  <v-radio label="女" :value="1"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <v-text-field
                  label="电话"
                  class="purple-input pa-0"
                  placeholder="请输入电话"
                  :rules="phoneNumber"
                  :disabled="!status"
                  dark
                  v-model="formValidate.patient.phoneNumber"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="3" lg="3" xl="3" md="3">
                <v-select
                  :disabled="!status"
                  dark
                  v-model="formValidate.patient.chiefDoctorId"
                  :items="ChiefDoctors"
                  class="purple-input pa-0"
                  menu-props="auto"
                  hide-details
                  :rules="[v => !!v || '请选择主管医师']"
                  label="主管医师"
                  placeholder="请选择主管医师"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col xl="2" md="2" sm="2" cols="12">
            <v-row>
              <v-col offset="2">
                <FormItem>
                  <div class="img-patient-selecter">
                    <div
                      class="img-flex"
                      @mouseover="mouseoverEvent"
                      @mouseleave="mouseleaveEvent"
                    >
                      <v-img
                        class="img-flex-item1"
                        :src="imgSrc"
                        onerror="this.src='../../../../static/noImage.png'"
                      />
                      <div class="changeImag" v-if="status">
                        <ul class="img-button-ui">
                          <li>
                            <a href="#" @click="$refs.camera.show()">拍照</a>
                          </li>
                          <li>
                            <a @click="changePicture">选择</a>
                          </li>
                          <li>
                            <a @click="deletePicture()">删除</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </FormItem>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-expansion-panels v-model="panel" multiple light>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span class="title font-weight-light">基本信息</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <!-- <FormItem v-if="status" :label="L('身高')+':'" style="width:100%">
                      <Input
                        :readonly="status ? false : 'readonly'"
                        clearable
                        number
                        dark v-model="formValidate.patient.height"
                        :placeholder="L('输入身高')"
                        type="number"
                      >
                        <span slot="append">cm</span>
                      </Input>
                    </FormItem>
                    <FormItem v-else :label="L('身高')+':'" style="width:100%">
                      <Label>{{formValidate.patient.height}}</Label>
                  </FormItem>-->

                  <v-text-field
                    label="身高"
                    class="purple-input pa-0"
                    suffix="cm"
                    placeholder="请输入身高"
                    type="number"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.height"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="体重"
                    class="purple-input pa-0"
                    suffix="Kg"
                    placeholder="请输入体重"
                    type="number"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.weight"
                  />
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="formValidate.patient.folk"
                    :items="Nation"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="民族"
                    :disabled="!status"
                    placeholder="请选择民族"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="备用电话"
                    class="purple-input pa-0"
                    placeholder="输入备用电话号"
                    :disabled="!status"
                    :rules="secondPhone"
                    dark
                    v-model="formValidate.patient.secondPhone"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="医保卡号"
                    class="purple-input pa-0"
                    placeholder="输入医保卡号"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.societyId"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="工作单位"
                    class="purple-input pa-0"
                    placeholder="输入工作单位"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.workUnit"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    label="地址"
                    class="purple-input pa-0"
                    placeholder="输入地址"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.address"
                  />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col>
                  <div style="width: 100%;  border-top: 1px solid  #e8eaec;"></div>
                  <br />
                </v-col>
              </v-row>-->
              <v-row>
                <v-col>
                  <v-text-field
                    label="病史"
                    class="purple-input pa-0"
                    placeholder="输入病史"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.medicalHistory"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="过敏史"
                    class="purple-input pa-0"
                    placeholder="输入过敏史"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.allergyHistory"
                  />
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="formValidate.patient.smokingStatus"
                    :items="SmokingStatus"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="吸烟状况"
                    :disabled="!status"
                    placeholder="请选择吸烟状况"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="职业"
                    class="purple-input pa-0"
                    placeholder="输入职业"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.occupation"
                  />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col>
                  <div style="width: 100%;  border-top: 1px solid  #e8eaec;"></div>
                  <br />
                </v-col>
              </v-row>-->
              <v-row>
                <v-col>
                  <v-select
                    dark
                    v-model="formValidate.patient.hisPatientType"
                    :items="HisInfoType"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="患者类型"
                    :disabled="!status"
                    placeholder="请选择患者类型"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="患者编号"
                    class="purple-input pa-0"
                    :placeholder="
                      L(
                        '输入' +
                          (formValidate.patient.hisPatientType != 1
                            ? '住院'
                            : '门诊') +
                          '号'
                      )
                    "
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.clinicPatientId"
                  />
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="formValidate.patient.payment"
                    :items="PaymentMethod"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="付款方式"
                    :disabled="!status"
                    placeholder="请选择付款方式"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row v-if="formValidate.patient.hisPatientType != 1">
                <v-col>
                  <v-text-field
                    label="病区"
                    class="purple-input pa-0"
                    placeholder="输入病区"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.inpatientArea"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="房间号"
                    class="purple-input pa-0"
                    placeholder="输入房间号"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.sickroomNumber"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="床号"
                    class="purple-input pa-0"
                    placeholder="输入床号"
                    :disabled="!status"
                    dark
                    v-model="formValidate.patient.sickBedNumber"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-card class="pa-6" v-if="formValidate.diagnosis">
          <v-card-title>
            <span class="title font-weight-light">诊断信息</span>
          </v-card-title>
          <v-row>
            <v-col>
              <v-row style="margin-top:30px">
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis.diseaseType
                    "
                    :items="DiseaseType"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="病发类型"
                    :disabled="!status"
                    placeholder="请选择病发类型"
                  ></v-select>
                </v-col>

                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis.primaryPosition
                    "
                    :items="PrimaryPosition"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="原发部位"
                    :disabled="!status"
                    placeholder="请选择原发部位"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis
                        .diseasesClassification
                    "
                    :items="ICDClass"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="疾病类型"
                    :disabled="!status"
                    placeholder="请选择疾病类型"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="临床诊断"
                    class="purple-input pa-0"
                    placeholder="输入临床诊断"
                    :disabled="!status"
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis.clinicalDiagnosis
                    "
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis.pathologicalType
                    "
                    :items="PathologyType"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="病理类型"
                    :disabled="!status"
                    placeholder="请选择病理类型"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="病理诊断"
                    class="purple-input pa-0"
                    placeholder="输入病理诊断"
                    :disabled="!status"
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis
                        .pathologicalDiagnosis
                    "
                  />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col>
                  <div style="width: 100%;  border-top: 1px solid  #e8eaec;"></div>
                  <br />
                </v-col>
              </v-row>-->
              <v-row>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis.stageMethod
                    "
                    :items="StagesType"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="TNM分期依据"
                    :disabled="!status"
                    placeholder="请选择TNM分期依据"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="formValidate.diagnosis.patientDiagnosis.tStage"
                    :items="TNMT"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="TNM分期-T"
                    :disabled="!status"
                    placeholder="请选择类型"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="formValidate.diagnosis.patientDiagnosis.nStage"
                    :items="TNMN"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="TNM分期-N"
                    :disabled="!status"
                    placeholder="请选择类型"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="formValidate.diagnosis.patientDiagnosis.mStage"
                    :items="TNMM"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="TNM分期-M"
                    :disabled="!status"
                    placeholder="请选择类型"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="TNM分期备注"
                    class="purple-input pa-0"
                    placeholder="输入TNM分期备注"
                    :disabled="!status"
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis.stageRemark
                    "
                  />
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col>
                  <div style="width: 100%;  border-top: 1px solid  #e8eaec;"></div>
                  <br />
                </v-col>
              </v-row>-->
              <v-row>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.hospitalizedScoreDiagnosis.kps
                    "
                    :items="HospitalScoreKPS"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="入院KPS评分"
                    :disabled="!status"
                    placeholder="请选择评分"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.hospitalizedScoreDiagnosis.zps
                    "
                    :items="HospitalScoreZPS"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="入院ZPS评分"
                    :disabled="!status"
                    placeholder="请选择评分"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.hospitalizedScoreDiagnosis.qol
                    "
                    :items="HospitalScoreQOL"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="入院QOL评分"
                    :disabled="!status"
                    placeholder="请选择评分"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.hospitalizedScoreDiagnosis.pain
                    "
                    :items="HospitalScoreAche"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="入院疼痛评分"
                    :disabled="!status"
                    placeholder="请输入评分"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.hospitalizedScoreDiagnosis
                        .nutrition
                    "
                    :items="HospitalScoreNutrition"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="入院营养评分"
                    :disabled="!status"
                    placeholder="请输入评分"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    dark
                    v-model="
                      formValidate.diagnosis.hospitalizedScoreDiagnosis.agony
                    "
                    :items="HospitalScorePain"
                    class="purple-input pa-0"
                    menu-props="auto"
                    hide-details
                    label="入院痛苦评分"
                    :disabled="!status"
                    placeholder="请输入评分"
                  ></v-select>
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col>
                  <div style="width: 100%;  border-top: 1px solid  #e8eaec;"></div>
                  <br />
                </v-col>
              </v-row>-->
              <v-row>
                <v-col>
                  <v-text-field
                    label="身体状况"
                    class="purple-input pa-0"
                    placeholder="请输入身体状况"
                    :disabled="!status"
                    dark
                    v-model="
                      formValidate.diagnosis.patientDiagnosis.physiqueCondition
                    "
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-row>
          <v-col v-show="status" offset="5">
            <v-btn
              color="#4dc9a875"
              v-if="!formValidate.diagnosis"
              @click="handleAdd"
              >添加诊断信息</v-btn
            >
            <v-btn color="#4dc9a875" v-else @click="handleRemove()"
              >删除诊断信息</v-btn
            >
          </v-col>
        </v-row>
      </v-form>

      <v-card>
        <v-row class="purple-input pa-7">
          <v-col cols="12" md="12">
            <v-btn @click="handleReset('formValidate')" color="#4dc9a875"
              >新建</v-btn
            >
            <v-btn
              v-if="!status"
              @click="handleEdit('formValidate')"
              color="#4dc9a875"
              >修改</v-btn
            >
            <v-btn
              v-else
              @click="handleSubmit('formValidate')"
              color="#4dc9a875"
              >提交</v-btn
            >
            <v-btn @click="goback(status)" color="#4dc9a875">返回</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </material-card>
    <Camera ref="camera"></Camera>
    <uploadImg
      @on-show="changeProfilePictureShow"
      :changeProfilePicture="changeProfilePicture"
    ></uploadImg>
  </div>
</template>

<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import PageRequest from '@/store/entities/page-request';
import Patient from '../../../store/entities/patient';
import Diagnosis from '../../../store/entities/patientTreatment/diagnosis';
import Camera from '@/components/camera/main.vue';
import PatientTreatmentDetail from '../../../store/entities/patientTreatment/patientTreatmentDetail';
import uploadImg from './uploadImg.vue';
// import { validationMixin } from "vuelidate";
// import { required, maxLength, email } from "vuelidate/lib/validators";
class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null;
  from: Date;
  to: Date;
}

@Component({
  components: {Camera, uploadImg},
})
export default class Patients extends AbpBase {
  formValidate: PatientTreatmentDetail = new PatientTreatmentDetail();
  activeName: String = 'name1';
  affixInit = false;
  affixTop = 100;
  searchBarFixed = false;
  collapseShow = false;
  changeProfilePicture = false;
  uploadPicture = '上传头像';
  isRequireTreatmentMethod = 'patientDiagnosis.treatmentMethod';
  isRequireTreatmentCount = 'patientDiagnosis.treatmentCount';
  isRequireRayType = 'patientDiagnosis.rayType';
  isRequireEnergy = 'patientDiagnosis.energy';
  panel = [0, 1, 2];
  valid: Boolean = true;
  value2 = '1';

  data() {
    return {
      idNumber: [
        v => !!v || '请输入身份证号',
        v =>
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
            v
          ) || '身份证号码不符合规范',
      ],
      phoneNumber: [
        v => !!v || '请输入电话号',
        v =>
          /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(v) || '电话号不符合规范',
      ],
      secondPhone: [
        v =>
          !v ||
          /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(v) ||
          '电话号不符合规范',
      ],

      sex: [v => v != null || '请输入性别'],

      pathologicalDiagnosis: [],
    };
  }

  get HisInfoType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.HisInfoType;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.HisInfoType;
  }

  HisInfoTypeForRead(id) {
    let readItem = this.HisInfoType.filter(item => item.id === id);
    if (readItem.length) {
      return readItem[0].value;
    }
  }
  get TreatmentMethod() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.TreatmentMethod;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.TreatmentMethod;
  }

  TreatmentMethodForRead(id) {
    if (this.TreatmentMethod && this.TreatmentMethod.length) {
      let readItem = this.TreatmentMethod.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  get IDType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.IDType;
    } else {
      return JSON.parse(localStorage.getItem('content.state.rtisDict'))
        .PatientInfo.IDType;
    }
  }

  IDTypeForRead(id) {
    if (this.IDType && this.IDType.length) {
      let readItem = this.IDType.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  get Nation() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.Nation;
    } else {
      return JSON.parse(localStorage.getItem('content.state.rtisDict'))
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
  get PaymentMethod() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.PaymentMethod;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.PaymentMethod;
  }

  PaymentMethodForRead(id) {
    if (this.PaymentMethod && this.PaymentMethod.length) {
      let readItem = this.PaymentMethod.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  get PrimaryPosition() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.PrimaryPosition;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.PrimaryPosition;
  }

  PrimaryPositionForRead(id) {
    if (this.PrimaryPosition && this.PrimaryPosition.length) {
      let readItem = this.PrimaryPosition.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get DiseaseType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.DiseaseType;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.DiseaseType;
  }

  DiseaseTypeForRead(id) {
    if (this.DiseaseType && this.DiseaseType.length) {
      let readItem = this.DiseaseType.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get IrradiationPosition() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.IrradiationPosition;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
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

  get StagesType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.StagesType;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.StagesType;
  }

  StagesTypeForRead(id) {
    if (this.StagesType && this.StagesType.length) {
      let readItem = this.StagesType.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  get TNMT() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.TNMT;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.TNMT;
  }

  TNMTForRead(id) {
    if (this.TNMT && this.TNMT.length) {
      let readItem = this.TNMT.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get TNMN() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.TNMN;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.TNMN;
  }

  TNMNForRead(id) {
    if (this.TNMN && this.TNMN.length) {
      let readItem = this.TNMN.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  get TNMM() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.TNMM;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.TNMM;
  }

  TNMMForRead(id) {
    if (this.TNMM && this.TNMM.length) {
      let readItem = this.TNMM.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  get HospitalScoreKPS() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.HospitalScoreKPS;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.HospitalScoreKPS;
  }

  HospitalScoreKPSForRead(id) {
    if (this.HospitalScoreKPS && this.HospitalScoreKPS.length) {
      let readItem = this.HospitalScoreKPS.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get HospitalScoreZPS() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.HospitalScoreZPS;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.HospitalScoreZPS;
  }

  HospitalScoreZPSForRead(id) {
    if (this.HospitalScoreZPS && this.HospitalScoreZPS.length) {
      let readItem = this.HospitalScoreZPS.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get HospitalScoreQOL() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.HospitalScoreQOL;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.HospitalScoreQOL;
  }

  HospitalScoreQOLForRead(id) {
    if (this.HospitalScoreQOL && this.HospitalScoreQOL.length) {
      let readItem = this.HospitalScoreQOL.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get HospitalScorePain() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.HospitalScorePain;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.HospitalScorePain;
  }

  HospitalScorePainForRead(id) {
    if (this.HospitalScorePain && this.HospitalScorePain.length) {
      let readItem = this.HospitalScorePain.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get HospitalScoreAche() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.HospitalScoreAche;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.HospitalScoreAche;
  }

  HospitalScoreAcheForRead(id) {
    if (this.HospitalScoreAche && this.HospitalScoreAche.length) {
      let readItem = this.HospitalScoreAche.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get HospitalScoreNutrition() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.HospitalScoreNutrition;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.HospitalScoreNutrition;
  }

  HospitalScoreNutritionForRead(id) {
    if (this.HospitalScoreNutrition && this.HospitalScoreNutrition.length) {
      let readItem = this.HospitalScoreNutrition.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get ICDClass() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.ICDClass;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.ICDClass;
  }

  ICDClassForRead(id) {
    if (this.ICDClass && this.ICDClass.length) {
      let readItem = this.ICDClass.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get SmokingStatus() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.SmokingStatus;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.SmokingStatus;
  }

  SmokingStatusForRead(id) {
    if (this.SmokingStatus && this.SmokingStatus.length) {
      let readItem = this.SmokingStatus.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get PathologyType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PatientInfo.PathologyType;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PatientInfo.PathologyType;
  }

  PathologyTypeForRead(id) {
    if (this.PathologyType && this.PathologyType.length) {
      let readItem = this.PathologyType.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }

  get ChiefDoctors() {
    return this.$store.state.patient.chiefDoctors;
  }
  ChiefDoctorsForRead(id) {
    if (this.ChiefDoctors && this.ChiefDoctors.length) {
      let readItem = (this.ChiefDoctors as any).filter(
        item => item.userId === id
      );
      if (readItem.length) {
        return readItem[0].name;
      }
    }
  }

  get status() {
    return this.$store.state.patient.status;
  }

  set status(value) {
    this.$store.state.patient.status = value;
  }
  get imgSrc() {
    this.formValidate.patient.photographPath = this.$store.state.patient.imgSrcName;
    return this.$store.state.patient.imgSrc;
  }

  set imgSrc(value) {
    this.$store.state.patient.imgSrc = value;
  }

  changeProfilePictureShow(val) {
    this.changeProfilePicture = val;
  }

  handleAdd() {
    this.formValidate.diagnosis = new Diagnosis();
  }
  handleRemove() {
    this.formValidate.diagnosis = null;
  }
  activated() {
    this.formValidate.patient.idType = this.IDType[0].id;
    this.status = true;
    this.formValidate.diagnosis = null;
    this.searchBarFixed = false;

    // (this.$refs["formValidate"] as any).resetFields();
    // this.$store.state.patient.radiotherapyNum = null;
  }
  async handleSubmit(name) {
    if (!this.$store.state.patient.status) {
      this.$store.commit('patient/changeStatus', true);
      return;
    }
    if ((this.$refs.formValidate as any).validate()) {
      var data = await this.$store.dispatch({
        type: 'patient/save',
        data: this.formValidate,
      });
      if (data['success']) {
        this.$Message.success('提交成功');
      }
    }
  }

  changePicture() {
    this.changeProfilePicture = true;
  }

  async deletePicture() {
    this.$store.commit('patient/changeImgSrc', null);
    // var data = await this.$store.dispatch({
    //   type: "patient/deleteFiles",
    //   data: { filename: this.formValidate.patient.photographPath }
    // });
  }

  // 修改
  handleEdit(name) {
    if (!this.$store.state.patient.status) {
      this.$store.commit('patient/isEdit');
      return;
    }
  }

  handleSuccess(res, file) {
    this.$store.commit('patient/changeImgSrc', res.result);
    this.uploadPicture = '上传成功';
  }

  handleError(error, file) {
    this.uploadPicture = '上传失败';
    this.$Modal.error({
      title: '上传失败',
      content: file.error.message,
    });
  }
  handleReset(name) {
    this.confirm(name);
  }
  timeoutflag: any = null;

  mouseoverEvent(event) {
    let self = this;

    if (this.timeoutflag != null) {
      clearTimeout(this.timeoutflag);
    }

    this.timeoutflag = setTimeout(function() {
      self.bottomIn();
    }, 500);
  }
  mouseleaveEvent(event) {
    let self = this;

    if (this.timeoutflag != null) {
      clearTimeout(this.timeoutflag);
    }

    this.timeoutflag = setTimeout(function() {
      self.bottomOut();
    }, 500);
  }
  // 提交诊断信息
  handleDiagnosisSubmit(name) {
    (this.$refs.otherFormValidate as any).validate(async (valid: boolean) => {
      if (valid) {
        this.activeName = 'name1';
      }
    });
  }

  confirm(name) {
    this.$Modal.confirm({
      title: '提示信息',
      content: '<p>表单已填内容将被清空，是否继续</p>',
      onOk: () => {
        this.$store.commit('patient/isCreat');
        (this.$refs[name] as any).resetFields();
        this.formValidate = new PatientTreatmentDetail();
      },
      onCancel: () => {},
    });
  }

  affixchange(status) {
    this.$Message.info(`Status: ${status}`);
  }
  // 修改诊断信息
  handleEditDiagnosisSubmit(name) {}
  pagerequest: PagePatientRequest = new PagePatientRequest();

  bottomIn() {
    $('.changeImag').css({bottom: 0, opacity: 0});
    $('.changeImag').animate({height: 30, opacity: 0.8}, 210);
  }

  bottomOut() {
    $('.changeImag').animate({height: 0}, 210);
    $('.changeImag').css({bottom: 0, opacity: 0});
  }

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     // if (to.params.params) {
  //     //   vm.formValidate = JSON.parse(to.params.params);
  //     //   vm.patientForm = "patientFormForRead";
  //     //   localStorage.setItem("patientTreatmentDetail", to.params.params);
  //     //   vm.$store.commit(
  //     //     "patient/changeImgSrc",
  //     //     vm.formValidate.patient.photographPath
  //     //   );
  //     // }
  //     vm.searchBarFixed = false;
  //     vm.status = false;
  //     //防止刷新页面数据消失
  //     // if (from.fullPath === "/") {
  //     //   vm.formValidate = JSON.parse(
  //     //     localStorage.getItem("patientTreatmentDetail")
  //     //   );
  //     // }
  //   });
  // }
}
</script>

<style scoped>
.patientDiagnosis {
  border: solid #dcdee2;
  border-width: 0px 1px 1px 1px;
  width: 90%;
  margin: auto;
  margin-top: 30px;
}

.img-button-ui {
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}
.img-button-ui li {
  height: 100%;
  width: 30%;
  margin: 0 0px;
  float: left; /*该处换为display:inline-block;同样效果*/
}

.img-button-ui li a {
  width: 100%;
  height: 100%;
  padding-left: 50%;
  font-size: 12px;
  color: white;
  line-height: 32px;
  border-right: 0px;
  border-bottom: 0px;
}

.changeImag {
  position: absolute;
  width: 210px;
  height: 0px;
  background-color: black;
  opacity: 0;
}
.flex-container {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}
.img-patient-selecter {
  width: 210px;
}
.img-flex {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.img-flex-item1 {
  background-color: #f0f2f5;
  width: 100%;
  height: 150px;
}
.img-flex-item2 {
  background-color: #f0f2f5;
  width: 100%;
  text-align: center;
  color: #666;
  height: 20px;
  line-height: 20px;
}
.detail-info {
  background: #4fa953;
  line-height: 20px;
  border-bottom: 0px;
  color: #fff;
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
  margin-top: 30px;
}

.affixPosition {
  position: relative;
  margin-right: 25px;
}

.affixContent {
  position: absolute;
  right: 25px;
}
.hidden-border {
  border-left: 0px;
  border-right: 0px;
  color: #fff;
}
.diagnosis {
  line-height: 38px;
  padding-left: 15px;
  width: 100%;
  height: 38px;
  background: #4fa953;
  border: 1px solid #e8eaec;
  margin-bottom: 10px;
  color: #fff;
}
.font-weight-light {
  color: #fff;
}
.form-height {
  height: calc(84vh) !important;
  overflow: auto;
  padding: 0px 20px;
}
</style>

<style lang="less">
.searchBar {
  .isFixed {
    position: fixed;
    background-color: #fff;
    top: 0;
    z-index: 999;
  }
}
</style>
