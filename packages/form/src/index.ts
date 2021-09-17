import type { App } from 'vue'
// 导入组件，组件必须声明 name
import NgFormDesign from './form-design/index.vue'
import NgFormBuild from './form-build/index.vue'
import NgFormItem from './form-item/index.vue' 
import NgFormItemBase from './form-item/base.vue' 
// 为组件提供 install 安装方法，供按需引入
NgFormDesign.install = function (app: App<Element>) { 
	app.component(NgFormDesign.name, NgFormDesign)
   
}
// 为组件提供 install 安装方法，供按需引入
NgFormBuild.install = function (app: App<Element>) { 
  app.component(NgFormDesign.name, NgFormDesign)
}
 
NgFormItem.install = function (app: App<Element>) { 
  app.component(NgFormDesign.name, NgFormDesign)
}

NgFormItemBase.install = function (app: App<Element>) { 
  app.component(NgFormDesign.name, NgFormDesign)
}
// 默认导出组件
export default [ NgFormDesign,NgFormBuild,NgFormItem,NgFormItemBase]
 