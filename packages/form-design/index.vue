<template>
  <el-container class="form-design">

      <el-header class="header" height="40px">
        <HeaderPanel :clear="clear" :preview="preview" :imp="imp" :exp="exp" :formTemplate="template" @importData="importData">
          <template #logo>
             <slot name="logo"></slot>
          </template>
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
                  <template #custom-properties >
                    <slot name="custom-properties" :selectItem="selectItem"></slot>
                  </template>
                   <template #form-extend-properties  >
                      <slot name="form-extend-properties" :data="template"></slot>
                  </template>
                   <template #extend-tab >
                      <slot name="extend-tab" :data="template"></slot>
                  </template>
              </PropertiesPanel> 
          </el-aside>  
        </el-container> 
      </el-main> 
  </el-container> 
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ng-form-design'
})
</script>

<script setup>
import { ref, computed, watch, provide, inject, onBeforeMount } from 'vue'
import HeaderPanel from './panel-header/index.vue'
import DragPanel from './panel-drag/index.vue'
import ContainerPanel from './panel-container/index.vue'
import PropertiesPanel from './panel-properties/index.vue'
import { useLocale } from '../locale/mixin.js'
import { cloneDeep, getUUID } from '../utils/index.js'
import { setDictCache, setComponentCache } from '../utils/cache.js'
import { use } from '../locale/index'
import Bus from '../utils/bus.js'

// Props
const props = defineProps({
  customComponents: {
    type: Array,
    default: () => []
  },
  // 按钮显示隐藏
  clear: {
    type: Boolean,
    default: true
  },
  preview: {
    type: Boolean,
    default: true
  },
  imp: {
    type: Boolean,
    default: true
  },
  exp: {
    type: Boolean,
    default: true
  },
  // 外部属性配置
  config: {
    type: Object
  },
  //基础组件是否要展示或待选组件列表集合
  basicItem: {
    type: [Array, Boolean],
    default: true
  },
  //装饰组件是否要展示或待选组件列表集合
  decorateItem: {
    type: [Array, Boolean],
    default: true
  },
  //布局组件是否要展示或待选组件列表集合
  layoutItem: {
    type: [Array, Boolean],
    default: true
  },
  //应用组件是否要展示或待选组件列表集合
  applicationItem: {
    type: [Array, Boolean],
    default: true
  }
})

// Injects
const $config = inject('$config', null)
const $ngofrm_components = inject('$ngofrm_components', [])

// 使用 useLocale composable，获取 locale 响应式变量
const { t, locale } = useLocale()

// Data
const arrow = ref(false)
const selectItem = ref({})

// i18nkey 用于强制刷新组件，当语言变化时更新它
const i18nkeySuffix = ref(getUUID())
const i18nkey = computed(() => locale.value + '_' + i18nkeySuffix.value)

// Watch locale 变化，更新 i18nkey 以触发组件刷新
watch(locale, () => {
  i18nkeySuffix.value = getUUID()
})
const template = ref({
  list: [],
  config: {
    labelPosition: "left",
    labelWidth: 100,
    size: 'default',
    outputHidden: true,
    hideRequiredMark: false,
    syncLabelRequired: true,
    labelSuffix: '',
    customStyle: ""
  }
})

// Computed
const templateConfig = computed(() => {
  if (template.value) return template.value.config
  return {}
})

// 配置中的http配置
const httpConfig = computed(() => {
  if (props.config && props.config.httpConfig) {
    return props.config.httpConfig
  }
  return null
})

const configDicts = computed(() => {
  if (props.config && props.config.dicts) {
    return props.config.dicts
  }
  return null
})

const components = computed(() => {
  if ($config && $config.$ngofrm_components && $config.$ngofrm_components.length > 0) {
    return $config.$ngofrm_components
  } else if ($ngofrm_components && $ngofrm_components.length > 0) {
    return $ngofrm_components
  } else if (props.customComponents && props.customComponents.length > 0) {
    return props.customComponents
  }
  return undefined
})

const ngConfig = computed(() => {
  const ngofrm_config = $config ? $config.$ngofrm_config || {} : {}
  // 优先判断内部
  if (props.config) {
    return { ...props.config, ...ngofrm_config }
  }
  return { ...ngofrm_config }
})

// Watch
watch(httpConfig, (newVal) => {
  window.nghttpConfig = newVal
}, { deep: true })

watch(components, (newVal) => {
  setComponentCache(newVal)
}, { deep: true })

watch(configDicts, (newVal) => {
  setDictCache(newVal)
}, { deep: true })

// Provide
provide('customC', components)
provide('configC', () => templateConfig.value)
provide('httpConfigC', httpConfig)
provide('ngConfig', ngConfig)
// 提供 i18nkey 给子组件用于语言切换时刷新
provide('i18nKey', i18nkey)

// Lifecycle
onBeforeMount(() => {
  console.log('this.$config', $config)
  console.log('$ngofrm_components', $ngofrm_components)
  if (httpConfig.value) {
    window.nghttpConfig = httpConfig.value
  }

  if (configDicts.value) {
    setDictCache(configDicts.value)
  }
  if (components.value) {
    setComponentCache(components.value)
  }
})

// Methods
const handleSelectItem = (record) => {
  selectItem.value = record
}

// 返回编辑好的模板
const getModel = () => {
  const model = cloneDeep(template.value)
  return model
}

// 初始化模板
const initModel = (formTemplate) => {
  const modelData = cloneDeep(formTemplate)
  importData(modelData)
}

// 从模板处导入json表单模板
const importData = (formTemplate = {}) => {
  template.value.list = formTemplate.list

  for (let k in formTemplate.config) {
    template.value.config[k] = formTemplate.config[k]
  }
}

const useLocaleMethod = (val) => {
  use(val)
  // i18nkey 会通过 watch 自动更新，不需要手动赋值
  Bus.emit('i18nRefresh')
}

// 暴露给外部的方法
defineExpose({
  getModel,
  initModel,
  importData,
  useLocale: useLocaleMethod
})
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
  height: auto;
  overflow-y: auto;
  min-height: 0px;
  overflow-x: hidden;
}

.form-design .properties-panel {
  height: auto;
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