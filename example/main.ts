import { createApp } from 'vue'
import App from './App.vue'  
import NgFormBuild from '../packages/form/src/form-build'
import NgFormDesign from '../packages/form/src/form-design'

import '../packages/form/src/form-design.css'

// 导入element-ui    
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css' 

createApp(App) 
  .component('ng-form-build', NgFormBuild) 
  .component('ng-form-design', NgFormDesign) 
  .use(ElementPlus, {
	  locale: zhCn
	}) 
  .mount('#app')
