<template>
  <div class="purple-input px-7">
    <v-row>
      <v-col offset="4" sm="8" md="8" xl="8" lg="8" cols="12">
        <v-row>
          <v-col>
            <v-row>
              <v-col
                @click="onClick(infor.statisticsCount)"
                v-on:mouseover="cardActive(i)"
                sm="6"
                md="3"
                xl="3"
                lg="3"
                cols="12"
                v-for="(infor, i) in homeContent.projectTop"
                :key="`infor-${i}`"
              >
                <statistics-card
                  color="#46d2d96b"
                  :value="infor.statisticsName"
                  :title="infor.statisticsCount"
                  :icon="infor.iconName"
                  :height-light="i == carouselItem"
                ></statistics-card>
              </v-col>
            </v-row>
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
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          light
          hide-delimiters
          height="650"
        >
          <v-carousel-item>
            <div
              id="upcoming-statistics"
              class="echars-height"
              :style="{width: '100%'}"
            ></div>
          </v-carousel-item>
          <v-carousel-item>
            <div
              id="task-statistics"
              class="echars-height"
              :style="{width: '100%'}"
            ></div>
          </v-carousel-item>
          <v-carousel-item>
            <div
              id="department-statistics"
              class="echars-height"
              :style="{width: '100%'}"
            ></div>
          </v-carousel-item>
          <v-carousel-item>
            <div
              id="case-statistics"
              class="echars-height"
              :style="{width: '100%'}"
            ></div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import StatisticsCard from '@/components/statistics-card/index';
import echarts from 'echarts';
@Component({
  components: {StatisticsCard},
})
export default class Patients extends AbpBase {
  carouselItem: Number = 0;
  cycle: Boolean = true;
  departmentStatistics: any = null;
  caseStatistics: any = null;
  taskStatistics: any = null;
  upcomingStatistics: any = null;

  mounted() {
    this.upcomingStatisticsShow();
  }

