<template>
  <div class="drag-item">
    <draggable
      tag="ul"
      :list="list"
      v-bind="{
        group: { name: 'form-draggable', pull: 'clone', put: false },
        sort: false,
        animation: 180,
        ghostClass: 'moving'
      }"
      item-key="key" 
      @start="handleStart($event,list)"
      @end="handleEnd($event, list)">  
        <template #item="{element}">
          <li class="form-edit-widget-label"  >
           
            <div class="handle-widget-label"   draggable="true"  :title="getLabel(element.label)"  >
              <div class="label-item"> 
                <img v-if="weightIcon(element)" draggable="false" class="item-img" :src="weightIcon(element)" :alt="getLabel(element.label)">
              </div>
              <div class="handle-label">{{getLabel(element.label)}}</div>
            </div> 
          </li> 
        </template>
    </draggable>
  </div>
  
</template>
<script>
import { getItemIcon } from '../../utils/icons.js'
import LocalMixin from '../../locale/mixin.js'
import draggable from "vuedraggable"
export default {
  name: "dragItem",
  mixins: [LocalMixin],
  props: {
    list: {
      type: Array,
      default: ()=> []
    }
  },
  components: {
    draggable
  },
  methods: { 
    handleEnd(e, list){ 
      const index = e.oldIndex
      const key = list[index].type + "_" + new Date().getTime();

      list[index].key = key 
      list[index].model = key 

      this.$emit('dragend' ,list,  e.oldIndex)
    },
    handleStart(e , list) {
      
         
    },
    //组件图标
    weightIcon(item) {
      // 先判断全局是否有配置 或者是自定义组件 
      if(item.icon) return item.icon
      //return item.icon  
      return getItemIcon(item.type)
    }
  }
};
</script>
<style>
.drag-item {
  padding: 8px 0;
  width: 100%;
  height: 100%;
}

.drag-item .widget-cate {
  padding: 8px 12px;
  font-size: 13px;
}

.drag-item ul {
  position: relative;
  overflow: hidden;
  padding: 0 10px 10px;
  margin: 0;
}

.drag-item ul .form-edit-widget-label {
  font-size: 12px;
  display: block;
  width: 30%;
  line-height: 26px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px;
  color: #333;
  border: 1px solid #F4F6FC;
  text-align: center;
}

.drag-item ul .form-edit-widget-label:hover {
  color: #409EFF;
  border: 1px dashed #409EFF;
}

.drag-item ul .form-edit-widget-label .label-item {
  cursor: pointer;
  background: #f9f9f9;
  border-radius: 4px;
  border: 1px solid  #ebebeb;
  height: 45px;
  position: relative;
  width: 100%;
  -webkit-transition: .15s ease-in-out;
  transition: .15s ease-in-out;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform,-webkit-transform;
  will-change: transform;
}

.drag-item ul .form-edit-widget-label .label-item:hover {
  z-index: 1;
  -webkit-transform: scale(1.075);
  transform: scale(1.075);
}

.drag-item ul .form-edit-widget-label .item-img {
  height: 100%;
  -o-object-fit: none;
  object-fit: scale-down;
  width: 100%;
}

.drag-item ul .form-edit-widget-label .handle-label {
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  margin: 4px -2px 0;
  text-align: center;
  color: #777;
}

.drag-item ul a {
  display: block;
  cursor: move;
  background: #F4F6FC;
  border: 1px solid #F4F6FC;
}

.drag-item ul a .icon {
  margin-right: 6px;
  margin-left: 8px;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
}

.drag-item ul a span {
  display: inline-block;
  vertical-align: middle;
}

</style>
<!-- <style lang="scss">

.drag-item {
  padding: 8px 0;
  width: 100%;
  height: 100%;

  .widget-cate {
    padding: 8px 12px;
    font-size: 13px;

  }

  ul {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;

    .form-edit-widget-label {
      font-size: 12px;
      display: block;
      width: 30%;
      line-height: 26px;
      position: relative;
      float: left;
      left: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 2px;
      color: #333;
      border: 1px solid #F4F6FC;
      text-align: center;

      &:hover {
        color: #409EFF;
        border: 1px dashed #409EFF;
      }

      .label-item   { 
        cursor: pointer;
        background: #f9f9f9;
        border-radius: 4px;
        border: 1px solid  #ebebeb;
        height: 45px;
        position: relative;
        width: 100%;
        -webkit-transition: .15s ease-in-out;
        transition: .15s ease-in-out;
        -webkit-transition-property: -webkit-transform;
        transition-property: -webkit-transform;
        transition-property: transform;
        transition-property: transform,-webkit-transform;
        will-change: transform;

        &:hover {
          z-index: 1;
          -webkit-transform: scale(1.075);
          transform: scale(1.075);
        }
      }
     
          

      .item-img {
        height: 100%;
        -o-object-fit: none;
        object-fit: scale-down;
        width: 100%;
      } 

      .handle-label {
        font-size: 10px;
        font-weight: 500;
        line-height: 12px;
        margin: 4px -2px 0;
        text-align: center;
        color: #777;
      }

    }

    a {
      display: block;
      cursor: move;
      background: #F4F6FC;
      border: 1px solid #F4F6FC;

      .icon {
        margin-right: 6px;
        margin-left: 8px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }

      span {
        display: inline-block;
        vertical-align: middle;
      }
    }

  }


}

 
</style> -->