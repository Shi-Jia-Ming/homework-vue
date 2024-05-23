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
import {ComputedRef, onMounted, reactive, computed} from 'vue';
import SpringAPI from "../utils/request.ts";
import {useStore, Store} from 'vuex';

// 全局状态管理
const store: Store<any> = useStore();

// 定义用户信息
const userId: ComputedRef<number> = computed(() => {
  return store.state.user.userId
});
const token: ComputedRef<string> = computed(() => {
  return store.state.user.token
});
const username: ComputedRef<string> = computed(() => {
  return store.state.user.username
});

// 员工性别统计数据
const genderOption = reactive({
  title: {
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
      name: '详情',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 0, name: '男性' },
        { value: 0, name: '女性' },
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
});

// 员工职位数据统计
const jobOption = reactive({
  xAxis: {
    type: 'category',
    data: ['班主任', '讲师', '学工主管', '教研主管', '咨询师']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '详情',
      data: [0, 0, 0, 0, 0],
      type: 'bar'
    }
  ],
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  }
});

onMounted(async () => {
  await initPostStatistic();
  await initGenderStatistic();
});

const initGenderStatistic = async (): void => {
  const chartDom = document.getElementById('gender');
  const myChart = echarts.init(chartDom);

  await SpringAPI.getStaffGender(token.value, userId.value, username.value)
      .then((result: Map<string, Object>) => {
        if (result.get("code") === 0) {
          // 设置数据
          genderOption.series[0].data[0].value = result.get("maleCount") as number;
          genderOption.series[0].data[1].value = result.get("femaleCount") as number;
          console.log("员工性别信息渲染成功");
        } else {
          console.log("员工性别信息渲染失败, 信息: ", result.get("msg") as string);
        }
      })

  genderOption && myChart.setOption(genderOption);
}

const initPostStatistic = async (): void => {
  const chartDom = document.getElementById('post');
  const myChart = echarts.init(chartDom);

  for (let i = 1; i <= jobOption.xAxis.data.length; ++i) {
    await SpringAPI.getStaffJobCount(token.value, userId.value, username.value, i)
        .then((result: Map<string, Object>) => {
          if (result.get("code") === 0) {
            jobOption.series[0].data[i - 1] = result.get("count") as number;
          } else {
            console.log("员工职位信息渲染失败, 信息: ", result.get("msg") as string);
          }
        })
  }

  console.log(jobOption);
  console.log("员工职位信息渲染成功");

  jobOption && myChart.setOption(jobOption);
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
.post-statistic-chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gender-statistic-chart,
.post-statistic-chart {
  width: 100%;
  height: 80%;
  align-self: center;
}

canvas {
  height: 100%;
  width: 100%;
  align-self: center;
}

.divider {
  margin: 80px 0;
  height: 80%;
}
</style>