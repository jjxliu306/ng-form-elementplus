<template>  
<div 
  :class="[
    'ng-base-batch', 
    record.options.customClass ? record.options.customClass : '' 
  ]" 
  :style="record.options.customStyle" 
  >
  <template v-if="isDragPanel">
    <el-row :gutter="20">
      <draggable
        tag="div"
        class="draggable-box"
        v-bind="{
          group: 'form-draggable' ,
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move'
        }"
        item-key="key"
 
        :list="record.list"
        @add="dragEnd($event, record.list)"  
        :move="()=>{}"
        >
        <template #item="{element}">
          <ng-form-node 
            :key="element.key"
            class="drag-move"
            :selectItem="selectItem"
            :record="element" 
            @handleSelectItem="handleSelectItem"
            :prop-prepend="propPrepend"
            @handleCopy="handleCopy(element)"
            @handleDetele="handleDetele(element)"
            /> 
        </template> 
      </draggable> 
    </el-row>    
  </template> 
  <template v-else>  
    <TableBuild :record="record" :models="models" :prop-prepend="propPrepend" :preview="preview"/>

  </template> 
</div>
</template>
<script> 
import { defineComponent } from 'vue';
import TableBuild from './build/index.vue'
//import cloneDeep from 'lodash/cloneDeep'
import { cloneDeep } from '../../../../utils/index.js'
import draggable from "vuedraggable"
import mixin from '../../mixin.js'
export default defineComponent({
	mixins: [mixin] , 
  components: {
    TableBuild,draggable
  },
  created() {
    // 赋予一个空的默认值
     this.updateArrayDefaultValue()
  },
  methods: {
    dragEnd(evt, list) {   
      // 拖拽结束,自动选择拖拽的控件项
      //this.handleSelectItem(list[evt.newIndex])
      const clone = this.cloneDeepAndFormat(list[evt.newIndex])
      
      list[evt.newIndex] = clone
     // this.$set(list , evt.newIndex , clone)
      this.handleSelectItem(clone)
    },
    handleCopy(item){ 
      const nitem = this.cloneDeepAndFormat(item)
      const key = item.type + "_" + new Date().getTime() 
      nitem.key = key
      nitem.model = key

      // 找到index 插入
      const oindex = this.record.list.findIndex(t=>t.key == item.key)
     
      if(oindex >= 0) {
        // insert 
        this.record.list.splice(oindex + 1 , 0, nitem)

      }

    },
    handleDetele(item) {
      const oindex = this.record.list.findIndex(t=>t.key == item.key)
      if(oindex >= 0) {
        this.record.list.splice(oindex , 1);
      }
    }
  }
})
</script>
<!-- <style lang="scss">
.ng-base-batch {
  z-index: 0;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  width: 100%;

  .draggable-box {
    min-height: 200px;
  }
} 
</style> -->
<style>
.ng-base-batch {
  z-index: 0;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  width: 100%;
}

.ng-base-batch .draggable-box {
  min-height: 200px;
}

</style>