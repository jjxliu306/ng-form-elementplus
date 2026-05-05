<template>
<div class="table-box">
  <table
    :class="[
      'table-layout' , 'table-layout-build','form-table',
      record.options.customClass ? record.options.customClass : '' ,
      record.options.bright ? 'bright' : '' ,
      record.options.small ? 'small' : '' ,
      /*record.options.bordered ? 'bordered' : '' */
    ]"
    :style="record.options.customStyle"
    >
    <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex" >
      <td
        :class="['table-td', tdItem.class , , record.options.bordered ? 'td-bordered' : '']"
        :style="tdItem.style"
        v-for="(tdItem, tdIndex) in trItem.tds"
        :key="tdIndex"
        :colspan="tdItem.colspan"
        :rowspan="tdItem.rowspan"
        >
        <el-row class="row-td">

            <ng-form-node
              v-for="item in tdItem.list"
              :is-drag="false"
              ref="nestedComponents"
              :key="item.key"
              :disabled="disabled"
              :preview="preview"
              :prop-prepend="propPrepend"
              :models.sync="models"
              :record="item"
              />

        </el-row>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'table-layout-build'
})
</script>

<script setup>
import { onMounted } from 'vue'
import { useFormItem } from '../../mixin.js'

// Props
const props = defineProps({
  record: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  preview: {
    type: Boolean,
    default: false
  },
  propPrepend: {
    type: String,
    default: ''
  },
  models: {
    type: Object,
    default: () => ({})
  }
})

// 使用 useFormItem composable (如果需要)
// const { someMethod } = useFormItem(props, {}, {})

// Lifecycle
onMounted(() => {
  // 可以在这里添加初始化逻辑
})
</script>

<style>
.table-layout-build.small .table-td {
  padding: 8px 8px;
}

.table-layout-build .table-td {
  min-height: 30px;
}

.table-layout-build .table-td .row-td {
  min-height: 30px;
}

</style>
