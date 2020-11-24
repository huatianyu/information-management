<template>
  <div class="form-height">
    <material-card
      color="#4dc9a875"
      title="排程"
      :showBackBtn="true"
      text="排程患者列表内容"
    >
      <v-row>
        <v-col cols="12">
          <i-table
            highlight-row
            ref="arrangementHeaderTable"
            :columns="tableColumns"
            :data="formValidate.schedulePlan.planTop"
            @on-row-click="onSelect"
          ></i-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <hot-table :settings="settings(onSelectRow)"></hot-table>
        </v-col>
        <v-col offset="5" cols="1">
          <v-btn
            width="100%"
            color="#4dc9a875"
            @click="submitArrangement(formValidate)"
            >提交</v-btn
          >
        </v-col>
      </v-row>
    </material-card>
  </div>
</template>
<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import VueRouter from 'vue-router';
import $ from 'jquery';
import PageRequest from '@/store/entities/page-request';
import PatientInfo from '@/store/entities/Arrangement/patientInfo';
import ArrangementTable from '@/store/entities/arrangement/arrangementTable';
import GetArrangement from '@/store/entities/Arrangement/getArrangement';
import ArrangementFormItem from '@/store/entities/Arrangement/ArrangementFormItem';
import {defineLocale} from 'moment';
import Patient from '../../../store/entities/patient';
import {LunarFullCalendar} from 'vue-lunar-full-calendar';
import {HotTable} from '@handsontable/vue';
import Handsontable from 'handsontable';
import 'handsontable/languages/zh-CN'; //引入中文语言包
import {Alert} from 'iview';

class PageArrangementListRequest extends PageRequest {}
class TargetPrescriptionDoses {
  prescriptionId: Number = 0;
  targetName: string = '2';
  allDose: Number = 5000;
  minDose: Number = 0;
  averageDose: Number = 200;
  volume: Number = 25;
  plan: String = 'plan1';
  status: string = '计划已批准';
  id: number = 0;
}
@Component({
  components: {LunarFullCalendar, HotTable},
})
export default class Patients extends AbpBase {
  pagerequest: PageArrangementListRequest = new PageArrangementListRequest();
  isComplete: Boolean = false;
  requestType: Number;
  onSelectRow: number = 0;
  currentView: any;
  appointmentType: String = null;
  targetNameList = [
    {
      name: '常规分割',
      value: '1',
    },
    {
      name: '超分割',
      value: '2',
    },
    {
      name: '加速超分割',
      value: '3',
    },
    {
      name: '阶段分割',
      value: '4',
    },
  ];
  delay = [
    {
      name: '0',
      value: '0',
    },
    {
      name: '1',
      value: '1',
    },
    {
      name: '2',
      value: '2',
    },
    {
      name: '3',
      value: '3',
    },
    {
      name: '4',
      value: '4',
    },
    {
      name: '5',
      value: '5',
    },
    {
      name: '6',
      value: '6',
    },
  ];

  get targetPrescriptionDoses() {
    return [new TargetPrescriptionDoses()];
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
  get RadiotherapyState() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.ScheduleInfo.RadiotherapyState;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .ScheduleInfo.RadiotherapyState;
  }

  RadiotherapyStateForRead(id) {
    if (this.RadiotherapyState && this.RadiotherapyState.length) {
      let readItem = this.RadiotherapyState.filter(item => item.id === id);
      if (readItem.length) {
        return readItem[0].value;
      }
    }
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

  get formValidate() {
    return this.$store.state.arrangementTable.getArrangement as GetArrangement;
  }

  set formValidate(events) {
    this.$store.state.arrangementTable.getArrangement = events as GetArrangement;
  }
  get AppointmentType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.ScheduleInfo.AppointmentType;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .ScheduleInfo.AppointmentType;
  }

