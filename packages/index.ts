import type { App } from 'vue'

// 导入组件
import components from './form/src' 

// 存储组件列表 
let installed = false
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install =  (app: App<Element>):void=> {
  // 判断是否安装
  if (installed) return
  // 遍历注册全局组件
  components.map(component => app.component(component.name, component))

  installed = true
}
 
 

export function setupFormDesign(app: App<Element>) {
  install(app)
  
}

export default components
