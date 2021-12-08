<template>
  
     <el-form
      label-position="right"
      label-width="100px"
      :model="dataForm"
    >
      <el-form-item label="Name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="region">
        <el-input v-model="dataForm.region"></el-input>
      </el-form-item>
      <el-form-item label="form">
        <el-input v-model="dataForm.type"></el-input>
      </el-form-item>
    </el-form>
  
</template>
<script>
  
export default {
  name: "ng-form-build",
  data() {
    return {
      dataForm: {
        name: '' ,
        region: '' ,
        type: ''
      }
    };
  }, 
   
};
</script>
