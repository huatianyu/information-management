<template>
  <div>
    <v-tabs
      color="white"
      v-model="currentTab"
      background-color="#4dc9a875"
      centered
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab :key="i" v-for="(formValidate, i) in dataSource">
        {{ formValidate.name }}
        <v-icon>mdi-animation</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items class="pa-2 py-8" v-model="currentTab">
      <v-tab-item v-for="(formValidate, i) in dataSource" :key="i">
        <v-row>
          <v-col md="6" sm="12" xl="4" cols="12">
            <v-select
              v-model="formValidate.prescription.rayType"
              :items="RadiationType"
              class="purple-input pa-0"
              :disabled="isEdit"
              dark
              menu-props="auto"
              hide-details
              label="射线类型"
              placeholder="请选择射线类型"
            ></v-select>
          </v-col>
          <v-col md="6" sm="12" xl="4" cols="12">
            <v-text-field
              label="能量（Mv）"
              dark
              class="purple-input pa-0"
              placeholder="输入能量"
              :disabled="isEdit"
            />
          </v-col>
          <v-col md="6" sm="12" xl="4" cols="12">
            <v-select
              v-model="formValidate.prescription.treatmentMethod"
              :items="TreatmentMethod"
              dark
              :disabled="isEdit"
              menu-props="auto"
              hide-details
              label="治疗方式"
              class="purple-input pa-0"
              placeholder="请选择方式"
            ></v-select>
          </v-col>
          <v-col md="6" sm="12" xl="4" cols="12">
            <v-text-field
              label="处方剂量"
              class="purple-input pa-0"
              dark
              placeholder="输入处方剂量"
              :disabled="isEdit"
              suffix="cGy"
              v-model="formValidate.prescription.prescribedDose"
            />
          </v-col>
          <v-col md="6" sm="12" xl="4" cols="12">
            <v-text-field
              class="purple-input pa-0"
              dark
              label="分割次数"
              placeholder="输入分割次数"
              :disabled="isEdit"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="靶区处方剂量"
              class="purple-input pa-0"
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <i-table
              v-if="!isEdit"
              highlight-row
              ref="currentRowTable"
              :columns="columns2"
              :data="formValidate.targetPrescriptionDoses"
            ></i-table>
            <i-table
              v-else
              highlight-row
              ref="currentRowTable"
              :columns="columns2ForRead"
              :data="formValidate.targetPrescriptionDoses"
            ></i-table>
            <v-row>
              <v-col>
                <v-btn
                  color="#c3a77e"
                  width="100%"
                  v-if="!isEdit"
                  @click="handleAddTarget(i)"
                  >添加</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="危机器官限制剂量"
              dark
              class="purple-input pa-0"
              disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <i-table
              @on-selection-change="imperilListDtoRowClick"
              v-if="!isEdit"
              highlight-row
              ref="currentRowTable"
              :columns="columns"
              :data="formValidate.imperilOrganLimitedDoses"
            ></i-table>
            <i-table
              v-else
              highlight-row
              ref="currentRowTable"
              :columns="columnsForRead"
              :data="formValidate.imperilOrganLimitedDoses"
            ></i-table>
            <v-row>
              <v-col>
                <v-btn
                  dark
                  color="#c3a77e"
                  width="100%"
                  v-if="!isEdit"
                  @click="handleAddimperilOrganLimitedDoses(i)"
                  >添加</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col xl="4" md="6" sm="12" cols="12">
            <v-checkbox
              dark
              :disabled="isEdit"
              v-model="formValidate.verifyDto.doseVerifyCheck"
              label="验证剂量"
            ></v-checkbox>
          </v-col>
          <v-col
            v-if="formValidate.verifyDto.doseVerifyCheck"
            xl="4"
            md="6"
            sm="12"
            cols="12"
          >
            <v-select
              dark
              v-model="formValidate.verifyDto.doseVerifySession.verifyMode"
              :items="DoseVerifyId"
              :disabled="!formValidate.verifyDto.doseVerifyCheck || isEdit"
              menu-props="auto"
              hide-details
              label="验证方式"
              placeholder="请选择方式"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col xl="12" md="6" sm="12" cols="12">
            <v-checkbox
              dark
              :disabled="isEdit"
              v-model="formValidate.verifyDto.fieldVerifyCheck"
              label="射野验证"
              class="purple-input pa-0"
            ></v-checkbox>
          </v-col>
          <v-col
            v-if="formValidate.verifyDto.fieldVerifyCheck"
            xl="4"
            md="6"
            sm="12"
            cols="12"
          >
            <v-select
              dark
              v-model="formValidate.verifyDto.fieldVerifySession.verifyMode"
              :items="FieldVerifyId"
              :disabled="!formValidate.verifyDto.fieldVerifyCheck || isEdit"
              menu-props="auto"
              hide-details
              class="purple-input pa-0"
              label="验证类型"
              placeholder="请选择类型"
            ></v-select>
          </v-col>
          <v-col
            v-if="formValidate.verifyDto.fieldVerifyCheck"
            xl="4"
            md="6"
            sm="12"
            cols="12"
          >
            <v-text-field
              dark
              label="验证次数"
              class="purple-input pa-0"
              suffix="次"
              placeholder="输入输入次数"
              type="number"
              :disabled="!formValidate.verifyDto.fieldVerifyCheck || isEdit"
              v-model="formValidate.verifyDto.fieldVerifySession.verifyCount"
            />
          </v-col>
          <v-col
            v-if="formValidate.verifyDto.fieldVerifyCheck"
            xl="4"
            md="6"
            sm="12"
            cols="12"
          >
            <v-select
              dark
              :disabled="!formValidate.verifyDto.fieldVerifyCheck || isEdit"
              v-model="formValidate.verifyDto.fieldVerifySession.verifyMode"
              :items="ValidationMode"
              class="purple-input pa-0"
              menu-props="auto"
              hide-details
              label="验证模式"
              placeholder="请选择类型"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col xl="12" md="6" sm="12" cols="12">
            <v-checkbox
              dark
              :disabled="isEdit"
              v-model="formValidate.verifyDto.resetVerifyCheck"
              label="复位验证"
              class="purple-input pa-0"
            ></v-checkbox>
          </v-col>
          <v-col
            v-if="formValidate.verifyDto.resetVerifyCheck"
            xl="7"
            md="6"
            sm="12"
            cols="12"
          >
            <v-radio-group
              dark
              label="拍摄照片"
              class="purple-input pa-0"
              v-model="formValidate.verifyDto.resetVerifySession.isTakePhoto"
              row
              :disabled="!formValidate.verifyDto.resetVerifyCheck || isEdit"
            >
              <v-radio label="是" :value="0"></v-radio>
              <v-radio label="否" :value="1"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            v-if="formValidate.verifyDto.resetVerifyCheck"
            xl="3"
            md="6"
            sm="12"
            cols="12"
          >
            <v-text-field
              dark
              label="平移误差"
              class="purple-input pa-0"
              suffix="mm"
              placeholder="输入平移误差"
              type="number"
              :disabled="!formValidate.verifyDto.resetVerifyCheck || isEdit"
              v-model="
                formValidate.verifyDto.resetVerifySession.translationError
              "
            />
          </v-col>
          <v-col
            v-if="formValidate.verifyDto.resetVerifyCheck"
            xl="12"
            md="6"
            sm="12"
            cols="12"
          >
            <v-radio-group
              dark
              label="图像回传并关联"
              v-model="
                formValidate.verifyDto.resetVerifySession.isImageRelation
              "
              row
              :disabled="!formValidate.verifyDto.resetVerifyCheck || isEdit"
              class="purple-input pa-0"
            >
              <v-radio label="是" :value="0"></v-radio>
              <v-radio label="否" :value="1"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="备注"
              dark
              class="purple-input pa-0"
              placeholder="输入备注"
              :disabled="isEdit"
              v-model="formValidate.prescription.remarks"
            />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop, Emit, Watch, Model} from 'vue-property-decorator';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import List from '../../../../store/entities/plan/list';
