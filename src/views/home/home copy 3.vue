<template>
  <div>
    <div>
      <v-row>
        <v-col v-for="(infor, i) in homeContent.projectTop" :key="`infor-${i}`">
          <infor-card
            color="green"
            :value="infor.locationCount"
            :title="infor.entryName"
            icon="mdi-mastodon-variant"
            :icon-size="64"
          ></infor-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col
              v-if="projectContent.locationCtismList.length != 0"
              sm="12"
              md="6"
              xl="6"
              lg="6"
              cols="12"
            >
              <material-list-card  :showMordBtn="false" color="green" title="申请定位" text="待申请定位列表">
                <v-row>
                  <v-col md="6" v-for="item in projectContent.locationCtismList">
                    <workcard :subText="'locationCtismList'" :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
            <v-col
              v-if="projectContent.planOrderList.length != 0"
              sm="12"
              md="6"
              xl="6"
              lg="6"
              cols="12"
            >
              <material-list-card :showMordBtn="false" color="green" title="申请计划" text="待申请计划列表">
                <v-row>
                  <v-col md="6" v-for="item in projectContent.planOrderList">
                    <workcard :subText="'planOrderList'"  :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-if="projectContent.examineLocationResult.length != 0"
              sm="12"
              md="6"
              xl="6"
              lg="6"
              cols="12"
            >
              <material-list-card color="green" :showMordBtn="false" title="审核定位结果" text="待审核定位结果列表">
                <v-row>
                  <v-col md="6" v-for="item in projectContent.examineLocationResult">
                    <workcard :subText="'examineLocationResult'" :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
            <v-col
              v-if="projectContent.projectLocationDetailed.length != 0"
              sm="12"
              md="6"
              xl="6"
              lg="6"
              cols="12"
            >
              <material-list-card color="green" :showMordBtn="false" title="审核定位申请单" text="待审核定位申请单列表">
                <v-row>
                  <v-col md="6" v-for="item in projectContent.projectLocationDetailed">
                    <workcard :subText="'reviewTargetingApplication'" :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col v-if="projectContent.approvaltPlanDetailed.length != 0">
              <material-list-card color="green" :showMordBtn="false" title="批准计划" text="待批准计划列表">
                <v-row>
                  <v-col md="6" v-for="item in projectContent.approvaltPlanDetailed">
                    <workcard :subText="'approvePlan'" :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="projectContent.examinetPlanDetailed.length != 0">
              <material-list-card color="green" :showMordBtn="false" title="审核计划申请" text="待审核计划申请列表">
                <v-row>
                  <v-col md="6" v-for="item in projectContent.examinetPlanDetailed">
                    <workcard :subText="'planApplication'" :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
          </v-row>
          <v-row v-if="projectContent.approvaltTreatment.length != 0">
            <v-col>
              <material-list-card color="green" :showMordBtn="false" title="批准治疗" text="待批准治疗列表">
                <v-row>
                  <v-col md="6" v-for="item in projectContent.approvaltTreatment">
                    <workcard :subText="'approvaltTreatment'" :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="12" md="6" xl="6" lg="6" cols="12">
          <material-card color="green" title="日程" text="日程详细事件">
            <v-sheet height="500">
              <v-calendar color="green" type="month" locale="CN"></v-calendar>
            </v-sheet>
          </material-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import workcard from "./workcard.vue";
import InforCard from "@/components/info-card/index";
import ProjectContent from "../../store/entities/projectContent";

@Component({
  components: { InforCard, workcard }
})
export default class Patients extends AbpBase {
  get homeContent() {
    return this.$store.state.home.homeContent;
  }
  set homeContent(value) {
    this.$store.state.home.homeContent = value;
  }
  get projectContent() {
    return this.$store.state.home.homeContent.projectContent;
  }

  set projectContent(value) {
    this.$store.state.home.homeContent.projectContent = value;
  }
  get list() {
    return [
      {
        birthDay: "1978-06-07",
        patientName: "李丰益"
      },
      {
        birthDay: "1991-04-12",
        patientName: "李天一"
      },
      {
        birthDay: "1978-06-07",
        patientName: "张南里"
      },
      {
        birthDay: "1978-06-07",
        patientName: "张铁男"
      }
    ];
  }
  data() {
    return {
      inforCardData: [
        {
          title: "CTSIM扫描任务",
          icon: "mdi-message-text",
          count: 803,
          color: "green"
        },
        {
          title: "TPS计划任务",
          icon: "mdi-file-multiple-outline",
          count: 232,
          color: "orange"
        }
      ],

      inforCardData_after: [
        {
          title: "文字信息",
          icon: "mdi-mastodon-variant",
          count: 142,
          color: "blue"
        }
      ]
    };
  }
  async getpage() {
    this.$store.dispatch({
      type: "home/getMainHomeList"
    });
  }
  created() {
    this.getpage();
  }
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
  text-decoration: underline;
}
</style>
<style>
.v-btn__content {
  color: green;
}
</style>