  AppointmentTypeForRead(id) {
    let appointMentId = Number(id);
    if (this.AppointmentType && this.AppointmentType.length) {
      let readItem = this.AppointmentType.filter(
        item => item.value === appointMentId
      );
      if (readItem.length) {
        return readItem[0].value;
      }
    }
  }
  currencyCodes = ['plan', 'CBCT', 'BeamVerify', 'EPID'];
  flagRenderer(instance, td, row, col, prop, value, cellProperties) {
    var currencyCode = value;

    while (td.firstChild) {
      td.removeChild(td.firstChild);
    }
    td.align = 'center';
    if (this.currencyCodes.indexOf(currencyCode) > -1) {
      var newElement = document.createElement('DIV');
      newElement.style.width = '30px';
      newElement.style.height = '30px';
      newElement.style.border = '1px solid #999';
      newElement.style.borderRadius = '4px';
      newElement.title = currencyCode;
      newElement.style.marginBottom = '8px';
      newElement.style.paddingTop = '1px';
      newElement.style.fontWeight = '1000';
      newElement.style.background =
        'url(../../img/icons/' + currencyCode + '.png)';
      newElement.style.backgroundSize = 'cover';
      newElement.style.color = 'white';
      if (currencyCode.indexOf('plan') > -1) {
        newElement.textContent = col + 1;
        newElement.title = 'plan' + newElement.textContent;
      }
      td.appendChild(newElement);
    } else {
      var textNode = document.createTextNode(value === null ? '' : value);
      td.appendChild(textNode);
    }
  }

  rowReadonly(row, col, prop) {
    var cellProperties = {};
    if (row === 0) {
      (cellProperties as any).readOnly = true;
    }
    (cellProperties as any).source = this.listRowselect(
      this.rowHeaders(this.onSelectRow)[row]
    );
    return cellProperties;
  }
  onSelect(CurrentRow, index) {
    this.onSelectRow = index;
  }
  scheduleInfo(index) {
    return (this.formValidate as any).schedulePlan.planTop[index].scheduleInfo;
  }

  rowHeaders(index) {
    return (this.formValidate as any).schedulePlan.planTop[index].rowHeaders;
  }

  listRowselect(name) {
    return (this.formValidate as any).schedulePlan.planTop[this.onSelectRow]
      .listRowselect[name];
  }

  get arrangementColumns() {
    let arr = [];
    let i;
    for (
      i = 0;
      i <
      (this.formValidate as any).schedulePlan.planTop[this.onSelectRow]
        .fractionCount;
      i++
    ) {
      arr.push({
        data: i + 1,
        renderer: this.flagRenderer,
        type: 'dropdown',
      });
    }
    return arr;
  }
  settings(index) {
    return {
      cells: this.rowReadonly,
      data: this.scheduleInfo(index),
      columns: this.arrangementColumns,
      // columns: [
      //   {
      //     data: "1",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },

      //   {
      //     data: "2",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "3",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },

      //   {
      //     data: "4",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "5",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "6",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "7",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "8",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "9",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "10",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "11",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "12",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "13",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "14",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "15",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "16",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "17",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "18",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "19",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "20",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "21",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "22",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "23",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "24",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   },
      //   {
      //     data: "25",
      //     renderer: this.flagRenderer,
      //     type: "dropdown"
      //   }
      // ],
      copyPaste: true,
      height: 310,
      stretchH: 'all',
      autoWrapRow: true,
      maxRows: 30,
      colWidths: 80,
      rowHeights: 50,
      rowHeaders: this.rowHeaders(index),
      rowHeaderWidth: 130,
      manualRowResize: true,
      manualColumnResize: true,
      language: 'zh-CN', //声明用中文的语言包
      contextMenu: true,
      manualRowMove: true,
      manualColumnMove: true,
      filters: true,
      dropdownMenu: true,
    };
  }

