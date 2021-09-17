<!--
 * author lyf
 * date 2020-07-06
 * description 拖拽元素
 -->
<template>
	<div class="components-list">
		list:: {{list.length}}
		<draggable
	    tag="ul"
	    :list="list"
	    v-bind="{
	      group: { name: 'form-draggable', pull: 'clone', put: false },
	      sort: false,
	      animation: 180,
	      ghostClass: 'moving'
	    }"
	    :force-fallback="true"
	    @start="handleStart($event, list)" item-key="label">  
	      	<template #item="{element}" >
	      		 
	      		<li
			      class="form-edit-widget-label"
			       
			      @click="$emit('handleListPush', element)">
		    		<a> 
	                	<span>{{element.label}}</span>
	            	</a> 
		   	 	</li>
	      	</template>
		  
	  </draggable>
	</div>
  
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "dragItem",
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
    handleStart(e, list) {
      //this.$emit("start", list ,[e.oldIndex].type);
      this.$emit('start', list, e.oldIndex)
    }
  }
};
</script>
