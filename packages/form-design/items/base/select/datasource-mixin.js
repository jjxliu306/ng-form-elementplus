import { ref, computed, watch, nextTick } from 'vue'
import { useFormItem } from '../../mixin.js'
import { dynamicFun } from '../../../../utils/index.js'

/**
 * Vue3 Composable - 数据源相关逻辑（用于 select, radio, checkbox）
 * 从 Vue2 datasource-mixin 原地转换而来
 *
 * @param {Object} props - 组件props
 * @param {Object} models - 表单数据模型
 * @param {Function} emit - emit函数
 */
export function useDataSource(props, models, emit) {
  // ==================== 使用基础 useFormItem ====================
  const baseFormItem = useFormItem(props, models, emit)

  // ==================== Data ====================
  const localFilter = ref([])
  const remoteFilter = ref({})

  // itemProp 用于配置属性映射
  const itemProp = ref({
    value: 'value',
    label: 'label'
  })

  // ==================== Computed ====================
  // 动态选项监听（用于表单模板编辑时刷新）
  const dynamicOption = computed(() => {
    // 只在表单模板拖拽绘制的时候生效
    if (!props.isDragPanel || !['select', 'radio', 'checkbox'].includes(props.record.type)) {
      return null
    }
    if (props.record.options.dynamic == 0) {
      return null
    }
    if (props.record.options.dynamic == 1) {
      return props.record.options.dynamic + props.record.options.remoteFunc + props.record.options.dataPath + props.record.options.remoteValue + props.record.options.remoteLabel
    } else if (props.record.options.dynamic == 2) {
      return props.record.options.dynamic + props.record.options.dictType
    }
    return null
  })

  // 联动数据
  const linkageData = computed(() => {
    if (!props.isDragPanel && props.record.options.linkage) {
      const linkData = props.record.options.linkData
      if (!linkData) return null

      let vs = []
      for (let i = 0; i < linkData.length; i++) {
        const ld = linkData[i]
        if (ld.model) {
          const modelsValue = models.value || models
          vs.push(modelsValue[ld.model])
        }
      }
      return vs.join(',')
    }
    return null
  })

  // 联动关联的所有类型
  const linkageTypes = computed(() => {
    if (!props.isDragPanel && props.record.options.linkage) {
      const linkData = props.record.options.linkData
      if (!linkData) return null

      let vs = []
      for (let i = 0; i < linkData.length; i++) {
        const ld = linkData[i]
        if (ld.model) {
          vs.push(ld.vtype)
        }
      }
      return vs
    }
    return null
  })

  // ==================== Watch ====================
  // 监听下拉、多选、单选配置变化后刷新
  watch(dynamicOption, () => {
    baseFormItem.initDynamicValue()
  }, { deep: true })

  // 监听关联字段
  watch(linkageData, (val, oldVal) => {
    if (val == oldVal) {
      return
    }
    linkageDataHandle()
  })

  // ==================== Methods ====================

  /**
   * 关联数据变动后触发
   */
  function linkageDataHandle(resetValue = true) {
    if (props.record.options.linkage) {
      const linkData = props.record.options.linkData
      if (!linkData) return

      // 本地搜索
      let localScript = []
      let remoteQuery = {}
      for (let i = 0; i < linkData.length; i++) {
        const ld = linkData[i]
        if (ld.vtype == 1) {
          // local script
          localScript.push(ld.script)
        } else if (ld.vtype == 2
          // 确定有远程搜索
          && props.record.options.dynamic == 1 && props.record.options.remoteFunc
          // 确定搜索的key 和value存在
          && ld.queryKey && ld.queryValue) {
          // remote 远程过滤
          const modelsValue = models.value || models
          const queryValue = dynamicFun(ld.queryValue, modelsValue)
          remoteQuery[ld.queryKey] = queryValue
        }
      }

      localFilter.value = localScript
      remoteFilter.value = remoteQuery

      // 将当前选中值设置为空 防止选择的值目前展示不出来后永远不能反选
      if (resetValue) {
        const modelsValue = models.value || models
        if ((props.record.type === 'select' && props.record.options.multiple) || props.record.type === 'checkbox') {
          modelsValue[props.record.model] = []
        } else {
          modelsValue[props.record.model] = null
        }
      }

      if (remoteFilter.value) {
        baseFormItem.getRemoteData()
      }
    }
  }

  /**
   * 值变化处理
   */
  function handleChange(value) {
    let labels = []
    // 获取数据 判断从ajax 还是本地默认配置
    const checkValues = baseFormItem.checkValues.value || baseFormItem.checkValues
    let datas = props.record.options.dynamic > 0 ? checkValues : props.record.options.options
    if (!datas) {
      datas = []
    }

    // 回填数据
    let as = []

    if (!(value instanceof Array)) {
      as = [value]
    } else {
      as = value
    }

    for (let i = 0; i < as.length; i++) {
      const v = as[i]
      const fs = datas.filter(t => t[itemProp.value.value] == v)
      if (fs && fs.length > 0) {
        const label = fs[0][itemProp.value.label]
        labels.push(label)
      }
    }

    const modelsValue = models.value || models
    const modelLabel = props.record.model + '_label'
    modelsValue[modelLabel] = labels.join(',')

    // 如果有远程调用并且有选择回调 在这里进行回调
    if (props.record.options.selectCb) {
      // 找到当前选择的数据实体
      const cvalues = (props.record.options.dynamic == 1 && props.record.options.remoteFunc ? checkValues : props.record.options.options)
      const fs = cvalues.filter(t => t[itemProp.value.value] == value)

      if (fs && fs.length > 0) {
        const select = fs[0]
        // 构建函数 去执行
        nextTick(() => {
          const scriptFunc = props.record.options.selectCb
          const func = '{' + scriptFunc + '}'
          const Fn = new Function('$', '$select', func)
          Fn(modelsValue, select)
        })
      }
    }
  }

  /**
   * 判断单项是否禁用
   */
  function itemDisabled(item) {
    if (!props.record.options.disableItemScript) {
      return false
    }

    const cbScript = props.record.options.disableItemScript
    try {
      const Fn = eval(cbScript)
      const modelsValue = models.value || models
      return Fn(item, modelsValue)
    } catch (error) {
      console.error('select item disabled script error', error)
      return false
    }
  }

  // ==================== 返回所有需要暴露的状态和方法 ====================
  return {
    // 基础 useFormItem 的所有功能
    ...baseFormItem,

    // 新增的 data
    localFilter,
    remoteFilter,
    itemProp,

    // 新增的 computed
    dynamicOption,
    linkageData,
    linkageTypes,

    // 新增的 methods
    linkageDataHandle,
    handleChange,
    itemDisabled
  }
}

