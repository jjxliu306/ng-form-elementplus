<template>
	<el-radio-group
		v-if="!preview"
		:key="'radio-' + record.key + localeKey"
		v-model="models[record.model]"
		:disabled="recordDisabled"
		:placeholder="record.options.placeholder"
		@change="handleChange($event)"
		@focus="handleFocus"
		@blur="handleBlur"
		>
		<template v-for="(radioitem, index) in checkList">
			<el-radio :value="radioitem[itemProp.value]" :key="index" v-if="itemVisible(radioitem)">
				{{radioitem[itemProp.label]}}
			</el-radio>
		</template>
	</el-radio-group>
	<span v-else>
		{{models[record.model+'_label']}}
	</span>
</template>

<script setup>
import { computed, onBeforeMount, inject } from 'vue'
import { useDataSource } from '../select/datasource-mixin.js'
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

// 使用 useDataSource composable
const {
	recordDisabled,
	itemProp,
	checkValues,
	updateSimpleDefaultValue,
	initDynamicValue,
	handleChange,
	itemVisible,
	handleFocus,
	handleBlur,
	linkageData,
	linkageDataHandle
} = useDataSource(props, props.models, emit)

// 计算属性 - 选项列表
const checkList = computed(() => {
	if (
		(props.record.options.dynamic == 1 && props.record.options.remoteFunc) ||
		(props.record.options.dynamic == 2 && props.record.options.dictType)
	) {
		return checkValues.value
	} else {
		return props.record.options.options
	}
})

// 生命周期
onBeforeMount(() => {
	updateSimpleDefaultValue()

	// 判断如果是远程方法的话 远程请求数据
	initDynamicValue()

	// 判断是否有联动关联需要处理
	if (linkageData.value) {
		linkageDataHandle(false)
	}

	// 判断如果已经有了值 但没有label 则尝试回填label
	const modelsValue = props.models
	const value = modelsValue[props.record.model]
	if (value && value.length > 0) {
		handleChange(value)
	}
})
</script>
