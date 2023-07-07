<template>
<div>
	<div class="layout-tabs-col-pro" v-for="(val, index) in value" :key="index">
        <el-col :span="18">
        	<el-input
	            style="width:100%"
	            :max="24"
	            v-model="val.label"
	            placeholder="名称"
        	/>
       	</el-col>
        <el-col :span="6">
        	<div @click="handleDelete(index)" class="delete" title="删除">
               <el-icon><Delete /></el-icon> 
         	</div>
     	</el-col>
    </div>
    <div v-if="!disabled" :span="24">
    	<el-button type="primary" @click="handleAddCol">添加</el-button>
    </div>
</div>
</template>
<script>
export default {
	props: {
		value: {
			type: Array,
			default: ()=> [],
      required: true
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handleAddCol() {
	      // 添加  

	    this.value.push({
        label: '选项卡',
         list: []
      })
      this.$emit("update:value", this.value);
	  },
		handleDelete(deleteIndex) {
	      // 删除
	    this.value.splice(deleteIndex,1)
      this.$emit(
        "update:value",
        this.value
      )
	       
    },
	}
}
</script>
<style>
.layout-tabs-col-pro .delete {
  margin-left: 10px;
  background: #ffe9e9;
  color: #f22;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

</style>
<!-- 
<style lang="scss">
.layout-grid-col-pro {
	.delete {
    	margin-left: 10px;
	    background: #ffe9e9;
	    color: #f22;
	    width: 28px;
	    height: 28px;
	    line-height: 28px;
	    text-align: center;
	    border-radius: 50%;
	    overflow: hidden;
	    transition: all 0.3s;
	    cursor: pointer;
  	}
}
</style> -->