import { createApp } from 'vue'
import App from './App.vue'
import NgFormBuild from '../packages/form/src/form-build'
import NgFormDesign from '../packages/form/src/form-design'
import * as Icons from '@element-plus/icons-vue' //全局引入图标组件
import '../packages/form/src/form-design.css'

// 导入element-ui
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

const app =createApp(App)
  .component('ng-form-build', NgFormBuild)
  .component('ng-form-design', NgFormDesign)
  .use(ElementPlus, {locale: zhCn})


Object.keys(Icons).forEach(key => {//注册全部图标组件
  app.component(key, Icons[key as keyof typeof Icons])
})
app.mount('#app')
