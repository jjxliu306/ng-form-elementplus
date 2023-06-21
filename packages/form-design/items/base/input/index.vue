<template>   
	<el-input 
		v-if="!preview"
		:placeholder="record.options.placeholder"
		:clearable="record.options.clearable"
		:disabled="recordDisabled"
		:type="record.options.type || 'text'"
		:style="`width:${record.width}`"
		:maxlength="record.options.maxLength > 0 ? record.options.maxLength : null"
		v-model="models[record.model]" 
		@focus="handleFocus"
      	@blur="handleBlur"
		>
		<template #prepend v-if="record.options.prepend">
			<span   v-html="transformAppend(record.options.prepend)">
			</span>
		</template>
		<template #append v-if="record.options.append">
			<span  v-html="transformAppend(record.options.append)">
			</span>
		</template> 
	</el-input> 
	<div v-else>
		<span  class="base-item-span" v-if="record.options.prepend" v-html="transformAppend(record.options.prepend)"> 
    </span>
    <span class="base-item-span" >{{models[record.model]}} </span>
    <span class="base-item-span" v-if="record.options.append" v-html="transformAppend(record.options.append)"> 
    </span>  
	</div> 
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