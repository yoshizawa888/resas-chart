<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import HighchartsVue from 'vue3-highcharts';
import { Prefecture, DataObject } from '../interface/props';

let dataObject: DataObject[] = [];
const chartData = {
  chart: {
    defaultSeriesType: 'line'
  },
  title: {
    text: '推移のグラフ',
    style: { margin: '10px 100px 0 0', fontSize: '2rem' }
  },
  xAxis: {
    categories: ['1980', '1990', '2000', '2010', '2020'],
    title: {
      text: '年度',
      style: {
        fontSize: '1.4rem'
      }
    },
    labels: {
      style: {
        fontSize: '1.2rem'
      }
    }
  },
  yAxis: {
    title: {
      text: '人口数',
      style: {
        fontSize: '1.4rem'
      }
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080'
      }
    ],
    labels: {
      style: {
        fontSize: '1.2rem'
      }
    }
  },
  tooltip: {
    style: {
      fontSize: '1.2rem'
    }
  },
  legend: {
    itemStyle: {
      fontSize: '1.2rem'
    }
  },
  series: dataObject
};

const props = defineProps<{
  prefecturesProps: Prefecture[];
}>();

const displayStatus = ref(true);
let oldData: Prefecture[] = [];
watch(
  () => props.prefecturesProps,
  (newData) => {
    if (newData) {
      const newLength = newData.length;
      const oldLength = oldData.length;
      oldData = [...newData];
      if (newLength > oldLength) {
        const index = newLength - 1;
        dataObject.push({
          name: newData[index].name,
          data: [
            newData[index].data[4].value,
            newData[index].data[6].value,
            newData[index].data[8].value,
            newData[index].data[10].value,
            newData[index].data[12].value
          ]
        });
      } else if (newLength < oldLength) {
        newData = newData.filter((element) => oldData.includes(element));
        dataObject = dataObject.filter((item1) => {
          const isMatched = newData.some((item2) => item2.name === item1.name);
          return isMatched;
        });
        chartData.series = dataObject;
      }
    }
    displayStatus.value = false;
    nextTick(() => {
      displayStatus.value = true;
    });
  },
  {
    deep: true
  }
);
</script>

<template>
  <div class="cont-wrap">
    <HighchartsVue :options="chartData" :animateOnUpdate="true" v-if="displayStatus"></HighchartsVue>
  </div>
</template>
