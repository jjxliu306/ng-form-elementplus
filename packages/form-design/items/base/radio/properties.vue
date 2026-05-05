<template>
<el-collapse-item name="data" :title="t('ngform.item.datasource')">
  <DatasourceConfig :selectItem="selectItem">
  </DatasourceConfig>
</el-collapse-item>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'radio-properties'
})
</script>

<script setup>
import DatasourceConfig from '../select/datasource-config.vue'
import { useLocale } from '../../../../locale/mixin.js'

// 使用 useLocale composable
const { t } = useLocale()

// Props
defineProps({
  selectItem: {
    type: Object
  }
})
</script>
