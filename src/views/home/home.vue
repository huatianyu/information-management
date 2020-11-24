<template>
  <div class="purple-input px-7">
    <v-row>
      <v-col sm="6" md="6" xl="6" lg="6" cols="12">
        <v-row>
          <v-col>
            <v-row>
              <v-col
                @click="onClick(infor.entryName)"
                v-on:mouseover="cardActive(i)"
                sm="6"
                md="4"
                xl="4"
                lg="4"
                cols="12"
                v-for="(infor, i) in homeContent.projectTop"
                :key="`infor-${i}`"
              >
                <infor-card
                  color="#49ffff75"
                  :value="infor.locationCount"
                  :title="infor.entryName"
                  icon="mdi-mastodon-variant"
                  :height-light="i == carouselItem"
                ></infor-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-on:mouseover="changeActive($event)"
            v-on:mouseout="removeActive($event)"
          >
            <v-carousel
              v-model="carouselItem"
              :cycle="cycle"
              :show-arrows="false"
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              light
              height="650"
            >
              <v-carousel-item>
                <material-list-card
                  :showMordBtn="false"
                  color="#4dc9a875"
                  title="待定位"
                >
                  <v-tabs dark>
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{ projectContent.locationCtism.count }}</span>
                        </template>
                        <v-icon left>mdi-account</v-icon> 申请定位
                      </v-badge>
                    </v-tab>
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{
                            projectContent.locationExamine.count
                          }}</span>
                        </template>
                        <v-icon left>mdi-store</v-icon> 审核定位申请单
                      </v-badge>
                    </v-tab>
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{
                            projectContent.locationExamineResult.count
                          }}</span>
                        </template>
                        <v-icon left>mdi-access-point</v-icon> 审核定位结果
                      </v-badge>
                    </v-tab>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.locationCtism
                            .locationCtismList"
                          :subText="'locationCtismList'"
                          :item="item"
                        ></workcard>
                        <v-card-actions @click="showMore('locationCtismList')">
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.locationExamine
                            .projectLocationDetailed"
                          :subText="'reviewTargetingApplication'"
                          :item="item"
                        ></workcard>
                        <v-card-actions
                          @click="showMore('reviewTargetingApplication')"
                        >
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.locationExamineResult
                            .examineLocationResult"
                          :subText="'examineLocationResult'"
                          :item="item"
                        ></workcard>
                        <v-card-actions
                          @click="showMore('examineLocationResult')"
                        >
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </material-list-card>
              </v-carousel-item>
              <v-carousel-item>
                <material-list-card
                  :showMordBtn="false"
                  color="#4dc9a875"
                  title="待计划"
                >
                  <v-tabs dark>
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{ projectContent.planOrder.count }}</span>
                        </template>
                        <v-icon left>mdi mdi-bug</v-icon>
                        申请计划
                      </v-badge>
                    </v-tab>
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{ projectContent.examinetPlan.count }}</span>
                        </template>
                        <v-icon left>mdi mdi-twitter</v-icon>
                        审核计划申请
                      </v-badge>
                    </v-tab>
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{ projectContent.planApprove.count }}</span>
                        </template>
                        <v-icon left>mdi mdi-twitter</v-icon>
                        批准计划
                      </v-badge>
                    </v-tab>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.planOrder.planOrderList"
                          :subText="'planOrderList'"
                          :item="item"
                        ></workcard>
                        <v-card-actions @click="showMore('planOrderList')">
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.examinetPlan
                            .planOrderList"
                          :subText="'planApplication'"
                          :item="item"
                        ></workcard>
                        <v-card-actions @click="showMore('planApplication')">
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.planApprove
                            .planOrderList"
                          :subText="'approvePlan'"
                          :item="item"
                        ></workcard>
                        <v-card-actions @click="showMore('approvePlan')">
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </material-list-card>
              </v-carousel-item>
              <v-carousel-item>
                <material-list-card
                  :showMordBtn="false"
                  color="#4dc9a875"
                  title="排程预约"
                >
                  <v-tabs dark>
                    <!-- /注意这里前后端命名缘故 排程预约字段暂时不对应 / -->
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{ projectContent.scheduleList.count }}</span>
                        </template>
                        <v-icon left>mdi mdi-bug</v-icon>
                        排程
                      </v-badge>
                    </v-tab>
                    <v-tab>
                      <v-badge color="#4dc9a875" right>
                        <template v-slot:badge>
                          <span>{{ projectContent.appointment.count }}</span>
                        </template>
                        <v-icon left>mdi mdi-bug</v-icon>
                        预约
                      </v-badge>
                    </v-tab>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.scheduleList
                            .scheduleList"
                          :subText="'appointmentList'"
                          :item="item"
                        ></workcard>
                        <v-card-actions @click="showMore('appointmentList')">
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card :elevation="0">
                        <workcard
                          v-for="item in projectContent.appointment
                            .appointmentList"
                          :subText="'scheduleList'"
                          :item="item"
                        ></workcard>
                        <v-card-actions @click="showMore('scheduleList')">
                          <v-list-item class="grow">
                            <v-row title="更多" align="center" justify="end">
                              <v-icon light class="mr-1"
                                >mdi-format-list-bulleted-square</v-icon
                              >
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </material-list-card>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <!-- <v-col sm="12" md="6" xl="6" lg="6" cols="12">
        <material-card color="#e3ee8f4f" title="日程" text="日程详细事件">
          <v-sheet height="400">
            <v-calendar dark color="#4dc9a875" type="month" locale="CN"></v-calendar>
          </v-sheet>
        </material-card>
          </v-col>-->
        </v-row>
      </v-col>
      <v-col class="py-10" cols="12" offset="1" sm="4" md="4" xl="4" lg="4">
        <v-card max-width="650" class="mx-auto">
          <v-toolbar dark>
            <v-toolbar-title>公告</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>更多></v-btn>
          </v-toolbar>
          <v-list one-line>
            <template v-for="(item, index) in items">
              <v-list-item :key="item.title" @click>
                <v-list-item-content>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                  <v-divider dark></v-divider>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>
                    <span class="time-color">2019-03-25</span>
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import workcard from './workcard.vue';
import InforCard from '@/components/info-card/index';
import ProjectContent from '../../store/entities/projectContent';

