<template>
<div class="table-box" @click.stop="handleSelectItem(record)">
  <table
    :class="['table-layout','form-table',
      record.options.customClass ? record.options.customClass : '' ,
      record.options.bright ? 'bright' : '' ,
      record.options.small ? 'small' : '' ,
      record.options.bordered ? 'bordered' : ''
    ]"
    :style="record.options.customStyle"
    >
    <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex" >
      <td :class="['table-td', tdItem.class]"
        :style="tdItem.style"
        v-for="(tdItem, tdIndex) in trItem.tds"
        :key="tdIndex"
        :colspan="tdItem.colspan"
        :rowspan="tdItem.rowspan"
        @contextmenu.prevent="showRightMenuHandle($event,   trIndex, tdIndex , tdItem.colspan > 1 || tdItem.rowspan > 1)"
        >
        <draggable
          tag="div"
          class="draggable-box td-draggable"
          :style="{'min-height' : (tdItem.rowspan > 1 ? tdItem.rowspan * 65 : 65) + 'px'}"
          v-bind="{
            group: 'form-draggable',
            ghostClass: 'moving',
            animation: 180,
            handle: '.drag-move'
          }"
          :list="tdItem.list"
          :model-value="null"
          item-key="key"
          @add="dragEnd($event, tdItem.list)"
          :move="()=>{}"
          >
          <template #item="{element}">
            <el-row class="td-row" :key="element.key">
              <ng-form-node
                class="drag-move"
                :selectItem="selectItem"
                :record="element"
                @handleSelectItem="handleSelectItem"
                @handleCopy="handleCopy(element , tdItem)"
                @handleDetele="handleDetele(element , tdItem)"
                />
            </el-row>
          </template>
        </draggable>
      </td>
    </tr>
  </table>

  <div v-show="showRightMenu"
    :style="{ 'top': menuTop + 'px', 'left': menuLeft + 'px' }"
    class="right-menu"
    id="table-design-rightmenu"
    >
    <ul>
      <li @click="handleSettingStyle" ><i class="el-icon-magic-stick" />
        {{t('ngform.item.table.style')}}
      </li>
      <hr>
      <template v-if="isMergeCol">
        <li @click="handleDropMerge" >
          <el-icon  ><Delete /></el-icon>{{t('ngform.item.table.unmerge')}}
        </li><hr>
      </template>
      <li @click="handleDownMerge">
         <el-icon  ><Bottom /></el-icon>{{t('ngform.item.table.merge_down')}}
      </li>
      <li @click="handleRightMerge">
         <el-icon  ><Right /></el-icon>{{t('ngform.item.table.merge_right')}}
      </li>
      <li @click="handleAddCol">
         <el-icon  ><ZoomIn /></el-icon>{{t('ngform.item.table.add_col')}}
      </li>
      <li @click="handleAddRow">
         <el-icon  ><ZoomIn /></el-icon>{{t('ngform.item.table.add_row')}}
      </li>
      <hr>
      <li @click="handleRemoveRow">
        <el-icon  ><ZoomOut /></el-icon>{{t('ngform.item.table.delete_row')}}
      </li>
      <li @click="handleRemoveCol">
        <el-icon  ><ZoomOut /></el-icon>{{t('ngform.item.table.delete_col')}}
      </li>
    </ul>
  </div>

  <el-dialog
    :title="t('ngform.item.table.cell_style_config')"
    v-model="styleVisible"
    style="top:20px;"
    :append-to-body="true"
    >
    <el-form size="small" :model="tdStyle" label-width="80px">
      <el-form-item  label="class" >
        <el-input v-model="tdStyle.class" :placeholder="t('ngform.item.table.class_placeholder')"/>
      </el-form-item>
      <el-form-item  label="style" >
        <el-input type="textarea" :rows="3" v-model="tdStyle.style" :placeholder="t('ngform.item.table.css_placeholder')"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="styleVisible = false">{{t('ngform.item.table.cancel')}}</el-button>
        <el-button type="primary" @click="settingStyle">{{t('ngform.item.table.ok')}}</el-button>
      </span>
    </template>

  </el-dialog>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'table-layout-design'
})
</script>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { cloneDeep } from '../../../../utils/index.js'
import { useFormItem } from '../../mixin.js'
import { useLocale } from '../../../../locale/mixin.js'
import draggable from "vuedraggable"
import { Delete, Bottom, Right, ZoomIn, ZoomOut } from '@element-plus/icons-vue'

// 使用 composable
const { t } = useLocale()

