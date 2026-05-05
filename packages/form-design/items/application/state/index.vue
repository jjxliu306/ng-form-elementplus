<template>
<div v-if="!preview">

        <ng-state
                v-if="selectType == 'select'"
                v-model="models[record.model]"
                :preview="preview"
                :models="models"
                :record="record"
                :config="config"
                :isDragPanel="isDragPanel"
                :disabled="recordDisabled"
        />
        <NgStateCascader v-else
                v-model="models[record.model]"
                :preview="preview"
                :models="models"
                :record="record"
                :config="config"
                :isDragPanel="isDragPanel"
                :disabled="recordDisabled"
        />

</div>
<div v-else>
 <ng-state

      v-model="models[record.model]"
      :preview="true"
      :models="models"
      :record="record"
      :config="config"
    />
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-form-state'
})
</script>

<script setup>
import { computed, onMounted } from 'vue'
import { useFormItem } from '../../mixin.js'
import NgState from './state.vue'
import NgStateCascader from './cascader.vue'

// Props
const props = defineProps({
  record: {
    type: Object,
    required: true
  },
  models: {
    type: Object,
    required: true
  },
  preview: {
    type: Boolean,
    default: false
  },
  config: {
    type: Object,
    default: () => ({})
  },
  isDragPanel: {
    type: Boolean,
    default: false
  }
})

// 使用 useFormItem composable
const { recordDisabled } = useFormItem(props, props.models, {})

// Computed
const selectType = computed(() => {
  return props.record.options.selectType || 'select'
})

// Lifecycle
onMounted(() => {
  // 可以在这里添加初始化逻辑
})
</script>
