import type { App } from 'vue'

// 导入组件，组件必须声明 name
import NgFormDesign from './form/src/form-design/index.vue'
import NgFormBuild from './form/src/form-build/index.vue'
import NgFormItem from './form/src/form-item/index.vue' 
import NgFormItemBase from './form/src/form-item/base.vue' 
 

const components = {NgFormDesign , NgFormBuild , NgFormItem , NgFormItemBase}

// 导入组件
//import components from './form/src' 
require('./form/src/form-design.css')

// 存储组件列表 
let installed = false
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install =  (app: App<Element>):void=> {
  // 判断是否安装
  if (installed) return 
  // 遍历注册全局组件
	app.component(NgFormDesign.name, NgFormDesign)
	app.component(NgFormBuild.name, NgFormBuild)
	app.component(NgFormItem.name, NgFormItem)
	app.component(NgFormItemBase.name, NgFormItemBase) 

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



// export function setupFormDesign(app: App<Element>) {
//   install(app)
  
// }

//export default components