  //待办统计
  upcomingStatisticsShow() {
    if (this.upcomingStatistics != null) {
      return;
    }
    let self = this;
    let dynamicData = [];
    setTimeout(function() {
      // 任务量统计图表
      self.upcomingStatistics = echarts.init(
        document.getElementById('upcoming-statistics')
      );



      //       self.upcomingStatistics.on('updateAxisPointer', function(event) {
      //   var xAxisInfo = event.axesInfo[0];
      //   if (xAxisInfo) {
      //     var dimension = xAxisInfo.value + 1;
      //     self.upcomingStatistics.setOption({
      //       series: {
      //         id: 'pie',
      //         label: {
      //           formatter: '{b}: {@[' + dimension + ']} ({d}%)',
      //         },
      //         encode: {
      //           value: dimension,
      //           tooltip: dimension,
      //         },
      //       },
      //     });
      //   }
      // });
      // 绘制图表
      self.upcomingStatistics.setOption({
        tooltip: {
          position: function(pos, params, dom, rect, size) {
            dynamicData = [];
            for (const key in params) {
              let a = params[key].value[1] as any;
              dynamicData.push(a);
            }
            console.log(dynamicData);
          },

          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'red',
              width: 1,
              type: 'solid',
            },
          },
        },

        legend: {
          data: ['接诊', '待定位', '待计划', '待治疗', 'SY', 'DD'],
          textStyle: {
            //图例文字的样式
            color: '#fff',
            fontSize: 16,
          },
        },
        dataZoom: [
          {type: 'inside'}, //用于添加滚轮缩放
          {type: 'slider'}, //用于添加滑动条缩放，
        ],

        singleAxis: {
          top: 50,
          bottom: 80,
          axisTick: {},
          axisLine: {
            lineStyle: {
              color: '#dcdee2',
            },
          },
          axisLabel: {},
          type: 'time',
          axisPointer: {
            animation: true,
            label: {
              show: true,
              color: 'red',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2,
            },
          },
        },

        series: [
          {
            type: 'themeRiver',
            itemStyle: {
              emphasis: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)',
              },
            },
            data: [
              ['2009/6/12 0:00:00', 13, '接诊'],
              ['2009/6/12 1:00:00', 2, '接诊'],
              ['2009/6/12 2:00:00', 11, '接诊'],
              ['2009/6/12 3:00:00', 12, '接诊'],
              ['2009/6/12 4:00:00', 10, '接诊'],
              ['2009/6/12 5:00:00', 10, '接诊'],
              ['2009/6/12 6:00:00', 15, '接诊'],
              ['2009/6/12 7:00:00', 10, '接诊'],
              ['2009/6/12 8:00:00', 12, '接诊'],
              ['2009/6/12 9:00:00', 10, '接诊'],
              ['2009/6/12 10:00:00', 2, '接诊'],
              ['2009/6/12 11:00:00', 10, '接诊'],
              ['2009/6/12 12:00:00', 10, '接诊'],
              ['2009/6/12 13:00:00', 10, '接诊'],
              ['2009/6/12 14:00:00', 4, '接诊'],
              ['2009/6/12 15:00:00', 3, '接诊'],
              ['2009/6/12 16:00:00', 10, '接诊'],
              ['2009/6/12 17:00:00', 1, '接诊'],
              ['2009/6/12 18:00:00', 2, '接诊'],
              ['2009/6/12 19:00:00', 10, '接诊'],
              ['2009/6/12 20:00:00', 11, '接诊'],
              ['2009/6/12 21:00:00', 1, '接诊'],
              ['2009/6/12 22:00:00', 1, '接诊'],
              ['2009/6/12 23:00:00', 2, '接诊'],
              ['2009/6/12 24:00:00', 10, '接诊'],
              ['2009/6/12 0:00:00', 3, '待定位'],
              ['2009/6/12 1:00:00', 2, '待定位'],
              ['2009/6/12 2:00:00', 11, '待定位'],
              ['2009/6/12 3:00:00', 10, '待定位'],
              ['2009/6/12 4:00:00', 10, '待定位'],
              ['2009/6/12 5:00:00', 10, '待定位'],
              ['2009/6/12 6:00:00', 0, '待定位'],
              ['2009/6/12 7:00:00', 10, '待定位'],
              ['2009/6/12 8:00:00', 1, '待定位'],
              ['2009/6/12 9:00:00', 10, '待定位'],
              ['2009/6/12 10:00:00', 2, '待定位'],
              ['2009/6/12 11:00:00', 10, '待定位'],
              ['2009/6/12 12:00:00', 10, '待定位'],
              ['2009/6/12 13:00:00', 10, '待定位'],
              ['2009/6/12 14:00:00', 10, '待定位'],
              ['2009/6/12 15:00:00', 3, '待定位'],
              ['2009/6/12 16:00:00', 10, '待定位'],
              ['2009/6/12 17:00:00', 10, '待定位'],
              ['2009/6/12 18:00:00', 5, '待定位'],
              ['2009/6/12 19:00:00', 10, '待定位'],
              ['2009/6/12 20:00:00', 11, '待定位'],
              ['2009/6/12 21:00:00', 1, '待定位'],
              ['2009/6/12 22:00:00', 1, '待定位'],
              ['2009/6/12 23:00:00', 2, '待定位'],
              ['2009/6/12 24:00:00', 10, '待定位'],
              ['2009/6/12 0:00:00', 3, '待计划'],
              ['2009/6/12 1:00:00', 2, '待计划'],
              ['2009/6/12 2:00:00', 11, '待计划'],
              ['2009/6/12 3:00:00', 10, '待计划'],
              ['2009/6/12 4:00:00', 4, '待计划'],
              ['2009/6/12 5:00:00', 2, '待计划'],
              ['2009/6/12 6:00:00', 1, '待计划'],
              ['2009/6/12 7:00:00', 10, '待计划'],
              ['2009/6/12 8:00:00', 1, '待计划'],
              ['2009/6/12 9:00:00', 10, '待计划'],
              ['2009/6/12 10:00:00', 2, '待计划'],
              ['2009/6/12 11:00:00', 10, '待计划'],
              ['2009/6/12 12:00:00', 10, '待计划'],
              ['2009/6/12 13:00:00', 10, '待计划'],
              ['2009/6/12 14:00:00', 10, '待计划'],
              ['2009/6/12 15:00:00', 3, '待计划'],
              ['2009/6/12 16:00:00', 1, '待计划'],
              ['2009/6/12 17:00:00', 10, '待计划'],
              ['2009/6/12 18:00:00', 14, '待计划'],
              ['2009/6/12 19:00:00', 10, '待计划'],
              ['2009/6/12 20:00:00', 11, '待计划'],
              ['2009/6/12 21:00:00', 1, '待计划'],
              ['2009/6/12 22:00:00', 1, '待计划'],
              ['2009/6/12 23:00:00', 2, '待计划'],
              ['2009/6/12 24:00:00', 10, '待计划'],
              ['2009/6/12 0:00:00', 3, '待治疗'],
              ['2009/6/12 1:00:00', 2, '待治疗'],
              ['2009/6/12 2:00:00', 11, '待治疗'],
              ['2009/6/12 3:00:00', 10, '待治疗'],
              ['2009/6/12 4:00:00', 1, '待治疗'],
              ['2009/6/12 5:00:00', 2, '待治疗'],
              ['2009/6/12 6:00:00', 10, '待治疗'],
              ['2009/6/12 7:00:00', 3, '待治疗'],
              ['2009/6/12 8:00:00', 1, '待治疗'],
              ['2009/6/12 9:00:00', 10, '待治疗'],
              ['2009/6/12 10:00:00', 2, '待治疗'],
              ['2009/6/12 11:00:00', 10, '待治疗'],
              ['2009/6/12 12:00:00', 10, '待治疗'],
              ['2009/6/12 13:00:00', 10, '待治疗'],
              ['2009/6/12 14:00:00', 10, '待治疗'],
              ['2009/6/12 15:00:00', 3, '待治疗'],
              ['2009/6/12 16:00:00', 10, '待治疗'],
              ['2009/6/12 17:00:00', 1, '待治疗'],
              ['2009/6/12 18:00:00', 10, '待治疗'],
              ['2009/6/12 19:00:00', 10, '待治疗'],
              ['2009/6/12 20:00:00', 11, '待治疗'],
              ['2009/6/12 21:00:00', 1, '待治疗'],
              ['2009/6/12 22:00:00', 1, '待治疗'],
              ['2009/6/12 23:00:00', 2, '待治疗'],
              ['2009/6/12 24:00:00', 10, '待治疗'],

              ['2009/6/13 0:00:00', 3, '接诊'],
              ['2009/6/13 1:00:00', 2, '接诊'],
              ['2009/6/13 2:00:00', 11, '接诊'],
              ['2009/6/13 3:00:00', 1, '接诊'],
              ['2009/6/13 4:00:00', 10, '接诊'],
              ['2009/6/13 5:00:00', 10, '接诊'],
              ['2009/6/13 6:00:00', 1, '接诊'],
              ['2009/6/13 7:00:00', 10, '接诊'],
              ['2009/6/13 8:00:00', 1, '接诊'],
              ['2009/6/13 9:00:00', 10, '接诊'],
              ['2009/6/13 10:00:00', 2, '接诊'],
              ['2009/6/13 11:00:00', 10, '接诊'],
              ['2009/6/13 12:00:00', 20, '接诊'],
              ['2009/6/13 13:00:00', 2, '接诊'],
              ['2009/6/13 14:00:00', 10, '接诊'],
              ['2009/6/13 15:00:00', 3, '接诊'],
              ['2009/6/13 16:00:00', 10, '接诊'],
              ['2009/6/13 17:00:00', 10, '接诊'],
              ['2009/6/13 18:00:00', 2, '接诊'],
              ['2009/6/13 19:00:00', 11, '接诊'],
              ['2009/6/13 20:00:00', 11, '接诊'],
              ['2009/6/13 21:00:00', 1, '接诊'],
              ['2009/6/13 22:00:00', 1, '接诊'],
              ['2009/6/13 23:00:00', 2, '接诊'],
              ['2009/6/13 24:00:00', 10, '接诊'],
              ['2009/6/13 0:00:00', 3, '待定位'],
              ['2009/6/13 1:00:00', 2, '待定位'],
              ['2009/6/13 2:00:00', 11, '待定位'],
              ['2009/6/13 3:00:00', 10, '待定位'],
              ['2009/6/13 4:00:00', 10, '待定位'],
              ['2009/6/13 5:00:00', 10, '待定位'],
              ['2009/6/13 6:00:00', 0, '待定位'],
              ['2009/6/13 7:00:00', 10, '待定位'],
              ['2009/6/13 8:00:00', 1, '待定位'],
              ['2009/6/13 9:00:00', 10, '待定位'],
              ['2009/6/13 10:00:00', 2, '待定位'],
              ['2009/6/13 11:00:00', 10, '待定位'],
              ['2009/6/13 12:00:00', 3, '待定位'],
              ['2009/6/13 13:00:00', 10, '待定位'],
              ['2009/6/13 14:00:00', 2, '待定位'],
              ['2009/6/13 15:00:00', 3, '待定位'],
              ['2009/6/13 16:00:00', 10, '待定位'],
              ['2009/6/13 17:00:00', 10, '待定位'],
              ['2009/6/13 18:00:00', 10, '待定位'],
              ['2009/6/13 19:00:00', 10, '待定位'],
              ['2009/6/13 20:00:00', 11, '待定位'],
              ['2009/6/13 21:00:00', 1, '待定位'],
              ['2009/6/13 22:00:00', 1, '待定位'],
              ['2009/6/13 23:00:00', 2, '待定位'],
              ['2009/6/13 24:00:00', 10, '待定位'],
              ['2009/6/13 0:00:00', 3, '待计划'],
              ['2009/6/13 1:00:00', 2, '待计划'],
              ['2009/6/13 2:00:00', 11, '待计划'],
              ['2009/6/13 3:00:00', 10, '待计划'],
              ['2009/6/13 4:00:00', 4, '待计划'],
              ['2009/6/13 5:00:00', 2, '待计划'],
              ['2009/6/13 6:00:00', 1, '待计划'],
              ['2009/6/13 7:00:00', 10, '待计划'],
              ['2009/6/13 8:00:00', 1, '待计划'],
              ['2009/6/13 9:00:00', 10, '待计划'],
              ['2009/6/13 10:00:00', 2, '待计划'],
              ['2009/6/13 11:00:00', 10, '待计划'],
              ['2009/6/13 12:00:00', 10, '待计划'],
              ['2009/6/13 13:00:00', 10, '待计划'],
              ['2009/6/13 14:00:00', 10, '待计划'],
              ['2009/6/13 15:00:00', 3, '待计划'],
              ['2009/6/13 16:00:00', 1, '待计划'],
              ['2009/6/13 17:00:00', 10, '待计划'],
              ['2009/6/13 18:00:00', 30, '待计划'],
              ['2009/6/13 19:00:00', 10, '待计划'],
              ['2009/6/13 20:00:00', 11, '待计划'],
              ['2009/6/13 21:00:00', 20, '待计划'],
              ['2009/6/13 22:00:00', 1, '待计划'],
              ['2009/6/13 23:00:00', 2, '待计划'],
              ['2009/6/13 24:00:00', 10, '待计划'],
              ['2009/6/13 0:00:00', 3, '待治疗'],
              ['2009/6/13 1:00:00', 2, '待治疗'],
              ['2009/6/13 2:00:00', 11, '待治疗'],
              ['2009/6/13 3:00:00', 10, '待治疗'],
              ['2009/6/13 4:00:00', 1, '待治疗'],
              ['2009/6/13 5:00:00', 2, '待治疗'],
              ['2009/6/13 6:00:00', 10, '待治疗'],
              ['2009/6/13 7:00:00', 3, '待治疗'],
              ['2009/6/13 8:00:00', 34, '待治疗'],
              ['2009/6/13 9:00:00', 10, '待治疗'],
              ['2009/6/13 10:00:00', 2, '待治疗'],
              ['2009/6/13 11:00:00', 10, '待治疗'],
              ['2009/6/13 12:00:00', 10, '待治疗'],
              ['2009/6/13 13:00:00', 10, '待治疗'],
              ['2009/6/13 14:00:00', 10, '待治疗'],
              ['2009/6/13 15:00:00', 3, '待治疗'],
              ['2009/6/13 16:00:00', 10, '待治疗'],
              ['2009/6/13 17:00:00', 10, '待治疗'],
              ['2009/6/13 18:00:00', 10, '待治疗'],
              ['2009/6/13 19:00:00', 2, '待治疗'],
              ['2009/6/13 20:00:00', 11, '待治疗'],
              ['2009/6/13 21:00:00', 2, '待治疗'],
              ['2009/6/13 22:00:00', 1, '待治疗'],
              ['2009/6/13 23:00:00', 2, '待治疗'],
              ['2009/6/13 24:00:00', 1, '待治疗'],
            ],
          },
          
        ],
      });
    }, 200);
  }

  //工作量统计
  taskStatisticsShow() {
    if (this.taskStatistics != null) {
      return;
    }

    let self = this;
    setTimeout(function() {
      // 任务量统计图表
      self.taskStatistics = echarts.init(
        document.getElementById('task-statistics')
      );

      // 绘制图表
      self.taskStatistics.setOption({
        baseOption: {
          color: [
            '#d87c7c',
            '#919e8b',
            '#d7ab82',
            '#6e7074',
            '#61a0a8',
            '#efa18d',
            '#787464',
            '#cc7e63',
            '#724e58',
            '#4b565b',
          ],
          timeline: {
            // y: 0,
            lineStyle: {
              color: '#fff',
              width: 1,
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#fff', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'brown', // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            axisType: 'category',
            realtime: false,
            loop: false,
            autoPlay: true,
            playInterval: 5000,
            data: [
              {
                value: '2010-01-01',
                tooltip: {
                  formatter:
                    '{b} <br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>全年治疗人次：1000<br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span> 全年定位人次：3000<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span> 全年计划设计人次：1000',
                },
                symbol: 'diamond',
                symbolSize: 16,
              },
              {
                value: '2011-01-01',
                tooltip: {
                  formatter:
                    '{b} <br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>全年治疗人次：1000<br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span> 全年定位人次：3000<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span> 全年计划设计人次：1000',
                },
                symbol: 'diamond',
                symbolSize: 16,
              },
              {
                value: '2012-01-01',
                tooltip: {
                  formatter:
                    '{b} <br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>全年治疗人次：1000<br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span> 全年定位人次：3000<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span> 全年计划设计人次：1000',
                },
                symbol: 'diamond',
                symbolSize: 16,
              },
              {
                value: '2013-01-01',
                tooltip: {
                  formatter:
                    '{b} <br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>全年治疗人次：1000<br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span> 全年定位人次：3000<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span> 全年计划设计人次：1000',
                },
                symbol: 'diamond',
                symbolSize: 16,
              },
              {
                value: '2014-01-01',
                tooltip: {
                  formatter:
                    '{b} <br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>全年治疗人次：1000<br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span> 全年定位人次：3000<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span> 全年计划设计人次：1000',
                },
                symbol: 'diamond',
                symbolSize: 16,
              },
              {
                value: '2015-01-01',
                tooltip: {
                  formatter:
                    '{b} <br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>全年治疗人次：1000<br> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span> 全年定位人次：3000<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span> 全年计划设计人次：1000',
                },
                symbol: 'diamond',
                symbolSize: 16,
              },
            ],
            label: {
              formatter: function(s) {
                return new Date(s).getFullYear();
              },
            },
          },
          title: {
            subtext: '数据来自Rtis操作统计',
            left: 'right',
          },
          tooltip: {},
          legend: {
            data: ['治疗人次', '定位人次', '计划设计人次'],
            textStyle: {
              //图例文字的样式
              color: '#fff',
              fontSize: 16,
            },
            selected: {
              治疗人次: true,
              定位人次: true,
              计划设计人次: true,
            },
          },
          calculable: true,
          grid: {
            top: 80,
            bottom: 100,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.value.replace('\n', '');
                  },
                },
              },
            },
          },
          xAxis: [
            {
              type: 'category',
              axisLabel: {interval: 0},
              data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '8月',
                '10月',
                '11月',
                '12月',
              ],
              splitLine: {show: false},
              axisLine: {
                lineStyle: {
                  color: '#dcdee2',
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '人次（位）',
              axisLine: {
                lineStyle: {
                  color: '#dcdee2',
                },
              },
            },
          ],
          series: [
            {name: '治疗人次', type: 'bar'},
            {name: '定位人次', type: 'bar'},
            {name: '计划设计人次', type: 'bar'},
            // {
            //   name: '治疗人次',
            //   type: 'line',
            //   itemStyle: {normal: {label: {show: true}}},
            // },
            // {
            //   name: '定位人次',
            //   type: 'line',
            //   itemStyle: {normal: {label: {show: true}}},
            // },
            // {
            //   name: '计划设计人次',
            //   type: 'line',
            //   itemStyle: {normal: {label: {show: true}}},
            // },
          ],
        },
        options: [
          {
            toolbox: {
              show: true,
              top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
              iconStyle: {
                normal: {
                  textPosition: 'left',
                },
                emphasis: {
                  textPosition: 'top',
                },
              },
              feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true},
              },
            },
            title: {
              text: '2010工作量统计',
              textStyle: {
                fontWeight: 'normal', //标题颜色
                color: '#fff',
              },
            },
            series: [
              {
                data: [
                  8117.78,
                  462.74,
                  11467.6,
                  488.61,
                  944.25,
                  9304.52,
                  4275.12,
                  211.8,
                  1572.24,
                  1742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  8117.78,
                  4462.74,
                  11467.6,
                  4878.61,
                  4944.25,
                  9304.52,
                  4275.12,
                  6211.8,
                  10572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  817.78,
                  4462.74,
                  167.6,
                  478.61,
                  494.25,
                  9304.52,
                  4275.12,
                  211.8,
                  572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
            ],
          },
          {
            toolbox: {
              show: true,
              top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
              iconStyle: {
                normal: {
                  textPosition: 'left',
                },
                emphasis: {
                  textPosition: 'top',
                },
              },
              feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true},
              },
            },
            title: {
              text: '2011工作量统计',
              textStyle: {
                fontWeight: 'normal', //标题颜色
                color: '#fff',
              },
            },
            series: [
              {
                data: [
                  817.78,
                  462.74,
                  11467.6,
                  4878.61,
                  94.25,
                  904.52,
                  4275.12,
                  211.8,
                  10572.24,
                  172.05,
                  1518.47,
                  6112.5,
                ],
              },
              {
                data: [
                  8117.78,
                  4462.74,
                  11467.6,
                  4878.61,
                  444.25,
                  9304.52,
                  4275.12,
                  6211.8,
                  10572.24,
                  2742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  817.78,
                  4462.74,
                  167.6,
                  478.61,
                  494.25,
                  9304.52,
                  4275.12,
                  211.8,
                  572.24,
                  21742.05,
                  1718.47,
                  6112.5,
                ],
              },
            ],
          },
          {
            toolbox: {
              show: true,
              top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
              iconStyle: {
                normal: {
                  textPosition: 'left',
                },
                emphasis: {
                  textPosition: 'top',
                },
              },
              feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true},
              },
            },
            title: {
              text: '2012工作量统计',
              textStyle: {
                fontWeight: 'normal', //标题颜色
                color: '#fff',
              },
            },
            series: [
              {
                data: [
                  117.78,
                  462.74,
                  1147.6,
                  488.61,
                  944.25,
                  904.52,
                  4275.12,
                  211.8,
                  1072.24,
                  1742.05,
                  1518.47,
                  6112.5,
                ],
              },
              {
                data: [
                  8117.78,
                  4462.74,
                  11467.6,
                  4878.61,
                  4944.25,
                  9304.52,
                  4275.12,
                  6211.8,
                  10572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  817.78,
                  4462.74,
                  167.6,
                  478.61,
                  494.25,
                  9304.52,
                  4275.12,
                  211.8,
                  572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
            ],
          },
          {
            toolbox: {
              show: true,
              top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
              iconStyle: {
                normal: {
                  textPosition: 'left',
                },
                emphasis: {
                  textPosition: 'top',
                },
              },
              feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true},
              },
            },
            title: {
              text: '2013工作量统计',
              textStyle: {
                fontWeight: 'normal', //标题颜色
                color: '#fff',
              },
            },
            series: [
              {
                data: [
                  8117.78,
                  462.74,
                  11467.6,
                  4878.61,
                  944.25,
                  9304.52,
                  4275.12,
                  211.8,
                  10572.24,
                  1742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  8117.78,
                  4462.74,
                  11467.6,
                  4878.61,
                  4944.25,
                  934.52,
                  4275.12,
                  6211.8,
                  1072.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  817.78,
                  4462.74,
                  167.6,
                  478.61,
                  494.25,
                  9304.52,
                  475.12,
                  211.8,
                  572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
            ],
          },
          {
            toolbox: {
              show: true,
              top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
              iconStyle: {
                normal: {
                  textPosition: 'left',
                },
                emphasis: {
                  textPosition: 'top',
                },
              },
              feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true},
              },
            },
            title: {
              text: '2014工作量统计',
              textStyle: {
                fontWeight: 'normal', //标题颜色
                color: '#fff',
              },
            },
            series: [
              {
                data: [
                  8117.78,
                  462.74,
                  11467.6,
                  4878.61,
                  944.25,
                  9304.52,
                  4275.12,
                  211.8,
                  1072.24,
                  1742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  8117.78,
                  4462.74,
                  11467.6,
                  4878.61,
                  4944.25,
                  9052,
                  475.12,
                  6211.8,
                  10572.24,
                  21742.05,
                  15718.47,
                  612.5,
                ],
              },
              {
                data: [
                  817.78,
                  4462.74,
                  167.6,
                  478.61,
                  494.25,
                  9304.52,
                  4275.12,
                  211.8,
                  572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
            ],
          },
          {
            toolbox: {
              show: true,
              top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
              iconStyle: {
                normal: {
                  textPosition: 'left',
                },
                emphasis: {
                  textPosition: 'top',
                },
              },
              feature: {
                mark: {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true},
              },
            },
            title: {
              text: '2015工作量统计',
              textStyle: {
                fontWeight: 'normal', //标题颜色
                color: '#fff',
              },
            },
            series: [
              {
                data: [
                  8117.78,
                  42.74,
                  11467.6,
                  4878.61,
                  944.25,
                  9304.52,
                  4275.12,
                  211.8,
                  10572.24,
                  1742.05,
                  1518.47,
                  6112.5,
                ],
              },
              {
                data: [
                  8117.78,
                  4462.74,
                  11467.6,
                  4878.61,
                  4944.25,
                  9304.52,
                  4275.12,
                  6211.8,
                  10572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
              {
                data: [
                  817.78,
                  4462.74,
                  167.6,
                  478.61,
                  494.25,
                  9304.52,
                  4275.12,
                  211.8,
                  572.24,
                  21742.05,
                  15718.47,
                  6112.5,
                ],
              },
            ],
          },
        ],
      });
    }, 200);
  }
  //科室统计
  departmentShow() {
    if (this.departmentStatistics != null) {
      return;
    }
    let self = this;

    setTimeout(function() {
      // 科室量统计图表
      self.departmentStatistics = echarts.init(
        document.getElementById('department-statistics')
      );
      self.departmentStatistics.on('updateAxisPointer', function(event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1;
          self.departmentStatistics.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)',
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });
        }
      });
      self.departmentStatistics.setOption({
        toolbox: {
          show: true,
          top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
          iconStyle: {
            normal: {
              textPosition: 'left',
            },
            emphasis: {
              textPosition: 'top',
            },
          },
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true},
          },
        },
        color: [
          '#d87c7c',
          '#919e8b',
          '#d7ab82',
          '#6e7074',
          '#61a0a8',
          '#efa18d',
          '#787464',
          '#cc7e63',
          '#724e58',
          '#4b565b',
        ],
        legend: {
          selectedMode: true, //取消图例上的点击事件
          data: ['年份', '加速器1', '加速器2', '加速器3'],
          textStyle: {
            //图例文字的样式
            color: '#fff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56',
            },
          },
        },
        dataset: {
          source: [
            ['年份', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['加速器1', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['加速器2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['加速器3', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
          ],
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#dcdee2',
            },
          },
        },
        yAxis: {
          gridIndex: 0,
          axisLine: {
            lineStyle: {
              color: '#dcdee2',
            },
          },
        },
        grid: {top: '55%'},
        title: {
          subtext: '数据来自Rtis操作统计',
          left: 'right',
          text: '科室统计',
          textStyle: {
            fontWeight: 'normal', //标题颜色
            color: '#fff',
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,

            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },

          // {
          //   type: 'line',
          //   stack: '总量',
          //   smooth: true,
          //   name: '总计',
          //   data: [151.7, 189.7, 230.3, 222.8, 222.4, 236.3],
          //   seriesLayoutBy: 'row',
          //   label: {
          //     normal: {
          //       show: true,
          //       position: 'insideRight',
          //     },
          //   },
          // },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: '{b}: {@2012} ({d}%)',
            },
            encode: {
              itemName: '年份',
              value: '2012',
              tooltip: '2012',
            },
          },
        ],
      });
    }, 200);
  }

  caseStatisticsShow() {
    if (this.caseStatistics != null) {
      return;
    }
    let self = this;

    setTimeout(function() {
      // 科室量统计图表
      self.caseStatistics = echarts.init(
        document.getElementById('case-statistics')
      );

      self.caseStatistics.on('updateAxisPointer', function(event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1;
          self.caseStatistics.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)',
              },
              encode: {
                value: dimension,
                tooltip: dimension,
              },
            },
          });
        }
      });
      self.caseStatistics.setOption({
        toolbox: {
          show: true,
          top: 60, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
          iconStyle: {
            normal: {
              textPosition: 'left',
            },
            emphasis: {
              textPosition: 'top',
            },
          },
          feature: {
            mark: {show: true},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true},
          },
        },
        color: [
          '#d87c7c',
          '#919e8b',
          '#d7ab82',
          '#6e7074',
          '#61a0a8',
          '#efa18d',
          '#787464',
          '#cc7e63',
          '#724e58',
          '#4b565b',
        ],
        legend: {
          selectedMode: true, //取消图例上的点击事件
          data: [
            '年份',
            '头部',
            '颈部',
            '胸部',
            '腹部',
            '盆腔',
            '四肢',
            '其他',
          ],
          textStyle: {
            //图例文字的样式
            color: '#fff',
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56',
            },
          },
        },
        dataset: {
          source: [
            ['年份', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['头部', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['颈部', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['胸部', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['腹部', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['盆腔', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['四肢', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['其他', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
          ],
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#dcdee2',
            },
          },
        },
        yAxis: {
          gridIndex: 0,
          axisLine: {
            lineStyle: {
              color: '#dcdee2',
            },
          },
        },
        grid: {top: '55%'},
        title: {
          subtext: '数据来自Rtis操作统计',
          left: 'right',
          text: '病例统计',
          textStyle: {
            fontWeight: 'normal', //标题颜色
            color: '#fff',
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,

            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,

            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,

            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,

            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },
          {
            type: 'bar',
            barWidth: 50,
            stack: '总量',
            smooth: true,

            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
          },

          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],

            label: {
              formatter: '{b}: {@2012} ({d}%)',
            },
            encode: {
              itemName: '年份',
              value: '2012',
              tooltip: '2012',
            },
          },
        ],
      });
    }, 200);
  }

  get homeContent() {
    return {
      projectTop: [
        {
          statisticsName: '待办人数统计',
          pictureRoute: '',
          iconName: 'mdi-codepen',
          statisticsCount: '33个样本',
        },
        {
          statisticsName: '工作量统计',
          pictureRoute: '',
          iconName: 'mdi-codepen',
          statisticsCount: '122个样本',
        },
        {
          statisticsName: '科室统计',
          pictureRoute: '',
          iconName: 'mdi-google-classroom',
          statisticsCount: '122个样本',
        },
        {
          statisticsName: '病例统计',
          pictureRoute: '',
          iconName: 'mdi-account-card-details-outline',
          statisticsCount: '122个样本',
        },
      ],
    };
  }
  set homeContent(value) {
    this.$store.state.home.homeContent = value;
  }
  onClick(carouselItem) {
    switch (carouselItem) {
      case '工作量统计':
        this.carouselItem = 0;
        break;
      case '病理统计':
        this.carouselItem = 1;
        break;
      case '科室统计':
        this.carouselItem = 2;

        break;
    }
  }
  cardActive(carouselItem) {
    this.carouselItem = carouselItem;
    let self = this;
    //  setTimeout(function(){
    switch (carouselItem) {
      case 0:
        self.upcomingStatisticsShow();
        break;
      case 1:
        self.taskStatisticsShow();
        break;
      case 2:
        self.departmentShow();
        break;
      case 3:
        self.caseStatisticsShow();
        break;
    }
    // }, 1000);
  }
  // 鼠标移入加入class
  changeActive($event) {
    this.cycle = false;
  }
  removeActive($event) {
    this.cycle = true;
  }
}
</script>
<style scoped>
.chart-title-color {
  color: #fff;
}
.chart-sub-title {
  color: #fff;
  font-size: 12px;
}
.form-height {
  height: calc(84vh);
  overflow: auto;
  padding: 0 20px;
}

.echars-height {
  height: calc(60vh);
}
</style>
