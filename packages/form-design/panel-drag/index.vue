 
<template> 
		<el-collapse class="drag-panel" v-model="actives" accordion :key="refreshKey"> 

			<template v-for="(colItem,colIndex) in dataList"> 
				<el-collapse-item :key="colIndex + formKey" :title="getLabel(colItem.name)" :name="colIndex + 1" v-if="colItem && colItem.list && colItem.list.length > 0">

					<template #title>
					    <span class="title">{{getLabel(colItem.name)}}</span>
					</template>
			  		<DragItem 
		                :list="itemInitArray(colItem.list)"
                    :title="getLabel(colItem.name)"
		                @generateKey="generateKey"  
		                @dragend="handleEnd"/>
			  	</el-collapse-item>
			</template> 
		</el-collapse>  
</template>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'
import itemIndex from "../items/index.js"
import DragItem from './drag-item.vue'
import { useLocale } from '../../locale/mixin.js'
import { cloneDeep } from '../../utils/index.js'
import { getComponentCache } from '../../utils/cache.js'
import Bus from '../../utils/bus.js'

// Props
const props = defineProps({
  //基础组件是否要展示或待选组件列表集合
  basicItem: {
    type: [Array, Boolean],
    default: true
  },
  //装饰组件是否要展示或待选组件列表集合
  decorateItem: {
    type: [Array, Boolean],
    default: true
  },
  //布局组件是否要展示或待选组件列表集合
  layoutItem: {
    type: [Array, Boolean],
    default: true
  },
  //应用组件是否要展示或待选组件列表集合
  applicationItem: {
    type: [Array, Boolean],
    default: true
  }
})

// Injects
const customComponents = inject('customC', null)

// 使用 useLocale composable
const { t, getLabel } = useLocale()

// Data
const actives = ref([1])
const startType = ref("")
const formKey = ref('')
const refreshKey = ref(1)
const data = ref({
  list: [],
  config: {
    layout: "horizontal",
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
    hideRequiredMark: false,
    customStyle: ""
  }
})
const previewOptions = ref({
  width: 850
})
const selectItem = ref({
  key: ""
})

// Computed
const dataList = computed(() => {
  //第一层过滤
  const list = cloneDeep(itemIndex)
  let items = list.filter(t => {
    if (t.type == 'basic' && props.basicItem) {
      return true
    } else if (t.type == 'layout' && props.layoutItem) {
      return true
    } else if (t.type == 'application' && props.applicationItem) {
      return true
    } else if (t.type == 'decorate' && props.decorateItem) {
      return true
    }
    return false
  })

  // 子集遍历
  items.map(t => {
    if (t.type == 'basic' && props.basicItem instanceof Array) {
      const listChildren = t.list.filter(n => props.basicItem.includes(n.type))
      t.list = listChildren
    } else if (t.type == 'layout' && props.layoutItem instanceof Array) {
      const listChildren = t.list.filter(n => props.layoutItem.includes(n.type))
      t.list = listChildren
    } else if (t.type == 'application' && props.applicationItem instanceof Array) {
      const listChildren = t.list.filter(n => props.applicationItem.includes(n.type))
      t.list = listChildren
    } else if (t.type == 'decorate' && props.decorateItem instanceof Array) {
      const listChildren = t.list.filter(n => props.decorateItem.includes(n.type))
      t.list = listChildren
    }
  })

  // 判断有没有自定义组件 如果有则加上
  if (customComponents.value && customComponents.value.length > 0) {
    items.push({
      type: 'custom',
      name: t('ngform.item.custom_components'),
      list: customComponents.value
    })
  }

  return items
})

const customComponentsCache = computed(() => {
  const cms = getComponentCache()
  return cms
})

// Watch
watch(customComponentsCache, () => {
  refreshKey.value++
})

// Lifecycle
onMounted(() => {
  Bus.on('i18nRefresh', () => {
    formKey.value = new Date().getTime()
  })
})

onUnmounted(() => {
  Bus.off('i18nRefresh')
})

// Methods
const itemInitArray = (list = []) => {
  const nlist = cloneDeep(list)
  if (nlist && nlist.length > 0) {
    nlist.forEach((t, idx) => {
      if (!t.key) {
        const key = t.type + "_" + new Date().getTime() + '' + idx
        t['key'] = key
        t['model'] = key

        delete t.component
        delete t.properties
        delete t.seq
      }
    })
  }

  return nlist
}

const generateKey = (list, index) => {
  console.log('list', list)
  console.log('index', index)
  if (!index) return
  const key = list[index].type + "_" + new Date().getTime()

  const nData = cloneDeep(list[index])
  nData.key = key
  nData.model = key

  list[index] = nData

  console.log('generateKey', key)
}

const handleStart = (list, index) => {
  generateKey(list, index)
}

const handleEnd = (list, index) => {
  generateKey(list, index)
}
</script> 
<style>
.drag-panel {
  height: 100%;
  overflow-y: hidden;
}

.drag-panel .title {
  width: 100%;
  /*text-align: center;*/
  padding-left: 20px;
  font-weight: 600;
  font-size: 13px;
}

</style>
<!-- <style lang="scss">
.drag-panel {
	height: 100%;
    overflow-y: hidden;

    .title {
    	width: 100%;
	    /*text-align: center;*/
	    padding-left: 20px;
	    font-weight: 600;
	    font-size: 13px;
    }
}

</style> -->