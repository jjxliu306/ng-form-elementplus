<template>
<div>
	<div class="layout-grid-col-pro" v-for="(val, index) in value" :key="index">
        <el-col :span="18">
        	<el-input-number
	            style="width:100%"
	            :max="24"
	            v-model="val.span"
	            :placeholder="t('ngform.item.name')"
        	/>
       	</el-col>
        <el-col :span="6">
        	<div @click="handleDelete(index)" class="delete" :title="t('ngform.item.delete')">
              <el-icon><Delete /></el-icon>
         	</div>
     	</el-col>
    </div>
    <div v-if="!disabled" :span="24">
    	<el-button type="primary" @click="handleAddCol">{{t('ngform.item.add')}}</el-button>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'grid-col-properties'
})
</script>

<script setup>
import { Delete } from '@element-plus/icons-vue'
import { useLocale } from '../../../../locale/mixin.js'

// 使用 useLocale composable
const { t } = useLocale()

// Props
const props = defineProps({
	value: {
		type: Array,
		required: true
	},
	disabled: {
		type: Boolean,
		default: false
	}
})

// Emits
const emit = defineEmits(['update:value'])

// Methods
const handleAddCol = () => {
  // 添加栅格Col
  const addData = {
  	span: 12,
    list: []
  }

  props.value.push(addData)

  emit("update:value",  props.value)
}

const handleDelete = (deleteIndex) => {
  // 删除
  props.value.splice(deleteIndex, 1)
  emit("update:value", props.value)
}
</script>

<style>
.layout-grid-col-pro .delete {
  margin-left: 10px;
  background: #ffe9e9;
  color: #f22;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

</style>
