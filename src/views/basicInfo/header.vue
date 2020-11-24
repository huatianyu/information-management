<template>
  <div class="text-dark bg-light border-dark candrag">
    <Collapse class="content-bc" v-model="value1">
      <Panel hide-arrow name="1">
        <div style="text-align:center">
          <b>头部</b>
        </div>
        <p slot="content">
          <Row :gutter="10">
            <Col span="24">
              <FormItem>
                <label class="sub-Title">靶区处方剂量</label>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="24">
              <FormItem class="position-Left">
                <i-table
                  v-if="isEdit"
                  @on-selection-change="targetListDtoRowClick"
                  highlight-row
                  ref="currentRowTable"
                  :columns="columns2"
                  :data="formValidate.targetListDto"
                ></i-table>
                <i-table
                  v-else
                  highlight-row
                  ref="currentRowTable"
                  :columns="columns2ForRead"
                  :data="formValidate.targetListDto"
                ></i-table>
                <Row>
                  <Col offset="9" span="24">
                    <Button
                      type="dashed"
                      v-if="isEdit"
                      short
                      @click="handleAddTarget"
                      icon="md-add"
                    >添加</Button>
                    <Button
                      v-if="isEdit"
                      type="dashed"
                      style="margin-left: 8px"
                      short
                      @click="handleRemoveTarget"
                      icon="md-remove"
                    >删除</Button>
                  </Col>
                </Row>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="24">
              <FormItem>
                <label class="sub-Title">危机器官限制剂量</label>
                <!-- <Button type="primary" @click="handleReset('formValidate')">新建</Button> -->
                <!-- <Button v-if="isEdit" type="primary" style="margin-left: 8px">
              <span>上移</span>
            </Button>
            <Button v-if="isEdit" type="primary" style="margin-left: 8px">
              <span>下移</span>
                </Button>-->
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="24">
              <FormItem class="position-Left">
                <i-table
                  @on-selection-change="imperilListDtoRowClick"
                  v-if="isEdit"
                  highlight-row
                  ref="currentRowTable"
                  :columns="columns"
                  :data="formValidate.imperilListDto"
                ></i-table>
                <i-table
                  v-else
                  highlight-row
                  ref="currentRowTable"
                  :columns="columnsForRead"
                  :data="formValidate.imperilListDto"
                ></i-table>
                <Row>
                  <Col offset="9" span="24">
                    <Button
                      type="dashed"
                      v-if="isEdit"
                      short
                      @click="handleAddImperilorganname"
                      icon="md-add"
                    >添加</Button>
                    <Button
                      v-if="isEdit"
                      type="dashed"
                      style="margin-left: 8px"
                      short
                      @click="handleRemoveImperilorganname"
                      icon="md-remove"
                    >删除</Button>
                  </Col>
                </Row>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="22">
              <FormItem :label="L('备注')+':'" style="width:100%" prop="patientName">
                <Input v-if="isEdit" v-model="formValidate.patientName" :placeholder="L('输入备注')"></Input>
                <Label v-else>{{formValidate.patientName}}</Label>
              </FormItem>
            </Col>
          </Row>
        </p>
      </Panel>
    </Collapse>
  </div>
</template>


<script lang='ts'>
import {
  Component,
  Vue,
  Prop,
  Emit,
  Watch,
  Model
} from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import Header from "../../store/entities/patientTreatment/header";
// class tableD {
//     imperilorganname: String ;
//         limiteddosevolume: Number = 0;
// limiteddose:Number = 0;
//     id: Number

// }
// class tableD1 {
//     targetname: String;
// fractionaldose:Number = 0;
// fulldose:Number = 0;
// frequency:Number = 0;
//     id: Number;
//     volume: Number = 0;

// }

class ImperilListDto {
  planningDesignOrderId: Number = 0;
  imperilorganname: string = "";
  limiteddosevolume: Number = 0;
  limiteddose: Number = 0;
  id: Number = 0;
  irradiationPosition: Number = 0;
}

class TargetListDto {
  planningDesignOrderId: Number = 0;
  targetname: string = "";
  fulldose: Number = 0;
  fractionaldose: Number = 0;
  frequency: Number = 0;
  volume: Number = 0;
  id: Number = 0;
  irradiationPosition: Number = 0;
}

