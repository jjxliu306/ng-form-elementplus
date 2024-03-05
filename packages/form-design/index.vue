<template> 
  <el-container class="form-design">
      <el-header class="header" height="40px">
        <HeaderPanel :clear="clear" :preview="preview" :imp="imp" :exp="exp" :formTemplate="template" @importData="importData">
          <template #controlButton>
             <slot name="controlButton"></slot>
          </template>
          <template #formName>
             <slot name="formName"></slot>
          </template>
        </HeaderPanel>
      </el-header>
      <el-main class="form-main">
        <el-container class="ng-main-container">
          <el-aside width="260px" class="item-panel">
             <slot name="drag"></slot> 
             <DragPanel :basic-item="basicItem" :decorate-item="decorateItem" :layout-item="layoutItem" :application-item="applicationItem"/>
          </el-aside>
          <el-main class="center-panel form-main">
            
            <ContainerPanel :formTemplate="template" @handleSelectItem="handleSelectItem" :selectItem="selectItem" :arrow="arrow"> 
            </ContainerPanel>  
          </el-main>  
          <el-aside :width="arrow ? '0px' : '370px'" class="properties-panel"> 
            <a  :class="[arrow ? 'togglelefts ' : 'togglelefts arrowR']" @click="arrow=!arrow" :style="{right: (arrow ?  '0px': '370px')}" :title="arrow ?  t('ngform.open_properties_panel') : t('ngform.close_properties_panel')"></a>
              <PropertiesPanel :selectItem="selectItem" >
                  <template slot="custom-properties" >
                    <slot name="custom-properties" :selectItem="selectItem"></slot>
                  </template>
                   <template slot="form-extend-properties"  >
                      <slot name="form-extend-properties" :data="template"></slot>
                  </template>
                   <template slot="extend-tab" >
                      <slot name="extend-tab" :data="template"></slot>
                  </template>
              </PropertiesPanel> 
          </el-aside>  
        </el-container> 
      </el-main> 
  </el-container> 
</template>

<script> 
import HeaderPanel from './panel-header/index.vue'
import DragPanel from './panel-drag/index.vue'
import ContainerPanel from './panel-container/index.vue'
import PropertiesPanel from './panel-properties/index.vue'
 
import { cloneDeep , getUUID } from '../utils/index.js'
 
import { use } from '../locale/index'

import Bus from '../utils/bus.js'
import LocalMixin from '../locale/mixin.js'
export default {
  mixins: [LocalMixin],
  name: 'ng-form-design',
  components: {
    HeaderPanel,
    DragPanel,
    ContainerPanel,
    PropertiesPanel
  },
  data(){
    return {
      arrow: false,
      selectItem: {},
      i18nkey: getUUID(),
      template: {
        list: [],
        config: {
          labelPosition: "left",
          labelWidth: 100, 
          size: 'default',
          outputHidden: true ,//  是否输出隐藏字段的值 默认打开,所有字段都输出
          hideRequiredMark: false ,
          syncLabelRequired: true,
          labelSuffix: '',
          customStyle: ""
        }
      }
    }
  },
  props:{ 
    customComponents: {
      type: Array,
      default: ()=>[]
    }, 
    // 按钮显示隐藏 
    clear: {
      type: Boolean ,
      default: true
    },
    preview: {
      type: Boolean ,
      default: true
    }, 
    imp: {
      type: Boolean ,
      default: true
    },
    exp: {
      type: Boolean ,
      default: true
    },
    // 外部属性配置
    config: {
      type: Object
    },
    //基础组件是否要展示或待选组件列表集合
    basicItem: {
      type: [Array,Boolean],
      default: true
    },
    //装饰组件是否要展示或待选组件列表集合
    decorateItem: {
      type: [Array,Boolean],
      default: true
    }, 
    //布局组件是否要展示或待选组件列表集合
    layoutItem: {
      type: [Array,Boolean],
      default: true
    },
    //应用组件是否要展示或待选组件列表集合
    applicationItem: {
      type: [Array,Boolean],
      default: true
    },
  },   
  computed: { 
    templateConfig() {
      if(this.template) return this.template.config 
      return {}
    }, 
    // 配置中的http配置
    httpConfig() {
      if(this.config && this.config.httpConfig ) {
        return this.config.httpConfig
      }
      return null
      
    }
  },
  watch: {
    httpConfig: {
      handler(newVal) { 
        window.nghttpConfig = newVal;
      },
      deep: true,
      immediate: false,
    } 
  },
  provide: function () {
    return {
     customC: this.customComponents ,
     configC: this.templateConfig,
     
     httpConfigC: this.httpConfig,
     ngConfig: this.config
    }
  },
  created() { 

    if(this.httpConfig) {
      window.nghttpConfig = this.httpConfig;
    }
  },
  methods: {
    handleSelectItem(record) {
      this.selectItem = record
    },
    // 返回编辑好的模板
    getModel() {
      const model = cloneDeep(this.template)

      return model 
    },
    // 初始化模板
    initModel(formTemplate) {
      //this.formTemplate = cloneDeep(formTemplate)
      const modelData = cloneDeep(formTemplate)

      this.importData(modelData)
    },
    // 从模板处导入json表单模板
    importData(formTemplate = {}) {
      //this.formTemplate = formTemplate
      this.template.list = formTemplate.list;

      for(let k in formTemplate.config) {
        this.template.config[k] = formTemplate.config[k]
      }

      //this.template.config = formTemplate.config;
    },
    useLocale(val) {
      use(val)
      this.i18nkey = getUUID()
      Bus.emit('i18nRefresh') 
    },
  }
}
</script>
<style>
.form-design {
  height: 100%;
  background: white;
}

