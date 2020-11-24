<template>
  <div class="form-height">
    <material-card
      :color="currentColor"
      title="审核定位结果"
      :showBackBtn="true"
      text="审核定位结果内容表单"
    >
      <v-form ref="centerCtsimContent">
        <v-container py-0>
          <Affix :offset-top="350">
            <v-row>
              <v-col>
                <v-navigation-drawer
                  height="280"
                  color="#222629c9"
                  permanent
                  absolute
                  right
                  expand-on-hover
                >
                  <template v-slot:prepend>
                    <v-row class="purple-input px-2">
                      <v-col cols="12" md="12">
                        <v-textarea
                          label="备注"
                          placeholder="输入备注"
                          filled
                          background-color="amber lighten-4"
                          class="purple-input pa-0"
                          v-model="centerCtsimContent.remarks"
                        ></v-textarea>
                        <v-btn @click="agree()" color="#4dc9a875"
                          >审核通过</v-btn
                        >
                        <v-btn color="brown" @click="disagree()">拒绝</v-btn>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                  </template>
                </v-navigation-drawer>
              </v-col>
            </v-row>
          </Affix>
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="title font-weight-light">定位信息</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <template>
                  <v-list-item>
                    <v-list-item-content>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="体位固定记录"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="执行人"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="执行时间"
                            dark
                            class="purple-input py-0"
                            disabled
                            value
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="执行设备"
                            v-model="centerCtsimContent.scanningEquipment"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="固定部位"
                            v-model="centerCtsimContent.fixedPosition"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="体位"
                            v-model="centerCtsimContent.bodyPosition"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="特殊要求"
                            v-model="centerCtsimContent.requirements"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="固定器"
                            v-model="centerCtsimContent.fixedEquipment"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="固定垫"
                            value
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="固定膜"
                            value
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="是否拍摄定位片"
                            value
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="备注"
                            v-model="centerCtsimContent.remarks"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="扫描记录"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="执行人"
                            value
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="执行时间"
                            dark
                            class="purple-input py-0"
                            disabled
                            value
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="执行设备"
                            value
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="扫描进程"
                            v-model="centerCtsimContent.scanningProcess"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="重建进程"
                            value
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="扫描范围"
                            v-model="centerCtsimContent.scanningRange"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="扫描厚度"
                            v-model="centerCtsimContent.scanningLayerThickness"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="扫描方式"
                            v-model="centerCtsimContent.scanningMode"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="是否做融合"
                            value
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                        <v-col cols="12" md="2" lg="2" xl="2" sm="2">
                          <v-text-field
                            label="备注"
                            dark
                            class="purple-input py-0"
                            disabled
                          />
                        </v-col>
                      </v-row>
                      <v-divider dark></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span class="title font-weight-light">定位结果</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="zoomOhifViewer">
                  <ohifViewer
                    :OHIFViewerName="centerCtsimContent.imgName"
                  ></ohifViewer>
                </div>
                <v-btn icon>
                  <v-icon
                    @click="fullScreenClick(`zoomOhifViewer`)"
                    title="全屏"
                    class="my-1"
                  >
                    mdi-arrow-expand-all
                  </v-icon>
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-form>
    </material-card>
  </div>
</template>

<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import List from '../../patientTreatment/plan/List.vue';
import FormBasic from '../../../basicInfo/formBasic.vue';
import PlanApplication from '../../../../store/entities/plan/planApplication';
import list from './../../../../store/entities/plan/list';
import patientSearchItem from './../../../customize/patientSearchItem.vue';
import ohifViewer from './../ohifViewer.vue';
import VueRouter from 'vue-router';
class positionItem {
  id: Number;
  title: String;
  name: String;
}
@Component({
  components: {List, FormBasic, patientSearchItem, ohifViewer},
})
export default class ExamineLocationResult extends AbpBase {
  get panel() {
    return [0, 1, 2];
  }
  get currentColor() {
    return this.$store.state.targetResource.color;
  }

  get centerCtsimContent() {
    return this.$store.state.targetResource.examineLocationResult
      .centerCtsimContent;
  }

  async agree() {
    var success = await this.$store.dispatch({
      type: 'planApplication/CtsimResultAgreedAsync',
      data: {
        sessionRemarks: this.centerCtsimContent.remarks,
        locationId: this.centerCtsimContent.locationId,
        radiotherapyNum: this.centerCtsimContent.radiotherapyNum,
      },
    });

    if (success) {
      this.$Message.success('操作成功');
    }
  }
  async disagree() {
    var success = await this.$store.dispatch({
      type: 'planApplication/CtsimResulCancleAsync',
      data: {
        sessionRemarks: this.centerCtsimContent.remarks,
        locationId: this.centerCtsimContent.locationId,
        radiotherapyNum: this.centerCtsimContent.radiotherapyNum,
      },
    });

    if (success) {
      this.$Message.success('操作成功');
    }
  }
  fullScreenClick(className) {
    this.requestFullScreen($('.' + className)[0]);
  }
  // 全屏
  requestFullScreen(element) {
    var requestMethod =
      element.requestFullScreen || //W3C
      element.webkitRequestFullScreen || //Chrome等
      element.mozRequestFullScreen || //FireFox
      element.msRequestFullScreen; //IE11
    if (requestMethod) {
      requestMethod.call(element);
    } else if (typeof (window as any).ActiveXObject !== 'undefined') {
      //for Internet Explorer
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  }

  goback() {
    this.$router.go(-1); //返回上一层
  }
}
</script>

<style scoped>
.form-height {
  height: calc(80vh) !important;
  overflow: auto;
  padding: 0px 20px;
}
.font-weight-light {
  color: #fff;
}
.zoomOhifViewer {
  overflow: auto;
}
</style>
