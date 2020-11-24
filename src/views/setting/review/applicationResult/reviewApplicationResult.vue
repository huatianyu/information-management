<template>
  <div>
    <Affix v-if="searchBarFixed" class="target-affixPosition" :offset-top="72">
      <div class="target-flex-container">
        <div>
          <Button
            @click="handleListenEvent('applicationFormValidateSave')"
            type="primary"
          >
            <span>同意</span>
          </Button>
          <Button
            style="margin-left: 8px"
            type="primary"
            @click="handleListenEvent('applicationFormValidateEdit')"
          >
            <span>不同意</span>
          </Button>
          <Button style="margin-left: 8px" type="primary" @click="goback">
            <span>返回</span>
          </Button>
        </div>
      </div>
    </Affix>
    <Card title="定位结果" style="overflow-y:auto;" dis-hover>
      <a href="#" slot="extra">
        <Button
          @click="handleListenEvent('applicationFormValidateSave')"
          style="margin-left: 8px"
          type="primary"
        >
          <span>同意</span>
        </Button>
        <Button
          style="margin-left: 8px"
          type="primary"
          @click="handleListenEvent('applicationFormValidateEdit')"
        >
          <span>不同意</span>
        </Button>
        <Button style="margin-left: 8px" type="primary" @click="goback"
          >返回</Button
        >
      </a>

      <div class="page-body">
        <div id="printTargetingApplication">
          <Form
            ref="applicationFormValidate"
            :aria-disabled="false"
            :model="applicationFormValidate"
            :rules="ruleValidate"
          >
            <Row :gutter="10">
              <Col span="24">
                <patient-search-item
                  v-model="applicationFormValidate.ctsimOrder.otherRequirements"
                  type="textarea"
                  title="备注"
                  signature="李大庆"
                ></patient-search-item>
              </Col>
            </Row>
            <div class="table" cellspacing="0">
              <Card title="定位结果"></Card>
            </div>
          </Form>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import PageRequest from '@/store/entities/page-request';
import Component from 'vue-class-component';

import Patient from '../../../../store/entities/patient';
import FormBasic from '../../../basicInfo/formBasic.vue';

import TargetingApplication from '../../../../store/entities/patientTreatment/targetingApplication';
import patientSearchItem from './../../../customize/patientSearchItem.vue';

@Component({
  components: {FormBasic, patientSearchItem},
})
export default class ReviewApplicationResult extends AbpBase {
  // applicationFormValidate: TargetingApplication = new TargetingApplication();

  get applicationFormValidate() {
    return Util.getUpdatePageObj(
      this.$store.state.targetingApplication.editTargetingApplication,
      'DIAGNOSTICBLOCK-EDITTARGETTINGAPPLICATION',
      this.$store.state.patientResource.patientResource.radiotherapyNum
    );
  }

  // set applicationFormValidate(value) {
  //   this.$store.state.targetingApplication.editTargetingApplication = value;
  // }

  // tempApplication: TargetingApplication = new TargetingApplication();
  applicationForm: String = 'applicationForEdit';
  affixInit = false;
  affixTop = 100;
  searchBarFixed = false;
  status: Number;
  isEdit = true;
  value1 = ['1'];
  value2 = ['1', '2'];

  data() {
    return {
      ruleValidate: {
        'ctsimOrder.planningSystem': [
          {
            type: 'number',
            required: true,
            message: '计划系统不能为空！',
            trigger: 'change',
          },
        ],
        'ctsimOrder.scanningPurpose': [
          {
            required: true,
            message: '扫描目的不能为空！',
            trigger: 'blur',
          },
        ],
        'ctsimOrder.scanningEquipment': [
          {
            type: 'number',
            required: true,
            message: '扫描设备不能为空！',
            trigger: 'change',
          },
        ],

        'ctsimOrder.appointmentTime': [
          {
            type: 'date',
            required: true,
            message: '预约时间不能为空！',
            trigger: 'blur',
          },
        ],
        'ctsimOrder.appointmentTimeTwo': [
          {
            required: true,
            message: '预约时间不能为空！',
            trigger: 'change',
          },
        ],

        'ctsimOrder.scanningLocation': [
          {
            type: 'number',
            required: true,
            message: '扫描部位不能为空！',
            trigger: 'change',
          },
        ],

        'ctsimOrder.scanningRangeUpper': [
          {
            type: 'number',
            required: true,
            message: '上界不能为空！',
            trigger: 'change',
          },
        ],

        'ctsimOrder.scanningRangeLower': [
          {
            type: 'number',
            required: true,
            message: '下界不能为空！',
            trigger: 'change',
          },
        ],

        'ctsimOrder.fixedPosition': [
          {
            required: true,
            message: '固定部位不能为空！',
            trigger: 'blur',
          },
        ],

        'ctsimOrder.requirements': [
          {
            required: true,
            message: '特殊要求不能为空！',
            trigger: 'blur',
          },
        ],
        'ctsimOrder.fixedEquipment': [
          {
            required: true,
            message: '固定装置不能为空！',
            trigger: 'blur',
          },
        ],
      },
    };
  }

  goback() {
    this.$router.go(-1); //返回上一层
  }

  handleSubmit(name) {
    (this.$refs.applicationFormValidate as any).validate(
      async (valid: boolean) => {
        if (valid) {
          await this.$store.dispatch({
            type: 'patientResource/createSimulatedPositioningAsync',
            data: this.applicationFormValidate,
          });
          this.isEdit = false;
          this.$Message.success('录入成功');
        }
      }
    );
  }
  handleListenEvent(name) {
    switch (name) {
      case 'applicationFormValidateEdit':
        this.applicationForm = 'applicationForEdit';
        this.isEdit = true;
        break;
      case 'applicationFormValidateSave':
        this.handleSubmit(name);
        break;
      default:
        break;
    }
  }
  handleReset(name) {
    this.$store.commit('patient/isCreat');
    (this.$refs[name] as any).resetFields();
    // this.applicationFormValidate = new TargetingApplication();
  }

  beforeRouteLeave(to, from, next) {
    (this.$refs['applicationFormValidate'] as any).resetFields();
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
      vm.isEdit = false;
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
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
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
