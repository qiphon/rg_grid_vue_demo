<template>
  <div class="basic-table">
    <h2>基础表格</h2>
    <ag-grid-vue
      style="width: 100%; height: 400px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
    ></ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ref } from 'vue'

interface RowData {
  make: string
  model: string
  price: number
}

const columnDefs = ref([
  { field: 'make', headerName: '品牌' },
  { field: 'model', headerName: '型号' },
  { field: 'price', headerName: '价格' },
])

const rowData = ref<RowData[]>([
  { make: '丰田', model: 'Celica', price: 35000 },
  { make: '福特', model: 'Mondeo', price: 32000 },
  { make: '保时捷', model: 'Boxster', price: 72000 },
  { make: '宝马', model: 'M3', price: 68000 },
  { make: '奔驰', model: 'C200', price: 58000 },
])

const defaultColDef = ref({
  sortable: true,
  resizable: true,
})
</script>

<style scoped>
.basic-table {
  padding: 20px;
}
</style>
