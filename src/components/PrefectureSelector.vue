<script setup lang="ts">
import { ref, Ref } from 'vue';
import axios from 'axios';
import DataChart from './DataChart.vue';
import { Prefecture } from '../interface/props';

let prefectures = ref<{ prefCode: number; prefName: string }[]>();
const createCheckbox = () => {
  axios
    .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'X-API-KEY': 'mZk0lssozTMG1HaOY7gKPwPlqTpHksVNo3lfSGY3' }
    })
    .then((response) => {
      prefectures.value = response.data.result;
    });
};
createCheckbox();

let propsData: Ref<Prefecture[]> = ref([]);

const checkField = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    axios
      .get(
        'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' + target.value,
        {
          headers: { 'X-API-KEY': 'mZk0lssozTMG1HaOY7gKPwPlqTpHksVNo3lfSGY3' }
        }
      )
      .then((response) => {
        const prefecture = prefectures.value?.find((prefecture) => prefecture.prefCode === parseInt(target.value));

        const prefectureName = prefecture ? prefecture.prefName : '';

        const populationData = response.data.result.data[0].data;
        propsData.value.push({ name: prefectureName, data: populationData });
      });
  } else {
    const index = propsData.value.findIndex((item) => item.name === target.value);
    if (index === -1) {
      propsData.value.splice(index, 1);
    }
  }
};
</script>

<template>
  <div class="cont-wrap">
    <div class="ttl">都道府県</div>
    <div class="list">
      <label class="item" v-for="prefecture in prefectures" :key="prefecture.prefCode">
        <input type="checkbox" name="prefecture" :value="prefecture.prefCode" @change="checkField" />
        {{ prefecture.prefName }}
      </label>
    </div>
    <DataChart :prefecturesProps="propsData" />
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/prefectureSelector.scss';
</style>
