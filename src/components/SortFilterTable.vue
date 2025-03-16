<template>
  <div class="sort-filter-table">
    <h2>排序筛选表格</h2>
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
  name: string
  age: number
  country: string
  salary: number
}

const columnDefs = ref([
  {
    field: 'name',
    headerName: '姓名',
    filter: 'agTextColumnFilter',
  },
  {
    field: 'age',
    headerName: '年龄',
    filter: 'agNumberColumnFilter',
  },
  {
    field: 'country',
    headerName: '国家',
    filter: 'agTextColumnFilter',
  },
  {
    field: 'salary',
    headerName: '薪资',
    filter: 'agNumberColumnFilter',
    valueFormatter: (params: any) => `¥${params.value.toLocaleString()}`,
  },
])

const rowData = ref<RowData[]>([
  { name: '张三', age: 28, country: '中国', salary: 15000 },
  { name: 'John', age: 32, country: '美国', salary: 25000 },
  { name: 'Maria', age: 25, country: '西班牙', salary: 18000 },
  { name: '李四', age: 35, country: '中国', salary: 20000 },
  { name: 'Hans', age: 40, country: '德国', salary: 30000 },
  { name: '王五', age: 30, country: '中国', salary: 16000 },
])

const defaultColDef = ref({
  sortable: true,
  filter: true,
  resizable: true,
})
</script>

<style scoped>
.sort-filter-table {
  padding: 20px;
}
</style>