  data() {
    let self = this;
    return {
      tableColumns: [
        {
          title: '计划',
          align: 'center',
          key: 'planName',
        },
        {
          title: '状态',
          align: 'center',
          key: 'state',
        },
        {
          title: '总剂量（cGy）',
          align: 'center',
          key: 'prescibedDose',
        },
        // {
        //   title: "分次剂量（cGy）",
        //   align: "center",
        //   key: "dosePerFraction"
        // },

        {
          title: '分割次数',
          align: 'center',
          key: 'fractionCount',
        },
        {
          title: '延迟',
          align: 'center',
          key: 'postpone',
          width: '200px',
          render: (h, params) => {
            var vm = this;
            return h(
              'Select',
              {
                props: {
                  value: params.row.postpone,
                  size: 'small',
                },
                on: {
                  input: e => {
                    (vm.formValidate as any).schedulePlan.planTop[
                      vm.onSelectRow
                    ].postpone = e;
                  },
                },
              },
              [
                this.delay.map(item => {
                  return h('Option', {
                    props: {
                      value: item.value,
                      label: item.name,
                    },
                  });
                }),
              ]
            );
          },
        },
        // {
        //   title: "分割模式",
        //   align: "center",
        //   key: "targetName",
        //   render: (h, params) => {
        //     return h(
        //       "Select",
        //       {
        //         props: {
        //           value: params.row.targetName,
        //           size: "small"
        //         }
        //       },
        //       [
        //         this.targetNameList.map(item => {
        //           return h("Option", {
        //             props: {
        //               value: item.value,
        //               label: item.name
        //             }
        //           });
        //         })
        //       ]
        //     );
        //   }
        // },
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      time: null,
      currentStartTime: '',

      ruleValidate: {
        schedulingTime: [
          {
            required: true,
            message: '登记时间不能为空',
            trigger: 'blur',
          },
        ],
        schedulingDate: [
          {
            required: true,
            type: 'date',
            message: '排程日期不能为空',
            trigger: 'blur',
          },
        ],
        appointmentType: [
          {
            required: true,
            type: 'number',
            message: '排程类型不能为空',
            trigger: 'blur',
          },
        ],
      },
      showAllSearch: false,
    };
  }

  // 提交
  submitArrangement(formValidate) {
    let success = this.$store.dispatch({
      type: 'arrangementTable/createOrUpdateSchedule',
      data: formValidate,
    });
    if (success) {
      this.isComplete = true;
      this.$Message.success('录入成功');
    } else {
      this.$Message.warning('录入失败');
    }
  }

  goback() {
    this.$router.go(-1); //返回上一层
  }
  beforeRouteLeave(to, from, next) {
    this.formValidate.radiotherapyNum = null;
    next();
  }
  async beforeRouteEnter(to, from, next) {
    await next(vm => {
      var ArrangementTABLEPARAMS;
      //防止刷新页面数据消失
      if (from.fullPath === '/') {
        ArrangementTABLEPARAMS = JSON.parse(
          localStorage.getItem('ArrangementTABLEPARAMS')
        );
      } else {
        ArrangementTABLEPARAMS = to.params;
        localStorage.setItem('ArrangementTABLEPARAMS', to.params);
      }
      vm.requestType = ArrangementTABLEPARAMS.type;
      vm.isComplete = ArrangementTABLEPARAMS.type != 0;
      if (ArrangementTABLEPARAMS.RadiotherapyNum) {
        vm.$store.dispatch({
          type: 'arrangementTable/getScheduleDetailedList',
          data: {
            RadiotherapyNum: ArrangementTABLEPARAMS.RadiotherapyNum,
            SessionId: ArrangementTABLEPARAMS.SessionId,
          },
        });
      }
    });
  }
}
</script>
<style scoped>
.ivu-table-wrapper {
  overflow: visible;
}
.form-height {
  height: calc(82vh) !important;
  overflow: auto;
  padding: 0px 20px;
}

</style>
<style>
.handsontable tr th,
.handsontable tr td {
  vertical-align: bottom;
}

/* [title="plan1"] {
  pointer-events: none;
} */
/* .wtSpreader tr:first-child {
  pointer-events: none;
} */

.v-application ol,
.v-application ul {
  padding: 0 0px;
}
.ivu-select-item {
  color: #f3f3f3;
}
.ivu-select-item:hover {
  background-color: #999;
}
</style>

<style
  src="../../../../node_modules/handsontable/dist/handsontable.full.css"
></style>
