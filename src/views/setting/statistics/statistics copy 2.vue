<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="12" md="12" sm="12" xs="12">
        <v-row>
          <v-col cols="12" lg="10" xl="10" md="10" sm="12" xs="12">
            <div
              id="myChart"
              class="echars-height"
              ref="myChart"
              :style="{width: '100%'}"
            ></div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import macarons from 'echarts/theme/macarons';
@Component({
  components: {},
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
        2: false,
      },
      dailySalesChart: {
        data: {
          labels: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],
          series: [[12, 17, 7, 17, 190, 490, 38, 100, 23, 18, 38, 10]],
        },
        options: {
          low: 0,
          high: 500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],
          series: [[12, 17, 7, 17, 190, 18, 38, 100, 23, 18, 38, 10]],
        },
        options: {
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['2014年', '2015年', '2016年', '2017年', '2018年', '2019年'],
          series: [[12, 110, 200, 1000, 1500, 2000]],
        },
        options: {
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      planDesign: {
        data: {
          labels: ['2014年', '2015年', '2016年', '2017年', '2018年', '2019年'],
          series: [[12, 110, 200, 1000, 1500, 2000]],
        },
        options: {
          low: 0,
          high: 2500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },

      distributedSeriesOptions: {
        distributeSeries: true,
      },
      distributedSeriesData: {
        labels: ['头部', '颈部', '胸部', '腹部', '盆腔', '四肢', '其他'],
        series: [15, 40, 60, 100, 31, 53, 10],
      },
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
      document.getElementById('myChart')
    );

    // 绘制图表
    myChart.setOption({
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
        },
        tooltip: {},
        legend: {
          x: 'right',
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
                color: '#fff', //更改坐标轴颜色
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
                color: '#fff', //更改坐标轴颜色
              },
            },
          },
        ],
        series: [
          {name: '治疗人次', type: 'bar'},
          {name: '定位人次', type: 'bar'},
          {name: '计划设计人次', type: 'bar'},
          {
            name: '治疗人次',
            type: 'line',
            itemStyle: {normal: {label: {show: true}}},
          },
          {
            name: '定位人次',
            type: 'line',
            itemStyle: {normal: {label: {show: true}}},
          },
          {
            name: '计划设计人次',
            type: 'line',
            itemStyle: {normal: {label: {show: true}}},
          },
        ],
      },
      options: [
        {
          title: {
            text: '2004工作量统计',
            textStyle: {
              fontWeight: 'normal', //标题颜色
              color: '#fff',
            },
          },
          series: [
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
          ],
        },
        {
          title: {
            text: '2005工作量统计',
            textStyle: {
              fontWeight: 'normal', //标题颜色
              color: '#fff',
            },
          },
          series: [
            {
              data: [
                8117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                9304.52,
                7275.12,
                6211.8,
                10572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
            {
              data: [
                3117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                9304.52,
                5275.12,
                6211.8,
                10572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
            {
              data: [
                8117.78,
                4462.74,
                11467.6,
                1878.61,
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
                8117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                9304.52,
                7275.12,
                6211.8,
                10572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
            {
              data: [
                3117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                9304.52,
                5275.12,
                6211.8,
                10572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
            {
              data: [
                8117.78,
                4462.74,
                11467.6,
                1878.61,
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
          ],
        },
        {
          title: {
            text: '2006工作量统计',
            textStyle: {
              fontWeight: 'normal', //标题颜色
              color: '#fff',
            },
          },
          series: [
            {
              data: [
                8117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                9304.52,
                7275.12,
                6211.8,
                10572.24,
                21742.05,
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
                8117.78,
                4462.74,
                11467.6,
                3878.61,
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
          ],
        },
        {
          title: {
            text: '2007工作量统计',
            textStyle: {
              fontWeight: 'normal', //标题颜色
              color: '#fff',
            },
          },
          series: [
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
                3112.5,
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
                5275.12,
                6211.8,
                10572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
            {
              data: [
                8117.78,
                4462.74,
                11467.6,
                1878.61,
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
          ],
        },
        {
          title: {
            text: '2008工作量统计',
            textStyle: {
              fontWeight: 'normal', //标题颜色
              color: '#fff',
            },
          },
          series: [
            {
              data: [
                1117.78,
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
                8117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                9304.52,
                4275.12,
                1211.8,
                10572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
            {
              data: [
                3117.78,
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
          ],
        },
        {
          title: {
            text: '2009工作量统计',
            textStyle: {
              fontWeight: 'normal', //标题颜色
              color: '#fff',
            },
          },
          series: [
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
                2117.78,
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
                8117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                9304.52,
                4275.12,
                6211.8,
                1572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
          ],
        },
        {
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
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                1304.52,
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
                8117.78,
                4462.74,
                11467.6,
                4878.61,
                4944.25,
                1304.52,
                4275.12,
                6211.8,
                10572.24,
                21742.05,
                15718.47,
                6112.5,
              ],
            },
          ],
        },
        {
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
                2718.47,
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
                1117.78,
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
          ],
        },
      ],
    });
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
  height: calc(80vh);
}
</style>
