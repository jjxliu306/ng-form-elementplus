<template>  
	 <el-switch
      v-model="models[record.model]" 
      :active-text="record.options.activeText"
      :inactive-text="record.options.inactiveText" 
      :disabled="recordDisabled"
      @focus="handleFocus"
      @blur="handleBlur"
    />
</template>
<script> 
import mixin from '../../mixin.js'
export default {
	mixins: [mixin],
	created () { 
	  this.updateSimpleDefaultValue()
	}
}
</script>