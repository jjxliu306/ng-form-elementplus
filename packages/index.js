 
// 导入组件
// 导入组件，组件必须声明 name
import NgFormDesign from './form-design/index.vue'
import NgFormBuild from './form-design/build.vue' 
import NgFormNode from './form-design/panel-container/node.vue' 

import NgFormItem from './form-design/items/index.vue' 
import NgFormItemNode from './form-design/items/node.vue' 

import NgForm  from './ng-form/index.vue'

import mixin from './form-design/items/mixin.js'

// 国际化
import locale from './locale';
import LocalMixin from './locale/mixin.js'
 
export {
 mixin,LocalMixin , NgForm , NgFormDesign,NgFormBuild,NgFormItem,NgFormNode,NgFormItemNode
}


 

// 按需引入 

const components = [ NgForm , NgFormDesign,NgFormBuild,NgFormItem,NgFormNode,NgFormItemNode/*,NgFormItemBase*/]
 

const NgFormElementPlus = {
  install(App , opts) {
    components.forEach((item) => {
      App.component(item.name, item);
    });
    if(opts && opts.locale) {
      locale.use(opts.locale);
    }
    if(opts && opts.i18n) {
      locale.i18n(opts.i18n);
    }
     
  },
};

export default NgFormElementPlus;


// function install(app) {

//   components.forEach(t=>  app.component(t.name, t)) 

// }


// export default {
//   install
// }
 