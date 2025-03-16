<template>
  <div class="page">
    <h2>Excel导出页面</h2>
    <ExportTable />
  </div>
</template>

<script setup lang="ts">
import ExportTable from '../components/ExportTable.vue'
</script>

<style scoped>
.page {
  padding: 20px;
}
</style>
