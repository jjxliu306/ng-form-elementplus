<template>
  <div
    :class="{
      'layout-width': ['control', 'table', 'grid', 'divider', 'html'].includes(
        record.type
      ) , 'list-main': true
    }"
  >
    <!-- 动态表格设计模块 start -->
   <!--  <span>record.list: {{record.list}} </span> -->
    <template v-if="record && record.type === 'batch'">
      <div
        :class="[
          'batch-box',
          record.options.customClass ? record.options.customClass : '' ,
          record.key === selectItem.key ? 'active' : ''
        ]" 
        :style="record.options.customStyle"
        @click="handleSelectItem(record)"
      >
        <div class="batch-label">{{record.label}}</div> 
         <draggable
          tag="div"
          class="draggable-box"
          v-bind="{
            group: insertAllowed ? 'form-draggable' : '',
            ghostClass: 'moving',
            animation: 180,
            handle: '.drag-move'
          }"
          item-key="key"
          :force-fallback="true"
          :list="record.list"
          @start="$emit('dragStart', $event, record.list)"
          @add="$emit('handleColAdd', $event, record.list)"
        > 
          <template #item="{element}">
              <transition-group tag="div" name="list" class="list-main">
                <layoutItem
                  :key="element.key"
                  class="drag-move" 
                  :selectItem="selectItem"
                  :startType="startType"
                   
                  :record="element"
                  :hideModel="hideModel"
                  :config="config"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleShowRightMenu="handleShowRightMenu"
                  @handleDetele="$emit('handleDetele')"
                />
              </transition-group>
            </template>
        </draggable>
      
        <div
          class="copy"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleCopy')"
        >
          <i class="el-icon-copy-document" />
        </div>
        <div
          class="delete"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleDetele')"
        >
          <i class="el-icon-delete" />
        </div>
      </div>
    </template>
    <!-- 动态表格设计模块 end -->
    <!-- 栅格布局 start -->
    <template v-else-if="record &&  record.type === 'grid'">
      <div
        class="grid-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <el-row class="grid-row" :gutter="record.options.gutter">
          <el-col
            class="grid-col"
            v-for="(colItem, idnex) in record.columns"
            :key="idnex"
            :span="colItem.span || 0"
          >
            <draggable
              tag="div"
              class="draggable-box"
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move'
              }"
              item-key="key"
              :force-fallback="true"
              :list="colItem.list"
              @start="$emit('dragStart', $event, colItem.list)"
              @add="$emit('handleColAdd', $event, colItem.list)"
            >
              <template #item="{element}">
                <transition-group tag="div" name="list" class="list-main">
                  <formNode 
                    class="drag-move"
                    :key="element.key"
                    :selectItem="selectItem"
                    :record="element"
                    :hideModel="hideModel"
                    :config="config"
                    @handleSelectItem="handleSelectItem"
                    @handleColAdd="handleColAdd"
                    @handleCopy="$emit('handleCopy')"
                    @handleShowRightMenu="handleShowRightMenu"
                    @handleDetele="$emit('handleDetele')"
                  />
                </transition-group>
              </template>
            </draggable>
          </el-col>
        </el-row>

        <div
          class="copy"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleCopy')"
        >
          <i class="el-icon-copy-document" />
        </div>
        <div
          class="delete"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleDetele')"
        >
          <i class="el-icon-delete" />
        </div>
      </div>
    </template>
    <!-- 栅格布局 end -->
    <!-- 容器 start -->

     <template v-else-if="record && record.type === 'control'">
      <div
        :class="[
          'grid-box','control-form', 
          record.options.customClass ? record.options.customClass : '' ,
          record.key === selectItem.key ? 'active' : '',
          record.options && record.options.bordered ? 'form-table-bordered' : '' 
        ]" 
        :style="record.options.customStyle"
        @click="handleSelectItem(record)"
      >
        <!-- <div class="batch-label">弹性容器</div>  -->
         <draggable
          tag="div"
          class="draggable-box"
          v-bind="{
            group: insertAllowed ? 'form-draggable' : '',
            ghostClass: 'moving',
            animation: 180,
            handle: '.drag-move'
          }"
          item-key="key"
          :force-fallback="true"
          v-model="record.list"
          @start="$emit('dragStart', $event, record.list)"
          @add="$emit('handleColAdd', $event, record.list)"
        > 
          <template #item="{element}">
            <transition-group tag="div" name="list" class="list-main">
              <formNode 
                :key="element.key"
                class="drag-move"
                :selectItem="selectItem"
                :record="element"
                :hideModel="hideModel"
                :config="config"
                @handleSelectItem="handleSelectItem"
                @handleColAdd="handleColAdd"
                @handleCopy="$emit('handleCopy')"
                @handleShowRightMenu="handleShowRightMenu"
                @handleDetele="$emit('handleDetele')"
              />
            </transition-group>
          </template>
        </draggable>
      
        <div
          class="copy"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleCopy')"
        >
          <i class="el-icon-copy-document" />
        </div>
        <div
          class="delete"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleDetele')"
        >
          <i class="el-icon-delete" />
        </div>
      </div>
    </template>
 
    <!-- 容器 end -->
    
    <!-- 表格布局 start -->
    <template v-else-if="record && record.type === 'table'">
      <div
        class="table-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      > 
        <table 
          :class="[
            'table-layout','form-table',
            record.options.customClass ? record.options.customClass : '' ,
            record.options.bright ? 'bright' : '' ,
            record.options.small ? 'small' : '' ,
            record.options.bordered ? 'bordered' : '' 
          ]" 
          :style="record.options.customStyle"
        >
          <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex" >
            <td
              :class="['table-td', tdItem.class]"
              :style="tdItem.style"
              v-for="(tdItem, tdIndex) in trItem.tds"
              :key="tdIndex"
              :colspan="tdItem.colspan"
              :rowspan="tdItem.rowspan"
              @contextmenu.prevent="
                $emit('handleShowRightMenu', $event, record, trIndex, tdIndex , tdItem.colspan > 1 || tdItem.rowspan > 1)
              "
            > 
              <draggable
                tag="div"
                class="draggable-box"
                v-bind="{
                  group: 'form-draggable',
                  ghostClass: 'moving',
                  animation: 180,
                  handle: '.drag-move'
                }"
                item-key="key"
                :force-fallback="true"
                v-model="tdItem.list"
                @start="$emit('dragStart', $event, tdItem.list)"
                @add="$emit('handleColAdd', $event, tdItem.list)"
              >
                <template #item="{element}">
                   <transition-group tag="div" name="list" class="list-main">
                        <layoutItem
                          class="drag-move" 
                          :key="element.key"
                          :selectItem="selectItem"
                          :startType="startType"
                           
                          :record="element"
                          :hideModel="hideModel"
                          :config="config"
                          @handleSelectItem="handleSelectItem"
                          @handleColAdd="handleColAdd"
                          @handleCopy="$emit('handleCopy')"
                          @handleShowRightMenu="handleShowRightMenu"
                          @handleDetele="$emit('handleDetele')"
                        />
                      </transition-group>
                </template>
              </draggable>
            </td>
          </tr>
        </table>

        <div
          class="copy"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleCopy')"
        >
          <i class="el-icon-copy-document" />
        </div>
        <div
          class="delete"
          :class="record.key === selectItem.key ? 'active' : 'unactivated'"
          @click.stop="$emit('handleDetele')"
        >
          <i class="el-icon-delete" />
        </div>
      </div>
    </template>
    <!-- 表格布局 end -->
    <template v-else-if="record != undefined">
      <formNode
        :key="record.key"
        :selectItem="selectItem"
        :record="record"
        :config="config"
        :hideModel="hideModel"
        @handleSelectItem="handleSelectItem"
        @handleCopy="$emit('handleCopy')"
        @handleDetele="$emit('handleDetele')"
        @handleShowRightMenu="$emit('handleShowRightMenu')"
      />
    </template>
  </div>
