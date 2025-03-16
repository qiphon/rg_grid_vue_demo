<template>
  <div class="export-table">
    <h2>Excel导出表格</h2>
    <div class="toolbar">
      <button @click="exportToExcel" class="export-button">导出为Excel</button>
      <div class="filter-container">
        <label for="country-filter">国家筛选：</label>
        <select
          id="country-filter"
          v-model="selectedCountry"
          @change="onFilterChanged"
        >
          <option value="">全部</option>
          <option value="中国">中国</option>
          <option value="美国">美国</option>
          <option value="日本">日本</option>
          <option value="德国">德国</option>
          <option value="英国">英国</option>
        </select>
      </div>
    </div>
    <ag-grid-vue
      style="width: 100%; height: 400px"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :externalFilterPresent="true"
      :doesExternalFilterPass="doesExternalFilterPass"
      @grid-ready="onGridReady"
    ></ag-grid-vue>
  </div>
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { ref } from 'vue'

type GridReadyParams<TData = any> = NonNullable<
  Parameters<typeof AgGridVue<TData>>[0]['onGrid-ready']
>

interface RowData {
  id: number
  name: string
  country: string
  city: string
  revenue: number
  employees: number
  founded: number
}

// 列定义
const columnDefs = ref([
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: '公司名称' },
  { field: 'country', headerName: '国家' },
  { field: 'city', headerName: '城市' },
  {
    field: 'revenue',
    headerName: '年收入(万)',
    valueFormatter: (params: any) => `¥${params.value.toLocaleString()}`,
  },
  { field: 'employees', headerName: '员工数' },
  { field: 'founded', headerName: '成立年份' },
])

// 行数据
const rowData = ref<RowData[]>([
  {
    id: 1,
    name: '阿里巴巴',
    country: '中国',
    city: '杭州',
    revenue: 50000,
    employees: 10000,
    founded: 1999,
  },
  {
    id: 2,
    name: '腾讯',
    country: '中国',
    city: '深圳',
    revenue: 45000,
    employees: 8500,
    founded: 1998,
  },
  {
    id: 3,
    name: '百度',
    country: '中国',
    city: '北京',
    revenue: 30000,
    employees: 7000,
    founded: 2000,
  },
  {
    id: 4,
    name: 'Google',
    country: '美国',
    city: '山景城',
    revenue: 80000,
    employees: 15000,
    founded: 1998,
  },
  {
    id: 5,
    name: 'Microsoft',
    country: '美国',
    city: '雷德蒙德',
    revenue: 75000,
    employees: 16000,
    founded: 1975,
  },
  {
    id: 6,
    name: 'Apple',
    country: '美国',
    city: '库比蒂诺',
    revenue: 90000,
    employees: 14000,
    founded: 1976,
  },
  {
    id: 7,
    name: 'Sony',
    country: '日本',
    city: '东京',
    revenue: 40000,
    employees: 12000,
    founded: 1946,
  },
  {
    id: 8,
    name: 'Toyota',
    country: '日本',
    city: '丰田市',
    revenue: 60000,
    employees: 30000,
    founded: 1937,
  },
  {
    id: 9,
    name: 'BMW',
    country: '德国',
    city: '慕尼黑',
    revenue: 55000,
    employees: 25000,
    founded: 1916,
  },
  {
    id: 10,
    name: 'Siemens',
    country: '德国',
    city: '柏林',
    revenue: 48000,
    employees: 28000,
    founded: 1847,
  },
  {
    id: 11,
    name: 'BP',
    country: '英国',
    city: '伦敦',
    revenue: 52000,
    employees: 22000,
    founded: 1909,
  },
  {
    id: 12,
    name: 'HSBC',
    country: '英国',
    city: '伦敦',
    revenue: 42000,
    employees: 18000,
    founded: 1865,
  },
])

// 默认列定义
const defaultColDef = ref({
  sortable: true,
  filter: true,
  resizable: true,
  flex: 1,
})

// 网格API引用
const gridApi = ref<GridReadyParams['api'] | null>(null)

// 国家筛选
const selectedCountry = ref('')

// 网格就绪事件
const onGridReady = (params: GridReadyParams) => {
  gridApi.value = params.api
}

// 筛选变更事件
const onFilterChanged = () => {
  gridApi.value?.onFilterChanged('columnFilter')
  gridApi.value?.onFilterChanged('advancedFilter')
  gridApi.value?.onFilterChanged('quickFilter')
  gridApi.value?.onFilterChanged('api')
}

// 外部筛选器
const doesExternalFilterPass = (node: any) => {
  if (!selectedCountry.value) {
    return true
  }
  return node.data.country === selectedCountry.value
}

// 导出为Excel
const exportToExcel = () => {
  if (!gridApi.value) return

  const params = {
    fileName: `公司数据_${new Date().toISOString().split('T')[0]}.csv`,
    processCellCallback: (params: any) => {
      // 处理特殊格式的单元格
      if (params.column.colId === 'revenue') {
        return params.value
      }
      return params.value
    },
  }

  gridApi.value.exportDataAsCsv(params)
}
</script>

<style scoped>
.export-table {
  padding: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
}

.export-button {
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.export-button:hover {
  background-color: #388e3c;
}

.filter-container {
  display: flex;
  align-items: center;
}

.filter-container label {
  margin-right: 8px;
  font-weight: bold;
}

.filter-container select {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
