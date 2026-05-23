<template>
  <el-form
    ref="formRef"
    class="ng-form"
    @submit.native.prevent
    :model="model"
    :label-suffix="config.labelSuffix"
    size="small"
    :key="formKey"
    label-position="right"
    :label-width="(config.labelWidth || 80) + 'px'">
    <template v-for="(column, idx) in columns">

      <el-divider :key="'divider' + idx" content-position="center" class="ng-form-divider" v-if="column.type == 'divider' && (column.show == undefined || column.show == true || columnVisible(column.show))">{{ getLabel(column.label) }}</el-divider>
      <el-form-item
        :prop="column.prop"
        :label="getLabel(column.label)"
        :rules="column.rules"
        :title="getLabel(column.tip)"
        :class="{'slider-form-item' : column.type == 'slider' || column.type == 'spanGroup'}"
        :label-width="column.labelWidth != null ? (column.labelWidth + 'px') : null"
        :key="'item' + idx"
        v-else-if="column.show == undefined || column.show == true || columnVisible(column.show)">
        <template v-if="column.labelScript" #label>
          {{ getScriptValue(column.labelScript, column.label) }}
        </template>
          <!-- 输入类型判断 -->
          <el-input v-if="!column.type || column.type == 'input'" v-model.trim="model[column.prop]" :placeholder="getLabel(column.placeholder)" />
          <el-input type="textarea" v-else-if="column.type == 'textarea'" v-model="model[column.prop]" :placeholder="getLabel(column.placeholder)" />
          <el-input-number
            style="width:100%"
            v-else-if="column.type == 'number'"
            v-model="model[column.prop]"
            controls-position="right"
            :min="column.min || undefined"
            :max="column.max || undefined"
            :precision="column.precision"
            :step="column.step" />
          <template v-else-if="column.type == 'numbers'">
            <div v-for="(item, index) in model[column.prop]" :key='"number" + index'>
              <el-row :span="24">
                <el-col :span="22">
                  <el-input-number
                  v-model="model[column.prop][index]"
                  controls-position="right"
                  :min="column.min || undefined"
                  :max="column.max || undefined"
                  :precision="column.precision"
                  :step="column.step" />
                </el-col>
                <el-col :span="2" style="padding-left: 5px">
                  <el-button text icon="Close" @click="removeData(model, column.prop, index)"></el-button>
                </el-col>
              </el-row>
            </div>
            <el-button text icon="Plus" @click="addData(model, column.prop, column.type)"></el-button>
          </template>
          <el-radio-group v-else-if="column.type == 'radio'" v-model="model[column.prop]">
            <el-radio :value="rv.value" v-for="(rv, idx2) in column.dicData" :key="'radio' + idx2">{{ getLabel(rv.label) }}</el-radio>
          </el-radio-group>
          <el-radio-group v-else-if="column.type == 'radioButton'" v-model="model[column.prop]">
            <el-radio-button :value="rv.value" v-for="(rv, idx2) in column.dicData" :key="'radioB' + idx2">{{ getLabel(rv.label) }}</el-radio-button>
          </el-radio-group>
          <el-switch v-else-if="column.type == 'switch'" v-model="model[column.prop]"></el-switch>
          <el-date-picker
            v-else-if="column.type == 'date'"
            v-model="model[column.prop]"
            align="right"
            type="date"
            clearable
            :placeholder="getLabel(column.placeholder)"
            :format="column.format"
            :value-format="column.format">
          </el-date-picker>
          <el-checkbox-group v-else-if="column.type == 'checkbox'" v-model="model[column.prop]">
            <el-checkbox :label="rv.value" v-for="(rv, idx2) in column.dicData" :key="'check' + idx2">{{ getLabel(rv.label) }}</el-checkbox>
          </el-checkbox-group>
          <el-select clearable v-else-if="column.type == 'select'" v-model="model[column.prop]" :placeholder="getLabel(column.placeholder)" style="width:100%">
            <el-option
              v-for="(rv, idx2) in column.dicData"
              :label="getLabel(rv.label)"
              :key="'select' + idx2"
              :value="rv.value">
            </el-option>
          </el-select>
          <el-row :gutter="20" v-else-if="column.type === 'slider' || column.type === 'spanGroup'">
            <el-col :span="20">
              <el-slider
                  v-if="sliderType === 'slider'"
                  v-model="model[column.prop]"
                  :show-input="column.showInput"
                  :min="column.min || 0"
                  :max="column.max"
                  :stops="column.stops"
                  :show-stops="column.showStops"
                  :range="column.range"
              >
              </el-slider>
              <el-radio-group style="width: 100%;" v-model="model[column.prop]" v-else>
                <el-radio-button :value="6">25%</el-radio-button>
                <el-radio-button :value="12">50%</el-radio-button>
                <el-radio-button :value="18">75%</el-radio-button>
                <el-radio-button :value="24">100%</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="2">
              <el-icon style="cursor: pointer;" @click="handleChangeSpanType()">
                <Sort />
              </el-icon>
            </el-col>
          </el-row>
          <el-row v-else-if="column.type == 'doubleNumber'">
            <el-col :span="12">
              <el-input-number
                v-model="model[column.prop][0]"
                controls-position="right"
                :min="column.min || undefined"
                :max="column.max || undefined"
                style="width: 100%;">
              </el-input-number>
            </el-col>
            <el-col :span="12">
              <el-input-number
                v-model="model[column.prop][1]"
                controls-position="right"
                :min="column.min || undefined"
                :max="column.max || undefined"
                style="width: 100%;">
              </el-input-number>
            </el-col>
          </el-row>
          <template v-else-if="column.type == 'colors'">
            <div v-for="(item, index) in model[column.prop]" :key='index'>
              <el-row :span="24">
                <el-col :span="22">
                 <el-color-picker show-alpha v-model="model[column.prop][index]" :placeholder="getLabel(column.placeholder)" />
                </el-col>
                <el-col :span="2" style="padding-left: 5px">
                  <el-button text icon="Close" @click="removeData(model, column.prop, index)"></el-button>
                </el-col>
              </el-row>
            </div>
            <el-button text icon="Plus" @click="addData(model, column.prop, column.type)"></el-button>
          </template>
          <el-color-picker v-else-if="column.type == 'color'" show-alpha v-model="model[column.prop]" :placeholder="getLabel(column.placeholder)"></el-color-picker>

          <KvList v-else-if="column.type == 'kv'" :value="model[column.prop]" :keyNumber="column.keyNumber"/>

          <Rules :value="model[column.prop]" v-else-if="column.type == 'rules'"/>
       <!--  </slot> -->
        <!-- 插槽 -->
        <!-- <slot :name="column.prop"></slot> -->
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ng-form'
})
</script>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { dynamicFun } from '../utils/index.js'
import KvList from './kv-list.vue'
import Rules from './rules.vue'
import Bus from '../utils/bus.js'
import { useLocale } from '../locale/mixin.js'

