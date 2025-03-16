<template>
  <div class="group-table">
    <h2>分组表格</h2>
    <ag-grid-vue
      style="width: 100%; height: 400px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :groupDefaultExpanded="groupDefaultExpanded"
      :autoGroupColumnDef="autoGroupColumnDef"
    ></ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ref } from 'vue'

interface RowData {
  department: string
  team: string
  employee: string
  salary: number
}

const columnDefs = ref([
  {
    field: 'department',
    headerName: '部门',
    rowGroup: true,
    hide: true,
  },
  {
    field: 'team',
    headerName: '团队',
    rowGroup: true,
    hide: true,
  },
  {
    field: 'employee',
    headerName: '员工',
  },
  {
    field: 'salary',
    headerName: '薪资',
    valueFormatter: (params: any) => `¥${params.value.toLocaleString()}`,
  },
])

const rowData = ref<RowData[]>([
  { department: '技术部', team: '前端组', employee: '张三', salary: 15000 },
  { department: '技术部', team: '前端组', employee: '李四', salary: 16000 },
  { department: '技术部', team: '后端组', employee: '王五', salary: 17000 },
  { department: '技术部', team: '后端组', employee: '赵六', salary: 16500 },
  { department: '市场部', team: '销售组', employee: '孙七', salary: 12000 },
  { department: '市场部', team: '销售组', employee: '周八', salary: 13000 },
  { department: '市场部', team: '运营组', employee: '吴九', salary: 14000 },
  { department: '市场部', team: '运营组', employee: '郑十', salary: 13500 },
])

const defaultColDef = ref({
  sortable: true,
  filter: true,
  resizable: true,
})

const groupDefaultExpanded = ref(1)

const autoGroupColumnDef = ref({
  headerName: '分组',
  minWidth: 200,
  cellRendererParams: {
    suppressCount: true,
  },
})
</script>

<style scoped>
.group-table {
  padding: 20px;
}
</style>
