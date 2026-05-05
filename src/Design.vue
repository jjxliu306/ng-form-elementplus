<template>
	<ng-form-design ref="formDesign" :template.sync="template">
		<template #controlButton>
			<el-popover
				placement="bottom-start"
				title="示例"
				width="240px"
				trigger="hover">
				<div>
					<el-row :gutter="20">
						<el-col :span="11" v-for="item in examples" :key="item.name" class="example-col">
							<span class="example-span" @click="initDemo(item)">{{item.name}}</span>
						</el-col>
					</el-row>
				</div>
				<template #reference>
					<el-button style="margin: 0px 10px;" icon="Document" text size="small">示例</el-button>
				</template>
			</el-popover>

			<el-select v-model="i18n" style="width: 100px;" placeholder="语言" size="small" @change="changeI18n">
				<el-option
					v-for="item in i18nList"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</template>

		<!-- 移除默认的扩展属性占位符文本 -->
	<!-- <template #form-extend-properties>
			<span>表单属性扩展</span>
		</template>
		<template #custom-properties>
			<span>组件属性扩展</span>
		</template> -->
	</ng-form-design>
</template>

<script setup>
import { ref } from 'vue'

const formDesign = ref(null)

const template = ref({
	list: [],
	config: {
		labelPosition: "left",
		labelWidth: 100,
		size: 'small',
		outputHidden: true,
		hideRequiredMark: false,
		syncLabelRequired: false,
		customStyle: ""
	}
})

const examples = ref([
	{name:'基础示例', path: 'basic.json'},
	{name:'select远程联动', path: 'select远程联动.json'},
	{name:'动态表格', path: 'tablebatch.json'},
	{name:'效验', path: 'validator1.json'},
	{name:'组件联动', path: '组件联动.json'},
	{name:'焦点事件', path: '组件获取焦点事件.json'},
])

const i18n = ref('zh_cn')
const i18nList = ref([
	{label: '中文简体', value: 'zh_cn'},
	{label: 'English', value: 'en'}
])

const initDemo = (row) => {
	const path = row.path

	const files = import.meta.glob('./data/*.json', { eager: true })
	console.log('files', files)

	let formTemplate = undefined
	for(let key in files) {
		if(key.indexOf(path) >= 0) {
			formTemplate = files[key].default
			break
		}
	}

	if(formTemplate) {
		formDesign.value.initModel(formTemplate)
		template.value = formTemplate
	}
}

const changeI18n = (v) => {
	formDesign.value.useLocale(v)
}
</script>

<style>
html, body {
	height:100%;
	margin: 0px;
}

.example-col {
	font-size: 12px;
	display: block;
	line-height: 26px;
	position: relative;
	float: left;
	left: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 2px;
	color: #333;
	border: 1px solid #F4F6FC;
	text-align: center;
}

.example-col .example-span {
	cursor: pointer;
	background: #f9f9f9;
	border-radius: 4px;
	border: 1px solid #ebebeb;
	height: 45px;
	position: relative;
	width: 100%;
	transition: 0.15s ease-in-out;
	transition-property: transform;
	will-change: transform;
}

#app {
	height:100%;
}
</style>
