<!--
通过json生成的单个表单节点
 -->
<template>
  <div
    class="drag-move-box"
    @click.stop="$emit('handleSelectItem', record)"
    :class="{ active: record.key === selectItem.key }"
  >

    <div class="form-item-box">
      <FormItem :formConfig="config" :models="models" :record="record" :isDragPanel="true"/>
    </div>
    <div v-if="!hideModel" class="show-key-box" v-text="record.model" />
   <div
     style="cursor: pointer"
      class="copy"
      :class="record.key === selectItem.key ? 'active' : 'unactivated'"
      @click.stop="$emit('handleCopy')"
    >
     <i class="el-icon-document-copy"></i>
    </div>
    <div
      style="cursor: pointer"
      class="delete"
      :class="record.key === selectItem.key ? 'active' : 'unactivated'"
      @click.stop="$emit('handleDetele')"
    > 
      <i class="el-icon-delete"></i>
    </div>
  </div>
</template>
<script>

import FormItem from "../../../form-item/index.vue";
export default {
  props: {
    record: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object,
      default: () => {return {}}
    },
    config: {
      type: Object,
      required: true
    },
    hideModel: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      models: {}
    }
  },
  components: {
    FormItem
  }
};
</script>
