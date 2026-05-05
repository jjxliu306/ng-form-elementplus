<!--
传入record数据，通过判断record.type，来渲染对应的组件
-->
<template>

  <!-- 文本 -->
<!--   <div v-if="record.type === 'text'" :style="{ textAlign: record.options.textAlign }">
    <span>{{record.label}}</span>
  </div> -->
  <!-- html -->
 <!--  <div   v-else-if="record.type === 'html'"  v-html="record.options.defaultValue" >
  </div> -->
    <ng-form-item
      class="batch-build-item"
      :disabled="disabled"
      :preview="preview"
      :models="domains"
      :record="record"
      :show-label="false"
      :prop-prepend="parentModel + '.' + index + '.'"
      @focus="handleFocus"
      @blur="handleBlur"
    />

</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TableItem'
})
</script>

<script setup>
import { computed } from 'vue'
import { dynamicFun } from '../../../../../utils/index'
import { getComponentCache } from '../../../../../utils/cache.js'

// Props
const props = defineProps({
  record: {
    type: Object,
    required: true
  },
  // 是否预览结果表单
  preview: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number
  },
  models: {
    type: Object
  },
  domains: {
    type: Object
  },
  parentModel: {
    type: String,
    required: true
  }
})

// Computed
const customComponents = computed(() => {
  const cms = getComponentCache()
  return cms
})

const customList = computed(() => {
  if (customComponents.value) {
    const customComponents_ = customComponents.value
    return customComponents_.map(item => item.type)
  } else {
    return []
  }
})

const recordRules = computed(() => {
  // 2020-07-29 如果是预览 不需要规则验证
  if (props.preview || !props.record.rules || props.record.rules.length == 0) {
    return []
  }

  let rules = props.record.rules

  // 2020-09-12 判断是否必填 ,非必填得没有值得时候不校验
  const isRequire = rules[0].required

  // 循环判断
  for (let i = 0 ; i < rules.length ; i++) {
    const t = rules[i]

    t.required = isRequire
    // 2021-08-12 lyf 针对必填而且是文本输入的组件增加纯空格校验
    if (t.required && (props.record.type == 'input' || props.record.type == 'textarea')) {
      t.whitespace = true
    }

    if (t.vtype == 1 || t.vtype == 2) {
      t.validator = validatorFiled
    }

    // 判断trigger
    if (!t.trigger) {
      t.trigger = ['change','blur']
    }
  }

  return rules
})

// Methods
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
    const fvalue = dynamicFun(script, props.domains)

    if (!fvalue) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  }
}

const handleFocus = () => {
  // 可以在这里处理焦点事件
}

const handleBlur = () => {
  // 可以在这里处理失焦事件
}
</script>

<style>
.batch-build-item.is-error {
  margin-bottom: 18px;
}
</style>
