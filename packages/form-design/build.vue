<template> 
<div class="form-build-panel" >  
	  
    <el-form 
    	v-if="formTemplate && formTemplate.config && formTemplate.list"
      	:label-width="formTemplate.config.labelWidth + 'px'" 
      	class="ng-form-build"
      	:label-position="formTemplate.config.labelPosition"
      	:hide-required-asterisk="formTemplate.config.hideRequiredMark" 
      	:label-suffix="formTemplate.config.labelSuffix"
      	ref="form" 
      	:style="formTemplate.config.customStyle" 
      	:size="formTemplate.config.size"
      	:model="models" 
      	:disabled="disabled"
      	:id="randomId"
    >
	    <el-row :gutter="20" class="row"> 
	    	<Node  
		        v-for="record in formTemplate.list"
		        :key="record.key" 
		        :record="record"
		        :models="models"
		        :disabled="disabled"
		        :preview="preview || renderPreview"
		        :isDrag="false"  
		        >  
		    </Node>  
	    </el-row> 
	</el-form> 
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ng-form-build'
})
</script>

<script setup>
import { ref, computed, watch, provide, inject, onBeforeMount } from 'vue'
import Node from './panel-container/node.vue'
import { setDictCache, setComponentCache } from '../utils/cache.js'
import { cloneDeep } from '../utils/index.js'

// Props
const props = defineProps({
  formTemplate: {
    type: Object,
    required: true
  },
  // 外部属性配置
  config: {
    type: Object
  },
  models: {
    type: Object,
    required: false,
    default: () => { return {} }
  },
  // 是否查看模式
  preview: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 废弃 只是为了兼容之前的版本
  renderPreview: {
    type: Boolean,
    default: false
  },
  customComponents: {
    type: Array,
    default: () => []
  }
})

// Injects
const $config = inject('$config', null)
const $ngofrm_components = inject('$ngofrm_components', [])

// Data
const randomId = ref(new Date().getTime() + '111')
const form = ref(null)

// Computed
const templateConfig = computed(() => {
  if (props.formTemplate) return props.formTemplate.config
  return {}
})

// 配置的数据字典
const configDicts = computed(() => {
  if (props.config && props.config.dicts) {
    return props.config.dicts
  }
  return null
})
// 配置中的http配置
const httpConfig = computed(() => {
  if (props.config && props.config.httpConfig) {
    return props.config.httpConfig
  }
  return null
})
// 自定义组件
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

// Lifecycle
onBeforeMount(() => {
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
const reset = () => {
  form.value && form.value.resetFields()
}

const validate = () => {
  return new Promise((resolve, reject) => {
    if (form.value) {
      form.value.validate((valid, values) => {
        resolve(valid, values)
      })
    } else {
      reject()
    }
  })
}

const getData = (async = true) => {
  const data = cloneDeep(props.models)

  clearHiddenValue(data)
  if (!async) {
    return new Promise((resolve, reject) => {
      form.value && form.value.validate((valid, values) => {
        if (!valid) {
          reject('验证失败')
        }
        resolve(data)
      })
    })
  }

  return data
}

// 2021-03-12 清理没有显示的组件的数据
const clearHiddenValue = (data) => {
  // 根据组件ID 是否隐藏为准
  // 根据 formTemplate.config.outputHidden 来判断是否要输出隐藏
  if (!props.formTemplate.config || !props.formTemplate.config.outputHidden) {
    const formdesign = document.getElementById(randomId.value)

    // 循环当前数据 非P 开头的统一不深入第二层
    for (let key in data) {
      if (key.indexOf('_label') > 0) continue
      //  判断key的id是否还在
      // 2024-05-18 lyf 目前采用隐藏的手段，修改之前判断在不在的方法为判断是否隐藏
      const key_div = formdesign.querySelector('#' + key)
      if (!key_div || (key_div.style && key_div.style.display == 'none')) {
        // 删除
        delete data[key]
        delete data[key + '_label']
      }
    }
  }
}

// 暴露给外部的方法
defineExpose({
  reset,
  validate,
  getData
})
</script>
<style>
.form-build-panel {
  height: 100%;
}

.form-build-panel .row {
  height: 100%;
  overflow: auto;
}

.form-build-panel .ng-form-build {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
<!-- 
<style lang="scss">
.form-build-panel {
	height: 100%; 

	.row {
		height: 100%;
		overflow: auto;
	}

	.ng-form-build {
		height: 100%;
		overflow-y: auto;
    	overflow-x: hidden;
  
	}

	
}
</style> -->