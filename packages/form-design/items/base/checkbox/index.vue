<template>   
	<el-checkbox-group  
      v-if="!preview"
      :disabled="recordDisabled"
      v-model="models[record.model]" 
      :placeholder="record.options.placeholder" 
      @change="handleChange($event)" 
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-for="(checkitem, index) in  checkList" >
         <el-checkbox :label="checkitem[itemProp.value]" :key="index" v-if="itemVisible(checkitem)"> 
       {{checkitem[itemProp.label]}}
      </el-checkbox>
      </template> 
    </el-checkbox-group>
	<span v-else>
    {{models[record.model+'_label']}}  
  </span>
</template>
<script>
import mixin from '../select/datasource-mixin.js'
export default {
	mixins: [mixin],
	data() {
		return {
			itemProp: { 
		    value: 'value',
		    label: 'label' 
		  } 
		}
	},
  computed: {
    checkList() {
      if(
        (this.record.options.dynamic == 1 && this.record.options.remoteFunc)||
        (this.record.options.dynamic == 2 && this.record.options.dictType)
        ) {
        return this.checkValues
      } else {
        return this.record.options.options
      } 
    }
  },
  created() {
    this.updateArrayDefaultValue()

     // 判断如果是远程方法的话 远程请求数据
    this.initDynamicValue()

    
    // 判断是否有联动关联需要处理 
    if(this.linkageData) {
      this.linkageDataHandle(false)
    }

    // 判断如果已经有了值 但没有label 则尝试回填label 
    const value = this.models[this.record.model]
    if(value && value.length > 0) {
      this.handleChange(value)
    }
  },
	mounted () { 
	  
   
	}
}
</script>