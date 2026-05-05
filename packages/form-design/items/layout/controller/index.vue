<template>
  <div
        :class="[
          'ng-layout-controller drag-box',
          record.options.customClass ? record.options.customClass : ''
        ]"
        :style="record.options.customStyle"
        :key="'controller-' + record.key + localeKey"
      >

        <!-- <div class="batch-label">弹性容器</div>  -->
        <template v-if="isDragPanel">
          <el-row :gutter="20" class="controller-row dragpanel"
            :class="{'controller-bordered': record.options && record.options.bordered}">
            <draggable
              tag="div"
              class="draggable-box"
              v-bind="{
                group:  'form-draggable'  ,
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move'
              }"
              item-key="key"

              :list="record.list"
               :model-value="null"
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
                  @handleCopy="handleCopy(element)"
                  @handleDetele="handleDetele(element)"
                />
              </template>
            </draggable>
          </el-row>
        </template>
        <div v-else>
          <div v-for="(mdata, idx) in models[record.model]"  :key="idx"
            :class="[
              'table-layout','form-table',
              record.options.customClass ? record.options.customClass : '' ,
              record.options.bright ? 'bright' : '' ,
              record.options.small ? 'small' : '' ,
              record.options.bordered ? 'controller-bordered' : ''
            ]"
            :style="record.options.customStyle"
             @contextmenu.prevent="handleShowRightMenu($event , idx) "
           >
            <el-row :gutter="20" class="controller-row dragpanel"
            :class="{'controller-bordered': record.options && record.options.bordered}">

                <ng-form-node
                  v-for="(item, index) in record.list"
                  :key="index"
                  ref="nestedComponents"
                  :is-drag="false"
                  :disabled="disabled"
                  :previewpreview="preview"
                  :models.sync="mdata"
                  :record="item"
                  :prop-prepend="propPrepend + record.model + '.' + idx + '.'"
                />
            </el-row>
          </div>
           <!-- 右键里的删除和复制 下方的新增 -->
          <el-button v-if="!preview && record.options.add" type="dashed" size="small" :disabled="disabled" @click="addControlData">
            <!-- <i class="el-icon-circle-plus-outline" /> -->
            <el-icon  ><CirclePlusOutline /></el-icon>{{t('ngform.item.add')}}
          </el-button>
          <div
            v-show="!preview && showRightMenu"
            :style="{ 'top': menuTop + 'px', 'left': menuLeft + 'px' }"
            class="right-menu"
            id="rightMenu"
          >
            <ul>
             <li v-if="record.options.copy" @click="handleCopyData">
              <!--   <i class="el-icon-document" />复制 -->
                 <el-icon  ><Document /></el-icon>{{t('ngform.item.copy')}}
              </li>
              <hr v-if="record.options.copy && record.options.remove">
              <li v-if="record.options.remove" @click="handleRemoveData">
               <!--  <i class="el-icon-delete" /> -->
                 <el-icon  ><Delete /></el-icon>{{t('ngform.item.delete')}}
              </li>
            </ul>
          </div>
        </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, nextTick, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { useFormItem } from '../../mixin.js'
import { useLocale } from '../../../../locale/mixin.js'
import { cloneDeep } from '../../../../utils/index.js'
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

// 使用 composables
const {
  cloneDeepAndFormat,
  handleSelectItem
} = useFormItem(props, props.models, emit)

const { t, locale } = useLocale()
const localeKey = locale

// Data
const showRightMenu = ref(false)
const selectControlIndex = ref(undefined)
const menuTop = ref(0)
const menuLeft = ref(0)

// Lifecycle
onBeforeMount(() => {
  if (props.isDragPanel) {
    if (props.record && (props.record.list == null || props.record.list == undefined)) {
      props.record['list'] = []
    }
  } else {
    if (!props.models) return
    if (!props.models[props.record.model]) {
      let firstData = {}
      props.record.list.forEach(t => {
        firstData[t.model] = ''
      })
      props.models[props.record.model] = [firstData]
    }
  }
})

// Methods
const dragEnd = (evt, list) => {
  // 拖拽结束,自动选择拖拽的控件项
  const nitem = cloneDeepAndFormat(list[evt.newIndex], evt)

  list[evt.newIndex] = nitem
  handleSelectItem(nitem)
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

const addControlData = () => {
  // 将当前数据复制一份 压入
  const data_ = {}

  props.record.list.forEach(t => {
    data_[t.model] = ''
  })
  props.models[props.record.model].push(data_)
}

const handleShowRightMenu = (e, idx) => {
  // 显示右键菜单
  e.stopPropagation()

  // 判断是否有复制和删除 如果没有直接返回
  if (!props.record.options.remove && !props.record.options.copy) {
    showRightMenu.value = false
    selectControlIndex.value = undefined
    return false
  }

  if (showRightMenu.value) {
    showRightMenu.value = false
  }

  // 计算rightMenu得高度和宽度 和当前屏幕对比 来决定菜单出现得起始位置
  const height = 210
  const width = 280

  // 获取屏幕高度和宽度 比对
  const bodyHeight = document.body.clientHeight
  const bodyWidth = document.body.clientWidth

  // 定位
  if (e.clientY + height > bodyHeight) {
    menuTop.value = e.clientY - height
  } else {
    menuTop.value = e.clientY
  }

  if (e.clientX + width > bodyWidth) {
    menuLeft.value = e.clientX - width
  } else {
    menuLeft.value = e.clientX + 20
  }

  selectControlIndex.value = idx

  nextTick(() => {
    showRightMenu.value = true
  })

  return false
}

const handleCopyData = () => {
  if (selectControlIndex.value == undefined || selectControlIndex.value < 0) {
    showRightMenu.value = false
    return
  }

  if (!props.models[props.record.model] || props.models[props.record.model].length < selectControlIndex.value) {
    showRightMenu.value = false
    return
  }

  const cloneData = cloneDeep(props.models[props.record.model][selectControlIndex.value])

  props.models[props.record.model].push(cloneData)
  showRightMenu.value = false
}

const handleRemoveData = () => {
  if (selectControlIndex.value == undefined || selectControlIndex.value < 0) {
    return
  }

  if (!props.models[props.record.model] || props.models[props.record.model].length < selectControlIndex.value) {
    showRightMenu.value = false
    return
  }

  if (props.models[props.record.model].length == 1) {
    ElMessage.error(props.record.label + '内仅存的一条数据不能删除')
    showRightMenu.value = false
    return
  }

  props.models[props.record.model].splice(selectControlIndex.value, 1)

  showRightMenu.value = false
}
</script>

<style>
.ng-layout-controller {
  z-index: 0;
}

.ng-layout-controller .controller-row {
  margin: 0px !important;
}

.ng-layout-controller .dragpanel {
  min-height: 300px;
  margin: 0px;
}

.ng-layout-controller .draggable-box, .ng-layout-controller .list-main {
  min-height: 300px;
}

.controller-bordered {
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  color: #606266;
}

</style>
