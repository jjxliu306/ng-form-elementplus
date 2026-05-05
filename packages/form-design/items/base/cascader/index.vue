<template>
	<el-cascader
		:key="'cascader-' + record.key + localeKey"
		v-if="!preview"
		ref="cascader"
		v-model="models[record.model]"
		:options="(record.options.dynamic == 1 && record.options.remoteFunc ? checkValues : record.options.options)"
		:style="`width:${record.width}`"
		:placeholder="record.options.placeholder"
		:filterable="record.options.showSearch"
		:clearable="record.options.clearable"
		:props="itemProp"
		:disabled="recordDisabled"
		@change="handleChange($event)"
		@focus="handleFocus"
		@blur="handleBlur"
	/>
	<span v-else>
		{{models[record.model+'_label']}}
	</span>
</template>

<script setup>
import { ref, computed, onBeforeMount, nextTick, inject } from 'vue'
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

// Refs
const cascader = ref(null)

// 使用 useDataSource composable
const {
	recordDisabled,
	checkValues,
	updateArrayDefaultValue,
	initDynamicValue,
	handleFocus,
	handleBlur,
	linkageData,
	linkageDataHandle
} = useDataSource(props, props.models, emit)

// 计算属性 - 级联选择器配置
const itemProp = computed(() => ({
	children: 'children',
	value: 'value',
	label: 'label',
	multiple: props.record.options.multiple
}))

// 方法 - 值变化处理
const handleChange = (value) => {
	let labels = []

	if (cascader.value) {
		const checkNodes = cascader.value.getCheckedNodes()

		for (let i = 0; i < checkNodes.length; i++) {
			const v = checkNodes[i]
			const vText = v.text
			if (vText) {
				labels.push(vText)
			}
		}
		const modelLabel = props.record.model + '_label'
		props.models[modelLabel] = labels.join(',')
	}
}

// 生命周期
onBeforeMount(() => {
	updateArrayDefaultValue()

	// 如果是静态数据 判断当前是否有值 是否要回填默认值
	if (props.record.options.dynamic == 0
		&& props.models
		&& (
			!Object.prototype.hasOwnProperty.call(props.models, props.record.model)
			|| props.models[props.record.model] == undefined)
		) {

		if (props.record.options.defaultValue != null && props.record.options.defaultValue.length > 0) {
			props.models[props.record.model] = props.record.options.defaultValue
		}
	}

	// 判断如果是远程方法的话 远程请求数据
	initDynamicValue()

	// 判断是否有联动关联需要处理
	if (linkageData.value) {
		linkageDataHandle(false)
	}

	// 判断如果已经有了值 但没有label 则尝试回填label
	const value = props.models[props.record.model]
	if (value && value.length > 0) {
		nextTick(() => {
			handleChange(value)
		})
	}
})
</script>
