<template>
	<div>
		<el-time-select
			:key="'time-' + record.key + localeKey"
			v-if="!preview"
			arrow-control
			:style="`width:${record.width}`"
			:disabled="recordDisabled"
			v-model="models[record.model]"
			:clearable="record.options.clearable"
			:placeholder="record.options.placeholder"
			:format="record.options.format"
			:picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
			:value-format="record.options.format"
			@focus="handleFocus"
			@blur="handleBlur"
		>
		</el-time-select>
		<span v-else>
			{{models[record.model]}}
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
	updateSimpleDefaultValue,
	handleFocus,
	handleBlur
} = useFormItem(props, props.models, emit)

// 生命周期
onBeforeMount(() => {
	updateSimpleDefaultValue()
})
</script>