@Component({
  components: {InforCard, workcard},
})
export default class Patients extends AbpBase {
  carouselItem: Number = 0;
  cycle: Boolean = true;
  get homeContent() {
    return this.$store.state.home.homeContent;
  }
  set homeContent(value) {
    this.$store.state.home.homeContent = value;
  }
  get projectContent() {
    return this.$store.state.home.homeContent.projectContent
      ? this.$store.state.home.homeContent.projectContent
      : new ProjectContent();
  }

  set projectContent(value) {
    this.$store.state.home.homeContent.projectContent = value;
  }

  data() {
    return {
      items: [
        {
          subtitle:
            '关于开展第十六届中国青年女科学家奖和2019年度未来女科学家计划天津市...',
        },
        {
          subtitle: '	2019年人事代理制面试人员信息表下载.',
        },
        {
          subtitle: '	天津医科大学肿瘤医院“十四五”国际交流与合作规划问卷调查表?',
        },
        {
          subtitle: '	污水处理信息公示',
        },
        {
          subtitle: '市肿瘤医院2019年度部门预算及“三公”经费预算公开',
        },
      ],
      inforCardData: [
        {
          title: 'CTSIM扫描任务',
          icon: 'mdi-message-text',
          count: 803,
          color: '#4dc9a875',
        },
        {
          title: 'TPS计划任务',
          icon: 'mdi-file-multiple-outline',
          count: 232,
          color: 'orange',
        },
      ],

      inforCardData_after: [
        {
          title: '文字信息',
          icon: 'mdi-mastodon-variant',
          count: 142,
          color: 'blue',
        },
      ],
    };
  }

  showMore(value) {
    this.$store.commit('targetResource/setCurrentColor', '#4dc9a875');
    switch (value) {
      case 'locationCtismList':
        this.showpatientResource(3);
        break;
      case 'planOrderList':
        this.showpatientResource(4);
        break;
      case 'reviewTargetingApplication':
        this.showMoreReviewTargetingApplication();
        break;
      case 'planApplication':
        this.showMoreReviewPlanApplication();
        break;
      case 'approvePlan':
        this.showMoreApprovePlan();
        break;
      case 'approvaltTreatment':
        this.showMoreApprovaltTreatment();
        break;
      case 'examineLocationResult':
        this.showMoreExamineLocationResult();
        break;
      case 'appointmentList':
        this.showMoreAppointmentList();
        break;
      case 'scheduleList':
        this.showMoreScheduleList();
        break;
    }
  }

  async showpatientResource(index) {
    this.$store.commit('patientTreatmentList/setCurrentTab', index);
    this.$router.push('/patientTreatment/patientTreatmentList');
  }

  showMoreReviewTargetingApplication() {
    this.$store.commit(
      'targetResource/setRouterName',
      'reviewTargetingApplication'
    );
    this.$store.commit('targetResource/setMoreTargetApplicationTab', 1);
    this.$router.push({
      name: 'moreTargetApplication',
    });
  }
  showMoreReviewPlanApplication() {
    this.$store.commit('targetResource/setRouterName', 'planApplication');
    this.$store.commit('targetResource/setMorePlanApplicationTab', 1);
    this.$router.push({
      name: 'morePlanApplication',
    });
  }
  showMoreApprovePlan() {
    this.$store.commit('targetResource/setRouterName', 'approvePlan');
    this.$store.commit('targetResource/setMoreApprovePlanTab', 1);
    this.$router.push({
      name: 'moreApprovePlan',
    });
  }
  showMoreApprovaltTreatment() {
    this.$store.commit('targetResource/setRouterName', 'approvaltTreatment');
    this.$router.push({
      name: 'moreApprovaltTreatment',
    });
  }
  showMoreExamineLocationResult() {
    this.$store.commit('targetResource/setRouterName', 'examineLocationResult');
    this.$store.commit('targetResource/setMoreExamineLocationResultTab', 1);
    this.$router.push({
      name: 'moreExamineLocationResult',
    });
  }
  showMoreAppointmentList() {
    this.$router.push('/arrangement/arrangementList');
  }
  showMoreScheduleList() {
    this.$router.push('/schedule/scheduleList');
  }
  onClick(carouselItem) {
    switch (carouselItem) {
      case '定位信息':
        this.carouselItem = 0;
        break;
      case '计划信息':
        this.carouselItem = 1;
        break;
      case '待审核批准信息':
        this.carouselItem = 2;
        break;
    }
  }
  cardActive(carouselItem) {
    this.carouselItem = carouselItem;
  }
  // 鼠标移入加入class
  changeActive($event) {
    this.cycle = false;
  }
  removeActive($event) {
    this.cycle = true;
  }
  async getpage() {
    await this.$store.dispatch({
      type: 'home/getMainHomeList',
    });
  }
  async created() {
    await this.getpage();
  }
}
</script>

<style scoped lang="less">
.time-color {
  color: #def2ed75;
}
</style>
