<template>
  <v-hover v-slot:default="{hover}">
    <v-card :elevation="hover ? 24 : 2">
      <div
        id="upcoming-statistics"
        class="echars-background"
        :style="{width: '100%'}"
      ></div> </v-card></v-hover
></template>
<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import echarts from 'echarts';

@Component({
  components: {},
})
export default class UpcomingStatistics extends AbpBase {
  upcomingStatistics: any = null;
  personStatistic: any = null;
  upcomingStatisticsParams: any;
  sortType: number = -1;
  mounted() {
    this.upcomingStatisticsShow();
  }

  //待办统计
  upcomingStatisticsShow() {
    let dynamicData = [];
    if (this.upcomingStatistics != null) {
      return;
    }
    let self = this;

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
        top: 30,
        textStyle: {
          fontWeight: 'normal', //标题颜色
          color: 'hsla(0, 0%, 100%, 0.7)',
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
        left: '90',
        top: -5,
        textStyle: {
          //图例文字的样式
          color: '#fff',
          fontSize: 10,
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
        bottom: 60,
        left: 50,
        right: 50,
        axisLine: {
          lineStyle: {
            color: '#fff',
          },
        },
        axisTick: {interval: 0},

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
  }
}
</script>
<style scoped>
.echars-background {
  height: calc(30vh);
  background-image: url('../../../../public/img/icons/right-echarImg.png');
  background-size: 100% 100%;
}

.echars-background:hover {
  height: calc(30vh);
  background-image: url('../../../../public/img/icons/noGrid-right-echarImg.png');
  background-size: 100% 100%;
}
</style>
