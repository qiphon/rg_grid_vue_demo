<template>
  <div class="tree-table">
    <h2>树形表格 不支持</h2>
    <ag-grid-vue
      style="width: 100%; height: 400px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :animateRows="true"
      :getDataPath="getDataPath"
      :autoGroupColumnDef="autoGroupColumnDef"
    ></ag-grid-vue>
    <!-- :treeData="true"  not support -->
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { ref } from 'vue'

interface TreeRowData {
  name: string
  size?: string
  type: string
  dateModified: string
  // 用于树形结构的路径
  path?: string[]
}

const columnDefs = ref([
  {
    field: 'name',
    headerName: '名称',
    // 不需要设置rowGroup，因为我们使用treeData
  },
  {
    field: 'size',
    headerName: '大小',
  },
  {
    field: 'type',
    headerName: '类型',
  },
  {
    field: 'dateModified',
    headerName: '修改日期',
  },
])

// 树形数据
const rowData = ref<TreeRowData[]>([
  {
    name: '文档',
    type: '文件夹',
    dateModified: '2023-05-21',
    path: ['文档'],
  },
  {
    name: '工作',
    type: '文件夹',
    dateModified: '2023-05-20',
    path: ['文档', '工作'],
  },
  {
    name: '项目计划.docx',
    size: '25KB',
    type: 'Word文档',
    dateModified: '2023-05-18',
    path: ['文档', '工作', '项目计划.docx'],
  },
  {
    name: '预算表.xlsx',
    size: '42KB',
    type: 'Excel表格',
    dateModified: '2023-05-15',
    path: ['文档', '工作', '预算表.xlsx'],
  },
  {
    name: '个人',
    type: '文件夹',
    dateModified: '2023-05-19',
    path: ['文档', '个人'],
  },
  {
    name: '简历.pdf',
    size: '120KB',
    type: 'PDF文档',
    dateModified: '2023-05-10',
    path: ['文档', '个人', '简历.pdf'],
  },
  {
    name: '照片',
    type: '文件夹',
    dateModified: '2023-05-22',
    path: ['照片'],
  },
  {
    name: '假期',
    type: '文件夹',
    dateModified: '2023-05-17',
    path: ['照片', '假期'],
  },
  {
    name: '海滩.jpg',
    size: '1.2MB',
    type: '图片',
    dateModified: '2023-05-16',
    path: ['照片', '假期', '海滩.jpg'],
  },
  {
    name: '山景.jpg',
    size: '2.4MB',
    type: '图片',
    dateModified: '2023-05-15',
    path: ['照片', '假期', '山景.jpg'],
  },
])

const defaultColDef = ref({
  flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
})

// 获取数据路径的函数，用于构建树形结构
const getDataPath = (data: TreeRowData) => {
  return data.path || []
}

// 自动分组列定义
const autoGroupColumnDef = ref({
  headerName: '文件结构',
  minWidth: 250,
  cellRendererParams: {
    suppressCount: false,
  },
})
</script>

<style scoped>
.tree-table {
  padding: 20px;
}
</style>
