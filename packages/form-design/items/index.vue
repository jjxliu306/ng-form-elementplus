<!--
传入record数据，通过判断record.type，来渲染对应的组件
  -->
<template>
  <ItemNode
    v-if="isLayout"
    :key="record.key + locale"
    :record="record"
    :disabled="disabled"
    :preview="preview"
    :isDragPanel="isDragPanel"
    :selectItem="selectItem"
    :style="{'display': recordVisible ? '' : 'none'}"
    :prop-prepend="propPrepend"
    :models="models"
    @handleSelectItem="handleSelectItem"
  />
  <el-form-item
    v-else
    :label="label"
    :style="{'display': recordVisible ? '' : 'none'}"
    :rules="recordRules"
    :prop="recordProps"
    :key="record.key + recordVisible + locale"
    :required="recordRequired"
    :id="record.model"
    :name="record.model"
    :label-width="labelWidth"
  >
    <ItemNode
      :record="record"
      :disabled="disabled"
      :preview="preview"
      :isDragPanel="isDragPanel"
      :selectItem="selectItem"
      :prop-prepend="propPrepend"
      :models="models"
      @handleSelectItem="handleSelectItem"
    />
  </el-form-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ng-form-item"
})
</script>

<script setup>
import { computed, inject, onMounted } from 'vue'
import { dynamicFun, cloneDeep } from '../../utils/index.js'
import ItemNode from './node.vue'
import { useLocale } from '../../locale/mixin.js'

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
  // 是否显示label 最终是否显示还要判断其他条件，只是这个为第一条件
  showLabel: {
    type: Boolean,
    default: true
  },
  propPrepend: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['handleSelectItem'])

// Injects
const customComponents = inject('customC', [])
const configInject = inject('configC', null)

// 使用 useLocale composable，获取 locale 用于强制刷新
const { getLabel, getDynamicLabel, locale } = useLocale()

// Computed
const config = computed(() => {
  if (configInject && configInject != null && configInject != undefined) {
    return configInject() || {}
  }
  return {}
})

// 是否布局组件 但钱不需要验证的哪种
const isLayout = computed(() => {
  return props.record.layout
})

const label = computed(() => {
  if (!props.showLabel) return null
  let labelWidth = config.value.labelWidth
  if (props.record.options && props.record.options.labelWidth >= 0) {
    labelWidth = props.record.options.labelWidth
  }

  // 没有options的labelWidth 尝试获取外部的labelWidth
  if (props.record.labelWidth >= 0) {
    labelWidth = props.record.labelWidth
  }

  if (labelWidth > 0) {
    // 这里判断以下是否打开了动态标签
    if (props.record.dynamicLabel) {
      return getDynamicLabel(props.record.label, props.models)
    } else {
      return getLabel(props.record.label)
    }
  }

  return null
})

const labelWidth = computed(() => {
  if (!props.showLabel) return '0px'
  let labelWidth = config.value.labelWidth
  if (props.record.options && props.record.options.labelWidth >= 0) {
    labelWidth = props.record.options.labelWidth
  }
  // 没有options的labelWidth 尝试获取外部的labelWidth
  if (props.record.labelWidth >= 0) {
    labelWidth = props.record.labelWidth
  }

  return labelWidth + 'px'
})

// 校验的prop值 动态计算
const recordProps = computed(() => {
  if (recordRules.value && recordRules.value.length > 0) {
    if (props.propPrepend) {
      return props.propPrepend + props.record.model
    } else {
      return props.record.model
    }
  }
  return null
})

const showRequiredMark = computed(() => {
  const fstr = props.record.options.showRequiredMarkScript
  if (!fstr) {
    return false
  }

  const mark = dynamicFun(fstr, props.models)

  return mark
})

// 动态显示
// 返回true 显示 false 不显示
const recordVisible = computed(() => {
  if (props.isDragPanel) {
    return true
  }

  // 判断组件是否自己设置了隐藏
  if (props.record.options && props.record.options.hidden) {
    return false
  }
  // 判断是否编辑时隐藏
  if (!props.preview && props.record.options.editHidden) {
    return false
  }

  // 判断是否配置了动态显示 或者表达式为空
  if (!props.record.options
    || !props.record.options.dynamicVisible
    || !props.record.options.dynamicVisibleValue) {
    return true
  }

  let fstr = props.record.options.dynamicVisibleValue
  // 打开了开关 这里获取函数内容
  const func = dynamicFun(fstr, props.models)
  return func
})

const recordRules = computed(() => {
  // 如果隐藏了直接返回空
  if (!recordVisible.value) {
    return []
  }
  // 2020-07-29 如果是预览 不需要规则验证
  if (!props.record.rules || props.record.rules.length == 0) {
    return []
  }
  let rules = cloneDeep(props.record.rules)

  // 2020-09-12 判断是否必填 ,非必填得没有值得时候不校验
  const isRequire = rules[0].required

  // 循环判断
  for (var i = 0; i < rules.length; i++) {
    const t = rules[i]

    // 2021-08-12 lyf 针对必填而且是文本输入的组件增加纯空格校验
    if (isRequire && (props.record.type == 'input' || props.record.type == 'textarea')) {
      t.whitespace = true
    }

    if (t.vtype == 1 || t.vtype == 2) {
      t.validator = validatorFiled
    }

    // 判断trigger
    if (!t.trigger) {
      t.trigger = ['change', 'blur']
    }
  }

  return rules
})

// 2022-10-06 lyf 判断组件是否必填 动态
const recordRequired = computed(() => {
  // 如果隐藏了直接返回false
  if (!recordVisible.value) {
    return false
  }
  if (config.value.hideRequiredMark || !config.value.syncLabelRequired) {
    return false
  }

  let rules = props.record.rules

  if (!rules || rules.length == 0) return false
  // 2020-09-12 判断是否必填 ,非必填得没有值得时候不校验

  const isRequire = rules[0].required
  if (isRequire) {
    return true
  }

  const value = props.models[props.record.model]
  // 循环判断
  for (var i = 0; i < rules.length; i++) {
    const rule = rules[i]

    if (rule.vtype == 1) {
      // 正则
      if (!rule.pattern) {
        continue
      }
      // 正则匹配
      const patt1 = new RegExp(rule.pattern)

      if (!patt1.test(value)) {
        return true
      }

    } else if (rule.vtype == 2) {
      // 表达式
      const script = rule.script

      // 打开了开关 这里获取函数内容
      const fvalue = dynamicFun(script, props.models)

      if (!fvalue) {
        return true
      }
    }
  }

  return false
})

// Methods
const handleSelectItem = (item) => {
  emit('handleSelectItem', item)
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
    const fvalue = dynamicFun(script, props.models)

    if (!fvalue) {
      callback(new Error(rule.message))
    } else {
      callback()
    }

  } else {
    callback()
  }
}

// Lifecycle
onMounted(() => {

})
</script>
