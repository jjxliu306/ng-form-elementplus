<template>
  <div id="app">

    <el-tabs  v-model="activeName" style="padding: 20px;" @tab-click="changeTab">
        <el-tab-pane label="表单绘制" name="first">
            <ng-form-design ref="formDesign"  >
                <template #controlButton >
                    <el-button   type="text" size="medium"  @click="initDemo(1)">示例1</el-button>
                    <el-button   type="text" size="medium"  @click="initDemo(2)">示例2</el-button>
                    <el-button   type="text" size="medium"  @click="initDemo(3)">示例3</el-button>
                </template> 
            </ng-form-design> 
        </el-tab-pane>
        <el-tab-pane label="表单查看" name="second">
            <el-alert
            title="测试表单预览"
            type="warning">
          </el-alert>
          models:: {{models}}
            <ng-form-build ref="formbuild" :formTemplate="formTemplate" :models="models"  :config="formConfig"/>

             <el-button   type="primary" size="mini"  @click="validator()">验证</el-button>
             <el-button   type="primary" size="mini"  @click="reset()">重置</el-button>
             <el-button   type="primary" size="mini"  @click="getData()">获取数据</el-button>
        </el-tab-pane> 
      </el-tabs>

  
  </div>
</template>

<script >  
 
import {  ref , onMounted} from 'vue'


export default  ({
  	components: { 
  	},
  	setup() {


	    const formDesign = ref(null)
	    const formbuild = ref(null)

	    onMounted(() => {
	       console.log(formDesign) // 打印一下，就可以获取dom了
	       console.log(formbuild) // 打印一下，就可以获取dom了
	    })

	    const activeName = ref('first')
	    const models = ref({})
	    const formTemplate = ref({})
	    const formConfig = ref({
	    	httpConfig: (config)=>{
	          config.headers['aaaa'] = 'bbbb'
	          return config 
	        }})
	    


	    const initDemo = (index)=> {
	    	let json = null 
	        if(index == 1) {
	            json = require('./data/basic.json')
	        } else if(index == 2) {
	            json = require('./data/tablebatch.json')
	        } if(index == 3) {
	            json = require('./data/validator1.json')
	        } 

	        if(json) {
	            formDesign.value.initModel(json)

	            formTemplate.value = json
	        }
	    }

	    const validator = ()=> {
	    	formbuild.value.validator().then((valid)=>{
	        if(valid){
	          this.$message.info('验证通过')
	        } else {
	          this.$message.error('验证不通过')
	        }
	      })
	    }

	    const changeTab = (v)=> {
	    	 
	    	if(activeName.value == 'second') {
	       		
	        	formTemplate.value = formDesign.value.getModel()
	        	const list = formTemplate.value.list 
	        	if(list) {
	          		const templateModels = list.map(t=>t.model)
	          		for(let i in models.value) {
	            		if(!templateModels.includes(i)) {
	              			delete models.value[i]
	            		}
	          		}
	         	// 2021-04-06 顺带重置models 将
	        	}
	        //this.models = {}
	      	} 
	    }


	    const reset = ()=> {
	      formbuild.value.reset()
	    }

	    const getData = ()=> {
	      formbuild.value.getData().then((data)=>{
	        console.log('data' , data)
	      })
	    }


	    return { 
	    	formDesign,
	    	formbuild,

	      	activeName,
	      	models,
	      	formTemplate,
	      	formConfig, 

	      	initDemo,
	      	reset,
	      	getData,
	      	changeTab

	    }
	} 
 
})
 
</script>

<style lang="scss">

</style>
