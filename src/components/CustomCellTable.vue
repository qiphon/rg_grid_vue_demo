<template>
  <div class="custom-cell-table">
    <h2>单元格自定义渲染表格</h2>
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
import { ref, h } from 'vue'
import RatingCellRendererComp from './seflRender/SelfRender.vue'

interface RowData {
  product: string
  price: number
  stock: number
  rating: number
  status: string
}

// 评分渲染器
const RatingCellRenderer = (params: any) => {
  const rating = params.value || 0
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5

  const stars = []

  // 添加满星
  for (let i = 0; i < fullStars; i++) {
    stars.push(h('span', { class: 'star full-star' }, '★'))
  }

  // 添加半星
  if (halfStar) {
    stars.push(h('span', { class: 'star half-star' }, '★'))
  }

  // 添加空星
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(h('span', { class: 'star empty-star' }, '☆'))
  }

  return h('div', { class: 'rating-container' }, [
    ...stars,
    h('span', { class: 'rating-value' }, ` ${rating.toFixed(1)}`),
  ])
}

// 状态渲染器
const StatusCellRenderer = (params: any) => {
  const status = params.value
  let statusClass = ''

  switch (status) {
    case '有货':
      statusClass = 'status-in-stock'
      break
    case '低库存':
      statusClass = 'status-low-stock'
      break
    case '缺货':
      statusClass = 'status-out-of-stock'
      break
    default:
      statusClass = ''
  }

  return h('div', { class: `status-badge ${statusClass}` }, status)
}

// 价格渲染器
const PriceCellRenderer = (params: any) => {
  const price = params.value
  return h('div', { class: 'price-cell' }, [
    h('span', { class: 'currency-symbol' }, '¥'),
    h('span', { class: 'price-value' }, price.toLocaleString()),
  ])
}

// 库存进度条渲染器
const StockCellRenderer = (params: any) => {
  const stock = params.value
  const percentage = Math.min(100, (stock / 100) * 100)
  let barClass = 'stock-bar'

  if (percentage < 30) {
    barClass += ' low-stock'
  } else if (percentage < 70) {
    barClass += ' medium-stock'
  } else {
    barClass += ' high-stock'
  }

  return h('div', { class: 'stock-container' }, [
    h('div', { class: 'stock-bar-container' }, [
      h('div', { class: barClass, style: { width: `${percentage}%` } }),
    ]),
    h('span', { class: 'stock-value' }, stock),
  ])
}

const columnDefs = ref([
  { field: 'product', headerName: '产品名称' },
  {
    field: 'price',
    headerName: '价格',
    // cellRenderer: PriceCellRenderer,
  },
  {
    field: 'stock',
    headerName: '库存',
    // cellRenderer: StockCellRenderer,
  },
  {
    field: 'rating',
    headerName: '评分',
    // cellRenderer: RatingCellRenderer,
    cellRenderer: RatingCellRendererComp,
  },
  {
    field: 'status',
    headerName: '状态',
    // cellRenderer: StatusCellRenderer,
  },
])

const rowData = ref<RowData[]>([
  {
    product: '智能手机 Pro',
    price: 5999,
    stock: 85,
    rating: 4.5,
    status: '有货',
  },
  {
    product: '超薄笔记本',
    price: 8999,
    stock: 32,
    rating: 4.8,
    status: '低库存',
  },
  { product: '无线耳机', price: 1299, stock: 0, rating: 4.2, status: '缺货' },
  { product: '智能手表', price: 2499, stock: 76, rating: 3.9, status: '有货' },
  {
    product: '平板电脑',
    price: 3699,
    stock: 14,
    rating: 4.7,
    status: '低库存',
  },
  { product: '游戏主机', price: 3899, stock: 67, rating: 4.9, status: '有货' },
  { product: '蓝牙音箱', price: 899, stock: 5, rating: 3.5, status: '低库存' },
  { product: '智能摄像头', price: 499, stock: 0, rating: 4.0, status: '缺货' },
  { product: '机械键盘', price: 799, stock: 45, rating: 4.6, status: '有货' },
  { product: '电竞鼠标', price: 399, stock: 28, rating: 4.3, status: '低库存' },
])

const defaultColDef = ref({
  sortable: true,
  filter: true,
  resizable: true,
})
</script>

<style scoped>
.custom-cell-table {
  padding: 20px;
}

/* 状态样式 */
.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}

.status-in-stock {
  background-color: #e6f7e6;
  color: #2e7d32;
}

.status-low-stock {
  background-color: #fff8e1;
  color: #ff8f00;
}

.status-out-of-stock {
  background-color: #ffebee;
  color: #c62828;
}

/* 价格样式 */
.price-cell {
  font-weight: bold;
}

.currency-symbol {
  color: #666;
  margin-right: 2px;
}

/* 库存进度条样式 */
.stock-container {
  display: flex;
  align-items: center;
}

.stock-bar-container {
  flex-grow: 1;
  height: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-right: 10px;
  overflow: hidden;
}

.stock-bar {
  height: 100%;
  border-radius: 5px;
}

.low-stock {
  background-color: #f44336;
}

.medium-stock {
  background-color: #ff9800;
}

.high-stock {
  background-color: #4caf50;
}

.stock-value {
  min-width: 30px;
  text-align: right;
}
</style>