// Props
const props = defineProps({
  record: {
    type: Object,
    required: true
  },
  selectItem: {
    type: Object
  }
})

// Emits
const emit = defineEmits(['handleSelectItem'])

// Data
const showRightMenu = ref(false)
const isMergeCol = ref(false)
const menuTop = ref(0)
const menuLeft = ref(0)
const trIndex = ref(0)
const tdIndex = ref(0)
const styleVisible = ref(false)
const tdStyle = ref({
  style: '',
  class: ''
})

// 获取当前实例用于访问 $message
const instance = getCurrentInstance()

// Lifecycle
onMounted(() => {
  if (props.record && (props.record.trs == null || props.record.trs == undefined)) {
    props.record['trs'] = [
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      },
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      }
    ]
  }

  // 添加监听取消右键菜单
  document.addEventListener("click", handleRemoveRightMenu, true)
  document.addEventListener("contextmenu", handleRemoveRightMenu, true)
})

onUnmounted(() => {
  // 移除监听
  document.removeEventListener("click", handleRemoveRightMenu, true)
  document.removeEventListener("contextmenu", handleRemoveRightMenu, true)
})

// Methods
const dragEnd = (evt, list) => {
  // 拖拽结束,自动选择拖拽的控件项
  const nitem = cloneDeep(list[evt.newIndex])
  list[evt.newIndex] = nitem
  handleSelectItem(nitem)
}

const handleCopy = (item, parent) => {
  const nitem = cloneDeep(item)
  const key = item.type + "_" + new Date().getTime()
  nitem.key = key
  nitem.model = key

  // 找到index 插入
  const oindex = parent.list.findIndex(t => t.key == item.key)

  if (oindex >= 0) {
    // insert
    parent.list.splice(oindex + 1 , 0, nitem)
  }
}

const handleDetele = (item, parent) => {
  const oindex = parent.list.findIndex(t => t.key == item.key)
  if (oindex >= 0) {
    parent.list.splice(oindex , 1)
  }
}

const handleSelectItem = (item) => {
  emit('handleSelectItem', item)
}

const handleDropMerge = () => {
  const td = props.record.trs[trIndex.value].tds[tdIndex.value]

  const colspan = td.colspan
  const rowspan = td.rowspan

  if (td && (colspan > 1 || rowspan > 1)) {
    props.record.trs[trIndex.value].tds[tdIndex.value].colspan = 1
    props.record.trs[trIndex.value].tds[tdIndex.value].rowspan = 1

    // 开始拆解
    let cols = []
    if (colspan > 1) {
      for (let i = 0 ; i < colspan - 1 ; i++) {
        cols.push({colspan:1 , rowspan:1,list:[]})
      }

      props.record.trs[trIndex.value].tds.splice(tdIndex.value + 1, 0 ,...cols )
    }
    if (rowspan > 1) {
      //cols + 1
      cols.push({colspan:1 , rowspan:1,list:[]})

      for (let j = trIndex.value + 1 ; j < trIndex.value + rowspan ; j++) {
        props.record.trs[j].tds.splice(tdIndex.value + 1, 0 ,...cols )
      }
    }
  }
}

const handleDownMerge = () => {
  // 向下合并
  if (
    props.record.trs.length -
      props.record.trs[trIndex.value].tds[tdIndex.value]
        .rowspan <=
    trIndex.value
  ) {
    instance?.appContext.config.globalProperties.$message?.error(t('ngform.item.table.no_bottom_merge'))
    return false
  }

  // 计算rowspan超过自身的td
  let rows = 0
  props.record.trs[trIndex.value].tds.forEach(
    (element, index) => {
      if (index >= tdIndex.value) {
        return false
      }
      if (
        element.rowspan >
        props.record.trs[trIndex.value].tds[tdIndex.value]
          .rowspan
      ) {
        rows += 1
      }
    }
  )

  if (
    props.record.trs[trIndex.value].tds[tdIndex.value]
      .colspan !==
    props.record.trs[trIndex.value + 1].tds[tdIndex.value - rows]
      .colspan
  ) {
    instance?.appContext.config.globalProperties.$message?.error(t('ngform.item.table.no_bottom_merge'))
    return false
  }

  // 获取当前得rowspan
  let rowspan =  props.record.trs[trIndex.value].tds[ tdIndex.value ].rowspan

  // 获取当前要合并得row
  const mergeRowIndex =  trIndex.value + rowspan

  // 获取带合并得行
  const mergeRow =  props.record.trs[mergeRowIndex]
  const mergeCol = mergeRow.tds[ tdIndex.value ]

  props.record.trs[trIndex.value].tds[ tdIndex.value ].rowspan = rowspan +  mergeCol.rowspan

  // 在rowspan行进行td得裁剪
  props.record.trs[
    trIndex.value + rowspan
  ].tds = props.record.trs[trIndex.value + rowspan].tds.filter(
    (item, index) => index != tdIndex.value
  )
}

