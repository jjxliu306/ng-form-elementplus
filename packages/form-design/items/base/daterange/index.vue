<template>
        <el-date-picker
		:key="'daterange-' + record.key + localeKey"
                :style="`width:${record.width}`"
                v-if="!preview"
                v-model="models[record.model]"
                align="right"
                :disabled="recordDisabled"
                :type="record.options.dateType == 'month' ? 'monthrange' : 'daterange'"
                :clearable="record.options.clearable"
                :editable="record.options.editable"
                :start-placeholder="getLabel(record.options.rangeStartPlaceholder)"
                :end-placeholder="getLabel(record.options.rangeEndPlaceholder)"
                :format="record.options.format"
                :value-format="record.options.format"
                @focus="handleFocus"
                @blur="handleBlur"
                >
        </el-date-picker>
        <span v-else>
                <!--
                2023-03-16 lyf 这里实际时两个数据 拆分
                -->
                {{modelText}}
        </span>

</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-form-daterange'
})
</script>

<script setup>
import { computed, onMounted } from 'vue'
import { useFormItem } from '../../mixin.js'
import { useLocale } from '../../../../locale/mixin.js'

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
  preview: {
    type: Boolean,
    default: false
  }
})

// 使用 useLocale 获取 locale key 用于响应式语言切换
const { locale } = useLocale()
const localeKey = locale

// 使用 useFormItem composable
const { recordDisabled, getLabel, handleFocus, handleBlur, updateArrayDefaultValue } = useFormItem(props, props.models, {})

// Computed
const modelText = computed(() => {
  const value = props.models[props.record.model]
  if (value && value instanceof Array) {
    return value.join(' ~ ')
  }
  return ''
})

// Lifecycle
onMounted(() => {
  updateArrayDefaultValue()
})
</script>