.form-design .header {
  box-shadow: 1px 0px 6px 3px rgba(48, 65, 86, 0.35);
}

.form-design .form-main {
  padding: 0px;
  height: 100%;
  min-height: 500px;
}

.form-design .form-main .ng-main-container {
  height: 100%;
  min-height: 500px;
}

.form-design .item-panel {
  height: 100%;
  overflow-y: hidden;
  box-shadow: 1px 0px 6px 3px rgba(48, 65, 86, 0.35);
}

.form-design .center-panel {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.form-design .properties-panel {
  height: 100%;
  box-shadow: -3px 0 6px rgba(48, 65, 86, 0.35);
}


</style>
<style>


.togglelefts {
  width: 14px;
  height: 54px;
  border: solid 1px #dadada;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: #fff;
  position: absolute;
  top: 45%;
  margin-top: -27px;
  z-index: 1000;
  border-right:solid 1px #fff;
  cursor: pointer;
}
.togglelefts:before {
  content: "";
  position: absolute;
  top: 20px;
  left: 3px;
  width: 0;
  height: 0;
  border-right: 5px solid #0662ac;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
}
.togglelefts:after {
  content: "";
  position: absolute;
  top: 21px;
  left: 4px;
  width: 0;
  height: 0;
  border-bottom: 4px solid transparent;
  border-right: 4px solid #fff;
  border-top: 4px solid transparent;
}

.togglelefts:hover {
  background: #d9f1ff;
}
.togglelefts:hover:before {
  border-right: 5px solid #fff;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
}
.togglelefts:hover:after {
  border-bottom: 4px solid transparent;
  border-right: 4px solid #d9f1ff;
  border-top: 4px solid transparent;
}

.arrowR:before {
  content: "";
  position: absolute;
  top: 20px;
  left: 4px;
  width: 0;
  height: 0;
  border-left: 5px solid #0662ac;
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-right: none;
  cursor: pointer;
}
.arrowR:after {
  content: "";
  position: absolute;
  top: 21px;
  left: 4px;
  width: 0;
  height: 0;
  border-bottom: 4px solid transparent;
  border-left: 4px solid #fff;
  border-top: 4px solid transparent;
  border-right: none;
  cursor: pointer;
}
.arrowR:hover:before {
  border-left: 5px solid #fff;
  border-bottom: 5px solid transparent;
  border-right: none;
  border-top: 5px solid transparent;
  cursor: pointer;
}
.arrowR:hover:after {
  border-right: none;
  border-bottom: 4px solid transparent;
  border-left: 4px solid #005eaa;
  border-top: 4px solid transparent;
  cursor: pointer;
}  

</style>
<!-- 
<style lang="scss"> 

.form-design {
  height: 100%;
  background: white;
  .header {
    box-shadow: 1px 0px 6px 3px rgba(48, 65, 86, 0.35);
  }


  .form-main {
    padding: 0px;
    height: 100%;
    min-height: 500px;

    .ng-main-container {
      height: 100%;
      min-height: 500px;
    }
  }

  .item-panel { 
    /* background: #f1f4f5; */
    height: 100%;
    overflow-y: hidden;
    box-shadow: 1px 0px 6px 3px rgb(48 65 86 / 35%);
    
  }

  .center-panel { 
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .properties-panel {
    height: 100%;
    /* background: #f1f4f5; */
    box-shadow: -3px 0 6px rgb(48 65 86 / 35%);
  }
}

</style>
 -->