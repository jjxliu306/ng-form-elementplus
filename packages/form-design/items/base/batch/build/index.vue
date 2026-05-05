<!--
  动态表格 用于批量填入数据
  -->
<template>
 <div  :id="record.model" :name="record.model" class="form-table-index">

    <el-table
      :class="[
        'form-table',
        record.options.customClass ? record.options.customClass : ''
      ]"
      :size="config.size"
      :style="record.options.customStyle"
      :empty-text="getLabel(record.options.noDataText) || t('ngform.item.batch.no_data')"
      :data="models[record.model]"
      :border="record.options.showBorder"
      :scroll="{
        x:
          record.list.length * 190 +
          80 +
          (!record.options.hideSequence ? 60 : 0),
        y: record.options.scrollY
      }"
    >
      <template  v-if="isVisible">
        <el-table-column
          v-if="!record.options.hideSequence"
          :label="t('ngform.item.batch.seq')"
          align="center"
          type="index"
          width="50" >
        </el-table-column>
        <template  v-for="(item,index) in record.list">
          <el-table-column
          v-if="record.options.addType != 'dialog' || (!record.options.showItem || record.options.showItem.length == 0 || record.options.showItem.includes(item.model) )"
          :key="index"
          :label="item.label"
          :width="record.options.colWidth && record.options.colWidth[item.model] ? record.options.colWidth[item.model] : undefined"
          align="center">
          <template  #default="scope">
            <!-- 这里就要判断类型了 -->
            <!-- 2021-03-14 判断新增数据方式，如果是怎加航 这里就不能预览了 -->
            <TableItem :record="item" :index="scope.$index" :models="models" :parent-model="propPrepend + record.model"  :preview="preview || record.options.addType == 'dialog'" :domains="models[record.model][scope.$index]" />
          </template>
        </el-table-column>
        </template>
        <el-table-column
          :label="t('ngform.item.batch.operate')"
          align="center"
          :fixed="record.options.fixedBtn ? 'right' : undefined"
          v-if="!preview || record.options.addType == 'dialog'"
          :width="controlWidth ">
          <template  #default="scope">
            <el-button  type="text" text  class="ng-form-btn-view" :size="config.size" v-if="preview && record.options.addType == 'dialog'"  @click="updateDomain(scope.row)">

               <!-- <el-icon><Eye /></el-icon> -->  {{t('ngform.item.view')}}
            </el-button>
            <el-button  type="text" text  class="ng-form-btn-view" :size="config.size" v-if="!preview && record.options.addType == 'dialog'"  @click="updateDomain(scope.row)">

              <!-- <el-icon><Edit /></el-icon> --> {{t('ngform.item.edit')}}
            </el-button>
            <el-button  type="text" text  class="ng-form-btn-view" :size="config.size" v-if="!preview && record.options.copyRow"  @click="copyDomain(scope.row , scope.$index)">

               <!-- <el-icon><CopyDocument /></el-icon> --> {{t('ngform.item.copy')}}
            </el-button>
            <el-button  type="text" text  class="ng-form-btn-del" :size="config.size"  v-if="!preview" @click="removeDomain(scope.$index)">
             <!--  <el-icon><Delete /></el-icon> --> {{t('ngform.item.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </template>


    </el-table>
    <el-button v-if="!preview" :size="config.size" type="dashed" :disabled="disabled" @click="addDomain">
       <!--
       <el-icon><CirclePlus />新增</el-icon> -->
       <el-icon><CirclePlusFilled /></el-icon>{{t('ngform.item.add')}}
    </el-button>

    <AddOrUpdate ref="addOrUpdate" v-if="addOrUpdateVisible"   :formTemplate="templateData" :preview="preview" @formAdd="formAdd"  @formUpdate="formUpdate"/>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-form-base-batch'
})
</script>

<script setup>
import { ref, computed, inject, onMounted, nextTick, getCurrentInstance } from 'vue'
import { useLocale } from '../../../../../locale/mixin.js'
import { useFormItem } from '../../../mixin.js'
import TableItem from './table-item.vue'
import AddOrUpdate from './add-or-update.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue'

// 使用 composable
const { t, getLabel } = useLocale()

// Props
const props = defineProps({
  record: {
    type: Object,
    required: true
  },
  models: {
    type: Object,
    required: true
  },
  parentDisabled: {
    type: Boolean,
    default: false
  },
  // 是否预览结果表单
  preview: {
    type: Boolean,
    default: false
  },
  propPrepend: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['change'])

// Inject
const configInject = inject('configC', null)

// Refs
const addOrUpdate = ref(null)
const addOrUpdateVisible = ref(false)
const isVisible = ref(true)

// Computed
const config = computed(() => {
  if (configInject && configInject != null && configInject != undefined) {
    return configInject() || {}
  }
  return {}
})

const disabled = computed(() => {
  return props.record.options.disabled || props.parentDisabled
})

const templateData = computed(() => {
  return { list: props.record.list, config: config.value }
})

const controlWidth = computed(() => {
  let w = 100

  if (props.preview) {
    return w
  }
  if (props.record.options.copyRow) {
    w += 80
  }
  if (props.record.options.addType == 'dialog') {
    w += 80
  }

  return w
})

// 获取当前实例用于访问 $message 和 $confirm
const instance = getCurrentInstance()

// Lifecycle
onMounted(() => {
  // 2021-05-10 lyf 只要没有默认值都先给回填一个  这个可以处理初始化么有值，导致后面很多联动没法做，必须要通过v-if刷新
  if (!Object.prototype.hasOwnProperty.call(props.models, props.record.model)) {
    props.models[props.record.model] = []
  }
})

// Methods
const validationSubform = () => {
  return true
}

const resetForm = () => {
  // const dynamicValidateForm = ref(null)
  // dynamicValidateForm.value?.resetFields()
}

const removeDomain = (index) => {
  instance?.appContext.config.globalProperties.$confirm?.(
    t('ngform.item.batch.delete_prompt'),
    t('ngform.header.prompt'),
    {
      confirmButtonText: t('ngform.confirm'),
      cancelButtonText: t('ngform.cancel'),
      type: 'warning'
    }
  ).then(() => {
    let domains = props.models[props.record.model]
    if (domains) {
      if (index !== -1) {
        domains.splice(index, 1)

        instance?.appContext.config.globalProperties.$message?.({
          message: t('ngform.item.batch.operation_success'),
          type: 'success',
          duration: 1000
        })
      }
    }
  })
}

const updateDomain = (data) => {
  addOrUpdateVisible.value = true

  nextTick(() => {
    addOrUpdate.value?.init(data)
  })
}

// 行复制 2021-02-17 lyf
const copyDomain = (data, index) => {
  let copyData = {...data}
  copyData._id = null
  if (props.record.options.addType == 'dialog') {
    addOrUpdateVisible.value = true

    nextTick(() => {
      addOrUpdate.value?.init(copyData)
    })
  } else {
    // 直接添加一行数据
    isVisible.value = false

    let domains = props.models[props.record.model]
    domains.splice(index + 1, 0, copyData)
    //domains.push(copyData)
    isVisible.value = true
  }
}

const addDomain = () => {
  if (props.record.options.addType == 'dialog') {
    addOrUpdateVisible.value = true
    nextTick(() => {
      addOrUpdate.value?.init()
    })
  } else {
    // 直接添加一行数据
    isVisible.value = false
    const items = props.record.list

    const itemObject = {}
    items.forEach(t => {
      itemObject[t.model] = ''
    })

    let domains = props.models[props.record.model]
    if (!domains) {
      const ds = [itemObject]

      domains = ds
    } else {
      domains.push(itemObject)
    }
    props.models[props.record.model] = domains
    isVisible.value = true
  }
}

const formAdd = (form) => {

  isVisible.value = false
  let domains = props.models[props.record.model]
  if (!domains) {
    const ds = [form]
    props.models[props.record.model] = ds
    domains = props.models[props.record.model]
  } else {
    domains.push(form)
  }

  // 排序
  domains.sort(function(a, b) {
    return a.seq - b.seq
  })
  isVisible.value = true
  instance?.appContext.config.globalProperties.$message?.({
    message: t('ngform.item.batch.operation_success'),
    type: 'success',
    duration: 1000
  })
}

const formUpdate = (form) => {

  let domains = props.models[props.record.model]

  for (let i in props.models[props.record.model]) {
    if (props.models[props.record.model][i]._id == form._id) {
      props.models[props.record.model].splice(i, 1, form)
      break
    }
  }

  props.models[props.record.model].sort(function(a, b) {
    return a.seq - b.seq
  })
  instance?.appContext.config.globalProperties.$message?.({
    message: t('ngform.item.batch.operation_success'),
    type: 'success',
    duration: 1000
  })
}

const handleInput = () => {
  emit("change", props.models)
}
</script>

<style>
.form-table-index .form-table .ng-form-btn-view {

}
.form-table-index .form-table .ng-form-btn-del {
  color:  #f56c6c;
}

</style>
