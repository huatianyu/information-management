<template>
  <div class="form-height">
    <v-row>
      <v-col cols="12" lg="4" xl="4" md="12" sm="12" xs="12">
        <v-row>
          <v-col cols="12" lg="12" xl="12" md="6" sm="12" xs="12">
            <div id="myChart" ref="myChart" :style="{width: '100%', height: '250px'}"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-on:mouseover="changeActive($event)"
            v-on:mouseout="removeActive($event)"
            cols="12"
            lg="12"
            xl="12"
            md="12"
            sm="12"
            xs="12"
          >
            <v-carousel
              v-model="carouselItem"
              hide-delimiters
              :show-arrows="true"
              height="100%"
              light
            >
              <v-carousel-item>
                <v-row class="px-2">
                  <v-col>
                    <material-chart-card
                      :data="dailySalesChart.data"
                      :options="dailySalesChart.options"
                      color="#2fcba71c"
                      type="Bar"
                    >
                      <h4 class="chart-title-color">
                        治疗人数
                        <span class="chart-sub-title">年增长率</span>
                        <v-icon color="green" class="chart-sub-title" small>mdi-arrow-up</v-icon>
                        <span class="white--text chart-sub-title">55%</span>
                      </h4>
                    </material-chart-card>
                  </v-col>
                </v-row>
              </v-carousel-item>
              <v-carousel-item>
                <v-row class="px-2">
                  <v-col>
                    <material-chart-card
                      :data="emailsSubscriptionChart.data"
                      :options="emailsSubscriptionChart.options"
                      :responsive-options="emailsSubscriptionChart.responsiveOptions"
                      color="#2fcba71c"
                      type="Bar"
                    >
                      <h4 class="chart-title-color">
                        定位人次
                        <span class="chart-sub-title">年增长率</span>
                        <v-icon color="green" class="chart-sub-title" small>mdi-arrow-up</v-icon>
                        <span class="white--text chart-sub-title">55%</span>
                      </h4>
                    </material-chart-card>
                  </v-col>
                </v-row>
              </v-carousel-item>
              <v-carousel-item>
                <v-row class="px-2">
                  <v-col>
                    <material-chart-card
                      :data="dataCompletedTasksChart.data"
                      :options="dataCompletedTasksChart.options"
                      color="#2fcba71c"
                      type="Bar"
                    >
                      <h4 class="chart-title-color">
                        计划设计人次
                        <span class="chart-sub-title">年增长率</span>
                        <v-icon color="green" class="chart-sub-title" small>mdi-arrow-up</v-icon>
                        <span class="white--text chart-sub-title">55%</span>
                      </h4>
                    </material-chart-card>
                  </v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="py-10" lg="6" xl="6" md="12" sm="12" xs="12">
        <material-chart-card
          :data="planDesign.data"
          :options="planDesign.options"
          color="#3d789587"
          type="Line"
        >
          <h4 class="chart-title-color">
            计划设计人数
            <span class="chart-sub-title">年增长率</span>
            <v-icon color="green" class="chart-sub-title" small>mdi-arrow-up</v-icon>
            <span class="white--text chart-sub-title">55%</span>
          </h4>
        </material-chart-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";
import $ from "jquery";

@Component({
  components: {}
})
export default class Statistics extends AbpBase {
  carouselItem: Number = 0;
  cycle: Boolean = true;
  data() {
    return {
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      },
      dailySalesChart: {
        data: {
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          series: [[12, 17, 7, 17, 190, 490, 38, 100, 23, 18, 38, 10]]
        },
        options: {
          low: 0,
          high: 500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          series: [[12, 17, 7, 17, 190, 18, 38, 100, 23, 18, 38, 10]]
        },
        options: {
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["2014年", "2015年", "2016年", "2017年", "2018年", "2019年"],
          series: [[12, 110, 200, 1000, 1500, 2000]]
        },
        options: {
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      planDesign: {
        data: {
          labels: ["2014年", "2015年", "2016年", "2017年", "2018年", "2019年"],
          series: [[12, 110, 200, 1000, 1500, 2000]]
        },
        options: {
          low: 0,
          high: 2500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },

      distributedSeriesOptions: {
        distributeSeries: true
      },
      distributedSeriesData: {
        labels: ["头部", "颈部", "胸部", "腹部", "盆腔", "四肢", "其他"],
        series: [15, 40, 60, 100, 31, 53, 10]
      }
    };
  }
  mounted() {
    this.drawLine();
  }

  // 鼠标移入加入class
  changeActive($event) {
    this.cycle = false;
  }
  removeActive($event) {
    this.cycle = true;
  }
  drawLine() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = (this as any).$echarts.init(
      document.getElementById("myChart")
    );
    // 绘制图表
    myChart.setOption({
      title: {
        text: "2019年病例分布数",
        x: "center", //x轴方向对齐方式
        textStyle: {
          color: "#fff"
        }
      },
      textStyle: {
        color: "#fff"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        bottom: "bottom",
        data: ["头部", "颈部", "胸部", "腹部", "盆腔", "四肢", "其他"],
        textStyle: {
          color: "#fff"
        }
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],

          data: [
            { value: 335, name: "头部" },
            { value: 310, name: "颈部" },
            { value: 234, name: "胸部" },
            { value: 135, name: "腹部" },
            { value: 1548, name: "盆腔" },
            { value: 135, name: "四肢" },
            { value: 1548, name: "其他" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });
  }
}
</script>
<style  scoped>
.chart-title-color {
  color: #fff;
}
.chart-sub-title {
  color: #fff;
  font-size: 12px;
}
.form-height {
  height: calc(84vh) !important;
  overflow: auto;
  padding: 0 20px;
}
</style>