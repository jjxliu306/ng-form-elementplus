<template>
	<div>
		<div v-if="preview || disabled">
			<!-- 判断图片还是文件列表 -->
			<div v-if="accept && accept.indexOf('image') >= 0 && listType && listType.indexOf('picture-card') >= 0">
				<ul>
					<li style="float:left;margin-right:20px;list-style: none;" v-for="(item,index) in fileList" :key="index">
						<img @click="reviewDown(item)" :src="item.url" :class="[direction == null || direction == false?'avatar':'vertical']" style="max-height: 150px;max-width: 150px;cursor: pointer;">
					</li>
				</ul>
			</div>

			<ul v-else class="el-upload-list el-upload-list--text">
				<li v-for="(item,index) in fileList" :key="index" :tabindex="index" class="el-upload-list__item pointer" style="cursor: pointer;"
					@click="fileDown(item)">
					<a class="el-upload-list__item-name " style="cursor: pointer;">
						<el-icon><Document /></el-icon>{{item.name}}
					</a>

					<label class="el-upload-list__item-status-label">
						<el-icon><SuccessFilled /></el-icon>
					</label>
				</li>
			</ul>
		</div>
		<el-upload
			v-else
			class="ng-form-upload"
			:class="{'upload': !uploadVisible}"
			:action="uploadAction"
			:drag="drag"
			:disabled="disabled"
			:multiple="false"
			:limit="limit"
			:headers="uploadHeader"
			:accept="accept"
			:list-type="listType"
			:with-credentials="withCredentials"
			:before-upload="beforeUpload"
			:on-success="handleSuccess"
			:on-remove="handleRemove"
			:on-preview="handlePreview"
			:auto-upload="autoUpload"
			:file-list="fileList">

			<template #trigger v-if="uploadVisible">
				<el-button v-if="listType != 'picture-card'" :disabled="disabled" size="small" type="primary">选取文件</el-button>
				<el-icon v-else><Plus /></el-icon>
			</template>
			<template #tip v-if="tip != undefined">
				<div class="el-upload__tip">{{tip}}</div>
			</template>
		</el-upload>

		<!--图片查看-->
		<el-dialog :append-to-body="true" v-model="dialogVisible">
			<div class="ng-form-image-preview">
				<img width="100%" :src="dialogImageUrl" alt="">
			</div>
		</el-dialog>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject } from 'vue'
import { useLocale } from '../../../../locale/mixin.js'
import objectPath from 'object-path'

// Props
const props = defineProps({
	value: {
		type: Array,
		default: () => { return [] }
	},
	action: {
		type: String
	},
	disabled: {
		type: Boolean,
		default: false
	},
	multiple: {
		type: Boolean,
		default: false
	},
	accept: {
		type: String
	},
	image: {
		type: Boolean,
		default: false
	},
	listType: {
		type: String,
		default: 'text'
	},
	limit: {
		type: Number
	},
	withCredentials: {
		type: Boolean,
		default: false
	},
	autoUpload: {
		type: Boolean,
		default: true
	},
	tip: {
		type: String
	},
	drag: {
		type: Boolean,
		default: false
	},
	record: {
		type: Object
	},
	preview: {
		type: Boolean,
		default: false
	},
	imgDownBut: {
		type: Boolean,
		default: true
	},
	uploadAutoHidden: {
		type: Boolean,
		default: false
	}
})

// Emits
const emit = defineEmits(['update:value'])

// Injects
const ngConfig = inject('$ngofrm_config', {})

// 使用 useLocale composable
const { t } = useLocale()

// Data
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const fileList = ref([])

// Computed
const uploadAction = computed(() => {
	let uploadUrl = props.action
	if (window.nghttpConfig) {
		const uconfig = window.nghttpConfig({ headers: {} })
		if (uconfig.baseURL) {
			return uconfig.baseURL + uploadUrl
		}
	}
	return uploadUrl
})

const uploadVisible = computed(() => {
	if (props.preview || props.disabled) return false
	if (!props.multiple && props.value && props.value.length > 0) return false
	if (props.multiple && props.value && props.value.length >= props.limit) return false

		if (!props.uploadAutoHidden) return true

		return true
})

