import { createRouter, createWebHistory } from 'vue-router'
import BasicTablePage from '../views/BasicTablePage.vue'
import SortFilterTablePage from '../views/SortFilterTablePage.vue'
import GroupTablePage from '../views/GroupTablePage.vue'
import ColumnGroupTablePage from '../views/ColumnGroupTablePage.vue'

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
  ],
})

export default router
