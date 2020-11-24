myChart.showLoading();
var data = {
  counties: [
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
  timeline: [2017, 2018],
  series: [
    [
      [1,  4.3, 380, '1月',   2017],
      [2,  4.4, 390, '2月',   2017],
      [3,  4.5, 411, '3月',   2017],
      [4,  4.8, 111, '4月',   2017],
      [5,  4.9, 432, '5月',   2017],
      [6,  4.8, 425, '6月',   2017],
      [7,  4.9, 435, '7月',   2017],
      [8,  4.9, 434, '8月',   2017],
      [9,  4.9, 427, '9月',   2017],
      [10, 5.1, 450, '10月', 2017],
      [11, 5.0, 439, '11月', 2017],
      [12, 5.1, 450, '12月', 2017],
    ],
    [
      [1,  5.2, 457, '1月',   2018],
      [2,  5.2, 460, '2月',   2018],
      [3,  5.3, 465, '3月',   2018],
      [4,  5.2, 458, '4月',   2018],
      [5,  5.3, 469, '5月',   2018],
      [6,  5.4, 472, '6月',   2018],
      [7,  5.3, 469, '7月',   2018],
      [8,  5.4, 478, '8月',   2018],
      [9,  5.5, 480, '9月',   2018],
      [10, 5.5, 483, '10月', 2018],
      [11, 5.6, 489, '11月', 2018],
      [12, 5.5, 480, '12月', 2018],
    ],
  ],
};
myChart.hideLoading();

var itemStyle = {
  normal: {
    opacity: 0.8,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
};

var sizeFunction = function(x) {
    debugger
  var y = Math.sqrt( Math.sqrt(x-400 / 5e8)) ;
  return y * 10;
};
// Schema:
var schema = [
  {name: 'Income', index: 0, text: '医师人数', unit: '人次'},
  {name: 'LifeExpectancy', index: 1, text: '平均日接诊人次', unit: '人'},
  {name: 'Population', index: 2, text: '月接诊总数', unit: ''},
  {name: 'Country', index: 3, text: '月份', unit: ''},
];

option = {
  baseOption: {
    timeline: {
      axisType: 'category',
      orient: 'vertical',
      autoPlay: true,
      inverse: true,
      playInterval: 102200,
      left: null,
      right: 0,
      top: 20,
      bottom: 20,
      width: 55,
      height: null,
      label: {
        normal: {
          textStyle: {
            color: '#999',
          },
        },
        emphasis: {
          textStyle: {
            color: '#fff',
          },
        },
      },
      symbol: 'none',
      lineStyle: {
        color: '#555',
      },
      checkpointStyle: {
        color: '#bbb',
        borderColor: '#777',
        borderWidth: 2,
      },
      controlStyle: {
        showNextBtn: false,
        showPrevBtn: false,
        normal: {
          color: '#666',
          borderColor: '#666',
        },
        emphasis: {
          color: '#aaa',
          borderColor: '#aaa',
        },
      },
      data: [],
    },
    backgroundColor: '#404a59',
    title: [
      {
        text: data.timeline[0],
        textAlign: 'center',
        left: '63%',
        top: '55%',
        textStyle: {
          fontSize: 100,
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      {
        text: '各国人均寿命与GDP关系演变',
        left: 'center',
        top: 10,
        textStyle: {
          color: '#aaa',
          fontWeight: 'normal',
          fontSize: 20,
        },
      },
    ],
    tooltip: {
      padding: 5,
      backgroundColor: '#222',
      borderColor: '#777',
      borderWidth: 1,
      formatter: function(obj) {
        var value = obj.value;
        return (
          schema[3].text +
          '：' +
          value[3] +
          '<br>' +
          schema[1].text +
          '：' +
          value[1] +
          schema[1].unit +
          '<br>' +
          schema[0].text +
          '：' +
          value[0] +
          schema[0].unit +
          '<br>' +
          schema[2].text +
          '：' +
          value[2] +
          '<br>'
        );
      },
    },
    grid: {
      top: 100,
      containLabel: true,
      left: 30,
      right: '110',
    },
    xAxis: {
      type: 'category',
      data: [1, 2, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12],
      axisPointer: {
        type: 'shadow',
      },
      name: '日期',

      nameGap: 25,
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 18,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
      axisLabel: {
        formatter: '{value} 月',
      },
    },
    yAxis: {
      type: 'value',
      name: '平均日接诊人次',
      max: 10,
      nameTextStyle: {
        color: '#ccc',
        fontSize: 18,
      },
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: '{value} 人次',
      },
    },
    visualMap: [
      {
        show: false,
        dimension: 3,
        categories: data.counties,
        calculable: true,
        precision: 0.1,
        textGap: 30,
        textStyle: {
          color: '#ccc',
        },
        inRange: {
          color: (function() {
            var colors = [
              '#bcd3bb',
              '#e88f70',
              '#edc1a5',
              '#9dc5c8',
              '#e1e8c8',
              '#7b7c68',
              '#e5b5b5',
              '#f0b489',
              '#928ea8',
              '#bda29a',
            ];
            return colors.concat(colors);
          })(),
        },
      },
    ],
    series: [
      {
        type: 'scatter',
        itemStyle: itemStyle,
        data: data.series[0],
        symbolSize: function(val) {
          return sizeFunction(val[2]);
        },
      },
    ],
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut',
  },
  options: [],
};

for (var n = 0; n < data.timeline.length; n++) {
  option.baseOption.timeline.data.push(data.timeline[n]);
  option.options.push({
    title: {
      show: true,
      text: data.timeline[n] + '',
    },
    series: {
      name: data.timeline[n],
      type: 'scatter',
      itemStyle: itemStyle,
      data: data.series[n],
      symbolSize: function(val) {
        return sizeFunction(val[2]);
      },
    },
  });
}

myChart.setOption(option);