class TargetPrescriptionDoses {
  prescriptionId: Number = 0;
  targetName: string = '2';
  maxDose: Number = 0;
  minDose: Number = 0;
  averageDose: Number = 0;
  volume: Number = 0;
  id: number = 0;
}
class ImperilOrganLimitedDoses {
  prescriptionId: Number = 0;
  imperilOrganName: string = '1';
  limitedDoseVolume: Number = 0;
  limitedDose: Number = 0;
  id: Number = 0;
}

@Component
export default class ListClass extends AbpBase {
  currentImperilSelection = [];
  currentTargetSelection = [];
  currentTab: number = 0;

  targetNameList = [
    {
      name: 'GTV',
      value: '1',
    },
    {
      name: 'CTV',
      value: '2',
    },
    {
      name: 'PTV',
      value: '3',
    },
  ];

  imperilOrganNameList = [
    {
      name: '脊髓',
      value: '1',
    },
    {
      name: '脑干',
      value: '2',
    },
    {
      name: '垂体',
      value: '3',
    },
    {
      name: '颞叶',
      value: '3',
    },
    {
      name: '左晶体',
      value: '3',
    },
    {
      name: '右晶体',
      value: '3',
    },
    {
      name: '左眼球',
      value: '3',
    },
    // {
    //   name: "右眼球",
    //   value: "3"
    // },
    // {
    //   name: "视神经",
    //   value: "3"
    // },
    // {
    //   name: "左腮腺",
    //   value: "3"
    // },
    // {
    //   name: "右腮腺",
    //   value: "3"
    // },
    // {
    //   name: "颞颌关节",
    //   value: "3"
    // }
  ];
  data() {
    let self = this;
    return {
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },

        {
          title: '危机器官名称',
          key: 'imperilOrganName',
          render: (h, params) => {
            var vm = this;
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.imperilOrganName,
                },
                on: {
                  'on-change'(event) {
                    params.row.imperilOrganName = event.target.value;
                    vm.dataSource[vm.currentTab].imperilOrganLimitedDoses[
                      params.index
                    ] = params.row;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: '限制剂量体积（%）<=',
          key: 'limitedDoseVolume',
          align: 'center',
          render: (h, params) => {
            var vm = this;
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.limitedDoseVolume,
                },
                on: {
                  'on-change'(event) {
                    params.row.limitedDoseVolume = event.target.value;
                    vm.dataSource[vm.currentTab].imperilOrganLimitedDoses[
                      params.index
                    ] = params.row;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: '限制剂量 <= cGy',
          key: 'limitedDose',
          align: 'center',
          render: (h, params) => {
            var vm = this;
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.limitedDose,
                },
                on: {
                  'on-change'(event) {
                    params.row.limitedDose = event.target.value;
                    vm.dataSource[vm.currentTab].imperilOrganLimitedDoses[
                      params.index
                    ] = params.row;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    backgroundColor: '#c3a77e',
                  },
                  on: {
                    click: () => {
                      this.handleDeleteImperilOrganLimitedDoses(params.index);
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
      ],
      columnsForRead: [
        {
          title: '危机器官名称',
          align: 'center',
          key: 'imperilOrganName',
        },
        {
          title: '限制剂量体积（%）<=',
          align: 'center',
          key: 'limitedDoseVolume',
        },
        {
          title: '限制剂量 <= cGy',
          align: 'center',
          key: 'limitedDose',
        },
      ],

      columns2: [
        {
          title: '靶区',
          key: 'targetName',
          render: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: params.row.targetName,
                  size: 'small',
                },
              },
              [
                this.targetNameList.map(item => {
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

        {
          title: '最大剂量（cGy）',
          align: 'center',
          key: 'maxDose',
          render: (h, params) => {
            var vm = this;
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.maxDose,
                },
                on: {
                  'on-change'(event) {
                    params.row.maxDose = event.target.value;
                    vm.dataSource[vm.currentTab].targetPrescriptionDoses[
                      params.index
                    ] = params.row;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: '最小剂量（cGy）',
          align: 'center',
          key: 'minDose',
          render: (h, params) => {
            var vm = this;
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.minDose,
                },
                on: {
                  'on-change'(event) {
                    params.row.minDose = event.target.value;
                    vm.dataSource[vm.currentTab].targetPrescriptionDoses[
                      params.index
                    ] = params.row;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: '平均剂量（cGy）',
          align: 'center',
          key: 'averageDose',
          render: (h, params) => {
            var vm = this;
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.averageDose,
                },
                on: {
                  'on-change'(event) {
                    params.row.averageDose = event.target.value;
                    vm.dataSource[vm.currentTab].targetPrescriptionDoses[
                      params.index
                    ] = params.row;
                  },
                },
              }),
            ]);
          },
        },

        {
          title: '体积（%）>=',
          align: 'center',
          key: 'volume',
          render: (h, params) => {
            var vm = this;
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.volume,
                },
                on: {
                  'on-change'(event) {
                    params.row.volume = event.target.value;
                    vm.dataSource[vm.currentTab].targetPrescriptionDoses[
                      params.index
                    ] = params.row;
                  },
                },
              }),
            ]);
          },
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    backgroundColor: '#c3a77e',
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.index);
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
      ],
      columns2ForRead: [
        {
          title: '靶区',
          align: 'center',
          key: 'targetName',
          render: (h, params) => {
            return h('div', [self.getTargetName(params.row.targetName)]);
          },
        },
        {
          title: '最大剂量（cGy）',
          align: 'center',
          key: 'maxDose',
        },
        {
          title: '最小剂量（cGy）',
          align: 'center',
          key: 'minDose',
        },
        {
          title: '平均剂量',
          align: 'center',
          key: 'averageDose',
        },
        {
          title: '体积（%）>=',
          align: 'center',
          key: 'volume',
        },
      ],
    };
  }

  @Prop() public name2!: string;
  @Prop() private name!: string;
  @Prop() private dataSource!: List[];
  @Prop() private isEdit!: boolean;
  @Prop() private irradiationPosition: String;
  get items() {
    return [
      {text: 'State 1', value: 1},
      {text: 'State 2', value: 2},
      {text: 'State 3', value: 3},
      {text: 'State 4', value: 4},
      {text: 'State 5', value: 5},
      {text: 'State 6', value: 6},
      {text: 'State 7', value: 0},
    ];
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

  get ValidationMode() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PlanningDesignOrder.ValidationMode;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PlanningDesignOrder.ValidationMode;
  }

  ValidationModeForRead(id) {
    if (this.ValidationMode && this.ValidationMode.length) {
      let readItem = this.ValidationMode.filter(item => item.value === id);
      if (readItem.length) {
        return readItem[0].text;
      }
    }
  }

  get DoseVerifyId() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PlanningDesignOrder.DoseVerifyId;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PlanningDesignOrder.DoseVerifyId;
  }

  DoseVerifyIdForRead(id) {
    if (this.DoseVerifyId && this.DoseVerifyId.length) {
      let readItem = this.DoseVerifyId.filter(item => item.value === id);
      if (readItem.length) {
        return readItem[0].text;
      }
    }
  }
  get FieldVerifyId() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.PlanningDesignOrder.FieldVerifyId;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .PlanningDesignOrder.FieldVerifyId;
  }

