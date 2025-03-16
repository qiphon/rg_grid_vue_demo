<template>
  <div class="app">
    <h1>AG Grid Vue3 示例</h1>
    <nav class="nav-menu">
      <router-link to="/basic">基础表格</router-link>
      <router-link to="/sort-filter">排序筛选表格</router-link>
      <router-link to="/group">分组表格</router-link>
      <router-link to="/column-group">列分组表格</router-link>
      <router-link to="/tree">树形表格</router-link>
      <router-link to="/custom-cell">自定义单元格</router-link>
      <router-link to="/editable">行选择与编辑</router-link>
      <router-link to="/export">Excel导出</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 不再需要直接导入表格组件
</script>

<style>
.app {
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.nav-menu {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
}

.nav-menu a {
  margin: 0 15px;
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-menu a:hover {
  background-color: #e0e0e0;
}

.nav-menu a.router-link-active {
  background-color: #42b983;
  color: white;
}
</style>
