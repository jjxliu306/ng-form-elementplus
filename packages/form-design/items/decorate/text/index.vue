<template>
	<div class="ng-form-label" :style="{ textAlign: record.options.textAlign, width: record.width }" :key="'text-' + record.key + localeKey">
		<label
			:class="{ 'is-required': showRequiredMark }"
			v-text="record.label"
			:style="textStyle"
		></label>
	</div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { dynamicFun } from '../../../../utils/index.js'
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
const { ...rest } = useFormItem(props, props.models, emit)

// 计算属性 - 文本样式
const textStyle = computed(() => {
	const style_ = {}

	if (props.record.options.bold) {
		style_.fontWeight = 'bold'
	}
	if (props.record.options.fontSize && props.record.options.fontSize > 0) {
		style_.fontSize = props.record.options.fontSize + 'px'
	}

	return style_
})

// 计算属性 - 显示必填标记
const showRequiredMark = computed(() => {
	if (!props.record.options.showRequiredMark) return false

	const fstr = props.record.options.showRequiredMarkScript
	if (!fstr || !fstr.trim()) {
		return true
	}

	const mark = dynamicFun(fstr, props.models)

	return mark
})
</script>

<style>
.ng-form-label .is-required:before {
	content: "*";
	color: #F56C6C;
	margin-right: 4px;
}
</style>
