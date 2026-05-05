<template>
<el-collapse-item name="tabs" :title="t('ngform.item.tab.name')">
<el-form class="layout-tabs-properties"  size="small" label-width="80px" label-position="top" >
	<el-form-item  :label="t('ngform.item.tab.name')" v-if="selectItem && selectItem.columns && selectItem.columns.length > 0">
     <TabProperties :value="selectItem.columns" />
  </el-form-item>
</el-form>
</el-collapse-item>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'tabs-properties'
})
</script>

<script setup>
import TabProperties from './tabs-properties.vue'
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

<style  >
.layout-tabs-properties {
  padding: 20px;
}
</style>
