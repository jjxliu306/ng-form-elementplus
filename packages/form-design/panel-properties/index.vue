<template>
	<el-tabs type="card" v-model="active" class="design-properties" >
	    <el-tab-pane name="item" class="tab-pane">
	    	<template #label>
	        <span class="ng-properties-tabs-label" :key="formKey"> 
	          {{t('ngform.properties.feature_property')}}
	        </span>
	      </template>
	    	<ItemProperties :selectItem="selectItem">
	    	 	<template #custom-properties  >
                    <slot name="custom-properties" :selectItem="selectItem"></slot>
                </template>
	    	</ItemProperties>
	    </el-tab-pane> 
	    <el-tab-pane name="form" class="tab-pane"> 	<template #label>
	        <span class="ng-properties-tabs-label" :key="formKey"> 
	          {{t('ngform.properties.form_property')}}
	        </span>
	      </template>
	    	<FormProperties :config="config">
	    	 	<template #form-extend-properties  >
                    <slot name="form-extend-properties"  ></slot>
                </template> 
	    	</FormProperties>
	    </el-tab-pane> 

	    <slot name="extend-tab" class="tab-pane">
	     	<!-- 扩展插槽,扩展对应要素属性 -->
	    </slot> 
	</el-tabs> 
</template>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'
import FormProperties from './form-properties.vue'
import ItemProperties from './item-properties.vue'
import { useLocale } from '../../locale/mixin.js'
import Bus from '../../utils/bus.js'

// Props
const props = defineProps({
  selectItem: {}
})

// Injects
const configC = inject('configC', null)

// 使用 useLocale composable
const { t } = useLocale()

// Data
const active = ref('item')
const formKey = ref('12')

// Computed
const config = computed(() => {
  return configC ? configC() : {}
})

const selectItemKey = computed(() => {
  if (props.selectItem && props.selectItem.key) {
    return props.selectItem.key
  }
  return null
})

// Watch
watch(selectItemKey, (val) => {
  if (val) {
    active.value = 'item'
  }
})

// Lifecycle
onMounted(() => {
  Bus.on('i18nRefresh', () => {
    formKey.value = new Date().getTime()
  })
})

onUnmounted(() => {
  Bus.off('i18nRefresh')
})
</script>
<style>
.design-properties div, .design-properties label, .design-properties span {
  font-size: 13px;
}

.design-properties .tab-pane {
  padding: 0px 15px 0px 0px;
}

</style>
<!-- <style lang="scss">
.design-properties {
 

	div , label , span  {
		font-size: 13px;
	}

	.tab-pane {
		padding: 0px 15px 0px 0px;
	}

}
</style> -->