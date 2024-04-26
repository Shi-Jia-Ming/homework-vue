<template>
  <div class="data-statistic-layout">
    <div class="data-statistic-title-container">
      <p class="data-statistic-title">员工信息统计</p>
    </div>
    <div class="data-charts">
      <div class="gender-statistic-container">
        <div class="gender-statistic-title">
          <p>员工性别统计</p>
        </div>
        <div class="post-statistic-chart">
          <div id="gender" class="gender-statistic-chart"></div>
        </div>
      </div>
      <el-divider direction="vertical" class="divider" />
      <div class="post-statistic-container">
        <div class="post-statistic-title">
          <p>员工职位统计</p>
        </div>
        <div class="post-statistic-chart-container">
          <div id="post" class="post-statistic-chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
  initPostStatistic();
  initGenderStatistic();
});

const initGenderStatistic = (): void => {
  var chartDom = document.getElementById('gender');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
}

const initPostStatistic = (): void => {
  type EChartsOption = echarts.EChartsOption;

  var chartDom = document.getElementById('post');
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };

  option && myChart.setOption(option);
}
</script>

<style lang="scss">
.data-statistic-layout {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: auto;
  height: calc(100% - 56px);
}

.data-statistic-title-container {
  display: flex;
  border-left: 6px #1da8ed solid;
  height: 35px;
}

.data-statistic-title {
  align-self: center;
  margin-left: 15px;
  font-size: 24px;
  color: #1da8ed;
}

.data-charts {
  display: flex;
  flex-direction: row;
  height: calc(100% - 35px);
  justify-content: center;
  align-items: center;
}

.gender-statistic-container,
.post-statistic-container {
  margin: 20px;
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gender-statistic-title,
.post-statistic-title {
  font-size: 30px;
  font-weight: 400;
}

.gender-statistic-chart-container,
.post-statistic-chart-container,
.gender-statistic-chart,
.post-statistic-chart {
  width: 100%;
  height: 100%;
}

canvas {
  align-self: center;
}

.divider {
  margin: 80px 0;
  height: 80%;
}
</style>