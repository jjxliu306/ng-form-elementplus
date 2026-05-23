<template>
  <el-dialog
    :title="t('ngform.header.preview')"
    v-model="visible"

    :append-to-body="true"
    class="design-preview"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    width="800px"
  >
    <div class="item-main">
      <FormBuild :key="key" :preview="preview" :formTemplate="formTemplate" :models="models" :config="ngConfig" ref="formBuild" :customComponents="customComponents" />
    </div>
    <template  #footer>
      <span  class="dialog-footer">
        <el-button size="small" @click="handleCancel">{{t('ngform.cancel')}}</el-button>
        <el-button type="primary" size="small" @click="handleValidator">{{t('ngform.validator')}}</el-button>
        <el-button type="primary" size="small" @click="handleGetData">{{t('ngform.header.get_data')}}</el-button>
        <el-button type="primary" size="small" @click="handleView">
           {{preview ?  t('ngform.header.write_mode') :  t('ngform.header.read_mode')}}
        </el-button>
      </span>
    </template>



    <el-dialog
      :title="t('ngform.header.get_data')"
      v-model="dataVisible"
      style="top:20px;"
      :append-to-body="true"
      class="data-preview"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="600px"
    >
    <div class="json-box">
      <el-input style="min-height:300px;height: 300px;max-height: 290px;overflow: auto;" autosize  readonly ref="dataJsonRef" type="textarea" v-model="dataJson">
      </el-input>
    </div>
  </el-dialog>

  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-form-preview'
})
</script>

<script setup>
import { ref, inject, computed, nextTick } from 'vue'
import FormBuild from '../build.vue'
import { useLocale } from '../../locale/mixin.js'
import { getComponentCache } from '../../utils/cache.js'

// 使用 useLocale composable
const { t } = useLocale()

// Inject
const ngConfig = inject('ngConfig', {})

// Data
const visible = ref(false)
const preview = ref(false)
const dataVisible = ref(false)
const dataJson = ref('')
const key = ref('1')
const models = ref({})
const formTemplate = ref({})

const formBuild = ref(null)
const dataJsonRef = ref(null)

// Computed
const customComponents = computed(() => {
  const cms = getComponentCache()
  return cms
})

// Methods
const init = (data) => {
  formTemplate.value.list = data.list
  formTemplate.value.config = data.config
  models.value = {}
  key.value = 'key' + new Date().getTime()
  visible.value = true
  // 重置表单
  nextTick(() => {
    formBuild.value?.reset()
  })
}

const handleGetData = () => {
  const models_ = formBuild.value?.getData(true)

  console.log('表单数据:', models_)
  dataJson.value = JSON.stringify(models_, null, "\t")
  dataVisible.value = true
}

const handleValidator = () => {
  formBuild.value?.validate()
}

const handleView = () => {
  preview.value = !preview.value
}

const handleCancel = () => {
  visible.value = false
}

// 暴露给父组件的方法
defineExpose({
  init
})
</script>
