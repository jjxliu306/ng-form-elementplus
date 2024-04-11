import { createApp } from 'vue'
import App from './App.vue'


// 导入element-ui
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'


// 导入自定义组件
import components from './components/index.js'

console.log('components' , components)

import NgFormElementPlus from "../packages/index.js"; //导入
 
 
const app = createApp(App);
app.use(NgFormElementPlus , {locale: 'zh_CN', components: components}); //注册
app.use(ElementPlus, {locale: zhCn })


import * as ElementPlusIconsVue from '@element-plus/icons-vue'


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}




app.mount('#app')
