<template>
  <div class="column-group-table">
    <h2>列分组表格</h2>
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
import { ref } from 'vue'

interface RowData {
  product: string
  q1Sales: number
  q2Sales: number
  q3Sales: number
  q4Sales: number
  q1Cost: number
  q2Cost: number
  q3Cost: number
  q4Cost: number
  q1Profit: number
  q2Profit: number
  q3Profit: number
  q4Profit: number
}

const columnDefs = ref([
  { field: 'product', headerName: '产品', pinned: 'left' },
  {
    headerName: '销售额',
    children: [
      { field: 'q1Sales', headerName: 'Q1' },
      { field: 'q2Sales', headerName: 'Q2' },
      { field: 'q3Sales', headerName: 'Q3' },
      { field: 'q4Sales', headerName: 'Q4' },
    ],
  },
  {
    headerName: '成本',
    children: [
      { field: 'q1Cost', headerName: 'Q1' },
      { field: 'q2Cost', headerName: 'Q2' },
      { field: 'q3Cost', headerName: 'Q3' },
      { field: 'q4Cost', headerName: 'Q4' },
    ],
  },
  {
    headerName: '利润',
    children: [
      { field: 'q1Profit', headerName: 'Q1' },
      { field: 'q2Profit', headerName: 'Q2' },
      { field: 'q3Profit', headerName: 'Q3' },
      { field: 'q4Profit', headerName: 'Q4' },
    ],
  },
])

const rowData = ref<RowData[]>([
  {
    product: '手机',
    q1Sales: 120000,
    q2Sales: 150000,
    q3Sales: 180000,
    q4Sales: 200000,
    q1Cost: 80000,
    q2Cost: 100000,
    q3Cost: 120000,
    q4Cost: 130000,
    q1Profit: 40000,
    q2Profit: 50000,
    q3Profit: 60000,
    q4Profit: 70000,
  },
  {
    product: '平板',
    q1Sales: 80000,
    q2Sales: 90000,
    q3Sales: 110000,
    q4Sales: 130000,
    q1Cost: 50000,
    q2Cost: 60000,
    q3Cost: 70000,
    q4Cost: 80000,
    q1Profit: 30000,
    q2Profit: 30000,
    q3Profit: 40000,
    q4Profit: 50000,
  },
  {
    product: '笔记本',
    q1Sales: 200000,
    q2Sales: 220000,
    q3Sales: 250000,
    q4Sales: 280000,
    q1Cost: 150000,
    q2Cost: 160000,
    q3Cost: 180000,
    q4Cost: 200000,
    q1Profit: 50000,
    q2Profit: 60000,
    q3Profit: 70000,
    q4Profit: 80000,
  },
  {
    product: '耳机',
    q1Sales: 40000,
    q2Sales: 50000,
    q3Sales: 60000,
    q4Sales: 70000,
    q1Cost: 20000,
    q2Cost: 25000,
    q3Cost: 30000,
    q4Cost: 35000,
    q1Profit: 20000,
    q2Profit: 25000,
    q3Profit: 30000,
    q4Profit: 35000,
  },
  {
    product: '智能手表',
    q1Sales: 60000,
    q2Sales: 70000,
    q3Sales: 80000,
    q4Sales: 90000,
    q1Cost: 40000,
    q2Cost: 45000,
    q3Cost: 50000,
    q4Cost: 55000,
    q1Profit: 20000,
    q2Profit: 25000,
    q3Profit: 30000,
    q4Profit: 35000,
  },
])

const defaultColDef = ref({
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 100,
})
</script>

<style scoped>
.column-group-table {
  padding: 20px;
}
</style>
