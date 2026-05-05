<!--
任意一级可选
-->
<template>

<el-cascader
	:modelValue="value"
    :options="options"
   	@change="valueChange"
    :props="{ checkStrictly: checkStrictly , emitPath: emitPath , value:'v' ,label: 'l' , children: 'c' }"
    :clearable="clearable"></el-cascader>

</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-org-any-select'
})
</script>

<script setup>
import { computed } from 'vue'
import AreaData from './area.json'
import { useFormItem } from '../../mixin.js'

// Props
const props = defineProps({
  // 表单数组
  value: {
    type: String
  },
  emitPath: {
    type: Boolean,
    default: false
  },
  models: {
    type: Object
  },
  disabled: {
    type: Boolean,
    default: false
  },
  parentCode: {
    type: String
  },
  // 是否预览结果表单
  preview: {
    type: Boolean,
    default: false
  },
  record: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['input', 'change'])

// Computed
const options = computed(() => {
  let data = AreaData
  if (props.parentCode) {
    data = AreaData.filter(t => t.v == props.parentCode)
  }
  if (level.value < 3) {
    // 过滤层级
    data = filterLevel(data, level.value)
  }

  return data
})

const level = computed(() => {
  return props.record && props.record.options ? props.record.options.maxLevel : 3
})

const separator = computed(() => {
  return props.record && props.record.options ? props.record.options.separator : '/'
})

const showAllPath = computed(() => {
  return props.record && props.record.options ? props.record.options.showAllPath : true
})

const checkStrictly = computed(() => {
  return props.record && props.record.options ? props.record.options.anySelect : false
})

const clearable = computed(() => {
  return props.record && props.record.options ? props.record.options.clearable : false
})

// Methods
const valueChange = (v) => {
  emit('input', v)
  emit('change', v)

  // 修改label
  const label_ = getLabel()
  props.models[props.record.model + "_label"] = label_
}

// 过滤层级
const filterLevel = (childData = [], level) => {
  if (level == 3) return childData

  for (let i = 0 ; i < childData.length ; i++) {
    if (level == 1) {
      delete childData[i].c
    } else if (level == 2) {
      // 层级2
      for (let j = 0 ; j < childData[i].c.length ; j++) {
        delete childData[i].c[j].c
      }
    }
  }

  return childData
}

const getLabel = () => {
  let address = []
  const val = props.value

  const fs_ = (areas) => {
    areas.forEach(t => {
      if (t.v == val) {
        address.push(t.l)
      } else if (val && val.indexOf(t.v.replace(/0+$/ , '')) == 0 && t.c && t.c.length > 0) {
        address.push(t.l)
        fs_(t.c)
      }
    })
  }

  fs_(AreaData)

  let str_ = ''
  if (showAllPath.value) {
    str_ = address.join(separator.value)
  } else {
    str_ = address.length > 0 ? address[address.length - 1] : ''
  }

  return str_
}
</script>
