<template>
	<el-input
		:key="'textarea-' + record.key + localeKey"
		v-if="!preview"
		type="textarea"
		:style="`width:${record.width}`"
		:placeholder="getLabel(record.options.placeholder)"
		:disabled="recordDisabled"
		:rows="record.options.rows"
		:autosize="record.options.autosize"
		:maxlength="record.options.maxLength > 0 ? record.options.maxLength : null"
		:show-word-limit="record.options.maxLength && record.options.maxLength > 0 ? true : false"
		v-model="models[record.model]"
		@focus="handleFocus"
		@blur="handleBlur"
		>
	</el-input>
	<span v-else>{{models[record.model]}}</span>
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
	getLabel,
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