const uploadHeader = computed(() => {
	let hs = {}
	if (props.record && props.record.options && props.record.options.headers) {
		props.record.options.headers.forEach(t => {
			hs[t.label] = t.value
		})
	}

	const nghttpConfig = window.nghttpConfig
	if (nghttpConfig) {
		const config = { headers: {} }
		nghttpConfig(config)
		hs = { ...hs, ...config.headers }
	}
	return hs
})

const uploadResponseFileUrl = computed(() => {
	if (props.record && props.record.options && props.record.options.responseFileUrl) {
		return props.record.options.responseFileUrl
	}
	return null
})

const uploadResponseFileId = computed(() => {
	if (props.record && props.record.options && props.record.options.responseFileId) {
		return props.record.options.responseFileId
	}
	return null
})

const direction = computed(() => {
	// 可以根据需要添加方向逻辑
	return null
})

// Watch
watch(() => props.value, (val) => {
	if (val && val.length > 0) {
		const valueNames = val.map(t => t.name).join(',')
		const fileListNames = fileList.value.map(t => t.name).join(',')
		if (fileListNames != valueNames) {
			fileList.value = val
		}
	} else {
		fileList.value = []
	}
})

// Methods
const beforeUpload = (file) => {
	const fileName = file.name
	const ltSize = file.size / 1024 / 1024

	const index1 = fileName.lastIndexOf(".")
	const index2 = fileName.length
	const fileSuffix = fileName.substring(index1 + 1, index2)

	const fileType = file.type
	if (
		props.accept &&
		props.accept.indexOf("image") >= 0 &&
		!isAssetTypeAnImage(fileSuffix)
	) {
		// ElMessage.error 需要从 element-plus 引入
		console.error(t('ngform.item.upload.error_img_filetype') + "[png,jpg,jpeg,bmp]")
		return false
	}

	if (props.record.options.limitSize && ltSize > props.record.options.limitSize) {
		console.error(t('ngform.item.upload.error_max_size') + (props.record.options.limitSize) + "MB!")
		return false
	}
	return true
}

const isAssetTypeAnImage = (ext) => {
	return ["png", "jpg", "jpeg", "bmp"].indexOf(ext.toLowerCase()) !== -1
}

const handleSuccess = (response, file, fileList_param) => {
	const responseFileUrl_val = uploadResponseFileUrl.value
	const fileUrl = objectPath.get(response, responseFileUrl_val)

	if (fileUrl) {
		const uploadData = {
			name: file.name,
			size: file.size,
			url: fileUrl
		}

		// 文件id
		if (uploadResponseFileId.value) {
			const fileId = objectPath.get(response, uploadResponseFileId.value)
			uploadData['id'] = fileId
		}

		props.value.push(uploadData)
		emit("update:value", props.value)
		file.url = fileUrl
	}
}

const handleRemove = (file, fileList_param) => {
	const name = file.name
	const deleteIndex = fileList_param.findIndex(t => t.name == name)

	props.value.splice(deleteIndex, 1)
	emit("update:value", props.value)
}

const handlePreview = (file) => {
	console.log('handlePreview file', file)
	fileDown(file)
}

const reviewDown = (file) => {
	console.log('reviewDown', file)
	handlePreview(file)
}

const fileDown = (file) => {
	console.log('file', file)
	console.log('fileurl', file.url)
	if (file.url) {
		console.log('this.image', props.image)
		if (props.image) {
			dialogVisible.value = true
			dialogImageUrl.value = file.url
		} else {
			window.open(file.url)
		}
	} else {
		console.error(t('ngform.item.upload.error_not_found_file'))
	}
}

// Lifecycle
onMounted(() => {
	if (props.value == null || props.value == undefined) {
		fileList.value = []
	} else {
		fileList.value = props.value
	}
})
</script>

<style>
.ng-form-upload.upload .el-upload {
	display: none;
}

.ng-form-image-preview {
	height: 400px;
	width: 100%;
	text-align: center;
}

.ng-form-image-preview img {
	height: 400px;
	width: auto;
}
</style>
