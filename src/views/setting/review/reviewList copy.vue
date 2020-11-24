<template>
  <div>
    <Card title="审核批准" dis-hover :bordered="false">
      <Row :gutter="20" style="margin-bottom:10px">
        <Col span="11">
          <Card dis-hover>
            <p slot="title" class="task-title">审核定位申请单</p>
            <a
              href="#"
              slot="extra"
              @click.prevent="showMoreReviewTargetingApplication(reviewList)"
              class="task-more"
            >
              <Icon type="ios-loop-strong"></Icon>更多
            </a>
            <Row>
              <Col v-for="item in reviewList.projectLocationDetailed" span="12">
                <project-location-detailed :cardName="'reviewTargetingApplication'" :item="item"></project-location-detailed>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row :gutter="20" style="margin-bottom:10px">
        <Col span="11">
          <Card dis-hover>
            <p slot="title" class="task-title">审核计划申请单</p>
            <a
              href="#"
              slot="extra"
              @click.prevent="showMoreReviewPlanApplication(reviewList)"
              class="task-more"
            >
              <Icon type="ios-loop-strong"></Icon>更多
            </a>
            <Row>
              <Col v-for="item in reviewList.projectPlanDetailed" span="12">
                <project-plan-detailed :cardName="'planApplication'" :item="item"></project-plan-detailed>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Spin size="large" fix v-if="loading"></Spin>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";
import PageRequest from "@/store/entities/page-request";
import workcard from "../../home/workcard.vue";
import InforCard from "@/components/info-card/index";
import projectLocationDetailed from "../review/card/projectLocationDetailed.vue";
import projectPlanDetailed from "../review/card/projectPlanDetailed.vue";

@Component({
  components: { InforCard, projectPlanDetailed, projectLocationDetailed }
})
export default class Patients extends AbpBase {
  get reviewList() {
    return this.$store.state.reviewList.reviewList;
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

  activated() {
    this.$store.dispatch({
      type: "reviewList/getExamineCountAsync",
      data: { count: "4" }
    });
  }

  get loading() {
    return this.$store.state.reviewList.loading;
  }

  showMore(name) {
    this.$store.commit("targetResource/setRouterName", name);
    this.$router.push({
      name: "moreTargetApplication"
    });
  }

  showMoreReviewTargetingApplication(data) {
    this.$store.commit(
      "targetResource/setRouterName",
      "reviewTargetingApplication"
    );
    this.$router.push({
      name: "moreTargetApplication"
    });
  }

  showMoreReviewPlanApplication(data) {
    this.$store.commit("targetResource/setRouterName", "planApplication");
    this.$router.push({
      name: "morePlanApplication"
    });
  }
  //   beforeRouteEnter(to, from, next) {
  //     next(vm => {
  //  this.$store.dispatch({
  //       type: "reviewList/getExamineCountAsync",
  //       data: { count: "4" }
  //     });
  //     });
  //   }
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