@Component
export default class HeaderClass extends AbpBase {
  currentImperilorganId = null;
  currentTargetId = null;
  currentLimiteddosevolume = null;
  currentLimiteddose = null;
  currentImperilorganname = "";
  currentTargetname = "";
  currentFulldose = null;
  currentVolume = null;
  currentFrequency = null;
  currentFractionaldose = null;
  value1 = ["1"];
  currentImperilSelection = [];
  currentTargetSelection = [];
  // formValidate.imperilListDto:tableD[] = [{ id : 1, imperilorganname: "1", limiteddosevolume: 1 ,limiteddose :1}, { id: 2, imperilorganname: "2", limiteddosevolume: 2,limiteddose :2 }];
  // formValidate.targetListDto:tableD1[] = [{ id : 1, targetname: "1", fulldose: 1 ,fractionaldose :1 ,frequency: 1,volume:1}, { id: 2, targetname: "2", fulldose: 2,fractionaldose :2 ,frequency: 1,volume:1}];

  data() {
    let self = this;
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "危机器官名称",
          align: "center",
          render: (h, p) => {
            const { id, imperilorganname } = p.row;
            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                maxlength: 16
              },
              domProps: {
                value: imperilorganname
              },
              on: {
                blur: event => {
                  self.currentImperilorganname = event.target.value;
                  self.handleSaveImperilorgan(id);
                }
              }
            });
            return inp;
          }
        },
        {
          title: "限制剂量体积（%）<=",
          align: "center",
          render: (h, p) => {
            const { id, limiteddosevolume } = p.row;

            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                type: "number",
                min: "0",
                step: "1",
                maxlength: 16
              },
              domProps: {
                value: limiteddosevolume
              },
              on: {
                blur: event => {
                  self.currentLimiteddosevolume = event.target.value;
                  self.handleSaveImperilorgan(id);
                }
              }
            });
            return inp;
          }
        },
        {
          title: "限制剂量 <= cGy",
          align: "center",
          render: (h, p) => {
            const { id, limiteddose } = p.row;

            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                type: "number",
                min: "0",
                step: "1",
                maxlength: 16
              },
              domProps: {
                value: limiteddose
              },
              on: {
                blur: event => {
                  self.currentLimiteddose = event.target.value;
                  self.handleSaveImperilorgan(id);
                }
              }
            });
            return inp;
          }
        }
      ],
      columnsForRead: [
        {
          title: "危机器官名称",
          align: "center",
          key: "imperilorganname"
        },
        {
          title: "限制剂量体积（%）<=",
          align: "center",
          key: "limiteddosevolume"
        },
        {
          title: "限制剂量 <= cGy",
          align: "center",
          key: "limiteddose"
        }
      ],

      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "靶区名称",
          align: "center",
          render: (h, p) => {
            const { id, targetname } = p.row;
            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                maxlength: 16
              },
              domProps: {
                value: targetname
              },
              on: {
                blur: event => {
                  self.currentTargetname = event.target.value;

                  self.handleSaveTargetList(id);
                }
              }
            });
            return inp;
          }
        },
        {
          title: "总剂量（cGy）",
          align: "center",
          render: (h, p) => {
            const { id, fulldose } = p.row;

            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                type: "number",
                min: "0",
                step: "1",
                maxlength: 16
              },
              domProps: {
                value: fulldose
              },
              on: {
                blur: event => {
                  self.currentFulldose = event.target.value;
                  self.handleSaveTargetList(id);
                }
              }
            });
            return inp;
          }
        },
        {
          title: "分次剂量（cGy）",
          align: "center",
          render: (h, p) => {
            const { id, fractionaldose } = p.row;

            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                type: "number",
                min: "0",
                step: "1",
                maxlength: 16
              },
              domProps: {
                value: fractionaldose
              },
              on: {
                blur: event => {
                  self.currentFractionaldose = event.target.value;

                  self.handleSaveTargetList(id);
                }
              }
            });
            return inp;
          }
        },
        {
          title: "次数",
          align: "center",
          render: (h, p) => {
            const { id, frequency } = p.row;

            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                type: "number",
                min: "0",
                step: "1",
                maxlength: 16
              },
              domProps: {
                value: frequency
              },
              on: {
                blur: event => {
                  self.currentFrequency = event.target.value;

                  self.handleSaveTargetList(id);
                }
              }
            });
            return inp;
          }
        },
        {
          title: "体积（%）>=",
          align: "center",
          render: (h, p) => {
            const { id, volume } = p.row;

            const inp = h("input", {
              style: {
                width: "100%",
                padding: "4px 2px",
                borderRadius: "4px",
                border: "1px  #e9eaec",
                textAlign: "center"
              },
              attrs: {
                type: "number",
                min: "0",
                step: "1",
                maxlength: 16
              },
              domProps: {
                value: volume
              },
              on: {
                blur: event => {
                  self.currentVolume = event.target.value;

                  self.handleSaveTargetList(id);
                }
              }
            });
            return inp;
          }
        }
      ],
      columns2ForRead: [
        {
          title: "靶区名称",
          align: "center",
          key: "targetname"
        },
        {
          title: "总剂量（cGy）",
          align: "center",
          key: "fulldose"
        },
        {
          title: "分次剂量（cGy）",
          align: "center",
          key: "fractionaldose"
        },
        {
          title: "次数",
          align: "center",
          key: "frequency"
        },
        {
          title: "体积（%）>=",
          align: "center",
          key: "volume"
        }
      ]
    };
  }

  @Prop() public name2!: string;
  @Prop() private name!: string;
  @Prop() private formValidate!: Header;
  @Prop() private isEdit!: string;
  @Prop() private irradiationPosition: String;

  private mounted() {
    console.log("Header");
  }
  imperilListDtoRowClick(selection) {
    this.currentImperilSelection = selection;
  }

  targetListDtoRowClick(selection) {
    this.currentTargetSelection = selection;
  }
  handleSaveImperilorgan(id) {
    const {
      currentImperilorganname,
      currentLimiteddosevolume,
      currentLimiteddose,
      formValidate
    } = this;
    this.formValidate.imperilListDto = formValidate.imperilListDto.map(v => {
      return v.id === id
        ? {
            imperilorganname:
              currentImperilorganname !== ""
                ? currentImperilorganname
                : v.imperilorganname,
            limiteddosevolume:
              currentLimiteddosevolume !== null
                ? currentLimiteddosevolume
                : v.limiteddosevolume,
            limiteddose:
              currentLimiteddose !== null ? currentLimiteddose : v.limiteddose,
            id: v.id,
            irradiationPosition: v.irradiationPosition,
            planningDesignOrderId: v.planningDesignOrderId
          }
        : v;
    });

    this.currentImperilorganId = null;
    this.currentLimiteddosevolume = null;
    this.currentLimiteddose = null;
    this.currentImperilorganname = "";
  }

  handleSaveTargetList(id) {
    const {
      currentTargetname,
      currentFulldose,
      currentFractionaldose,
      currentFrequency,
      currentVolume,
      formValidate
    } = this;
    this.formValidate.targetListDto = formValidate.targetListDto.map(v => {
      return v.id === id
        ? {
            targetname:
              currentTargetname !== "" ? currentTargetname : v.targetname,
            fulldose: currentFulldose !== null ? currentFulldose : v.fulldose,
            fractionaldose:
              currentFractionaldose !== null
                ? currentFractionaldose
                : v.fractionaldose,
            frequency:
              currentFrequency !== null ? currentFrequency : v.frequency,
            volume: currentVolume !== null ? currentVolume : v.volume,
            id: v.id,
            irradiationPosition: v.irradiationPosition,
            planningDesignOrderId: v.planningDesignOrderId
          }
        : v;
    });

    this.currentTargetId = null;
    this.currentFulldose = null;
    this.currentFractionaldose = null;
    this.currentTargetname = "";
    this.currentVolume = null;
    this.currentFrequency = null;
  }

  handleAddImperilorganname() {
    var imperil = new ImperilListDto();
    imperil.id = new Date().getTime() % 10000000;
    this.formValidate.imperilListDto.push(imperil);
  }
  handleRemoveImperilorganname() {
    this.formValidate.imperilListDto = this.formValidate.imperilListDto.filter(
      item => {
        let arr = this.currentImperilSelection.map(obj => {
          return obj.id;
        });

        return arr.indexOf(item.id) == -1;
      }
    );
  }
  handleAddTarget() {
    var target = new TargetListDto();
    target.id = new Date().getTime() % 10000000;
    this.formValidate.targetListDto.push(target);
  }

  handleRemoveTarget() {
    this.formValidate.targetListDto = this.formValidate.targetListDto.filter(
      item => {
        let arr = this.currentTargetSelection.map(obj => {
          return obj.id;
        });

        return arr.indexOf(item.id) == -1;
      }
    );
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

