<!--
生成json Modal
-->
<template>
  <el-dialog
    :title="t('ngform.header.template_data')" 
    v-model="visible"
    :append-to-body="true"
     
    width="850px"
  >  
     <div class="json-box"> 
      <el-input style="min-height:300px;height: 300px;max-height: 290px;overflow: auto;" autosize  :readonly="!edit" ref="myEditor" type="textarea" v-model="jsonCode"> 
      </el-input> 
    </div>
    <div class="copy-btn-box" v-if="!edit"> 
      <el-button size="small" @click="handleExportJson" type="primary">
        {{t('ngform.header.export_code')}}
      </el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="handleCancel">{{t('ngform.close')}}</el-button> 
        <el-button v-if="edit" size="small" type="primary" @click="handleImp">{{t('ngform.import')}}</el-button>
      </span>
    </template> 
  </el-dialog>
</template>
<script> 
import LocalMixin from '../../locale/mixin.js' 
export default {
  mixins: [LocalMixin],
  name: "ng-form-code",
  data() {
    return {
      visible: false,
      jsonCode: "",
      fileFormat: 'json',
      edit: false // 是否可编辑
    };
  },
  methods: {
    init(model , edit = false){
      this.visible = true 
      this.edit = edit
      this.$nextTick(()=>{
        this.jsonCode = JSON.stringify(model, null, "\t");
      })
       
    },
    handleCancel() {
      this.visible = false;
    },
    handleImp() {
      if(!this.jsonCode) {
        this.$message.error(this.t('ngform.header.content_not_empty'))
        return
      }  
      try {
        const importData = JSON.parse(this.jsonCode)
        
        if(importData && typeof importData == 'object'){
          this.$emit('imp' , importData)
          
          this.handleCancel()
        } else {
          this.$message.error(this.t('ngform.header.content_parse_error'))
          return
        }
        
      } catch (error) {
        this.$message.error(this.t('ngform.header.content_parse_error'))
        return
      }
    },
    exportData(data, fileName = `ng-form-template.${this.fileFormat}`) {
      let content = "data:text/csv;charset=utf-8,";
      content += data;
      var encodedUri = encodeURI(content);
      var actions = document.createElement("a");
      actions.setAttribute("href", encodedUri);
      actions.setAttribute("download", fileName);
      actions.click();
    },
    handleExportJson() {
      // 导出JSON
      this.exportData(this.jsonCode);
    },
  }
};
</script>
