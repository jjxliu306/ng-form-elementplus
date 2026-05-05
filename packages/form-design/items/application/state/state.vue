<template>
	<div v-if="!preview || isDragPanel" class="ng-application-state">
			<el-select class="width-select" v-model="dataForm.province" value-key="value" :filterable="filterable" clearable  :placeholder="t('ngform.item.state.province_placeholder')" @change="changeProvince" @clear="changeProvince()" :disabled="disabled">
				<template #prefix>
					<span>{{t('ngform.item.state.province')}}:</span>
				</template>
          <el-option
            v-for="item in provinces"
            :key="item.v"
            :label="item.l"
            :value="item.v">
          </el-option>
        </el-select>
      <template  v-if="maxLevel >1 && (!oneByOne || dataForm.province)">
      	<el-select class="width-select" v-model="dataForm.city" value-key="value" :filterable="filterable" clearable   :placeholder="t('ngform.item.state.city_placeholder')" @change="changeCity" @clear="changeCity()" :disabled="disabled">
      		<template #prefix>
						<span>{{t('ngform.item.state.city')}}:</span>
					</template>
          <el-option
            v-for="item in citys"
            :key="item.v"
            :label="item.l"
            :value="item.v">
          </el-option>
        </el-select>
      </template>
    	<template v-if="maxLevel > 2 && (!oneByOne || dataForm.city)" >
    		<el-select class="width-select" v-model="dataForm.district" value-key="value" :filterable="filterable" clearable :placeholder="t('ngform.item.state.district_placeholder')" @change="changeDistrict" @clear="changeDistrict()" :disabled="disabled">
    			<template #prefix>
						<span>{{t('ngform.item.state.district')}}:</span>
					</template>
          <el-option
            v-for="item in districts"
            :key="item.v"
            :label="item.l"
            :value="item.v">
          </el-option>
        </el-select>
    	</template>

	</div>
	<div v-else>
		<span>{{models[record.model + '_label']}}</span>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ng-state'
})
</script>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import AreaData from './area.json'
import { useLocale } from '../../../../locale/mixin.js'

// 使用 useLocale composable
const { t } = useLocale()

// Props
const props = defineProps({
  // 表单数组
  modelValue: {
    type: String
  },
  record: {
    type: Object,
    required: true
  },
  models: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否预览结果表单
  preview: {
    type: Boolean,
    default: false
  },
  // 是否拖拽面板引用
  isDragPanel: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Data
const areas = ref(AreaData)
const provinces = ref([])
const citys = ref([])
const districts = ref([])
const dataForm = ref({
  province: '',
  city: '',
  district: ''
})

// Computed
const maxLevel = computed(() => {
  return props.record && props.record.options ? props.record.options.maxLevel : 3
})

const oneByOne = computed(() => {
  return props.record && props.record.options ? props.record.options.oneByOne : false
})

// 是否可以过滤 默认true
const filterable = computed(() => {
  if (props.record.options) {
    return props.record.options.showSearch
  }
  return true
})

// Watch
watch(() => props.modelValue, (val) => {
  let currValue = ''
  if (maxLevel.value == 1) {
    currValue = dataForm.value.province
  } else if (maxLevel.value == 2) {
    currValue = dataForm.value.city
  } else if (maxLevel.value == 3) {
    currValue = dataForm.value.district
  }

  if (val != currValue) {
    init()
  } else {
    updateStateLabel(val)
  }
})

// Lifecycle
onMounted(() => {
  init()
})

// Methods
const validator = () => {
  // 验证方法
}

// 更新区划label
const updateStateLabel = () => {
  const str_ = getLabel()

  if (props.record && props.record.model) {
    props.models[props.record.model + '_label'] = str_
  }
}

const getLabel = () => {
  let address = []
  const val = props.modelValue

  const fs_ = (areas) => {
    areas.forEach(t => {
      if (t.v == val) {
        address.push(t.l)
      } else if (val && val.indexOf(t.v.replace(/0+$/ , '')) == 0 && t.c && t.c.length > 0) {
        address.push(t.l)
        fs_(t.c)
      }
    })
  }

  fs_(AreaData)
  let separator = props.record ? props.record.options.separator : null
  if (separator == null || separator == undefined) {
    separator = ''
  }

  let str_ = ''
  if (!props.record || props.record.options.showAllPath) {
    str_ = address.join(separator)
  } else {
    str_ = address.length > 0 ? address[address.length - 1] : ''
  }

  return str_
}

const init = () => {
  provinces.value = areas.value

  // 判断当前是否有值
  if (props.modelValue) {
    // 省
    dataForm.value.province = props.modelValue.substr(0, 2) + '0000'
    dataForm.value.city = props.modelValue.substr(0, 4) + '00'
    dataForm.value.district = props.modelValue

    changeProvince(dataForm.value.province, 1)
    changeCity(dataForm.value.city, 1)
    changeDistrict(dataForm.value.district, 1)

    if (props.record && !props.models[props.record.model + '_label']) {
      nextTick(() => {
        updateStateLabel(props.modelValue)
      })
    }
  }
}

const getOrgs = (pid) => {
  return new Promise((resolve, reject) => {
    const ds = getOrgChild(pid)
    resolve(ds)
  })
}

const getOrgChild = (pid) => {
  let ds = []
  if (!pid) {
    // 第一层
    return areas.value.map(t => { return {v: t.v , l: t.t} })
  }

  // 迭代
  let datas = []

  const fn = (data) => {
    for (let i = 0 ; i < data.length ; i++) {
      if (data[i].v == pid) {
        datas = data[i].c
        break
      } else if (data[i].c && data[i].c.length > 0) {
        fn(data[i].c)
      }
    }
  }

  fn(areas.value)

  return datas
}

const changeProvince = (v, type) => {
  // 过滤name
  if (!type) {
    dataForm.value.city = ''
    dataForm.value.district = ''
  }

  districts.value = []
  if (v) {
    getOrgs(v).then((data) => {
      citys.value = data
    }).catch(() => {
      citys.value = []
    })
  } else {
    citys.value = []
  }
  // 判断层级 如果是最小层级 则input change
  if (!type) {
    if (maxLevel.value == 1) {
      emit("update:modelValue", v)
    } else {
      emit("update:modelValue", '')
    }
  }
}

const changeCity = (v, type) => {
  // 过滤name
  if (!type) {
    dataForm.value.district = ''
  }

  if (v) {
    getOrgs(v).then((data) => {
      districts.value = data
    }).catch(() => {
      districts.value = []
    })
    // 判断层级 如果是最小层级 则input change
    if (!type) {
      if (maxLevel.value == 2) {
        emit("update:modelValue", v)
      } else {
        emit("update:modelValue", '')
      }
    }

  } else {
    districts.value = []
    if (!type) {
      emit("update:modelValue", '')
    }
  }
}

const changeDistrict = (v, type) => {
  if (type) return
  if (v) {
    if (maxLevel.value == 3) {
      emit("update:modelValue", v)
    }
  } else {
    emit("update:modelValue", '')
  }
}
</script>

<style>
 .ng-application-state .width-select {
 	max-width: 200px;
 }
.ng-application-state .width-select .el-input__inner {
  text-align: right;
}
</style>
