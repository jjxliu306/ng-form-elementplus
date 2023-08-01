 
// 导入组件
// 导入组件，组件必须声明 name
import NgFormDesign from './form-design/index.vue'
import NgFormBuild from './form-design/build.vue' 
import NgFormNode from './form-design/panel-container/node.vue' 

import NgFormItem from './form-design/items/index.vue' 
import NgFormItemNode from './form-design/items/node.vue' 

import NgForm  from './ng-form/index.vue'

import mixin from './form-design/items/mixin.js'
 
export {
 mixin , NgForm , NgFormDesign,NgFormBuild,NgFormItem,NgFormNode,NgFormItemNode
}


 

// 按需引入 

const components = [ NgForm , NgFormDesign,NgFormBuild,NgFormItem,NgFormNode,NgFormItemNode/*,NgFormItemBase*/]
 

const NgFormElementPlus = {
  install(App) {
    components.forEach((item) => {
      App.component(item.name, item);
    });
  },
};

export default NgFormElementPlus;


// function install(app) {

//   components.forEach(t=>  app.component(t.name, t)) 

// }


// export default {
//   install
// }
 