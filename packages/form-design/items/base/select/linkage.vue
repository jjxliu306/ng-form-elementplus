<!--
  多组件联动的时候配置联动信息
-->

<template>
  <div class="ng-properties-linkage"> 
    <el-row  :gutter="8">
     
      <span v-for="(val, index) in value" :key="index">
        <div class="linkage-box"  >
          <el-col :span="21" >
            
              {{index+1}}、
              <el-radio v-model="val.vtype" :label="1">{{t('ngform.item.local')}}</el-radio>
              <el-radio v-model="val.vtype" :label="2">{{t('ngform.item.remote')}}</el-radio>
            
          </el-col>
          <el-col :span="21" >
            <el-input size="small" v-model="val.model" :placeholder="t('ngform.item.linkage_column')">
              <template #prepend>{{t('ngform.item.linkage_column')}}</template>
            </el-input>
          </el-col>
          <el-col :span="21">
            <template v-if="val.vtype == 1">
               {{t('ngform.properties.script')}}: 
              <el-input size="small"   type="textarea" v-model="val.script" placeholder="表达式,eg: $item.value>$.age . 其中$item表示当前数据中具体一条数据,$表示当前整个表单数据" />

            </template>
           
            <el-row v-else-if="val.vtype == 2">
              <el-col :span="12">
                <el-input size="small" v-model="val.queryKey" placeholder="query key" />
              </el-col>
               <el-col :span="12">
                <el-input size="small" v-model="val.queryValue" placeholder="query value" />
              </el-col>
            </el-row>

          <!--   <el-input size="small"  v-else-if="val.vtype == 2" type="textarea" v-model="val.query" placeholder="远程搜索添加查询条件,eg:key=$.sex" /> -->
          </el-col>
          <el-col :span="3" >
            <div @click="handleDelete(index)" class="option-delete-box pointer">
              <el-icon><Delete /></el-icon>
            </div>
          </el-col>
        </div>
      </span>
      <el-col v-if="!disabled" :span="24"><el-button type="primary" size="small" @click="handleAdd">{{t('ngform.properties.add')}}</el-button></el-col>
    </el-row>
     
  </div>
</template>
<script>
import LocalMixin from '../../../../locale/mixin.js' 
export default {
  mixins: [LocalMixin],
  name: "ng-properties-linkage",
  props: {
    value: {
      type: Array,
      default: ()=> [],
      required: true
    },
     
    disabled: {
      type: Boolean,
      default: false
    },
    
  },
  methods: {
     
    handleAdd() {
      

      this.value.push({
         vtype: 1,
          //validator: 'validatorFiled',
          model: "",
          script: "",
          queryKey: "",
          queryValue: ""
      })
 
      this.$emit("update:value", this.value); 
    },
    handleDelete(deleteIndex) {
      this.value.splice(deleteIndex,1)
      this.$emit(
        "update:value",
        this.value
      )
      
    },
      
  }
};
</script> 
<style>
.ng-properties-linkage .el-col {
  float: left;
}


.ng-properties-linkage .option-delete-box {
  line-height: 100px;
  color: red;
}

</style>