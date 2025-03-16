<template>
  <div class="page">
    <h2>排序筛选表格页面</h2>
    <SortFilterTable />
  </div>
</template>

<script setup lang="ts">
import SortFilterTable from '../components/SortFilterTable.vue'
</script>

<style scoped>
.page {
  padding: 20px;
}
</style>