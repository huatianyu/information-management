<template>
	<v-hover v-slot:default="{ hover }">
		<v-card :elevation="hover ? 24 : 2">
			<div id="task-statistics" class="echars-background" :style="{ width: '100%' }"></div> </v-card></v-hover
></template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import $ from 'jquery';
import echarts from 'echarts';

@Component({
	components: {},
})
export default class TaskStatistics extends AbpBase {
	taskStatistics: any = null;
	mounted() {
		this.taskStatisticsShow();
	}

	//工作量统计
	taskStatisticsShow() {
		if (this.taskStatistics != null) {
			return;
		}

		let self = this;

		// 任务量统计图表
		self.taskStatistics = echarts.init(document.getElementById('task-statistics'));

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
					bottom: 20,
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
					top: 30,
					subtext: '数据来自Rtis操作统计',
					left: 'center',
				},
				tooltip: {},
				legend: {
					left: 40,
					top: -5,
					data: ['治疗人次', '定位人次', '计划设计人次'],
					textStyle: {
						//图例文字的样式
						color: '#fff',
						fontSize: 10,
					},
					selected: {
						治疗人次: true,
						定位人次: true,
						计划设计人次: true,
					},
				},
				calculable: true,
				grid: {
					top: 100,
					bottom: 100,
					left: 60,
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
						axisLabel: { interval: 0 },
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '8月', '10月', '11月', '12月'],
						splitLine: { show: false },
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
					{ name: '治疗人次', type: 'bar' },
					{ name: '定位人次', type: 'bar' },
					{ name: '计划设计人次', type: 'bar' },
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
						right: '20',
						top: 40, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
						iconStyle: {
							normal: {
								textPosition: 'left',
							},
							emphasis: {
								textPosition: 'top',
							},
						},
						feature: {
							mark: { show: true },
							magicType: { show: true, type: ['line', 'bar'], right: 10 },
							saveAsImage: { show: true },
						},
					},
					title: {
						text: '2010工作量统计',
						textStyle: {
							fontWeight: 'normal', //标题颜色
							color: 'hsla(0, 0%, 100%, 0.7)',
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
						right: '20',
						top: 40, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
						iconStyle: {
							normal: {
								textPosition: 'left',
							},
							emphasis: {
								textPosition: 'top',
							},
						},
						feature: {
							mark: { show: true },
							magicType: { show: true, type: ['line', 'bar'], right: 10 },
							saveAsImage: { show: true },
						},
					},
					title: {
						text: '2011工作量统计',
						textStyle: {
							fontWeight: 'normal', //标题颜色
							color: 'hsla(0, 0%, 100%, 0.7)',
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
						right: '20',
						top: 40, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
						iconStyle: {
							normal: {
								textPosition: 'left',
							},
							emphasis: {
								textPosition: 'top',
							},
						},
						feature: {
							mark: { show: true },
							magicType: { show: true, type: ['line', 'bar'], right: 10 },
							saveAsImage: { show: true },
						},
					},
					title: {
						text: '2012工作量统计',
						textStyle: {
							fontWeight: 'normal', //标题颜色
							color: 'hsla(0, 0%, 100%, 0.7)',
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
						right: '20',
						top: 40, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
						iconStyle: {
							normal: {
								textPosition: 'left',
							},
							emphasis: {
								textPosition: 'top',
							},
						},
						feature: {
							mark: { show: true },
							magicType: { show: true, type: ['line', 'bar'], right: 10 },
							saveAsImage: { show: true },
						},
					},
					title: {
						text: '2013工作量统计',
						textStyle: {
							fontWeight: 'normal', //标题颜色
							color: 'hsla(0, 0%, 100%, 0.7)',
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
						right: '20',
						top: 40, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
						iconStyle: {
							normal: {
								textPosition: 'left',
							},
							emphasis: {
								textPosition: 'top',
							},
						},
						feature: {
							mark: { show: true },
							magicType: { show: true, type: ['line', 'bar'], right: 10 },
							saveAsImage: { show: true },
						},
					},
					title: {
						text: '2014工作量统计',
						textStyle: {
							fontWeight: 'normal', //标题颜色
							color: 'hsla(0, 0%, 100%, 0.7)',
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
						right: '20',
						top: 40, // icon标签的高度不能顶着顶部，不然会看不到title,所有还要设置一个 top值
						iconStyle: {
							normal: {
								textPosition: 'left',
							},
							emphasis: {
								textPosition: 'top',
							},
						},
						feature: {
							mark: { show: true },
							magicType: { show: true, type: ['line', 'bar'], right: 10 },
							saveAsImage: { show: true },
						},
					},
					title: {
						text: '2015工作量统计',
						textStyle: {
							fontWeight: 'normal', //标题颜色
							color: 'hsla(0, 0%, 100%, 0.7)',
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
	}
}
</script>
<style scoped>
.echars-background:hover {
	height: calc(40vh);
	background-image: url('../../../../public/img/icons/noGrid-right-echarImg.png');
	background-size: 100% 100%;
}
.echars-background {
	height: calc(40vh);
	background-image: url('../../../../public/img/icons/right-echarImg.png');
	background-size: 100% 100%;
}
</style>
