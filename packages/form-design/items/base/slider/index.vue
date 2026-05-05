<template>
	<el-slider
		:key="'slider-' + record.key + localeKey"
		v-model="models[record.model]"
		:style="`width:${record.width}`"
		:min="record.options.min"
		:max="record.options.max"
		:disabled="recordDisabled"
		:show-input="record.options.showInput"
		:step="record.options.step"
		:marks="sliderMarks"
		@focus="handleFocus"
		@blur="handleBlur"
	/>
</template>

<script setup>
import { onBeforeMount, inject, computed } from 'vue'
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
	updateSimpleDefaultValue,
	handleFocus,
	handleBlur
} = useFormItem(props, props.models, emit)

// 计算属性 - 滑块标记
const sliderMarks = computed(() => {
	if (!props.record.options.marks || props.record.options.marks.length == 0) {
		return null
	}

	let p = {}

	props.record.options.marks.forEach(t => {
		p[t.value] = t.label
	})
	return p
})

// 生命周期
onBeforeMount(() => {
	updateSimpleDefaultValue()
})
</script>
