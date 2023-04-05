import { createApp } from 'vue'
import App from './App.vue'


// 导入element-ui
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import NgFormElementPlus from "../packages/index.js"; //导入

const app = createApp(App);
app.use(NgFormElementPlus); //注册
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
