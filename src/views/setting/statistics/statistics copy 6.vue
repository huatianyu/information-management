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
            <v-row>
              <v-col cols="12" offset="1">
                <effectiveness-statistics></effectiveness-statistics> </v-col
            ></v-row>

            <div
              id="upcoming-statistics"
              class="echars-upcoming-height"
              :style="{width: '100%'}"
            ></div>
            <!-- <div
              id="person-statistics"
              class="echars-person-height"
              :style="{width: '100%'}"
            ></div> -->
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
import EffectivenessStatistics from './effectivenessStatistics.vue';

@Component({
  components: {StatisticsCard, EffectivenessStatistics},
})
export default class Patients extends AbpBase {
  carouselItem: Number = 0;
  cycle: Boolean = true;
  departmentStatistics: any = null;
  caseStatistics: any = null;
  taskStatistics: any = null;
  upcomingStatistics: any = null;
  personStatistic: any = null;
  personArr: Number[] = [0, 0, 0, 0];
  upcomingStatisticsParams: any;
  sortType: number = -1;
  mounted() {
    this.upcomingStatisticsShow();
  }

  //人数统计
  personStatisticShow() {
    if (this.personStatistic != null) {
      return;
    }

    let self = this;

    var spirit =
      'image://data:image/png;base64,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';

    var maxData = 2000;
    setTimeout(function() {
      // 任务量统计图表
      self.personStatistic = echarts.init(
        document.getElementById('person-statistics')
      );
      // 绘制图表
      self.personStatistic.setOption({
        title: {
          text: '待办医师Top5',
          subtext: '数据来源Rtis操作统计',
          left: 'right',
          textStyle: {
            fontWeight: 'normal', //标题颜色
            color: '#fff',
          },
        },

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
            myTool2: {
              show: true,
              title: '切换',
              icon:
                'image://https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576495339969&di=f2aa40874bb4b0a6ab8fbde2bcb2dfa9&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F30%2F68%2F58108d6861ec6_610.jpg',
              onclick: function(params) {
                function random() {
                  return Math.round(Math.random() * (100 - 10));
                }
                var dynamicData = [
                  random(),
                  random(),
                  random(),
                  random(),
                  random(),
                ];
                // var dynamicData = [24, 34, 39, 47];

                if (params.option.title[0].text == '待办医师Top5') {
                  self.sortType = 1;
                  dynamicData = dynamicData.sort(function(a, b) {
                    return self.sortType * (a - b);
                  });

                  self.personStatistic.setOption({
                    title: {
                      text: '待办医师Last5',
                      subtext: '数据来源Rtis操作统计',
                      left: 'right',
                      textStyle: {
                        fontWeight: 'normal', //标题颜色
                        color: '#fff',
                      },
                    },
                    yAxis: {
                      data: [
                        '王建国',
                        '李青山',
                        '苏珊娜',
                        '田阳',
                        '王大雷',
                      ].sort(() => Math.random() - 0.5),
                    },
                    series: [
                      {
                        data: dynamicData,
                      },
                    ],
                  });
                } else {
                  self.sortType = -1;
                  dynamicData = dynamicData.sort(function(a, b) {
                    return self.sortType * (a - b);
                  });
                  self.personStatistic.setOption({
                    title: {
                      text: '待办医师Top5',
                      subtext: '数据来源Rtis操作统计',
                      left: 'right',
                      textStyle: {
                        fontWeight: 'normal', //标题颜色
                        color: '#fff',
                      },
                    },
                    yAxis: {
                      data: ['孙大庆', '张国', '赵丹', '李小萌', '吴磊'].sort(
                        () => Math.random() - 0.5
                      ),
                    },
                    series: [
                      {
                        data: dynamicData,
                      },
                    ],
                  });
                }
              },
            },
          },
        },

        tooltip: {},
        xAxis: {
          splitLine: {show: false},
          offset: 10,
          axisLine: {
            lineStyle: {
              color: '#fff',
            },
          },
          axisLabel: {
            margin: 10,
          },
        },
        yAxis: {
          data: ['孙大庆', '张国', '赵丹', '李小萌', '吴磊'],
          inverse: true,
          axisTick: {show: false},
          axisLine: {show: false},
          axisLabel: {
            margin: 10,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            },
          },
        },
        grid: {
          top: 'center',
          height: 200,
          left: 70,
          right: 100,
        },
        series: [
          {
            // current data
            symbol: spirit,
            type: 'pictorialBar',
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolClip: true,
            symbolSize: 30,
            markLine: {
              symbol: 'none',
              label: {
                normal: {
                  formatter: 'max: {c}',
                  position: 'start',
                },
              },
              lineStyle: {
                normal: {
                  color: '#fff',
                  type: 'dotted',
                  opacity: 0.1,
                  width: 2,
                },
              },
            },
            z: 10,
          },
          {
            // full data
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                opacity: 0.1,
              },
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                offset: [10, 0],
                textStyle: {
                  color: '#fff',
                  fontSize: 18,
                },
              },
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbol: spirit,
            symbolSize: 30,
            data: [50, 50, 50, 50],
            z: 5,
          },
        ],
      });
    }, 100);
  }

  //待办统计
  upcomingStatisticsShow() {
    let dynamicData = [];
    if (this.upcomingStatistics != null) {
      return;
    }
    let self = this;
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
        title: {
          text: '待办人数流量',
          subtext: '数据来源Rtis操作统计',
          left: 'center',
          top: 0,
          textStyle: {
            fontWeight: 'normal', //标题颜色
            color: '#fff',
          },
        },
        tooltip: {
          // triggerOn: 'click',
          position: function(pos, params, dom, rect, size) {
            // self.upcomingStatisticsParams = params;
            // var dynamicData = [];
            // for (let key in self.upcomingStatisticsParams) {
            //   let a = self.upcomingStatisticsParams[key].value[1] as number;
            //   dynamicData.push(a);
            // }
            // self.personStatistic.setOption({
            //   series: [
            //     {
            //       data: dynamicData,
            //     },
            //   ],
            // });
            // -----------------
            // function random() {
            //   return Math.round(Math.random() * (100 - 10));
            // }
            // var dynamicData = [
            //   random(),
            //   random(),
            //   random(),
            //   random(),
            //   random(),
            // ];
            // // var dynamicData = [24, 34, 39, 47];
            // dynamicData = dynamicData.sort(function(a, b) {
            //   return self.sortType * (a - b);
            // });
            // self.personStatistic.setOption({
            //   yAxis: {
            //     data: ['孙大庆', '张国', '赵丹', '李小萌', '吴磊'].sort(
            //       () => Math.random() - 0.5
            //     ),
            //   },
            //   series: [
            //     {
            //       data: dynamicData,
            //     },
            //   ],
            // });
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
          data: ['待接诊', '待定位', '待计划', '待治疗'],
          left: 'right',
          textStyle: {
            //图例文字的样式
            color: '#fff',
            fontSize: 16,
          },
        },
        // dataZoom: [
        //   // {type: 'slider'}, //用于添加滑动条缩放，

        //   {
        //     minSpan: 10,
        //     show: true, //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
        //     backgroundColor: 'rgba(47,69,84,0)', //组件的背景颜色
        //     type: 'inside', //slider表示有滑动块的，inside表示内置的
        //     //设置触发视图刷新的频率。单位为毫秒（ms）。
        //     zoomOnMouseWheel: true, //如何触发缩放。可选值为：true：表示不按任何功能键，鼠标滚轮能触发缩放。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标滚轮能触发缩放。'ctrl'：表示按住 ctrl 和鼠标滚轮能触发缩放。'alt'：表示按住 alt 和鼠标滚轮能触发缩放。
        //     moveOnMouseMove: true, //如何触发数据窗口平移。true：表示不按任何功能键，鼠标移动能触发数据窗口平移。false：表示鼠标滚轮不能触发缩放。'shift'：表示按住 shift 和鼠标移动能触发数据窗口平移。'ctrl'：表示按住 ctrl 和鼠标移动能触发数据窗口平移。'alt'：表示按住 alt 和鼠标移动能触发数据窗口平移。
        //     //组件离容器下侧的距离,'20%'
        //   },
        // ],

        singleAxis: {
          top: 50,
          bottom: 80,
          left: 140,
          axisLine: {
            lineStyle: {
              color: '#fff',
            },
          },
          axisTick: {interval:0},

          axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
              color: '#fff',
            },
          },

          type: 'time',
          axisPointer: {
            animation: true,
            label: {
              show: true,
              color: 'red',
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              opacity: 1,
            },
          },
        },
        series: [
          {
            type: 'themeRiver',
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.8)',
              },
            },

            data: [
              ['2018/1/1', 35, '待接诊'],
              ['2018/2/1', 38, '待接诊'],
              ['2018/3/1', 45, '待接诊'],
              ['2018/4/1', 30, '待接诊'],
              ['2018/5/1', 60, '待接诊'],
              ['2018/6/1', 35, '待接诊'],
              ['2018/7/1', 32, '待接诊'],
              ['2018/8/1', 29, '待接诊'],
              ['2018/9/1', 38, '待接诊'],
              ['2018/10/1', 67, '待接诊'],
              ['2018/11/1', 52, '待接诊'],
              ['2018/12/1', 50, '待接诊'],
              ['2019/1/1', 32, '待接诊'],
              ['2019/2/1', 42, '待接诊'],
              ['2019/3/1', 62, '待接诊'],
              ['2019/4/1', 56, '待接诊'],
              ['2019/5/1', 51, '待接诊'],
              ['2019/6/1', 37, '待接诊'],
              ['2019/7/1', 10, '待接诊'],
              ['2019/8/1', 78, '待接诊'],
              ['2019/9/1', 50, '待接诊'],
              ['2019/10/1', 32, '待接诊'],
              ['2019/11/1', 51, '待接诊'],
              ['2019/12/1', 50, '待接诊'],

              ['2018/1/1', 25, '待定位'],
              ['2018/2/1', 18, '待定位'],
              ['2018/3/1', 15, '待定位'],
              ['2018/4/1', 20, '待定位'],
              ['2018/5/1', 13, '待定位'],
              ['2018/6/1', 25, '待定位'],
              ['2018/7/1', 19, '待定位'],
              ['2018/8/1', 22, '待定位'],
              ['2018/9/1', 19, '待定位'],
              ['2018/10/1', 26, '待定位'],
              ['2018/11/1', 24, '待定位'],
              ['2018/12/1', 30, '待定位'],
              ['2019/1/1', 18, '待定位'],
              ['2019/2/1', 18, '待定位'],
              ['2019/3/1', 19, '待定位'],
              ['2019/4/1', 22, '待定位'],
              ['2019/5/1', 17, '待定位'],
              ['2019/6/1', 38, '待定位'],
              ['2019/7/1', 42, '待定位'],
              ['2019/8/1', 21, '待定位'],
              ['2019/9/1', 22, '待定位'],
              ['2019/10/1', 25, '待定位'],
              ['2019/11/1', 31, '待定位'],
              ['2019/12/1', 30, '待定位'],

              ['2018/1/1', 40, '待计划'],
              ['2018/2/1', 45, '待计划'],
              ['2018/3/1', 39, '待计划'],
              ['2018/4/1', 51, '待计划'],
              ['2018/5/1', 46, '待计划'],
              ['2018/6/1', 43, '待计划'],
              ['2018/7/1', 39, '待计划'],
              ['2018/8/1', 47, '待计划'],
              ['2018/9/1', 43, '待计划'],
              ['2018/10/1', 46, '待计划'],
              ['2018/11/1', 49, '待计划'],
              ['2018/12/1', 48, '待计划'],
              ['2019/1/1', 39, '待计划'],
              ['2019/2/1', 41, '待计划'],
              ['2019/3/1', 43, '待计划'],
              ['2019/4/1', 38, '待计划'],
              ['2019/5/1', 51, '待计划'],
              ['2019/6/1', 52, '待计划'],
              ['2019/7/1', 49, '待计划'],
              ['2019/8/1', 52, '待计划'],
              ['2019/9/1', 39, '待计划'],
              ['2019/10/1', 45, '待计划'],
              ['2019/11/1', 47, '待计划'],
              ['2019/12/1', 48, '待计划'],

              ['2018/1/1', 28, '待治疗'],
              ['2018/2/1', 26, '待治疗'],
              ['2018/3/1', 25, '待治疗'],
              ['2018/4/1', 30, '待治疗'],
              ['2018/5/1', 28, '待治疗'],
              ['2018/6/1', 23, '待治疗'],
              ['2018/7/1', 19, '待治疗'],
              ['2018/8/1', 25, '待治疗'],
              ['2018/9/1', 27, '待治疗'],
              ['2018/10/1', 35, '待治疗'],
              ['2018/11/1', 41, '待治疗'],
              ['2018/12/1', 39, '待治疗'],
              ['2019/1/1', 39, '待治疗'],
              ['2019/2/1', 36, '待治疗'],
              ['2019/3/1', 33, '待治疗'],
              ['2019/4/1', 30, '待治疗'],
              ['2019/5/1', 28, '待治疗'],
              ['2019/6/1', 29, '待治疗'],
              ['2019/7/1', 35, '待治疗'],
              ['2019/8/1', 36, '待治疗'],
              ['2019/9/1', 33, '待治疗'],
              ['2019/10/1', 37, '待治疗'],
              ['2019/11/1', 36, '待治疗'],
              ['2019/12/1', 39, '待治疗'],
            ],
          },
        ],
      });
      // self.personStatisticShow();
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
          statisticsName: '工作效率统计',
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
.echars-upcoming-height {
  height: calc(30vh);
}

.echars-person-height {
  height: calc(40vh);
}
</style>
