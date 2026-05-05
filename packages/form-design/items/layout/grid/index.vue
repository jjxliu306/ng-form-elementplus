<template>
<el-row class="ng-layout-row" :gutter="record.options.gutter" :key="'grid-' + record.key + localeKey">
  <el-col
    class="ng-layout-col"
    v-for="(item, index) in record.columns"
    :key="index"
    :span="item.span || 0"
    >
    <draggable
      v-if="isDragPanel"
      tag="div"
      class="draggable-box grid-box"
      v-bind="{
        group: 'form-draggable',
        ghostClass: 'moving',
        animation: 180,
        handle: '.drag-move'
      }" 
      item-key="key"
 
      :list="item.list"
       :model-value="null"
      @add="dragEnd($event, item.list)" 
      :move="()=>{}"
      > 
        <template #item="{element}">
           
          <ng-form-node 
            :key="element.key"
            class="drag-move"
            :selectItem="selectItem"
            :record="element" 
            @handleSelectItem="handleSelectItem"
            @handleCopy="handleCopy(element , item.list )"
            @handleDetele="handleDetele(element , item.list)"
          />  
        
        </template> 
    </draggable>
    <template v-else>
      <ng-form-node 
        v-for="node in item.list"
        :is-drag="false"
        :key="node.key"
        :disabled="disabled"
        :preview="preview"
        :prop-prepend="propPrepend"
        :models.sync="models"   
        :record="node" 
      />
    </template>
  </el-col>
</el-row>
</template>
<script setup>
import { inject } from 'vue'
import { useFormItem } from '../../mixin.js'
import { useLocale } from '../../../../locale/mixin.js'
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
  handleSelectItem
} = useFormItem(props, props.models, emit)

// Methods
const dragEnd = (evt, columns) => {
  // 拖拽结束,自动选择拖拽的控件项
  const nitem = cloneDeepAndFormat(columns[evt.newIndex], evt)

  columns[evt.newIndex] = nitem
  handleSelectItem(nitem)
}

const handleCopy = (item, list) => {
  const nitem = cloneDeepAndFormat(item)
  const key = item.type + "_" + new Date().getTime()
  nitem.key = key
  nitem.model = key

  // 找到index 插入
  const oindex = list.findIndex(t => t.key == item.key)
  console.log('copy', item)
  if (oindex >= 0) {
    // insert
    list.splice(oindex + 1, 0, nitem)
  }
}

const handleDetele = (item, list) => {
  const oindex = list.findIndex(t => t.key == item.key)
  if (oindex >= 0) {
    list.splice(oindex, 1)
  }
}
</script>
<style>
.ng-layout-row { 
  margin: 0px !important;
  border-radius: 4px;
  border: 1px dashed #ccc;
}

.ng-layout-row .ng-layout-col {
  min-height: 70px;
}

.ng-layout-row .ng-layout-col .draggable-box {
  min-height: 65px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  padding-left: 2px;
  padding-right: 2px;
}

.form-panel .grid-box {

}

</style>
<!-- <style lang="scss">
.ng-layout-row {
  z-index: 0;
  margin: 0px!important;
  border-radius: 4px;
  border: 1px dashed #ccc;

  .ng-layout-col {
    min-height: 70px;

    .draggable-box {
      min-height: 65px;
      border-radius: 4px;
      border: 1px dashed #ccc;
      box-sizing: border-box;
      padding-left: 2px;
      padding-right: 2px;
    }
  }
} 
 
</style> -->