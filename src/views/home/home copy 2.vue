<template>
  <div>
    <div>
      <v-row>
        <v-col v-for="(infor, i) in inforCardData" :key="`infor-${i}`">
          <infor-card
            :color="infor.color"
            :value="infor.count"
            :title="infor.title"
            :icon="infor.icon"
            :icon-size="64"
          ></infor-card>
        </v-col>

        <v-col
          :md="12 - inforCardData.length*3"
          v-for="(infor, i) in inforCardData_after"
          :key="`infor-${i}`"
        >
          <infor-card
            :color="infor.color"
            :value="infor.count"
            :title="infor.title"
            :icon="infor.icon"
            :icon-size="64"
          ></infor-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <material-list-card color="green" title="CTSIM扫描任务" text="CTSIM扫描任务列表">
                <v-row>
                  <v-col md="6" v-for="item in list">
                    <workcard :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <material-list-card color="green" title="TPS计划任务" text="TPS计划任务列表">
                <v-row>
                  <v-col md="6" v-for="item in list">
                    <workcard :item="item"></workcard>
                  </v-col>
                </v-row>
              </material-list-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-6">
          <material-card color="green" title="日程" text="日程详细事件">
            <v-sheet height="500">
              <v-calendar
                color="green"
                event-color="green"
                type="month"
                now="2019-01-08"
                value="2019-01-08"
                :events="events"
              ></v-calendar>
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
      events: [
        {
          name: "Vacation",
          details: "Going to the beach!",
          start: "2018-12-29",
          end: "2019-01-01",
          color: "blue"
        },
        {
          name: "Meeting",
          details: "Spending time on how we do not have enough time",
          start: "2019-01-07 09:00",
          end: "2019-01-07 09:30",
          color: "indigo"
        },
        {
          name: "Large Event",
          details:
            "This starts in the middle of an event and spans over multiple events",
          start: "2018-12-31",
          end: "2019-01-04",
          color: "deep-purple"
        },
        {
          name: "3rd to 7th",
          details: "Testing",
          start: "2019-01-03",
          end: "2019-01-07",
          color: "cyan"
        },
        {
          name: "Big Meeting",
          details: "A very important meeting about nothing",
          start: "2019-01-07 08:00",
          end: "2019-01-07 11:30",
          color: "red"
        },
        {
          name: "Another Meeting",
          details: "Another important meeting about nothing",
          start: "2019-01-07 10:00",
          end: "2019-01-07 13:30",
          color: "brown"
        },
        {
          name: "7th to 8th",
          start: "2019-01-07",
          end: "2019-01-08",
          color: "blue"
        },
        {
          name: "Lunch",
          details: "Time to feed",
          start: "2019-01-07 12:00",
          end: "2019-01-07 15:00",
          color: "deep-orange"
        },
        {
          name: "30th Birthday",
          details: "Celebrate responsibly",
          start: "2019-01-03",
          color: "teal"
        },
        {
          name: "New Year",
          details: "Eat chocolate until you pass out",
          start: "2019-01-01",
          end: "2019-01-02",
          color: "green"
        },
        {
          name: "Conference",
          details: "The best time of my life",
          start: "2019-01-21",
          end: "2019-01-28",
          color: "grey darken-1"
        },
        {
          name: "Hackathon",
          details: "Code like there is no tommorrow",
          start: "2019-01-30 23:00",
          end: "2019-02-01 08:00",
          color: "black"
        },
        {
          name: "event 1",
          start: "2019-01-14 18:00",
          end: "2019-01-14 19:00",
          color: "#4285F4"
        },
        {
          name: "event 2",
          start: "2019-01-14 18:00",
          end: "2019-01-14 19:00",
          color: "#4285F4"
        },
        {
          name: "event 5",
          start: "2019-01-14 18:00",
          end: "2019-01-14 19:00",
          color: "#4285F4"
        },
        {
          name: "event 3",
          start: "2019-01-14 18:30",
          end: "2019-01-14 20:30",
          color: "#4285F4"
        },
        {
          name: "event 4",
          start: "2019-01-14 19:00",
          end: "2019-01-14 20:00",
          color: "#4285F4"
        },
        {
          name: "event 6",
          start: "2019-01-14 21:00",
          end: "2019-01-14 23:00",
          color: "#4285F4"
        },
        {
          name: "event 7",
          start: "2019-01-14 22:00",
          end: "2019-01-14 23:00",
          color: "#4285F4"
        }
      ],
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
  text-decoration: underline;
}
</style>
