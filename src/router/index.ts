import { createRouter, createWebHistory } from 'vue-router'
import BasicTablePage from '../views/BasicTablePage.vue'
import SortFilterTablePage from '../views/SortFilterTablePage.vue'
import GroupTablePage from '../views/GroupTablePage.vue'
import ColumnGroupTablePage from '../views/ColumnGroupTablePage.vue'
import TreeTablePage from '../views/TreeTablePage.vue'
import CustomCellTablePage from '../views/CustomCellTablePage.vue'
import EditableTablePage from '../views/EditableTablePage.vue'
import ExportTablePage from '../views/ExportTablePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/basic',
    },
    {
      path: '/basic',
      name: 'basic',
      component: BasicTablePage,
    },
    {
      path: '/sort-filter',
      name: 'sort-filter',
      component: SortFilterTablePage,
    },
    {
      path: '/group',
      name: 'group',
      component: GroupTablePage,
    },
    {
      path: '/column-group',
      name: 'column-group',
      component: ColumnGroupTablePage,
    },
    {
      path: '/tree',
      name: 'tree',
      component: TreeTablePage,
    },
    {
      path: '/custom-cell',
      name: 'custom-cell',
      component: CustomCellTablePage,
    },
    {
      path: '/editable',
      name: 'editable',
      component: EditableTablePage,
    },
    {
      path: '/export',
      name: 'export',
      component: ExportTablePage,
    },
  ],
})

export default router
