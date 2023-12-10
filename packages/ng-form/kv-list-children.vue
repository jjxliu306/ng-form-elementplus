<!--
k-v配置
-->
<!--
 修改cascader等控件options的组件，添加移除校验规制的组件
-->

<template>
  <div class="ng-form-kvlist-children"> 
        <el-tree
          :data="value ? value : []"
          show-checkbox 
          default-expand-all
          :expand-on-click-node="false">
          <template #default="{ node, data }">
            <span class="custom-tree-node" >
              <span> 
                <el-row :gutter="4">
                  <el-col :span="9">
                    <el-input v-model="data.label"  :type="keyNumber ? 'number' : 'text'" :placeholder="t('ngform.item.name')"/>
                  </el-col>
                  <el-col :span="9">
                    <el-input v-model="data.value" :placeholder="t('ngform.item.value')"/>
                  </el-col>
                  <el-col :span="6">
                    <el-button
                      text
                      class="kv-button"
                      size="small"
                      @click="() => append(data)">
                       <el-icon><CirclePlus /></el-icon> 
                    </el-button>
                    <el-button
                      text
                      class="kv-button delete"
                      size="small"
                      @click="() => remove(node, data)">
                     <el-icon><Delete /></el-icon>
                    </el-button>
                  </el-col>
                </el-row>
              </span> 
            </span>
          </template> 
        </el-tree>
      
      <el-col v-if="!disabled" :span="24"> 
      	<el-button type="primary" @click="handleAdd">
         {{t('ngform.item.add')}} 
        </el-button>
      </el-col>
  </div>
</template>
<script>
import { t , currentLang } from '../locale/index.js' 
export default {
  name: "ng-form-kv-children",
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
    // key必须为数字 2021-02-17 lyf
    keyNumber: {
      type: Boolean ,
      default: false
    },
  },
  methods: {
     t,
  	handleAdd() {
      // 添加
      
      this.value.push(
        { 
          value: "",
          label: ""
        }
      )
      this.$emit("update:value", this.value);
    },
    append(data) {
        const newChild = { value: '', label: '' };
        if (!data.children) {
          data['children'] = []
          //this.$set(data, 'children', []);
        }
        data.children.push(newChild);
    },
    remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.value === data.value);
        children.splice(index, 1);
    },

  }
};
</script> 
<style>
.ng-form-kvlist-children {
  padding-left: 0px;
}

.ng-form-kvlist-children .el-input__inner {
  padding: 0px;
}

.ng-form-kvlist-children .option-change-box {
  height: 38px;
  padding-bottom: 6px;
}

.ng-form-kvlist-children .option-change-box .option-delete-box {
  margin-top: 3px;
  background: #ffe9e9;
  color: #f22;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
}

.ng-form-kvlist-children .option-change-box .option-delete-box:hover {
  background: #f22;
  color: #fff;
}

.ng-form-kvlist-children .kv-button {
  padding: 0px;
}

.ng-form-kvlist-children .kv-button.delete {
  color: red;
}


</style>
<!-- 
<style lang="scss">
.ng-form-kvlist-children {
	padding-left: 0px;
  
  .el-input__inner {
    padding: 0px; 
  }
   
	.option-change-box {
    	height: 38px;
    	padding-bottom: 6px; 

    	.option-delete-box {
	      margin-top: 3px;
	      background: #ffe9e9;
	      color: #f22;
	      width: 25px;
	      height: 25px;
	      line-height: 25px;
	      text-align: center;
	      border-radius: 50%;
	      overflow: hidden;
	      transition: all 0.3s;

	      &:hover {
	      	background: #f22;
        	color: #fff;
	      }
 	     
	    }
  	} 

    .kv-button {
      padding: 0px;

      &.delete{
        color: red;
      }

    }
}
</style> -->