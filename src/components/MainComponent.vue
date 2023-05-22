<script setup lang="ts">
import PrefectureSelector from './PrefectureSelector.vue';
import DataChart from './DataChart.vue';
</script>

<template>
  <div>
    <h1>タイトル</h1>

    <PrefectureSelector />
    <DataChart />
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
</style>
