<template>  
<el-tabs 
  :type="record.options.type"
  :tab-position="record.options.position"
  class="ng-layout-tabs" 
  v-model="activeName" 
   >
    <el-tab-pane 
      :label="item.label" 
      :name="index"  
      class="ng-layout-tab-pane"
      v-for="(item, index) in record.columns"
      :key="index">
      <draggable
        v-if="isDragPanel"
        tag="div"
        class="draggable-box"
        v-bind="{
          group: 'form-draggable',
          ghostClass: 'moving',
          animation: 180,
          handle: '.drag-move'
        }" 
        :list="item.list"
         :model-value="null"
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
              @handleCopy="handleCopy(element,item.list)"
              @handleDetele="handleDetele(element,item.list)"
            />  
          </template>
      </draggable>
      <template v-else>
        <el-row :gutter="20" class="controller-row dragpanel" 
            :class="{'controller-bordered': record.options && record.options.bordered}"> 
        
            <ng-form-node 
              v-for="node in item.list"
              :is-drag="false"
              :key="node.key"
              :disabled="disabled"
              :prop-prepend="propPrepend"
              :preview="preview"
              :models.sync="models"   
              :record="node" 
            /> 
        </el-row>
      </template>
    </el-tab-pane> 
</el-tabs> 
</template>
<script>
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
      activeName: 0
    }
  },
  created() {
     
  },
  methods: {
    dragEnd(evt, list) {   
      // 拖拽结束,自动选择拖拽的控件项
      
      const nitem = this.cloneDeepAndFormat(list[evt.newIndex] , evt)
      // delete nitem.icon 
      // const key = nitem.type + "_" + new Date().getTime() 
      // nitem.key = key
      // nitem.model = key

      list[evt.newIndex] = nitem

      this.handleSelectItem(list[evt.newIndex])
    },
    handleCopy(item , list){ 
      const nitem = this.cloneDeepAndFormat(item)
      const key = item.type + "_" + new Date().getTime() 
      nitem.key = key
      nitem.model = key

      // 找到index 插入
      const oindex = list.findIndex(t=>t.key == item.key)
     
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
.ng-layout-tabs {
  z-index: 0;
  margin: 0px !important;
  border-radius: 4px;
  border: 1px dashed #ccc;
}

.ng-layout-tabs .el-tabs__content {
  height: 100%;
  min-height: 200px;
}


.ng-layout-tabs .ng-layout-tab-pane {
  min-height: 200px;
  height: 100%;
}

.ng-layout-tabs .ng-layout-tab-pane .draggable-box {
  min-height: 200px;
  border-radius: 4px;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  padding-left: 2px;
  padding-right: 2px;
}

</style>
<!-- 
<style lang="scss">
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