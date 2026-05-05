<template>
<el-collapse-item name="grid" :title="t('ngform.item.grid.columns')">
<el-form class="layout-grid-properties"  size="small" label-width="80px" label-position="top" >
	<el-form-item  :label="t('ngform.item.grid.config')" v-if="selectItem && selectItem.columns && selectItem.columns.length > 0">
     <ColProperties :value="selectItem.columns" />
  </el-form-item>
</el-form>
</el-collapse-item>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'grid-properties'
})
</script>

<script setup>
import ColProperties from './grid-col-properties.vue'
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

<style>
.layout-grid-properties {
  padding: 20px;
}
</style>
