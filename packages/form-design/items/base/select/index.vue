<template>
  <div v-if="!preview" :style="`width:${record.width || '100%'}`" :key="'select-' + record.key + localeKey">  
     <el-select 
      v-if="record.options.multiple"
        v-model="models[record.model]"
        :value-key="itemValue"
        :style="`width:${record.width || '100%'}`"
        :loading="loading"
        :remote="showRemote"
        :remote-method="remoteFilterMethod"
        :placeholder="getLabel(record.options.placeholder)"
        :filterable="record.options.showSearch"
        :disabled="recordDisabled"
        :clearable="record.options.clearable"
        multiple
        remote-show-suffix
        @change="handleChange($event)" 
        @clear="clearChange" 
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <template  v-for="(item, index) in selectList">
          <el-option 
            :key="index"
            :label="item[itemLabel]"
            :value="item[itemValue]"
            v-if="itemVisible(item)"
            :disabled="itemDisabled(item)"
            >
          </el-option>
        </template>
      </el-select>
      <el-select
        v-else 
         :loading="loading"
        v-model="models[record.model]"
        :style="`width:${record.width}`"
        :value-key="itemValue" 
        :remote="showRemote"
        remote-show-suffix
        :remote-method="remoteFilterMethod"
        :placeholder="getLabel(record.options.placeholder)"
        :filterable="record.options.showSearch"
        :disabled="recordDisabled"
        :clearable="record.options.clearable" 
        @change="handleChange($event)" 
        @clear="clearChange" 
        @focus="handleFocus"
        @blur="handleBlur"
      > 
        <template v-for="(item, index) in selectList">
          <el-option
            :key="index"
            :label="item[itemLabel]"
            :value="item[itemValue]"
            v-if="itemVisible(item)"
            :disabled="itemDisabled(item)"
            >
          </el-option>
        </template> 
      </el-select>  
  </div>
  <span v-else :style="`width:${record.width}`">
    {{models[record.model+'_label']}}  
  </span>
</template>
<script setup>
import { ref, computed, onBeforeMount, inject } from 'vue'
import { useDataSource } from './datasource-mixin.js'
import { useLocale } from '../../../../locale/mixin.js'

// Props
const props = defineProps({
  record: {
    type: Object,
    required: true
  },
  models: {
    type: Object,
    default: () => { return {} }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  preview: {
    type: Boolean,
    default: false
  },
  isDragPanel: {
    type: Boolean,
    default: false
  },
  selectItem: {
    type: Object
  },
  propPrepend: {
    type: String
  }
})

// Emits
const emit = defineEmits(['handleSelectItem', 'handleBlur', 'handleFocus'])

// Injects
const configInject = inject('configC', null)
const ngConfig = inject('$ngofrm_config', {})

// 使用 useLocale 获取 locale key 用于响应式语言切换
const { locale } = useLocale()
const localeKey = locale

// 使用 useDataSource composable
const {
  recordDisabled,
  checkValues,
  updateArrayDefaultValue,
  updateSimpleDefaultValue,
  initDynamicValue,
  handleFocus,
  handleBlur,
  linkageData,
  linkageDataHandle,
  handleChange,
  itemVisible,
  itemDisabled,
  remoteFilter,
  getRemoteData,
  localFilter
} = useDataSource(props, props.models, emit)

// Data
const loading = ref(false)
const data = ref({})

// Computed
const itemProp = computed(() => ({
  children: 'children',
  value: 'value',
  label: 'label',
  multiple: props.record.options.multiple
}))

const itemValue = computed(() => {
  if (!itemProp.value.value) return 'value'
  return itemProp.value.value
})

const itemLabel = computed(() => {
  if (!itemProp.value.label) return 'label'
  return itemProp.value.label
})

const selectList = computed(() => {
  if (props.record.options.dynamic == 1 && props.record.options.remoteFunc) {
    return checkValues.value
  } else if (props.record.options.dynamic == 2 && props.record.options.dictType) {
    return checkValues.value
  } else {
    return props.record.options.options
  }
})

const showRemote = computed(() => {
  if (props.record.options.onlineSearch && props.record.options.showSearch && props.record.options.onlineSearchQuery) {
    return true
  } else {
    return false
  }
})

const getLabel = (v) => {
  if (typeof v === 'function') {
    return v()
  }
  return v
}

// Methods
const remoteFilterMethod = (queryValue) => {
  if (queryValue) {
    if (!props.record || !props.record.options) return
    const queryParam = props.record.options.onlineSearchQuery

    remoteFilter.value[queryParam] = queryValue
    getRemoteData()
  }
}

// select 清除后回调
const clearChange = () => {
  // 2021-05-08 lyf 判断是否有清除后回调
  if (!props.record.options.clearCb) {
    return
  }

  const cbScript = props.record.options.clearCb
  const func = '{' + cbScript + '}'
  const Fn = new Function('$', 'data', func)
  Fn(props.models, data.value)
}

// Lifecycle
onBeforeMount(() => {
  if (!props.record.options) return

  // 初始化一个绑定空值
  if (props.record.options.multiple) {
    updateArrayDefaultValue()
  } else {
    updateSimpleDefaultValue()
  }

  // 判断如果是远程方法的话 远程请求数据
  initDynamicValue()

  // 判断是否有联动关联需要处理
  if (linkageData.value) {
    linkageDataHandle(false)
  }

  // 判断如果已经有了值 但没有label 则尝试回填label
  const value = props.models[props.record.model]
  if (value && value.length > 0) {
    handleChange(value)
  }
})
</script>