  FieldVerifyIdForRead(id) {
    if (this.FieldVerifyId && this.FieldVerifyId.length) {
      let readItem = this.FieldVerifyId.filter(item => item.value === id);
      if (readItem.length) {
        return readItem[0].text;
      }
    }
  }

  private mounted() {}
  getTargetName(value) {
    switch (value) {
      case '1':
        return 'GTV';
        break;
      case '2':
        return 'CTV';
        break;
      case '3':
        return 'PTV';
        break;
    }
  }
  selectOptions(id) {}
  imperilListDtoRowClick(selection) {
    this.currentImperilSelection = selection;
  }

  targetListDtoRowClick(selection) {
    this.currentTargetSelection = selection;
  }
  handleSaveImperilorgan(id) {
    // const {
    //   currentImperilorganname,
    //   currentLimiteddosevolume,
    //   currentLimiteddose,
    //   dataSource
    // } = this;
    // this.dataSource[id].imperilListDto = dataSource[id].imperilListDto.map(
    //   v => {
    //     return v.id === id
    //       ? {
    //           imperilorganname:
    //             currentImperilorganname !== ""
    //               ? currentImperilorganname
    //               : v.imperilorganname,
    //           limiteddosevolume:
    //             currentLimiteddosevolume !== null
    //               ? currentLimiteddosevolume
    //               : v.limiteddosevolume,
    //           limiteddose:
    //             currentLimiteddose !== null
    //               ? currentLimiteddose
    //               : v.limiteddose,
    //           id: v.id,
    //           irradiationPosition: v.irradiationPosition,
    //           planningDesignOrderId: v.planningDesignOrderId
    //         }
    //       : v;
    //   }
    // );
    // this.currentImperilorganId = null;
    // this.currentLimiteddosevolume = null;
    // this.currentLimiteddose = null;
    // this.currentImperilorganname = "";
  }