</template>
<script>
 
import draggable from "vuedraggable";
import formNode from "./node";
export default {
  name: "layoutItem",
  props: {
    record: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    startType: {
      type: String,
      required: true
    },
    insertAllowedType: {
      type: Array,
      required: true
    },
    hideModel: {
      type: Boolean,
      default: false
    },
    // 当前拖拽的组件类型
    dragType: {
      type: String
    }
  },
  computed: {
    insertAllowed() {
      if(this.record.type == 'batch') {
        const disabledType = ['control' , 'batch' , 'batch' ,'divider', 'table']
        
        // 判断当前是在从原始组件拖拽还是从面板内组件拖拽
        if(this.dragType) {
          return !disabledType.includes(this.dragType)
        } else {
          return !disabledType.includes(this.startType)
        } 
        
      }
      return true ;//this.insertAllowedType.includes(this.startType);
    }
  },
  components: {
    formNode,
    draggable
  },
  methods: {
    handleShowRightMenu(e, record, trIndex, tdIndex , isMergeCol) {
      this.$emit("handleShowRightMenu", e, record, trIndex, tdIndex , isMergeCol);
    },
    handleSelectItem(record) { 
      this.$emit("handleSelectItem", record);
    },
    handleColAdd(e, list) {
      this.$emit("handleColAdd", e, list);
    },

  }
};
</script>