// 保持向后兼容，导出原有的 Vue2 mixin（虽然Vue3中不再使用）
import mixin from '../../mixin.js'
export default {
  mixins: [mixin],
  data() {
    return {
      // 2021-03-13 如果该字段带有本地数据过滤,则这里保存本地过滤的过滤条件
      localFilter: [],
      remoteFilter: {}, // 远程过滤搜索 结构 {key:xx,value:xx}
    }

  },
  computed: {
    // 2022-03-14 lyf 针对select radio checkbox这些数据的动态来源修改后进行刷新
    dynamicOption() {

      // 只在表单模板拖拽绘制的时候生效

      if (!this.isDragPanel || !['select', 'radio', 'checkbox'].includes(this.record.type)) {
        return null
      }
      if (this.record.options.dynamic == 0) {
        return null
      }
      if (this.record.options.dynamic == 1) {
        return this.record.options.dynamic + this.record.options.remoteFunc + this.record.options.dataPath + this.record.options.remoteValue + this.record.options.remoteLabel
      } else if (this.record.options.dynamic == 2) {
        return this.record.options.dynamic + this.record.options.dictType
      }

      return null
    },
    linkageData() {
      if (!this.isDragPanel && this.record.options.linkage) {
        const linkData = this.record.options.linkData
        if (!linkData) return null

        let vs = []
        for (let i = 0; i < linkData.length; i++) {
          // 判断类型 vtype=1 本地搜索 vtype=2 远程过滤
          const ld = linkData[i]
          if (ld.model) {
            // local script
            vs.push(this.models[ld.model])

          }
        }
        return vs.join(',')

      }
      return null
    },
    // 联动关联的所有类型
    linkageTypes() {
      if (!this.isDragPanel && this.record.options.linkage) {
        const linkData = this.record.options.linkData
        if (!linkData) return null

        let vs = []
        for (let i = 0; i < linkData.length; i++) {
          // 判断类型 vtype=1 本地搜索 vtype=2 远程过滤
          const ld = linkData[i]
          if (ld.model) {
            // local script
            vs.push(ld.vtype)

          }


        }
        return vs

      }
      return null
    }
  },
  watch: {
    // 2022-03-14 lyf 监听下拉、多选、单选配置变化后如果当前是表单模板编辑状态 则刷新
    dynamicOption: {
      handler(val, oldVal) {
        this.initDynamicValue()
      },
      deep: true
    },
    // 监听关联字段
    linkageData: {
      handler(val, oldVal) {
        if (val == oldVal) {
          return
        }
        this.linkageDataHandle()

      }
    }
  },
  methods: {
    // 关联数据变动后触发
    linkageDataHandle(resetValue = true) {
      if (this.record.options.linkage) {
        const linkData = this.record.options.linkData
        if (!linkData) return

        // 本地搜索
        let localScript = []
        let remoteQuery = {}
        for (let i = 0; i < linkData.length; i++) {
          // 判断类型 vtype=1 本地搜索 vtype=2 远程过滤
          const ld = linkData[i]
          if (ld.vtype == 1) {
            // local script
            localScript.push(ld.script)
          } else if (ld.vtype == 2
            // 确定有远程搜索
            && this.record.options.dynamic == 1 && this.record.options.remoteFunc
            // 确定搜索的key 和value存在
            && ld.queryKey && ld.queryValue) {
            // remote 远程过滤

            // 解析queryValue
            const queryValue = dynamicFun(ld.queryValue, this.models)

            remoteQuery[ld.queryKey] = queryValue

          }
        }

        this.localFilter = localScript
        this.remoteFilter = remoteQuery

        // 将当前选中值设置为空 防止选择的值目前展示不出来后永远不能反选
        if (resetValue) {
          if ((this.record.type === 'select' && this.record.options.multiple) || this.record.type === 'checkbox') {
            this.models[this.record.model] = []
          } else {
            this.models[this.record.model] = null
          }
        }



        if (this.remoteFilter) {
          this.getRemoteData()
        }

      }
    },
    handleChange(value) {
      //console.log('handleChange' , value)
      let labels = []
      // 获取数据 判断从ajax 还是本地默认配置
      let datas = this.record.options.dynamic > 0 ? this.checkValues : this.record.options.options
      if (!datas) {
        datas = []
      }

      // 回填数据

      let as = []

      if (!(value instanceof Array)) {
        as = [value]
      } else {
        as = value
      }

      for (let i = 0; i < as.length; i++) {
        const v = as[i]
        const fs = datas.filter(t => t[this.itemProp.value] == v)
        if (fs && fs.length > 0) {
          const label = fs[0][this.itemProp.label]

          labels.push(label)
        }

      }



      const modelLabel = this.record.model + '_label'
      this.models[modelLabel] = labels.join(',')
      //this.$set(this.models , modelLabel , labels.join(','))


      // 2020-08-01 如果有远程调用并且有选择回调 再这里进行回调
      if (this.record.options.selectCb) {

        // 找到当前选择的数据实体
        // 获取数据
        const cvalues = (this.record.options.dynamic == 1 && this.record.options.remoteFunc ? this.checkValues : this.record.options.options)

        const fs = cvalues.filter(t => t[this.itemProp.value] == value)

        if (fs && fs.length > 0) {
          const select = fs[0]

          // 构建函数 去执行
          this.$nextTick(() => {
            const scriptFunc = this.record.options.selectCb
            const func = '{' + scriptFunc + '}'
            const Fn = new Function('$', '$select', func)

            Fn(this.models, select)


          })

        }
      }
    },
    itemDisabled(item) {
      if (!this.record.options.disableItemScript) {
        return false
      }

      const cbScript = this.record.options.disableItemScript
      try {
        const Fn = eval(cbScript)
        return Fn(item, this.models)
      } catch (error) {
        console.error('select item disabled script error', error)
        return false
      }
    }
  }
}
