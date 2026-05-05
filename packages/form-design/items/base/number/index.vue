<template>
	<div
	 	v-if="!preview"
	 	:style="`width:${record.width}`"
	 	class="form-item-base-number el-input-number-diaplay"
	 	:key="'number-' + record.key + localeKey">

        <el-input-number
          :class="record.options.append ? 'el-input-number__append' : null"
          v-model="models[record.model]"
          :style="`width:${record.width};float:left;`"
          :min="
            record.options.min || record.options.min === 0
              ? record.options.min
              : -Infinity
          "
          :max="
            record.options.max || record.options.max === 0
              ? record.options.max
              : Infinity
          "
          :disabled="recordDisabled"
          :step="record.options.step"
          :precision="
            record.options.precision > 50 ||
            (!record.options.precision && record.options.precision !== 0)
              ? null
              : record.options.precision
          "
          controls-position="right"
          :placeholder="record.options.placeholder"
          @focus="handleFocus"
      		@blur="handleBlur"
        > </el-input-number>
        <div class="el-input-group__append el-input-number-group__append " v-if="record.options.append" v-html="transformAppend(record.options.append)">

        </div>
  </div>
  <div v-else>
  	<span class="base-item-span" v-if="record.options.prepend" v-html="transformAppend(record.options.prepend)">
    </span>
    <span class="base-item-span">{{models[record.model]}} </span>
    <span class="base-item-span" v-if="record.options.append" v-html="transformAppend(record.options.append)">
    </span>
  </div>
</template>

<script setup>
import { onBeforeMount, inject } from 'vue'
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
		default: () => { return {} }
	},
	disabled: {
		type: Boolean,
		default: false
	},
	preview: {
		type: Boolean,
		default: false
	},
	isDragPanel: {
		type: Boolean,
		default: false
	},
	selectItem: {
		type: Object
	},
	propPrepend: {
		type: String
	}
})

// Emits
const emit = defineEmits(['handleSelectItem', 'handleBlur', 'handleFocus'])

// Injects
const configInject = inject('configC', null)
const ngConfig = inject('$ngofrm_config', {})

// 使用 useLocale 获取 locale key 用于响应式语言切换
const { locale } = useLocale()
const localeKey = locale

// 使用 useFormItem composable
const {
	recordDisabled,
	transformAppend,
	updateSimpleDefaultValue,
	handleFocus,
	handleBlur
} = useFormItem(props, props.models, emit)

// 生命周期 - number 组件需要传 true 表示是数字类型
onBeforeMount(() => {
	updateSimpleDefaultValue(true)
})
</script>

<style>
.form-item-base-number {
  vertical-align: middle;
  display: inline-flex;
  position: relative;
  width: 100%;
}

.form-item-base-number .el-input-number__append {
  float: left;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #F5F7FA;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  white-space: nowrap;
  border-left: 0;
  border-right: 0;
}

.form-item-base-number .el-input-number__append .el-input__inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.form-item-base-number .el-input-number-group__append {
  border-left: 0;
  text-align: center;
  display: inline-table;
}

.base-item-span {
  white-space: pre-wrap;
}

</style>