// Props
const props = defineProps({
  // 当前组件整个配置 record
  record: {
    type: Object,
    required: true
  },
  // 当前表单绑定的model
  model: {
    type: Object,
    required: true
  },
  // 表单配置
  config: {
    type: Object,
    required: true
  },
  // 字段列表
  columns: {
    type: Array,
    required: true,
    default: () => []
  }
})

// 使用 useLocale composable
const { getLabel } = useLocale()

// Data
const formKey = ref('')
const sliderType = ref('slider')
const formRef = ref(null)

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
const getScriptValue = (script, currentValue) => {
  // script , model ,currentValue , key="$"
  return dynamicFun(script, props.record, currentValue)
}

const columnVisible = (script) => {
  if (script == false) return false
  if (typeof script == 'string') {
    return dynamicFun(script, props.record)
  }
  return true
}

const addData = (recordProp, columnProp, type) => {
  let defaultVal = '#ffffff'
  if (type == 'numbers') {
    type = 0
  }

  if (recordProp[columnProp] == undefined || recordProp[columnProp] == null
    || !(recordProp[columnProp] instanceof Array)) {
    recordProp[columnProp] = [defaultVal]
  } else {
    recordProp[columnProp].push(defaultVal)
  }
}

const removeData = (model, prop, index) => {
  const nlist = model[prop].filter((value, i) => i !== index)
  model[prop] = nlist
}

const handleChangeSpanType = () => {
  if (sliderType.value === 'slider') {
    sliderType.value = 'spanGroup'
  } else {
    sliderType.value = 'slider'
  }
}

// 暴露给外部的方法
defineExpose({
  validate: () => formRef.value?.validate(),
  resetFields: () => formRef.value?.resetFields(),
  clearValidate: () => formRef.value?.clearValidate()
})
</script>

<style>

.ng-form .el-radio {
  margin-right: 10px;
}
.ng-form .el-radio .el-radio__label {
  padding-left: 5px;
}
.ng-form .ng-form-divider {
  font-size: 13px;
}
.ng-form .ng-form-divider .el-divider__text {
  font-size: 13px;
}

.ng-form .slider-form-item .el-form-item__content {
  display: flow;
}

</style>
