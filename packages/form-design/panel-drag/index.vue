 
<template> 
		<el-collapse class="drag-panel" v-model="actives" accordion :key="refreshKey"> 

			<template v-for="(colItem,colIndex) in dataList"> 
				<el-collapse-item :key="colIndex + formKey" :title="getLabel(colItem.name)" :name="colIndex + 1" v-if="colItem && colItem.list && colItem.list.length > 0">

					<template #title>
					    <span class="title">{{getLabel(colItem.name)}}</span>
					</template>
			  		<DragItem 
		                :list="itemInitArray(colItem.list)"
                    :title="getLabel(colItem.name)"
		                @generateKey="generateKey"  
		                @dragend="handleEnd"/>
			  	</el-collapse-item>
			</template> 
		</el-collapse>  
</template>
<script>
import itemIndex from "../items/index.js"
import DragItem from './drag-item.vue'
//import cloneDeep from 'lodash/cloneDeep' 
import LocalMixin from '../../locale/mixin.js'
import { cloneDeep } from '../../utils/index.js'
import { getComponentCache } from '../../utils/cache.js'
import Bus from '../../utils/bus.js'
export default {
  mixins: [LocalMixin],
	components: {
		DragItem
	},
	props: {
		//基础组件是否要展示或待选组件列表集合
	    basicItem: {
	      type: [Array,Boolean],
	      default: true
	    },
	    //装饰组件是否要展示或待选组件列表集合
	    decorateItem: {
	      type: [Array,Boolean],
	      default: true
	    }, 
	    //布局组件是否要展示或待选组件列表集合
	    layoutItem: {
	      type: [Array,Boolean],
	      default: true
	    },
	    //应用组件是否要展示或待选组件列表集合
	    applicationItem: {
	      type: [Array,Boolean],
	      default: true
	    }
	},
	computed: {
		// 修改dataList获取增加props数据的过滤 
		dataList() { 
			//第一层过滤
			const this_ = this 
			const list = cloneDeep(itemIndex)
			let items = list.filter(t=> {
				if(t.type == 'basic' && this_.basicItem ){
					return true 
				} else if(t.type == 'layout' && this_.layoutItem ){
					return true 
				} else if(t.type == 'application' && this_.applicationItem ){
					return true 
				} else if(t.type == 'decorate' && this_.decorateItem ){
					return true 
				}
				return false
			})

			// 子集遍历
			items.map(t=> {
				if(t.type == 'basic' && this_.basicItem instanceof Array) {
					const listChildren = t.list.filter(n=> this_.basicItem.includes(n.type))

					t.list = listChildren
				} else if(t.type == 'layout' && this_.layoutItem instanceof Array) {
					const listChildren = t.list.filter(n=> this_.layoutItem.includes(n.type))

					t.list = listChildren
				} else if(t.type == 'application' && this_.applicationItem instanceof Array) {
					const listChildren = t.list.filter(n=> this_.applicationItem.includes(n.type))

					t.list = listChildren
				} else if(t.type == 'decorate' && this_.decorateItem instanceof Array) {
					const listChildren = t.list.filter(n=> this_.decorateItem.includes(n.type))

					t.list = listChildren
				}
			})


			// 判断有没有自定义组件 如果有则加上
			if(this.customComponents && this.customComponents.length > 0) {

				items.push({
					type: 'custom',
					name: this.$t('ngform.item.custom_components') ,//'自定义组件',
					list: this.customComponents
				})

			}

			return items
		},
		customComponents() {
			const cms = getComponentCache()
			return cms 
		}
		
	},
	watch: {
		customComponents(val) {
			this.refreshKey++
		}
	},
	inject: {
    	// 自定义组件
      	// customComponents: {
       //  	from: 'customC',
       //  	default: ()=>[]
      	// } 
  },
	data(){
		return {
			actives:[1], 
		  startType: "",
		  formKey: '',
		  refreshKey: 1 ,
		    //dataList: itemIndex ,
		  data: {
		    list: [],
		    config: {
		    	layout: "horizontal",
		      labelCol: { span: 4 },
		      wrapperCol: { span: 18 },
		      hideRequiredMark: false,
		      customStyle: ""
		    }
		  },
		  previewOptions: {
		    width: 850
		  }, 
		  selectItem: {
		    key: ""
		  } 
		}
	}, 
	mounted () {  
    Bus.on('i18nRefresh', () => { 
      this.formKey = new Date().getTime()
       
    });
  },
	methods: {
		// 组件初始化
		itemInitArray(list = []) {
			const nlist = cloneDeep(list)
	    	if(nlist && nlist.length > 0) {
	    		nlist.forEach((t , idx)=>{ 
	        		if(!t.key) { 
	        		 	const key = t.type + "_" + new Date().getTime() + '' + idx
	        		 	t['key'] = key 
	        		 	t['model'] = key

	        		 	delete t.component
	        		 	delete t.properties 
	        		 	delete t.seq 
	        		}
		      	}) ;

	    	} 
	    	
	      	return nlist
		},
		generateKey(list, index) {
			 	console.log('list' , list)
			 	console.log('index' , index )
			 	if(!index) return 
			  const key = list[index].type + "_" + new Date().getTime();

	      const nData = cloneDeep(list[index])
	      nData.key = key 
	      nData.model = key 
	      
	      list[index] = nData

	      console.log('generateKey' , key )
	       
 
	    },
	    handleStart(list,index) {
	    	this.generateKey(list,index) 
	    },
	    handleEnd(list,index){  
	    	this.generateKey(list,index) 
	    }
	}
}

</script> 
<style>
.drag-panel {
  height: 100%;
  overflow-y: hidden;
}

.drag-panel .title {
  width: 100%;
  /*text-align: center;*/
  padding-left: 20px;
  font-weight: 600;
  font-size: 13px;
}

</style>
<!-- <style lang="scss">
.drag-panel {
	height: 100%;
    overflow-y: hidden;

    .title {
    	width: 100%;
	    /*text-align: center;*/
	    padding-left: 20px;
	    font-weight: 600;
	    font-size: 13px;
    }
}

</style> -->