<template>
<div>
  <el-collapse-item name="data" :title="t('ngform.item.datasource')">
    <DatasourceConfig :selectItem="selectItem">
      <template #defaultValue >

        <el-form-item v-if="selectItem && selectItem.options.dynamic == 0" :label="t('ngform.item.default_value')">
          <template #label>
            <span>{{t('ngform.item.default_value')}}</span>
               <!--
          添加清空默认值
        -->
          <el-button :title="t('ngform.item.radio.clear_default_tip')" type="text" circle  style="color: red;"  @click="selectItem.options.defaultValue = ''">
            <el-icon><Delete /></el-icon>
          </el-button>
          </template>
          <!-- 判断当前是否多选 -->
          <el-radio-group
            :options="selectItem.options.options"
            v-model="selectItem.options.defaultValue"
            >
           <!--  defaultValue:{{selectItem.options.defaultValue}} -->
            <el-radio   v-for="(item, index) in  [].concat(selectItem.options.options)" :label="item.value" :key="index" >
              {{item.label}}
            </el-radio>
           </el-radio-group>
        </el-form-item>


      </template>
    </DatasourceConfig>
  </el-collapse-item>
  <el-collapse-item name="linkage" :title="t('ngform.item.linkage_title')" class="linkage-item">
      <el-form   size="small" label-width="80px"  class="linkage-form">
        <el-form-item :label="t('ngform.item.linkage')">
            <el-switch
              v-model="selectItem.options.linkage"
              :active-text="t('ngform.item.yes')"
              :inactive-text="t('ngform.item.no')">
            </el-switch>
          </el-form-item>
          <template v-if="selectItem.options.linkage">
            <!-- 联动关联中如果事本地数据则只有脚本关联,如果是远程数据则包含远程搜索 -->
            <Linkage v-model="selectItem.options.linkData" />
          </template>
      </el-form>
  </el-collapse-item>
</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'cascader-properties'
})
</script>

<script setup>
import DatasourceConfig from '../select/datasource-config.vue'
import Linkage from '../select/linkage.vue'
import { Delete } from '@element-plus/icons-vue'
import { useLocale } from '../../../../locale/mixin.js'

// 使用 useLocale composable
const { t } = useLocale()

// Props
defineProps({
  selectItem: {
    type: Object
  }
})
</script>
