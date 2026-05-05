<template>
	<!-- 上传图片 -->
	<Upload
		:key="'upload-image-' + record.key + localeKey"
		:style="`width:${record.width}`"
		:disabled="recordDisabled"
		:value="models[record.model]"
		:record="record"
		accept="image/*"
		:image="true"
		:preview="preview"
		:list-type="record.options.listType"
		:multiple="record.options.multiple"
		:action="record.options.action"
		:limit="record.options.limit"
		:limit-size="record.options.limitSize"
		:upload-auto-hidden="record.options.uploadHidden"
	/>
</template>

<script setup>
import { ref, onBeforeMount, inject, computed, watch, isRef } from 'vue'
import { useFormItem } from '../../../mixin.js'
import { useLocale } from '../../../../../locale/mixin.js'
import { getConfigCache } from '../../../../../utils/cache.js'
import Upload from '../upload.vue'

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
const ngConfigRaw = inject('$ngofrm_config', {})

// 确保 ngConfig 是 ref
const ngConfig = isRef(ngConfigRaw) ? ngConfigRaw : ref(ngConfigRaw)

// 使用 useLocale 获取 locale key 用于响应式语言切换
const { locale } = useLocale()
const localeKey = locale

// 使用 useFormItem composable
const {
	recordDisabled,
	updateArrayDefaultValue
} = useFormItem(props, props.models, emit)

// 计算属性 - 上传配置
const uploadConfig = computed(() => {
	let config_ = ngConfig.value?.uploadConfig
	if (config_) {
		return config_
	}
	config_ = getConfigCache()
	if (config_ && config_.uploadConfig) {
		return config_.uploadConfig
	}

	return {}
})

// 监听上传配置变化
watch(uploadConfig, () => {
	initConfig()
})

// 方法 - 初始化配置
const initConfig = () => {
	const uploadConfig_value = uploadConfig.value

	const action = props.record.options.action
	if (!action && uploadConfig_value && uploadConfig_value.uploadUrl) {
		props.record.options.action = uploadConfig_value.uploadUrl
	}

	const filePath = props.record.options.responseFileUrl
	const fileIdPath = props.record.options.responseFileId

	if (!filePath && uploadConfig_value && uploadConfig_value.filePath) {
		props.record.options.responseFileUrl = uploadConfig_value.filePath
	}
	if (!fileIdPath && uploadConfig_value && uploadConfig_value.fileIdPath) {
		props.record.options.responseFileId = uploadConfig_value.fileIdPath
	}
}

// 生命周期
onBeforeMount(() => {
	initConfig()
	updateArrayDefaultValue()
})
</script>
