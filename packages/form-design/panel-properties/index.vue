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
	    	 	<template #form-extend-properties >
            <slot name="form-extend-properties"  ></slot>
          </template> 
	    	</FormProperties>
	    </el-tab-pane> 

	    <slot name="extend-tab" class="tab-pane">
	     	<!-- 扩展插槽,扩展对应要素属性 -->
	    </slot> 
	</el-tabs> 
</template>
<script>
import FormProperties from './form-properties.vue'
import ItemProperties from './item-properties.vue'
import LocalMixin from '../../locale/mixin.js'
import Bus from '../../utils/bus.js'
export default {
	mixins: [LocalMixin],
	components: {
		FormProperties , ItemProperties
	},
	props: { 
		selectItem: { 
		}
	},
	data() {
		return {
			active: 'item',
			formKey: '12',
		}
	}, 
	inject: ['configC'], // 表单全局config配置 
	computed: {
		config() {
			return this.configC() || {}
		},
		selectItemKey() {
			if(this.selectItem && this.selectItem.key){
				return this.selectItem.key
			}
			return null
		}
	},
	mounted() {
    
    Bus.on('i18nRefresh', () => { 
      this.formKey = new Date().getTime()
       
    });
  },
	watch: {
		selectItemKey(val){
			if(val) {
				this.active = 'item'
			}
		}
	}
}
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