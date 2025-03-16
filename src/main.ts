import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {
  ClientSideRowModelModule,
  ValidationModule,
  ModuleRegistry,
  TextFilterModule,
  NumberFilterModule,
  // RowGroupingModule,
} from 'ag-grid-community'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  NumberFilterModule,
  // RowGroupingModule,
])
const app = createApp(App)
app.use(router)
app.mount('#app')
