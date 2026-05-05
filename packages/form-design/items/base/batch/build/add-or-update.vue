<template>
  <el-dialog
    :title="!dataForm._id ? t('ngform.item.add') : t('ngform.item.edit')"
    :close-on-click-modal="false"
     :append-to-body="true"
    :lock-scroll="false"
    v-model="visible"
    :id="randomId">
   <el-form
      v-if="
        typeof formTemplate.list !== 'undefined'
      "
      class="form-build form-design"
      :label-position="config.labelPosition"
      :hide-required-asterisk="config.hideRequiredMark"
      :label-width="config.labelWidth + 'px'"
      ref="dataFormRef"
      :model="dataForm"
      size="small"
      :key="dataForm._id"
      :rules="dataRule"
    >

    <ng-form-item
        v-for="item  in formTemplate.list"
        :key="item.key"
        :disabled="disabled"
        :preview="preview"
        :models.sync="dataForm"
        :record="item"
        @focus="handleFocus"
        @blur="handleBlur"
      />
     <el-form-item :label="t('ngform.item.batch.seq_label')" prop="seq">
          <template v-if="preview">
            {{dataForm.seq}}
          </template>
          <template v-else>
            <el-input-number v-model="dataForm.seq" controls-position="right" :min="0"  :placeholder="t('ngform.item.batch.seq_label')" :disabled="preview"></el-input-number>
          </template>
      </el-form-item>
</el-form>


    <div  class="mod-footer">
      <el-button size="small" @click="visible = false">{{t('ngform.cancel')}}</el-button>
      <el-button size="small" :disabled="loading" v-if="!preview" type="primary" @click="dataFormSubmit()">{{t('ngform.confirm')}}</el-button>
    </div>
 <!--  </div> -->
  </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'table-add-or-update'
})
</script>

<script setup>
import { ref, computed, inject, nextTick, getCurrentInstance } from 'vue'
import { useLocale } from '../../../../../locale/mixin.js'
import { getComponentCache } from '../../../../../utils/cache.js'
import { dynamicFun, cloneDeep } from '../../../../../utils/index'

// 使用 useLocale composable
const { t } = useLocale()

// Props
const props = defineProps({
  // 表格内部的配置
  formTemplate: {
    type: Object,
    default: () => ({})
  },
  // 是否预览结果表单
  preview: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['formAdd', 'formUpdate'])

// Inject
const configInject = inject('configC', null)

// Refs
const randomId = ref('')
const loading = ref(false)
const visible = ref(false)
const dataForm = ref({
  _id: '',
  seq: 0
})
const dataRule = ref({})
const dataFormRef = ref(null)

// Computed
const config = computed(() => {
  if (configInject && configInject != null && configInject != undefined) {
    return configInject() || {}
  }
  return {}
})

const customList = computed(() => {
  if (customComponents.value) {
    return customComponents.value.map(item => item.type)
  } else {
    return []
  }
})

const customComponents = computed(() => {
  const cms = getComponentCache()
  return cms
})

// 获取当前实例
const instance = getCurrentInstance()

// Methods
const recordRules = (record) => {
  // 2020-07-29 如果是预览 不需要规则验证
  if (props.preview) {
    return []
  }
  const rules = record.rules
  // 循环判断
  for (let i = 0 ; i < rules.length ; i++) {
    const t = rules[i]
    if (t.vtype == 1 || t.vtype == 2) {
      t.validator = validatorFiled
    }

    if (t.required && (record.type == 'input' || record.type == 'textarea')) {
      t.whitespace = true
    }

    // 判断trigger
    if (!t.trigger) {
      t.trigger = ['change','blur']
    }
  }

  return rules
}

const dynamicVisibleItem = (record) => {
  if (!record.options || !record.options.dynamicVisible) {
    return true
  }
  if (!record.options.dynamicVisibleValue) {
    return true
  }
  let fstr = record.options.dynamicVisibleValue
  // 打开了开关 这里获取函数内容
  const func = dynamicFun(fstr, dataForm.value)
  return func
}

// 2021-03-12 清理没有显示的组件的数据
const clearHiddenValue = () => {
  // 根据组件ID 是否隐藏为准
  // 根据 formTemplate.config.outputHidden 来判断是否要输出隐藏
  if (!config.value || !config.value.outputHidden) {
    const formdesign = document.getElementById(randomId.value)

    // 循环当前数据 非P 开头的统一不深入第二层
    for (let key in dataForm.value) {
      if (key.indexOf('_label') > 0 || key == '_id' || key == 'seq') continue
      //  判断key的id是否还在
      const key_div = formdesign.querySelector('#' + key)
      if (!key_div) {
        // 删除
        delete dataForm.value[key]
        delete dataForm.value[key + '_label']
      }
    }
  }
}

const validatorFiled = (rule, value, callback) => {
  // 判断rule类型
  if (rule.vtype == 1) {
    // 正则
    if (!rule.pattern) {
      callback()
      return
    }
    // 正则匹配
    var patt1 = new RegExp(rule.pattern)

    if (patt1.test(value)) {
      callback()
    } else {
      callback(new Error(rule.message))
    }

    return
  } else if (rule.vtype == 2) {
    // 表达式
    const script = rule.script
    // 打开了开关 这里获取函数内容
    const fvalue = dynamicFun(script, dataForm.value)

    if (!fvalue) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  }
}

const init = (data) => {
  randomId.value = 'ng_table_dialog' + new Date().getTime()
  visible.value = true
  dataForm.value._id = null
  if (data) {
    for (let i in data) {
      dataForm.value[i] = data[i]
    }
  } else {
    // 初始化数据
    dataForm.value.seq = 0
    props.formTemplate.list.forEach(item => {
      if (item.options.defaultValue)
        dataForm.value[item.model] = item.options.defaultValue
      else
        dataForm.value[item.model] = null
    })

    nextTick(() => {
      dataFormRef.value && dataFormRef.value.resetFields()
    })
  }
}

// 表单提交
const dataFormSubmit = () => {
  dataFormRef.value && dataFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      clearHiddenValue()
      if (!dataForm.value._id) {
        // 回填一个ID
        const id = new Date().getTime() * 10 + parseInt(Math.random() * 100)
        dataForm.value._id = id
        emit('formAdd', cloneDeep(dataForm.value))
      } else {
        emit('formUpdate', cloneDeep(dataForm.value))
      }
      loading.value = false
      visible.value = false
    }
  })
}

const handleFocus = () => {
  // 可以在这里处理焦点事件
}

const handleBlur = () => {
  // 可以在这里处理失焦事件
}

// 暴露给父组件的方法
defineExpose({
  init
})
</script>
