<template>
<div class="table-box" @click.stop="handleSelectItem(record)"> 
  <table 
    :class="['table-layout','form-table',
      record.options.customClass ? record.options.customClass : '' ,
      record.options.bright ? 'bright' : '' ,
      record.options.small ? 'small' : '' ,
      record.options.bordered ? 'bordered' : '' 
    ]" 
    :style="record.options.customStyle"
    >
    <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex" >
      <td :class="['table-td', tdItem.class]"
        :style="tdItem.style"
        v-for="(tdItem, tdIndex) in trItem.tds"
        :key="tdIndex"
        :colspan="tdItem.colspan"
        :rowspan="tdItem.rowspan"
        @contextmenu.prevent="showRightMenuHandle($event,   trIndex, tdIndex , tdItem.colspan > 1 || tdItem.rowspan > 1)"
        >
        <draggable
          tag="div"
          class="draggable-box td-draggable"
          :style="{'min-height' : (tdItem.rowspan > 1 ? tdItem.rowspan * 65 : 65) + 'px'}"
          v-bind="{
            group: 'form-draggable',
            ghostClass: 'moving',
            animation: 180,
            handle: '.drag-move'
          }"
   
          :list="tdItem.list"
          :model-value="null"
          item-key="key"
          @add="dragEnd($event, tdItem.list)" 
          :move="()=>{}"
          > 
          <template #item="{element}">
            <el-row class="td-row" :key="element.key">  
              <ng-form-node  
                class="drag-move"
                :selectItem="selectItem"
                :record="element" 
                @handleSelectItem="handleSelectItem"
                @handleCopy="handleCopy(element , tdItem)"
                @handleDetele="handleDetele(element , tdItem)"
                />  
            </el-row>
          </template> 
        </draggable>
      </td>
    </tr>
  </table> 

  <div v-show="showRightMenu"
    :style="{ 'top': menuTop + 'px', 'left': menuLeft + 'px' }"
    class="right-menu"
    id="table-design-rightmenu"
    >
    <ul>
      <li @click="handleSettingStyle" ><i class="el-icon-magic-stick" />
        {{t('ngform.item.table.style')}}
      </li> 
      <hr>
      <template v-if="isMergeCol">
        <li @click="handleDropMerge" >
          <el-icon  ><Delete /></el-icon>{{t('ngform.item.table.unmerge')}}
        </li><hr>
      </template> 
      <li @click="handleDownMerge">
        <!-- <i class="el-icon-bottom" /> -->
         <el-icon  ><Bottom /></el-icon>{{t('ngform.item.table.merge_down')}}
      </li>
      <li @click="handleRightMerge">
        <!-- <i class="el-icon-right" /> -->
        <el-icon  ><Right /></el-icon>{{t('ngform.item.table.merge_right')}}
      </li>
      <li @click="handleAddCol">
       <!--  <i class="el-icon-zoom-in" /> -->
         <el-icon  ><ZoomIn /></el-icon>{{t('ngform.item.table.add_col')}}
      </li>
      <li @click="handleAddRow">
        <!-- <i class="el-icon-zoom-in" /> -->
        <el-icon  ><ZoomIn /></el-icon>{{t('ngform.item.table.add_row')}}
      </li>
      <hr>
      <li @click="handleRemoveRow">
       <!--  <i class="el-icon-zoom-out" /> -->
        <el-icon  ><ZoomOut /></el-icon>{{t('ngform.item.table.delete_row')}}
      </li>
      <li @click="handleRemoveCol">
       <!--  <i class="el-icon-zoom-out" /> -->
        <el-icon  ><ZoomOut /></el-icon>{{t('ngform.item.table.delete_col')}}
      </li>
    </ul>
  </div>

  <el-dialog
    :title="t('ngform.item.table.cell_style_config')"
    v-model="styleVisible" 
    style="top:20px;" 
    :append-to-body="true"  
    > 
    <el-form size="small" :model="tdStyle" label-width="80px"> 
      <el-form-item  label="class" >
        <el-input v-model="tdStyle.class" :placeholder="t('ngform.item.table.class_placeholder')"/>
      </el-form-item>
      <el-form-item  label="style" >
        <el-input type="textarea" :rows="3" v-model="tdStyle.style" :placeholder="t('ngform.item.table.css_placeholder')"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="styleVisible = false">{{t('ngform.item.table.cancel')}}</el-button> 
        <el-button type="primary" @click="settingStyle">{{t('ngform.item.table.ok')}}</el-button>
      </span>
    </template>
    
  </el-dialog>
