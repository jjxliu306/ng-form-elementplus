<template>
  <div id="app">

    <el-tabs v-model="activeName" style="padding: 20px;" @tab-click="changeTab">
        <el-tab-pane label="表单绘制" name="first">
            <ng-form-design ref="formDesign"  :config="formConfig">
                
            </ng-form-design> 
        </el-tab-pane>
        <el-tab-pane label="表单查看" name="second">
            <el-alert
            title="测试表单预览"
            type="warning">
          </el-alert>
            <ng-form-build ref="formbuild" :formTemplate="formTemplate" :models="models"  :config="formConfig"/>

             <el-button   type="primary" size="mini"  @click="validator()">验证</el-button>
             <el-button   type="primary" size="mini"  @click="getData()">获取数据</el-button>
        </el-tab-pane> 
      </el-tabs>

  
  </div>
</template>

<script> 
export default {
  name: 'App', 
  data(){
    return {
      activeName: 'first',
      models: {} ,
      formTemplate: {} ,
      formConfig: {
        httpConfig: (config)=>{
          config.headers['aaaa'] = 'bbbb'
          return config 
        }
      } 
    }
  } ,

  created() {
   // this.formTemplate = require('./data/basic.json')
  },
  methods: {
    initDemo(index){
        let json = null 
         

        if(json) {
            this.$refs.formDesign.initModel(json)

            this.formTemplate = json
        }

    },
    validator() {
      this.$refs.formbuild.validator().then((valid)=>{
        if(valid){
          this.$message.info('验证通过')
        } else {
          this.$message.error('验证不通过')
        }
      })
    },
    changeTab(v) {
      if(v && v.name == 'second') {
       
        this.formTemplate =  this.$refs.formDesign.getModel()
        const list = this.formTemplate.list 
        if(list) {
          const templateModels = list.map(t=>t.model)
          for(let i in this.models) {
            if(!templateModels.includes(i)) {
              delete this.models[i]
            }
          }
         // 2021-04-06 顺带重置models 将
        }
        //this.models = {}
      } 
    },
    getData() {
      this.$refs.formbuild.getData().then((data)=>{
        console.log('data' , data)
      })
    }
  }
}
</script>

<style>
#app {
    height: 100%;
    width: 100%;
    position: absolute;
}



body{
    height: 100%;
    width: 100%;
    overflow: auto;
    /* position: relative; */
    position: absolute;
    margin: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-variant: tabular-nums;
    line-height: 1.5;
    background-color: #fff;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
 
}
</style>
