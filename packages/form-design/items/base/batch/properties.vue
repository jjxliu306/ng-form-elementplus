<template>
<el-collapse-item name="column" :title="t('ngform.item.batch.columns')">
<el-form class="ng-batch-properties"  size="small" label-width="80px" label-position="top" >
	<el-divider class="divider-center" > {{selectItem.options.addType == 'dialog' ? t('ngform.item.batch.dialogConfig') : t('ngform.item.batch.lineConfig')}} </el-divider>
  <el-form-item  >
              <el-checkbox-group v-model="selectItem.options.showItem" >
                <!-- 获取当前内部已经包含的要素 -->
                <el-row  v-for="item in selectItem.list" :key="item.model">
                  <el-col :span="12">
                     <el-checkbox :label="item.model" v-if="selectItem.options.addType == 'dialog'">{{item.label}}</el-checkbox>
                     <span style="line-height: 26px;" v-else> {{item.label}} </span>
                  </el-col>
                   <el-col :span="12">
                     <el-input  :placeholder="t('ngform.item.width')" v-model="selectItem.options.colWidth[item.model]" />
                  </el-col> 
                </el-row> 

              </el-checkbox-group>
  </el-form-item>  
</el-form>
</el-collapse-item>
</template>
<script>  
import LocalMixin from '../../../../locale/mixin.js'
export default {
  mixins: [LocalMixin],
  components: {
     
  },
	props: {
		selectItem: {
			type: Object
		}
	},
  methods: {
    
  }
}
</script>
<style>
.ng-batch-properties {
  padding: 10px;
}
</style>