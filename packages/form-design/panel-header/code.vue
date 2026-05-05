<!--
生成json Modal
-->
<template>
  <el-dialog
    :title="t('ngform.header.template_data')"
    v-model="visible"
    :append-to-body="true"

    width="850px"
  >
     <div class="json-box">
      <el-input style="min-height:300px;height: 300px;max-height: 290px;overflow: auto;" autosize  :readonly="!edit" ref="myEditor" type="textarea" v-model="jsonCode">
      </el-input>
    </div>
    <div class="copy-btn-box" v-if="!edit">
      <el-button size="small" @click="handleExportJson" type="primary">
        {{t('ngform.header.export_code')}}
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="handleCancel">{{t('ngform.close')}}</el-button>
        <el-button v-if="edit" size="small" type="primary" @click="handleImp">{{t('ngform.import')}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-form-code'
})
</script>

<script setup>
import { ref, nextTick } from 'vue'
import { getCurrentInstance } from 'vue'
import { useLocale } from '../../locale/mixin.js'

// 使用 useLocale composable
const { t } = useLocale()

// 获取当前实例用于访问 $message
const instance = getCurrentInstance()

// Emits
const emit = defineEmits(['imp'])

// Data
const visible = ref(false)
const jsonCode = ref("")
const fileFormat = ref('json')
const edit = ref(false) // 是否可编辑
const myEditor = ref(null)

// Methods
const init = (model, isEdit = false) => {
  visible.value = true
  edit.value = isEdit
  nextTick(() => {
    jsonCode.value = JSON.stringify(model, null, "\t")
  })
}

const handleCancel = () => {
  visible.value = false
}

const handleImp = () => {
  if (!jsonCode.value) {
    instance?.appContext.config.globalProperties.$message?.error(t('ngform.header.content_not_empty'))
    return
  }
  try {
    const importData = JSON.parse(jsonCode.value)

    if (importData && typeof importData == 'object') {
      emit('imp', importData)
      handleCancel()
    } else {
      instance?.appContext.config.globalProperties.$message?.error(t('ngform.header.content_parse_error'))
      return
    }

  } catch (error) {
    instance?.appContext.config.globalProperties.$message?.error(t('ngform.header.content_parse_error'))
    return
  }
}

const exportData = (data, fileName = `ng-form-template.${fileFormat.value}`) => {
  let content = "data:text/csv;charset=utf-8,"
  content += data
  var encodedUri = encodeURI(content)
  var actions = document.createElement("a")
  actions.setAttribute("href", encodedUri)
  actions.setAttribute("download", fileName)
  actions.click()
}

const handleExportJson = () => {
  // 导出JSON
  exportData(jsonCode.value)
}

// 暴露给父组件的方法
defineExpose({
  init
})
</script>
