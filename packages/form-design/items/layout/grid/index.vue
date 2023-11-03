<template>  
<el-row class="ng-layout-row" :gutter="record.options.gutter">
  <el-col
    class="ng-layout-col"
    v-for="(item, index) in record.columns"
    :key="index"
    :span="item.span || 0"
    >
    <draggable
      v-if="isDragPanel"
      tag="div"
      class="draggable-box grid-box"
      v-bind="{
        group: 'form-draggable',
        ghostClass: 'moving',
        animation: 180,
        handle: '.drag-move'
      }" 
      item-key="key"
      :force-fallback="true"
      :list="item.list"
      @add="dragEnd($event, item.list)" 
      :move="()=>{}"
      > 
        <template #item="{element}">
           
          <ng-form-node 
            :key="element.key"
            class="drag-move"
            :selectItem="selectItem"
            :record="element" 
            @handleSelectItem="handleSelectItem"
            @handleCopy="handleCopy(element , item.list )"
            @handleDetele="handleDetele(element , item.list)"
          />  
        
        </template> 
    </draggable>
    <template v-else>
      <ng-form-node 
        v-for="node in item.list"
        :is-drag="false"
        :key="node.key"
        :disabled="disabled"
        :preview="preview"
        :prop-prepend="propPrepend"
        :models.sync="models"   
        :record="node" 
      />
    </template>
  </el-col>
</el-row>
</template>
<script>
//import cloneDeep from 'lodash/cloneDeep'
import { cloneDeep } from '../../../../utils/index.js'
import draggable from "vuedraggable"
import mixin from '../../mixin.js'
export default {
	mixins: [mixin] ,
  components: {
    draggable
  },
  data() {
    return { 
    }
  },
  created() {
     
  },
  methods: {
    dragEnd(evt, columns) {   
      console.log("ddddd")
      // 拖拽结束,自动选择拖拽的控件项
      const nitem = this.cloneDeepAndFormat(columns[evt.newIndex])
      delete nitem.icon 
      const key = nitem.type + "_" + new Date().getTime() 
      nitem.key = key
      nitem.model = key

      columns[evt.newIndex] = nitem


      this.handleSelectItem(nitem)
    },
    handleCopy(item , list){ 
      const nitem = this.cloneDeepAndFormat(item)
      const key = item.type + "_" + new Date().getTime() 
      nitem.key = key
      nitem.model = key

      // 找到index 插入
      const oindex = list.findIndex(t=>t.key == item.key)
      console.log('copy' , item)
      if(oindex >= 0) {
        // insert 
        list.splice(oindex + 1 , 0, nitem)

      }

    },
    handleDetele(item , list) {
      const oindex = list.findIndex(t=>t.key == item.key)
      if(oindex >= 0) {
        list.splice(oindex , 1);
      }
    }
  }
}
</script>
<style>
.ng-layout-row { 
  margin: 0px !important;
  border-radius: 4px;
  border: 1px dashed #ccc;
}

.ng-layout-row .ng-layout-col {
  min-height: 70px;
}

.ng-layout-row .ng-layout-col .draggable-box {
  min-height: 65px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  padding-left: 2px;
  padding-right: 2px;
}

.form-panel .grid-box {

}

</style>
<!-- <style lang="scss">
.ng-layout-row {
  z-index: 0;
  margin: 0px!important;
  border-radius: 4px;
  border: 1px dashed #ccc;

  .ng-layout-col {
    min-height: 70px;

    .draggable-box {
      min-height: 65px;
      border-radius: 4px;
      border: 1px dashed #ccc;
      box-sizing: border-box;
      padding-left: 2px;
      padding-right: 2px;
    }
  }
} 
 
</style> -->