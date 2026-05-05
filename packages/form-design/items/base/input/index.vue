<template>
	<el-input
		v-if="!preview"
		:key="'input-' + record.key + localeKey"
		:placeholder="getLabel(record.options.placeholder)"
		:clearable="record.options.clearable"
		:disabled="recordDisabled"
		:type="record.options.type || 'text'"
		:style="`width:${record.width}`"
		:maxlength="record.options.maxLength > 0 ? record.options.maxLength : null"
		:show-word-limit="record.options.maxLength && record.options.maxLength > 0 ? true : false"
		v-model="models[record.model]"
		@focus="handleFocus"
		@blur="handleBlur"
		>
		<template #prepend v-if="record.options.prepend">
			<span v-html="transformAppend(record.options.prepend)">
			</span>
		</template>
		<template #append v-if="record.options.append">
			<span v-html="transformAppend(record.options.append)">
			</span>
		</template>
	</el-input>
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
	getLabel,
	recordDisabled,
	transformAppend,
	updateSimpleDefaultValue,
	handleFocus,
	handleBlur
} = useFormItem(props, props.models, emit)

// 生命周期 - created → onBeforeMount
onBeforeMount(() => {
	updateSimpleDefaultValue()
})
</script>