  handleSaveTargetList(id) {
    // const {
    //   currentTargetname,
    //   currentFulldose,
    //   currentFractionaldose,
    //   currentFrequency,
    //   currentVolume,
    //   dataSource
    // } = this;
    // this.dataSource[id].targetListDto = dataSource[id].targetListDto.map(v => {
    //   return v.id === id
    //     ? {
    //         targetname:
    //           currentTargetname !== "" ? currentTargetname : v.targetname,
    //         fulldose: currentFulldose !== null ? currentFulldose : v.fulldose,
    //         fractionaldose:
    //           currentFractionaldose !== null
    //             ? currentFractionaldose
    //             : v.fractionaldose,
    //         frequency:
    //           currentFrequency !== null ? currentFrequency : v.frequency,
    //         volume: currentVolume !== null ? currentVolume : v.volume,
    //         id: v.id,
    //         irradiationPosition: v.irradiationPosition,
    //         planningDesignOrderId: v.planningDesignOrderId
    //       }
    //     : v;
    // });
    // this.currentTargetId = null;
    // this.currentFulldose = null;
    // this.currentFractionaldose = null;
    // this.currentTargetname = "";
    // this.currentVolume = null;
    // this.currentFrequency = null;
  }

  // handleAddImperilorganname() {
  //   var imperil = new ImperilListDto();
  //   imperil.id = new Date().getTime() % 10000000;
  //   this.formValidate.imperilListDto.push(imperil);
  // }
  // handleRemoveImperilorganname() {
  //   this.formValidate.imperilListDto = this.formValidate.imperilListDto.filter(
  //     item => {
  //       let arr = this.currentImperilSelection.map(obj => {
  //         return obj.id;
  //       });

