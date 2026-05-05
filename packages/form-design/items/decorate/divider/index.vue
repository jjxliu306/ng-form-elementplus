<template>
	<div :style="`width:${record.width}`" :key="'divider-' + record.key + localeKey">
		<el-divider
			v-if="record.label !== '' && record.options.orientation"
			:content-position="record.options.orientation"
			:direction="record.options.direction ? record.options.direction : 'horizontal'">
			{{ record.label }}
		</el-divider>
		<el-divider
			v-else-if="record.label !== ''"
			:direction="record.options.direction ? record.options.direction : 'horizontal'">
			{{record.label}}
		</el-divider>
		<el-divider
			v-else-if="record.label === ''"
			:direction="record.options.direction ? record.options.direction : 'horizontal'" />
	</div>
</template>

<script setup>
import { inject } from 'vue'
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
</script>
