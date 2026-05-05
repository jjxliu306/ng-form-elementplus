<!--
传入record数据，通过判断record.type，来渲染对应的组件
  -->
<template>

  <component
        :record="record"
        :style="{
          margin: record.margin && record.margin.length > 0 ? record.margin.join('px ') + 'px' : '0px',
          borderRadius: (record.itemBorderRadius ? record.itemBorderRadius : 0) + 'px',
          backgroundColor: record.backgroundColor ? record.backgroundColor  : '',

        }"
        :disabled="disabled"
        :preview="preview"
        :isDragPanel="isDragPanel"
        :selectItem="selectItem"
        :models="models"
        :prop-prepend="propPrepend"
        @handleSelectItem="handleSelectItem"
        @handleFocus="handleFocus"
        @handleBlur="handleBlur"
        :is="customComponent">
  </component>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ng-form-item-node"
})
</script>

<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
import ItemList from './index.js'
import { dynamicFun, dynamicVoidFun } from '../../utils/index.js'
import { getComponentCache } from '../../utils/cache.js'

// Props
const props = defineProps({
  // 表单数组
  record: {
    type: Object,
    required: true
  },
  // form-item 宽度配置
  models: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否预览结果表单
  preview: {
    type: Boolean,
    default: false
  },
  // 是否拖拽面板引用
  isDragPanel: {
    type: Boolean,
    default: false
  },
  selectItem: {
    type: Object
  },
  propPrepend: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['handleSelectItem', 'handleFocus', 'handleBlur'])

// Injects
const configInject = inject('configC', null)

// Data
const items = ItemList
const copyLstenModel = ref(null)

// Computed
const customComponents = computed(() => {
  const cms = getComponentCache()
  return cms
})

const config = computed(() => {
  if (configInject && configInject != null && configInject != undefined) {
    return configInject() || {}
  }
  return {}
})

const customComponent = computed(() => {
  // 判断是否自定义组件
  if (customComponents.value && customComponents.value.length > 0) {
    const cs = customComponents.value.filter(t => t.type == props.record.type)

    if (cs && cs.length > 0) {
      return cs[0].component
    }
  }

  const selectItemType = props.record.type
  // 将数组映射成json
  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const itemList = items[i]

      if (itemList.list && itemList.list.length > 0) {
        const fs = itemList.list.filter(t => t.type == selectItemType)
        if (fs && fs.length > 0) {
          return fs[0].component
        }
      }
    }
  }

  return null
})

// 数据监听中要监听的数据，先通过计算属性计算 然后通过watch监听变化
const listenModelValue = computed(() => {
  if (!props.isDragPanel && props.record?.options?.listenModel && props.record?.options?.listenModelData) {
    const lmodels = props.record?.options?.listenModelData?.split(',') || []
    let vs = []
    for (let i = 0; i < lmodels.length; i++) {
      // 判断类型 vtype=1 本地搜索 vtype=2 远程过滤
      const ld = lmodels[i]
      if (ld && ld.trim()) {
        // local script
        vs.push(props.models[ld.trim()])
      }
    }
    return vs.join(',')
  }
  return null
})

// Watch
watch(listenModelValue, (val, oldVal) => {
  if (props.isDragPanel
    || (!val && !oldVal)
    || !props.models
    || !props.record?.options?.listenModel
    || !props.record?.options?.listenModelData
    || !props.record?.options?.listenModelScript)
    return

  //2023-09-10 lyf 确保当前组件的model在models中已经被挂载在执行
  if (!Object.prototype.hasOwnProperty.call(props.models, props.record.model)) {
    return
  }

  // 解决 初始化加载数据 被计算数据监听造成数据变化
  dynamicVoidFun(props.record.options.listenModelScript, props.models)
}, { immediate: true })

// Methods
const handleSelectItem = (item) => {
  emit('handleSelectItem', item)
}

const handleFocus = (e) => {
  // 判断是否有监听
  const focusEventScript = props.record.options.focusEvent

  if (!focusEventScript) return

  dynamicVoidFun(focusEventScript, props.models)
}

const handleBlur = (e) => {
  // 判断是否有监听
  const blurEventScript = props.record.options.blurEvent

  if (!blurEventScript) return

  dynamicVoidFun(blurEventScript, props.models)
}
</script>
