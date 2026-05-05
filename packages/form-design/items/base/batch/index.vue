<template>
<div
  :class="[
    'ng-base-batch',
    record.options.customClass ? record.options.customClass : ''
  ]"
  :style="record.options.customStyle"
  :key="'batch-' + record.key + localeKey"
  >
  <template v-if="isDragPanel">
    <el-row :gutter="20">
      <draggable
        tag="div"
        class="draggable-box"
        v-bind="{
          group: 'form-draggable' ,
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move'
        }"
        item-key="key"
 
        :list="record.list"
        @add="dragEnd($event, record.list)"  
        :move="()=>{}"
        >
        <template #item="{element}">
          <ng-form-node 
            :key="element.key"
            class="drag-move"
            :selectItem="selectItem"
            :record="element" 
            @handleSelectItem="handleSelectItem"
            :prop-prepend="propPrepend"
            @handleCopy="handleCopy(element)"
            @handleDetele="handleDetele(element)"
            /> 
        </template> 
      </draggable> 
    </el-row>    
  </template> 
  <template v-else>  
    <TableBuild :record="record" :models="models" :prop-prepend="propPrepend" :preview="preview"/>

  </template> 
</div>
</template>
<script setup>
import { onBeforeMount, inject } from 'vue'
import { useFormItem } from '../../mixin.js'
import { useLocale } from '../../../../locale/mixin.js'
import TableBuild from './build/index.vue'
import draggable from 'vuedraggable'

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

// 使用 useFormItem composable
const {
  cloneDeepAndFormat,
  updateArrayDefaultValue,
  handleSelectItem
} = useFormItem(props, props.models, emit)

// Methods
const dragEnd = (evt, list) => {
  // 拖拽结束,自动选择拖拽的控件项
  const clone = cloneDeepAndFormat(list[evt.newIndex])
  list[evt.newIndex] = clone
  handleSelectItem(clone)
}

const handleCopy = (item) => {
  const nitem = cloneDeepAndFormat(item)
  const key = item.type + "_" + new Date().getTime()
  nitem.key = key
  nitem.model = key

  // 找到index 插入
  const oindex = props.record.list.findIndex(t => t.key == item.key)

  if (oindex >= 0) {
    // insert
    props.record.list.splice(oindex + 1, 0, nitem)
  }
}

const handleDetele = (item) => {
  const oindex = props.record.list.findIndex(t => t.key == item.key)
  if (oindex >= 0) {
    props.record.list.splice(oindex, 1)
  }
}

// Lifecycle
onBeforeMount(() => {
  // 赋予一个空的默认值
  updateArrayDefaultValue()
})
</script>
<!-- <style lang="scss">
.ng-base-batch {
  z-index: 0;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  width: 100%;

  .draggable-box {
    min-height: 200px;
  }
} 
</style> -->
<style>
.ng-base-batch {
  z-index: 0;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  width: 100%;
}

.ng-base-batch .draggable-box {
  min-height: 200px;
}

</style>