 
<template>
  <ng-form-design :template.sync="template">
  	<template #formName> 
  		<el-input v-model="formName" />
  	</template>
  	<template #controlButton> 
  		222
  	</template>
  </ng-form-design>
</template>
<script>
	
	import {  ref , onMounted} from 'vue'


export default  ({
  	components: {
  	},
  	setup() {

 		const template = ref({ 
 		 	list: [],
	          config: {
	            labelPosition: "left",
	            labelWidth: 100, 
	            size: 'small',
	            outputHidden: true ,//  是否输出隐藏字段的值 默认打开,所有字段都输出
	            hideRequiredMark: false ,
	            syncLabelRequired: false,
	            customStyle: ""
	          }})
 		const formName = ref('')

 		 return {
 		 	template,
 		 	formName
 		 }
	}
})
</script>
<style>

html , body {
	 height:100%;
	 margin: 0px;
}


#app {
  height:100%;
}
</style>
