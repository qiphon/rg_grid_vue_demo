<template>
  <div class="editable-table">
    <h2>行选择与编辑表格</h2>
    <div class="toolbar">
      <button @click="addRow" class="action-button add-button">添加行</button>
      <button
        @click="removeSelected"
        class="action-button remove-button"
        :disabled="!selectedRows.length"
      >
        删除选中行
      </button>
      <div class="selection-info" v-if="selectedRows.length">
        已选择 {{ selectedRows.length }} 行
      </div>
    </div>
    <ag-grid-vue
      style="width: 100%; height: 400px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :rowSelection="'multiple'"
      @row-selected="onRowSelected"
      @cell-value-changed="onCellValueChanged"
      :editType="'fullRow'"
    ></ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { ref, reactive } from 'vue'

interface RowData {
  id: number
  name: string
  category: string
  price: number
  inStock: boolean
}

// 生成唯一ID
let nextId = 100
const getNextId = () => nextId++

// 下拉选择框编辑器参数
const categorySelectionParams = {
  values: ['电子产品', '家居用品', '办公用品', '厨房用品', '户外用品'],
}

// 列定义
const columnDefs = ref([
  {
    headerName: '选择',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: 'left',
  },
  {
    field: 'id',
    headerName: '产品ID',
    editable: false,
    width: 100,
  },
  {
    field: 'name',
    headerName: '产品名称',
    editable: true,
  },
  {
    field: 'category',
    headerName: '类别',
    editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: categorySelectionParams,
  },
  {
    field: 'price',
    headerName: '价格',
    editable: true,
    valueFormatter: (params: any) => `¥${params.value.toLocaleString()}`,
  },
  {
    field: 'inStock',
    headerName: '库存状态',
    editable: true,
    cellEditor: 'agCheckboxCellEditor',
    cellRenderer: (params: any) => {
      return params.value ? '✓ 有库存' : '✗ 无库存'
    },
  },
  {
    headerName: '操作',
    cellRenderer: (params: any) => {
      const editButton = document.createElement('button')
      editButton.innerHTML = '编辑'
      editButton.classList.add('edit-button')
      editButton.addEventListener('click', () => {
        params.api.startEditingCell({
          rowIndex: params.rowIndex,
          colKey: 'name',
        })
      })

      return editButton
    },
    editable: false,
    sortable: false,
    filter: false,
    width: 100,
  },
])

// 行数据
const rowData = ref<RowData[]>([
  { id: 1, name: '智能手机', category: '电子产品', price: 4999, inStock: true },
  { id: 2, name: '咖啡机', category: '厨房用品', price: 1299, inStock: true },
  { id: 3, name: '办公椅', category: '办公用品', price: 799, inStock: false },
  { id: 4, name: '床头灯', category: '家居用品', price: 199, inStock: true },
  { id: 5, name: '帐篷', category: '户外用品', price: 599, inStock: true },
])

// 默认列定义
const defaultColDef = ref({
  sortable: true,
  filter: true,
  resizable: true,
  flex: 1,
})

// 选中的行
const selectedRows = ref<any[]>([])

// 行选择事件处理
const onRowSelected = (event: any) => {
  selectedRows.value = event.api.getSelectedRows()
}

// 单元格值变更事件处理
const onCellValueChanged = (event: any) => {
  console.log('数据已更新:', event.data)
}

// 添加新行
const addRow = () => {
  const newRow: RowData = {
    id: getNextId(),
    name: '新产品',
    category: '电子产品',
    price: 0,
    inStock: true,
  }
  rowData.value = [...rowData.value, newRow]
}

// 删除选中行
const removeSelected = () => {
  if (selectedRows.value.length > 0) {
    const selectedIds = selectedRows.value.map(row => row.id)
    rowData.value = rowData.value.filter(row => !selectedIds.includes(row.id))
    selectedRows.value = []
  }
}
</script>

<style scoped>
.editable-table {
  padding: 20px;
}

.toolbar {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.action-button {
  margin-right: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.add-button {
  background-color: #4caf50;
  color: white;
}

.add-button:hover {
  background-color: #388e3c;
}

.remove-button {
  background-color: #f44336;
  color: white;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.remove-button:disabled {
  background-color: #e0e0e0;
  color: #9e9e9e;
  cursor: not-allowed;
}

.selection-info {
  margin-left: auto;
  font-weight: bold;
  color: #666;
}

:deep(.edit-button) {
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
}

:deep(.edit-button:hover) {
  background-color: #1976d2;
}
</style>
