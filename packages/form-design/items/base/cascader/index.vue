<template>   
    <el-cascader  
      v-if="!preview"
      ref="cascader"
      v-model="models[record.model]"
      :options="(record.options.dynamic == 1 && record.options.remoteFunc ? checkValues : record.options.options)"
      :style="`width:${record.width}`"
      :placeholder="record.options.placeholder"
      :filterable="record.options.showSearch"  
      :clearable="record.options.clearable"
      :props="itemProp" 
      :disabled="recordDisabled"
      @change="handleChange($event)"
      @focus="handleFocus"
      @blur="handleBlur"
    />  
    <span v-else>
      {{models[record.model+'_label']}}  
    </span> 
</template>
<script>
import mixin from '../../mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {
      itemProp: {
            children: 'children',
            value: 'value',
            label: 'label',
            multiple: this.record.options.multiple 
      },
     
    }
  },
  created () { 
    this.updateArrayDefaultValue()
   

    // 如果是静态数据 判断当前是否有值 是否要回填默认值

    if(this.record.options.dynamic == 0
      && this.models 
        && (
          !Object.prototype.hasOwnProperty.call(this.models,this.record.model)
          || this.models[this.record.model] == undefined) 
      ) {

      if(this.record.options.defaultValue != null && this.record.options.defaultValue.length > 0) {

        //this.$set(this.models , this.record.model , this.record.options.defaultValue)
        this.models[this.record.model] = this.record.options.defaultValue
      } 
    }

     // 判断如果是远程方法的话 远程请求数据
    this.initDynamicValue()

     // 判断是否有联动关联需要处理 
    if(this.linkageData) {
      this.linkageDataHandle(false)
    }


    // 判断如果已经有了值 但没有label 则尝试回填label 
    const value = this.models[this.record.model]
    if(value && value.length > 0) {
      this.$nextTick(()=> {
        this.handleChange(value)
      })
      
    }

  },
  methods: {
    handleChange(value) {
      let labels = []
      let as = [] 
      // 获取数据 判断从ajax 还是本地默认配置
      let datas = this.record.options.dynamic > 0 ? this.checkValues : this.record.options.options

      if(!datas) {
        datas = []
      } 

      if(this.$refs && this.$refs.cascader) {
        const checkNodes = this.$refs.cascader.getCheckedNodes()
     
        for(let i = 0 ; i < checkNodes.length ; i++){
          const v = checkNodes[i] 

          const vText = v.text 
          if(vText) {
             labels.push(vText)
          }  
        } 
        const modelLabel = this.record.model + '_label'
        this.models[modelLabel] = labels.join(',')
      }

      
      //this.$set(this.models , modelLabel , labels.join(','))
    }
  }
}
</script>