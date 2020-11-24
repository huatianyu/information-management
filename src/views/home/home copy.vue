<template>
  <div>
    <div>
      <Row :gutter="20">
        <i-col
          :xs="6"
          :md="6"
          :lg="6"
          v-for="(infor, i) in inforCardData"
          :key="`infor-${i}`"
          style="height: 150px;padding-bottom: 10px;"
        >
          <infor-card :color="infor.color" :icon="infor.icon" :icon-size="64">
            <count-to :color="infor.color" :end="infor.count" count-class="count-style" />
            <p class="count-title-style">{{ infor.title }}</p>
          </infor-card>
        </i-col>

        <i-col
          :md="24 - inforCardData.length*6"
          v-for="(infor, i) in inforCardData_after"
          :key="`infor-${i}`"
          style="height: 150px;padding-bottom: 10px;"
        >
          <infor-card :left="10" :icon="infor.icon" :icon-size="64">
            <count-to :color="infor.color" :end="infor.count" count-class="count-style" />
            <p class="count-title-style">{{ infor.title }}</p>
          </infor-card>
        </i-col>
      </Row>
      <Row :gutter="20" style="margin-bottom:10px">
        <Col span="14">
          <Row :gutter="20" style="margin-bottom:10px">
            <Col span="24">
              <Card dis-hover>
                <p slot="title" class="task-title">CTSIM扫描任务</p>
                <a href="#" slot="extra" @click.prevent class="task-more">
                  <Icon type="ios-loop-strong"></Icon>更多
                </a>
                <Row>
                  <Col  v-for="item in list" span="12">
                    <workcard :item="item"></workcard>
                  </Col>
                 
                </Row>
              </Card>
            </Col>
          </Row>
          <Row :gutter="20" style="margin-bottom:10px">
            <Col span="24">
              <Card dis-hover>
                <p slot="title" class="task-title">TPS计划任务</p>
                <a href="#" slot="extra" @click.prevent class="task-more">
                  <Icon type="ios-loop-strong"></Icon>更多
                </a>
                <Row>
                  <Col  v-for="item in list" span="12">
                    <workcard :item="item"></workcard>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span="10">
          <calendar></calendar>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";
// import CreatePatient from "./create-home.vue";
import workcard from "./workcard.vue";
import calendar from "./calendar.vue";

import InforCard from "@/components/info-card/index";

import CountTo from "@/components/count-to";

// import Example from './example.vue'

class PagePatientRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null; //nullable
  from: Date;
  to: Date;
}

@Component({
  components: { InforCard, CountTo, workcard, calendar }
})
export default class Patients extends AbpBase {
  get list() {
    return [
      {
        birthDay: "1978-06-07",
        patientName: "李丰益",
      },
       {
        birthDay: "1991-04-12",
        patientName: "李天一",
      },
       {
        birthDay: "1978-06-07",
        patientName: "张南里",
      },
       {
        birthDay: "1978-06-07",
        patientName: "张铁男",
      }
    ];
  }
  data() {
    return {
      inforCardData: [
        {
          title: "CTSIM扫描任务",
          icon: "logo-apple",
          count: 803,
          color: "#515a6e"
        },
        {
          title: "TPS计划任务",
          icon: "ios-people",
          count: 232,
          color: "#2d8cf0"
        }
      ],

      inforCardData_after: [
        {
          title: "文字信息",
          icon: "md-help-circle",
          count: 142,
          color: "#515a6e"
        }
      ]
    };
  }

  pagerequest: PagePatientRequest = new PagePatientRequest();
}
</script>

<style scoped lang="less">
.count-style {
  font-size: 30px;
  font-weight: 600;
}
.count-title-style {
  color: #999eaa;
  font-weight: 600;
  font-family: "仿宋";
  font-size: 18px;
}

.task-title {
  color: #6c757d;
  font-size: 16px;
}

.task-more {
  color: #115581;
  font-size: 12px;
  text-decoration:underline
}
</style>