  //       return arr.indexOf(item.id) == -1;
  //     }
  //   );
  // }

  handleAddTarget(index) {
    var targetPrescriptionDoses = new TargetPrescriptionDoses();
    targetPrescriptionDoses.id = new Date().getTime() % 10000000;
    this.dataSource[index].targetPrescriptionDoses.push(
      targetPrescriptionDoses
    );
  }
  handleAddimperilOrganLimitedDoses(index) {
    var imperilOrganLimitedDoses = new ImperilOrganLimitedDoses();
    imperilOrganLimitedDoses.id = new Date().getTime() % 10000000;
    this.dataSource[index].imperilOrganLimitedDoses.push(
      imperilOrganLimitedDoses
    );
  }

  handleDelete(index) {
    this.dataSource[this.currentTab].targetPrescriptionDoses.splice(index, 1);
  }

  handleDeleteImperilOrganLimitedDoses(index) {
    this.dataSource[this.currentTab].imperilOrganLimitedDoses.splice(index, 1);
  }
}
</script>

<style scoped>
.content-bc {
  margin: auto;
  width: 90%;
}
.hidden-border {
  border-left: 0px;
  border-right: 0px;
}

.sub-Title {
  text-align: left;
  font-size: 14px !important;
  position: relative;
  left: -70px;
}

.position-Left {
  position: relative;
  left: -40px;
}
</style>