const handleRightMerge = () => {
  // 向右合并
  const sumCols = props.record.trs[trIndex.value].tds
    .map(item => item.colspan)
    .reduce(function(partial, value) {
      return partial + value
    })

  if (
    sumCols -
      props.record.trs[trIndex.value].tds[tdIndex.value]
        .colspan <=
    tdIndex.value
  ) {
    instance?.appContext.config.globalProperties.$message?.error(t('ngform.item.table.no_right_merge'))
    return false
  }

  if (
    props.record.trs[trIndex.value].tds[tdIndex.value]
      .rowspan !==
    props.record.trs[trIndex.value].tds[tdIndex.value + 1]
      .rowspan
  ) {
    instance?.appContext.config.globalProperties.$message?.error(t('ngform.item.table.no_right_merge'))
    return false
  }

  props.record.trs[trIndex.value].tds[
    tdIndex.value
  ].colspan += props.record.trs[trIndex.value].tds[
    tdIndex.value + 1
  ].colspan

  props.record.trs[
    trIndex.value
  ].tds = props.record.trs[trIndex.value].tds.filter(
    (item, index) => {
      return index !== tdIndex.value + 1
    }
  )
}

const handleAddCol = () => {
  // 增加列
  props.record.trs.forEach(item => {
    item.tds.splice(tdIndex.value + 1, 0, {
      colspan: 1,
      rowspan: 1,
      list: []
    })
  })
}

const handleAddRow = () => {
  // 增加行
  // 获取总col值
  const sumCols = props.record.trs[0].tds
    .map(item => item.colspan)
    .reduce(function(partial, value) {
      return partial + value
    })
  const rowJson = { tds: [] }
  for (let i = 0; i < sumCols; i++) {
    rowJson.tds.push({
      colspan: 1,
      rowspan: 1,
      list: []
    })
  }
  props.record.trs.splice(trIndex.value + 1, 0, rowJson)
}

const handleRemoveRow = () => {
  // 删除一行
  const tri = trIndex.value
  const len = props.record.trs.length
  if (len <= 1) {
    instance?.appContext.config.globalProperties.$message?.error(t('ngform.item.table.no_del_by_endrow'))
    return
  }
  props.record.trs.splice(tri , 1)
}

const handleRemoveCol = () => {
  // 删除一列
  const tdi = tdIndex.value
  // 存在任意行中的列数 <= 1 不允许删除

  for (let i in  props.record.trs) {
    let tds = props.record.trs[i].tds
    if (tds.length <= 1) {
      instance?.appContext.config.globalProperties.$message?.error(t('ngform.item.table.no_del_by_endcol'))
      return
    }
  }

  props.record.trs.forEach(t => {
    t.tds.splice(tdi , 1)
  })
}

const handleSettingStyle = () => {
  // 样式配置
  const td = props.record.trs[trIndex.value].tds[tdIndex.value]

  const class_ = td.class
  const style_ = td.style

  tdStyle.value.style = style_
  tdStyle.value.class = class_

  styleVisible.value = true
}

const settingStyle = () => {
  // 样式生效
  const td = props.record.trs[trIndex.value].tds[tdIndex.value]
  td.style = tdStyle.value.style
  td.class = tdStyle.value.class

  // 重新绘制 修改数据
  props.record.trs[trIndex.value].tds.splice(tdIndex.value , 1 , td)

  styleVisible.value = false
}

const showRightMenuHandle = (e, trIdx, tdIdx, mergeCol) => {
  // 显示右键菜单
  e.stopPropagation()

  // 显示
  showRightMenu.value = true

  // 计算rightMenu得高度和宽度 和当前屏幕对比 来决定菜单出现得起始位置
  let height = 210
  let width = 280

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

  trIndex.value = trIdx
  tdIndex.value = tdIdx

  // 判断是否是已经合并过的单元格 isMergeCol
  isMergeCol.value = mergeCol

  return false
}

const handleRemoveRightMenu = () => {
  // 取消右键菜单
  showRightMenu.value = false
}
</script>

<style>
 .table-box .td-draggable, .table-box .td-row {
  min-height: 65px;
  min-width: 100px;
}

.table-box .td-draggable {
  border: 1px solid #e8e8e8 !important;
}

</style>