</div> 
</template>
<script>
//import cloneDeep from 'lodash/cloneDeep'
import { cloneDeep } from '../../../../utils/index.js'
import mixin from '../../mixin.js'
import draggable from "vuedraggable"
export default {
	mixins: [mixin] ,
  components: {
    draggable
  },
	data() {
		return { 
      showRightMenu: false,
      isMergeCol: false,
      menuTop: 0,
      menuLeft: 0,
      trIndex: 0,
      tdIndex: 0,

      styleVisible: false,
      tdStyle: {
        style: '',
        class: ''
      }
		}
	},
	created() {
		if(this.record && (this.record.trs == null || this.record.trs == undefined)) {

	        //this.$set(this.record, 'trs' ,  [
          this.record['trs'] = [
	          {
	            tds: [
	              {
	                colspan: 1,
	                rowspan: 1,
	                list: []
	              },
	              {
	                colspan: 1,
	                rowspan: 1,
	                list: []
	              }
	            ]
	          },
	          {
	            tds: [
	              {
	                colspan: 1,
	                rowspan: 1,
	                list: []
	              },
	              {
	                colspan: 1,
	                rowspan: 1,
	                list: []
	              }
	            ]
	          }
	        ]
      	}
	},
	mounted() {
    // 添加监听取消右键菜单
    document.addEventListener("click", this.handleRemoveRightMenu, true);
    document.addEventListener("contextmenu", this.handleRemoveRightMenu, true);
  },
  destroyed() {
    // 移除监听
    document.removeEventListener("click", this.handleRemoveRightMenu, true);
    document.removeEventListener(
      "contextmenu",
      this.handleRemoveRightMenu,
      true
    );
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

      this.handleSelectItem(nitem)
    },
    handleCopy(item , parent){ 
      const nitem = this.cloneDeepAndFormat(item)
      const key = item.type + "_" + new Date().getTime() 
      nitem.key = key
      nitem.model = key

      // 找到index 插入
      const oindex = parent.list.findIndex(t=>t.key == item.key)
     
      if(oindex >= 0) {
        // insert 
        parent.list.splice(oindex + 1 , 0, nitem)

      }

    },
    handleDetele(item , parent) {
      const oindex = parent.list.findIndex(t=>t.key == item.key)
      if(oindex >= 0) {
        parent.list.splice(oindex , 1);
      }
    },
     // 解除合并
    handleDropMerge(){ 

      const td = this.record.trs[this.trIndex].tds[this.tdIndex]
 
      const colspan = td.colspan
      const rowspan = td.rowspan

      if(td && (colspan > 1 || rowspan > 1)) {
        this.record.trs[this.trIndex].tds[this.tdIndex].colspan = 1
        this.record.trs[this.trIndex].tds[this.tdIndex].rowspan = 1

        // 开始拆解
        let cols = []
        if(colspan > 1) { 
          for(var i = 0 ; i < colspan - 1 ; i++){
            cols.push({colspan:1 , rowspan:1,list:[]})
          }

          this.record.trs[this.trIndex].tds.splice(this.tdIndex + 1, 0 ,...cols )

        } 
        if(rowspan > 1) {
          //cols + 1 
          cols.push({colspan:1 , rowspan:1,list:[]})  
          
          for(var j = this.trIndex + 1 ; j < this.trIndex + rowspan ; j++){
             
            this.record.trs[j].tds.splice(this.tdIndex + 1, 0 ,...cols )
          }
        
        }

      
      }


    },
    handleDownMerge() {
      // 向下合并
      if (
        this.record.trs.length -
          this.record.trs[this.trIndex].tds[this.tdIndex]
            .rowspan <=
        this.trIndex
      ) {
        this.$message.error(this.t('ngform.item.table.no_bottom_merge'));
        return false;
      }

      // 计算rowspan超过自身的td
      let rows = 0;
      this.record.trs[this.trIndex].tds.forEach(
        (element, index) => {
          if (index >= this.tdIndex) {
            return false;
          }
          if (
            element.rowspan >
            this.record.trs[this.trIndex].tds[this.tdIndex]
              .rowspan
          ) {
            rows += 1;
          }
        }
      );
      if (
        this.record.trs[this.trIndex].tds[this.tdIndex]
          .colspan !==
        this.record.trs[this.trIndex + 1].tds[this.tdIndex - rows]
          .colspan
      ) {
        this.$message.error(this.t('ngform.item.table.no_bottom_merge'));
        return false;
      }

      // 可能会存在rowspan


      // 获取当前得rowspan 
      let rowspan =  this.record.trs[this.trIndex].tds[ this.tdIndex ].rowspan

      // 获取当前要合并得row
      const mergeRowIndex =  this.trIndex + rowspan
      // 获取当前要合并行得tdindex之前是否

      // 获取带合并得行
      const mergeRow =  this.record.trs[mergeRowIndex]
      const mergeCol = mergeRow.tds[ this.tdIndex ]


      this.record.trs[this.trIndex].tds[ this.tdIndex ].rowspan = rowspan +  mergeCol.rowspan

      // 在rowspan行进行td得裁剪
      this.record.trs[
        this.trIndex + rowspan
      ].tds = this.record.trs[this.trIndex + rowspan].tds.filter(
        (item, index) => index != this.tdIndex //- rows
      );
 
    },
    handleRightMerge() {
      // 向右合并
      const sumCols = this.record.trs[this.trIndex].tds
        .map(item => item.colspan)
        .reduce(function(partial, value) {
          return partial + value;
        });
      if (
        sumCols -
          this.record.trs[this.trIndex].tds[this.tdIndex]
            .colspan <=
        this.tdIndex
      ) {
        this.$message.error(this.t('ngform.item.table.no_right_merge'));
        return false;
      }
      if (
        this.record.trs[this.trIndex].tds[this.tdIndex]
          .rowspan !==
        this.record.trs[this.trIndex].tds[this.tdIndex + 1]
          .rowspan
      ) {
        this.$message.error(this.t('ngform.item.table.no_right_merge'));
        return false;
      }

      this.record.trs[this.trIndex].tds[
        this.tdIndex
      ].colspan += this.record.trs[this.trIndex].tds[
        this.tdIndex + 1
      ].colspan;

      this.record.trs[
        this.trIndex
      ].tds = this.record.trs[this.trIndex].tds.filter(
        (item, index) => {
          return index !== this.tdIndex + 1;
        }
      );
      // }
    },
    handleAddCol() {
      // 增加列
      this.record.trs.forEach(item => {
        item.tds.splice(this.tdIndex + 1, 0, {
          colspan: 1,
          rowspan: 1,
          list: []
        });
      });
    },
    handleAddRow() {
      // 增加行
      // 获取总col值
      const sumCols = this.record.trs[0].tds
        .map(item => item.colspan)
        .reduce(function(partial, value) {
          return partial + value;
        });
      const rowJson = { tds: [] };
      for (let i = 0; i < sumCols; i++) {
        rowJson.tds.push({
          colspan: 1,
          rowspan: 1,
          list: []
        });
      }
      this.record.trs.splice(this.trIndex + 1, 0, rowJson);
    },
    handleRemoveRow(){
      // 删除一行
      const tri = this.trIndex
      const len = this.record.trs.length
      if(len <= 1) {
        this.$message.error(this.t('ngform.item.table.no_del_by_endrow'));
        return;
      }
      this.record.trs.splice(tri , 1)

    },
    handleRemoveCol(){
      // 删除一列
      const tdi = this.tdIndex
      // 存在任意行中的列数 <= 1 不允许删除
      
      for(let i in  this.record.trs){
        let tds = this.record.trs[i].tds
        if(tds.length <= 1){
          this.$message.error(this.t('ngform.item.table.no_del_by_endcol'));
          return;
        }
      }
        
      this.record.trs.forEach(t=>{
        t.tds.splice(tdi , 1)
      })

    },
    handleSettingStyle(){
      // 样式配置
      const td = this.record.trs[this.trIndex].tds[this.tdIndex]

      const class_ = td.class 
      const style_ = td.style 

      this.tdStyle.style = style_
      this.tdStyle.class = class_

      this.styleVisible = true

    },
    settingStyle(){
      // 样式生效
      const td = this.record.trs[this.trIndex].tds[this.tdIndex]
      td.style = this.tdStyle.style
      td.class = this.tdStyle.class

      // 重新绘制 修改数据
      this.record.trs[this.trIndex].tds.splice(this.tdIndex , 1 , td)

      this.styleVisible = false

    },
    showRightMenuHandle(e,  trIndex, tdIndex , mergeCol) {
    	// 显示右键菜单
      e.stopPropagation()
      // this.fileItem = item
      // 显示
      this.showRightMenu = true
 

      // 计算rightMenu得高度和宽度 和当前屏幕对比 来决定菜单出现得起始位置
      let height = 210 
      let width = 280  

      // 获取屏幕高度和宽度 比对
      const bodyHeight = document.body.clientHeight  
      const bodyWidth = document.body.clientWidth 
 
        
      // 定位 
      if(e.clientY + height > bodyHeight) {
        this.menuTop = e.clientY - height
      } else {
        this.menuTop = e.clientY
      }

      if(e.clientX + width > bodyWidth) {
        this.menuLeft = e.clientX - width
      } else {
        this.menuLeft = e.clientX + 20 
      }
       
  
      this.trIndex = trIndex
      this.tdIndex = tdIndex


      // 判断是否是已经合并过的单元格 isMergeCol 
      this.isMergeCol = mergeCol


      return false
    },
    handleRemoveRightMenu() {
      // 取消右键菜单
      this.showRightMenu = false
    }
	}
}
</script>
<style>
 .table-box .td-draggable, .table-box .td-row {
  min-height: 65px;
  min-width: 100px;
}

.table-box .td-draggable {
  border: 1px solid #e8e8e8 !important;
}
 
</style>>
<!-- <style lang="scss">
.table-box {
	.td-draggable , .td-row {
		min-height: 65px;
		min-width: 100px;
	}

	.td-draggable{
		border: 1px solid #e8e8e8 !important;

	}
}

</style> -->
