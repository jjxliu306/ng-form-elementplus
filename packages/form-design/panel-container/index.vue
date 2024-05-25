<template> 
<div class="form-panel" > 
     
    <p class="no-data-text" v-if="!formTemplate || !formTemplate.list || formTemplate.list.length === 0" :class="[arrow ? 'arrow_open' : 'arrow_hidden']" :key="formKey">
      <!-- 从左侧选择组件添加 -->
      {{t('ngform.select_item')}}
    </p>
    <el-form  
      	:label-width="formTemplate.config.labelWidth + 'px'" 
      	class="ng-form"
      	:label-position="formTemplate.config.labelPosition"
      	:hide-required-asterisk="formTemplate.config.hideRequiredMark" 
      	:label-suffix="formTemplate.config.labelSuffix"
      	ref="form" 
      	:models="models"
      	:style="formTemplate.config.customStyle" 
      	:size="formTemplate.config.size"
    	>  
	    <el-row :gutter="20" class="row "> 
	    	<draggable
	        tag="div"
	        class="draggable-box items-main"
	        v-bind="{
	            group: 'form-draggable' ,
	            ghostClass: 'moving',
	            animation: 180,
	            handle: '.drag-move'
	        }"  
			    :list="formTemplate.list" 
			    @add="dragEnd($event)" 
				data-draggable="true"
	        	item-key="key"  
	        >
	          <template #item="{element}">
	               
	               		<ng-form-node   
						       :key="element.key" 
				        		class="drag-move"  
				            	:record="element"
				            	:isDrag="true"
				            	:models="models"
				            	:config="formTemplate.config"
				            	:selectItem="selectItem"
				            	@handleSelectItem="handleSelectItem"
				            	@handleCopy="handleCopy(element)"
				            	@handleDetele="handleDetele(element)"
				            	>  
				        		</ng-form-node>
	               
	            </template>
	        </draggable> 
	     
	    </el-row> 
	</el-form> 
</div> 
</template>
<script> 
//import cloneDeep from 'lodash/cloneDeep'
import { cloneDeep , cloneDeepAndFormat } from '../../utils/index.js'
import Bus from '../../utils/bus.js' 
import draggable from "vuedraggable"
//import Node from './node.vue'
import LocalMixin from '../../locale/mixin.js'
export default {
	mixins: [LocalMixin],
	name: 'ng-form-container' ,
	components:{
		//Node,
		draggable
	},
	data(){
		return {
			 formKey: '1',
			 models: {}
		}
	},
	props: {
		formTemplate: {
			type: Object ,
			required: true
		},
		selectItem: {
			type: Object
		},
		arrow: {
			type: Boolean,
			default: false
		}
	}, 
	mounted() {
    
    Bus.on('i18nRefresh', () => { 
      this.formKey = new Date().getTime()
       
    });
  },
	methods: {
	 	dragEnd(evt, list) {   
	 		// 复制一遍
	 		const clone = cloneDeepAndFormat(this.formTemplate.list[evt.newIndex] , evt)
	 		delete clone.icon 
	 		this.formTemplate.list[evt.newIndex] = clone

	 		 
 			this.$emit("update:formTemplate", this.formTemplate);
		  // 拖拽结束,自动选择拖拽的控件项 
		  this.handleSelectItem(this.formTemplate.list[evt.newIndex])
	  },
	  	handleSelectItem(record) {
	    	this.$emit('handleSelectItem' , record)
	  	},
	  	handleCopy(item){ 
	  		const nitem = cloneDeepAndFormat(item)
	  		const key = item.type + "_" + new Date().getTime() 
	  		nitem.key = key
	  		nitem.model = key
 
	  		// 找到index 插入
	  		const oindex = this.formTemplate.list.findIndex(t=>t.key == item.key)
	   
	  		if(oindex >= 0) {
	  			// insert 
	  			this.formTemplate.list.splice(oindex + 1 , 0, nitem)

	  		}

	  	},
	  	handleDetele(item) {
	  		const oindex = this.formTemplate.list.findIndex(t=>t.key == item.key)
	  		if(oindex >= 0) {
	  			this.formTemplate.list.splice(oindex , 1);

	  			// 当前selectItem重置
	  			this.handleSelectItem(undefined)
	  		}
	  	}
	}
}
</script>
<style>
.form-panel {
  height: 100%;
  min-height: 500px;
}

.form-panel .no-data-text {
  
  text-align: center;
 
  height: 50px; 
  width: calc(100% - 370px - 260px);
  position: absolute;
  top: 40%;
   
   
  font-size: 20px;
  font-weight: 700;
}

.form-panel .no-data-text.arrow_open {
	width: calc(100% - 260px);
}

.form-panel .no-data-text.arrow_hidden {
	width: calc(100% - 370px - 260px);
}

.form-panel .row {
  height: 100%;
  min-height: 500px;
}

.form-panel .ng-form {
  height: 100%;
  min-height: 500px;
}

.form-panel .ng-form .draggable-box {
  height: 100%;
  overflow: auto;
  width: 100%;
  
}

.form-panel .ng-form .items-main {
  height: 100%;
  width: 100%;
  min-height: 500px;
  padding: 0px 10px;
}

.form-panel .ng-form .drag-move {
  width: 100%;
  float: left;
}

</style>
<!-- <style lang="scss">
.form-panel {
	height: 100%; 
	min-height: 500px;
	.no-data-text {
		text-align: center;
	    width: 200px;
	    height: 50px;
	    position: absolute;
	    top: 40%;
	    left: 50%;
	    -webkit-transform: translate(-50%,-50%);
	    font-size: 20px;
	    font-weight: 700;
	}

	.row {
		height: 100%; 
		min-height: 500px;
	}

	.ng-form {
		height: 100%; 
		min-height: 500px;
		.draggable-box {
			height: 100%;
			overflow: auto;
			width: 100%;
			min-height: 500px;
		}
		.items-main {
			height: 100%; 
			width: 100%;
			min-height: 500px;
			padding: 0px 10px;
		}

		.drag-move {
			width: 100%;
		}
	}

 
}
</style> -->