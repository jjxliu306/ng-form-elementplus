<!--
k-v配置
-->
<!--
  修改多选、下拉、单选等控件options的组件，添加移除校验规制的组件
-->

<template>
  <div class="ng-form-kvlist">
    <el-row   :gutter="8" :key="key">
      <div class="option-change-box" v-for="(val, index) in value" :key="index">
        <el-col :span="9" :title="keyNumber ? t('ngform.item.value') : t('ngform.item.label')">
          <el-input v-if="keyNumber" v-model="val.value"  type="number"  :placeholder="t('ngform.item.value')"/>
          <el-input v-else v-model="val.label" type="text" :placeholder="t('ngform.item.name')"/>
        </el-col>
        <el-col :span="9" :title="keyNumber ? t('ngform.item.label') : t('ngform.item.value')">
          <el-input v-if="keyNumber" v-model="val.label" :placeholder="t('ngform.item.name')"/>
          <el-input v-else v-model="val.value" :placeholder="t('ngform.item.value')"/>
        </el-col>
        <el-col :span="6">
    	<div @click="handleDelete(index)" class="option-delete-box" :title="t('ngform.item.delete')">

               <el-icon><Delete /></el-icon>
    	</div>
    	</el-col>
      </div>
      <el-col v-if="!disabled" :span="24">
        <el-button type="primary" @click="handleAdd">
            {{t('ngform.item.add')}}
      </el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-form-kv'
})
</script>

<script setup>
import { computed } from 'vue'
import { t } from '../locale/index.js'

// Props
const props = defineProps({
  value: {
    type: Array,
    default: () => [],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // key必须为数字 2021-02-17 lyf
  keyNumber: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:value'])

// Computed
const key = computed(() => props.value.length)

// Methods
const handleAdd = () => {
  props.value.push({
    value: "",
    label: ""
  })
  emit("update:value", props.value)
}

const handleDelete = (deleteIndex) => {
  props.value.splice(deleteIndex, 1)
  emit("update:value", props.value)
}
</script>

<style>
 .ng-form-kvlist {
  padding-left: 10px;
}

.ng-form-kvlist .el-input__inner {
  padding: 0px;
}

.ng-form-kvlist .option-change-box {
  height: 38px;
  padding-bottom: 6px;
}

.ng-form-kvlist .option-change-box .option-delete-box {
  margin-top: 3px;
  background: #ffe9e9;
  color: #f22;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
}

.ng-form-kvlist .option-change-box .option-delete-box:hover {
  background: #f22;
  color: #fff;
}

.ng-form-kvlist .el-col {
  float: left;
}

</style>
