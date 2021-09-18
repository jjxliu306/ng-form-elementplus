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
 
 // 判断是否是直接引入文件
// if (window && window.app) {
//   install(window.app as App<Element>)
// }
 
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components
}
console.log('dd' , ...components)
 

// export function setupFormDesign(app: App<Element>) {
//   install(app)
  
// }

//export default components
