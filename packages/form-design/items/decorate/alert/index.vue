<template>
	<div class="form-label" :style="{ textAlign: record.options.textAlign, width: record.width }" :key="'alert-' + record.key + localeKey">
		<el-alert
			:title="record.options.title"
			:type="record.options.type"
			:description="record.options.description"
			:effect="record.options.effect"
			:closable="record.options.closable"
			:center="record.options.center"
			:close-text="record.options.closeText"
			:show-icon="record.options.showIcon">
		</el-alert>
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
