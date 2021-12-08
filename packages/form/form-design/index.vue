<template> 
    <el-container class="form-design">
      <el-aside width="260px">
           aside
      </el-aside>
      <el-main>
        <el-row class="form-design" :gutter="20"> 
            <el-col :span="18" class="height-all">
              <el-card  header="表单面板"  class="box-card form-contains">  
                  main 
              </el-card> 
            </el-col>
            <el-col :span="6" class="height-all">
              <el-card  header="属性配置"  class="box-card form-properties"> 
                 Properties
              </el-card>
            </el-col>
        </el-row> 
      </el-main> 
    </el-container> 
</template>

<script> 
  
export default {
  name: 'ng-form-design',
  data(){
    return {
      previewVisible: false , 
      modelJson: {},

      modelVisible: false,
      importVisible: false,
      importText: '' ,

      renderVisisble: false,
      // 基础配置
      data: {
        list: [],
        config: {
          labelPosition: "left",
          labelWidth: 100, 
          size: 'mini',
          outputHidden: true ,//  是否输出隐藏字段的值 默认打开,所有字段都输出
          hideRequiredMark: true ,
          customStyle: ""
        }
      },

      previewOptions: {
        width: 850
      },
      selectItem: {} // 选中的元素
    }
  },
  
}
</script>

<style > 


</style>
