import { ref, computed, watch, inject } from 'vue'
import { dynamicFun, cloneDeep, cloneDeepAndFormat, dateFormater } from '../../utils/index.js'
import { useLocale } from '../../locale/mixin.js'
import request from '../../utils/request.js'
import { getDictCache, getComponentCache } from '../../utils/cache.js'
import * as objectPath from 'object-path'

/**
 * Vue3 Composable - 表单项核心逻辑
 * 从 Vue2 mixin 原地转换而来
 *
 * @param {Object} props - 组件props
 * @param {Object} models - 表单数据模型
 * @param {Function} emit - emit函数
 * @param {Object} linkageData - 联动数据（可选）
 * @param {Array} linkageTypes - 联动类型（可选）
 */
export function useFormItem(props, models, emit, linkageData, linkageTypes) {
  // ==================== 国际化 ====================
  const { getLabel, getDynamicLabel } = useLocale()

  // ==================== Inject ====================
  const configInject = inject('configC', null)
  const ngConfig = inject('ngConfig', {})

  // ==================== Data ====================
  const remoteUrl = ref('')
  const remoteFilter = ref({})
  const checkValues = ref([])
  const copyListenModel = ref('')

  // itemProp 用于配置select的属性映射
  const itemProp = ref({
    label: '',
    value: '',
    children: ''
  })

  // ==================== Computed ====================
  const customComponents = computed(() => {
    const cms = getComponentCache()
    return cms
  })

  const config = computed(() => {
    if (configInject && configInject != null && configInject != undefined) {
      return configInject() || {}
    }
    return {}
  })

  // 禁用状态
  const recordDisabled = computed(() => {
    if (props.isDragPanel) return false

    if (props.disabled || props.preview) return true
    if (props.record.options && props.record.options.disabled) return true

    // 判断动态禁用是否打开 并且条件是否满足
    if (props.record.options.dynamicDisabled && props.record.options.dynamicDisabledValue) {
      const script = props.record.options.dynamicDisabledValue
      // 打开了开关 这里获取函数内容
      const fvalue = dynamicFun(script, models.value || models)
      return fvalue
    }

    return false
  })

  // 数据字典
  const dicts = computed(() => {
    const dict = getDictCache()
    return dict
  })

  // ==================== Watch ====================
  watch(dicts, (val) => {
    // 只有数据字典要素才需要
    if (props.record.options.dynamic != 2 || !props.record.options.dictType) return
    console.log('watch dict', val)
    if (val) {
      initDynamicValue()
    } else {
      checkValues.value = []
    }
  })

  // ==================== Methods ====================

  /**
   * 设置数组类默认值
   */
  function updateArrayDefaultValue() {
    const modelsValue = models.value || models
    if (modelsValue &&
      (!Object.prototype.hasOwnProperty.call(modelsValue, props.record.model)
        // 当前赋值类型不是数组
        || !(modelsValue[props.record.model] instanceof Array)
      )) {
      const defaultValue = props.record.options.defaultValue
      if (defaultValue != null && defaultValue != undefined && defaultValue instanceof Array) {
        modelsValue[props.record.model] = cloneDeep(defaultValue)
      } else {
        modelsValue[props.record.model] = []
      }
    }
  }

  /**
   * 设置文本类默认值
   */
  function updateSimpleDefaultValue(isNumber = false) {
    const modelsValue = models.value || models
    // 判断当前models中是否有值 有值则不需要赋予默认值
    // 必须要包含key但没值
    if (modelsValue
      && (
        !Object.prototype.hasOwnProperty.call(modelsValue, props.record.model)
        || modelsValue[props.record.model] == undefined)
    ) {
      let defaultValue = props.record.options.defaultValue
      if (defaultValue != null && defaultValue != undefined) {
        // 日期类型比较特殊 如果是now 则回填当前日期
        if ((props.record.type == 'date' || props.record.type == 'time' || props.record.type == 'datePicker') && defaultValue == 'now') {
          defaultValue = dateFormater(new Date(), props.record.options.format)
        }
        modelsValue[props.record.model] = cloneDeep(defaultValue)
      } else {
        if (isNumber) {
          modelsValue[props.record.model] = -Infinity
        } else {
          modelsValue[props.record.model] = ''
        }
      }
    }
  }

  /**
   * 选择项处理
   */
  function handleSelectItem(item) {
    emit('handleSelectItem', item)
  }

  /**
   * 判断列表中具体某个值是否应该显示
   */
  function dynamicVisible(script, item) {
    const func = script.indexOf('return') >= 0 ? '{' + script + '}' : 'return (' + script + ')'
    const Fn = new Function('$', '$item', func)
    const modelsValue = models.value || models
    return Fn(modelsValue, item)
  }

  /**
   * 针对select radio checkbox判断如果有本地过滤关联，判断该条数据是否该显示
   */
  function itemVisible(item) {
    if (!item) return false
    // 没有过滤条件 直接全部展示
    if (props.isDragPanel || !remoteFilter.value || remoteFilter.value.length == 0) return true

    // 挨个过滤判断
    // 本地搜索开始
    for (let i = 0; i < remoteFilter.value.length; i++) {
      const v = dynamicVisible(remoteFilter.value[i], item)
      // console.log('sitem' , item , v)
      if (!v) {
        return false
      }
    }
    return true
  }

  /**
   * 转换append属性
   */
  function transformAppend(append) {
    if (append && (append.indexOf('return') >= 0 || append.indexOf('$') >= 0)) {
      // 创建函数 返回结果
      const script = append
      // 打开了开关 这里获取函数内容
      const modelsValue = models.value || models
      const fvalue = dynamicFun(script, modelsValue)
      return fvalue
    }
    return append
  }

  /**
   * 初始化远程数据或者数据字典 针对select radio checkbox
   */
  function initDynamicValue() {
    if (props.record.options.dynamic == 1 && props.record.options.remoteFunc) {
      const url = props.record.options.remoteFunc
      remoteUrl.value = url

      // 在配置了远程数据的label和value之后在请求接口
      if (props.record.options.remoteLabel
        && props.record.options.remoteValue
        // 2023-09-09 lyf 判断是否有联动 如果有链接并且还是接口 则此处不处理，等后面处理
        && !(linkageData && linkageTypes && linkageTypes.includes(2))
      ) {
        getRemoteData()
      }

      itemProp.value.label = props.record.options.remoteLabel
      itemProp.value.value = props.record.options.remoteValue
      itemProp.value.children = props.record.options.remoteChildren
    } else if (props.record.options.dynamic == 2 && props.record.options.dictType) {
      // 2022-02-26 lyf  引入数据字典后判断数据字典
      if (dicts.value && dicts.value.length > 0) {
        const fsDict = dicts.value.filter(t => t.type == props.record.options.dictType)
        checkValues.value = cloneDeep(fsDict)

        itemProp.value.label = 'label'
        itemProp.value.value = 'value'
        itemProp.value.children = 'children'
      }
    }
  }

  /**
   * 远程搜索方法
   */
  function remoteMethod(query) {
    let queryParam = props.record.options.onlineParams
    queryParam = queryParam.replace('$', query)

    let url = props.record.options.remoteFunc

    if (url.indexOf('?') >= 0) {
      url += '&' + queryParam
    } else {
      url += '?' + queryParam
    }

    remoteUrl.value = url

    getRemoteData()
  }

  /**
   * 获取远程数据
   */
  function getRemoteData() {
    const dataPath = props.record.options.dataPath

    // 如果么有datapath 直接返回
    if (!dataPath) {
      checkValues.value = []
      return
    }

    // 2023-07-08 lyf 获取方法类型
    const methodType = props.record.options.methodType || 'get'
    let postData = props.record.options.dynamicPostData

    if (methodType == 'post' && postData) {
      postData = JSON.parse(postData)
    } else {
      postData = {}
    }

    request({
      url: remoteUrl.value,
      method: methodType,
      params: remoteFilter.value,
      data: postData
    }).then((data) => {
      if (data) {
        // 获取list 根据dataPath
        const rdata = objectPath.get(data, dataPath);
        checkValues.value = rdata
      }
    })
  }

  /**
   * 失焦事件
   */
  function handleBlur(e) {
    emit('handleBlur', e)
  }

  /**
   * 聚焦事件
   */
  function handleFocus(e) {
    emit('handleFocus', e)
  }

  // ==================== 返回所有需要暴露的状态和方法 ====================
  return {
    // 国际化相关
    getLabel,
    getDynamicLabel,

    // Data
    remoteUrl,
    remoteFilter,
    checkValues,
    copyListenModel,
    itemProp,

    // Computed
    customComponents,
    config,
    recordDisabled,
    dicts,

    // Methods
    cloneDeepAndFormat,
    updateArrayDefaultValue,
    updateSimpleDefaultValue,
    handleSelectItem,
    dynamicVisible,
    itemVisible,
    transformAppend,
    initDynamicValue,
    remoteMethod,
    getRemoteData,
    handleBlur,
    handleFocus
  }
}

// 保持向后兼容，导出原有的 Vue2 mixin（虽然Vue3中不再使用）
import LocalMixin from '../../locale/mixin.js'
export default {
  mixins: [LocalMixin],
  props: {
    // 表单数组
    record: {
      type: Object,
      required: true
    },
    // form-item 宽度配置
    models: {
      type: Object,
      default: () => { return {} }
      //required: true
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
    // 当前是否拖拽面板
    isDragPanel: {
      type: Boolean,
      default: false
    },
    selectItem: {
      type: Object
    },
    propPrepend: {
      type: String
    }
  },
  data() {
    return {
      // 2021-03-13 针对实时搜索回调的时候将动态的url放置在外部，方便组件联动的时候引用
      remoteUrl: '',
      remoteFilter: {}, // 远程过滤搜索 结构 {key:xx,value:xx}
      // select radio checkbox 等这种array的远程数据
      checkValues: [],

      copyListenModel: ''  // 监听数据字段的变化
    }
  },
  inject: {
    // 自定义组件
    // customComponents: {
    //   from: 'customC',
    //   default: ()=>[]
    // },
    // 表单全局config配置
    configInject: {
      from: 'configC',
      default: null
    },
    ngConfig: {
      from: 'ngConfig',
      default: () => ({})
    },
  },
  computed: {
    customComponents() {
      const cms = getComponentCache()
      return cms
    },
    config() {
      if (this.configInject && this.configInject != null && this.configInject != undefined) {
        return this.configInject() || {}
      }
      return {}
    },
    // 禁用
    recordDisabled() {
      if (this.isDragPanel) return false

      if (this.disabled || this.preview) return true
      if (this.record.options && this.record.options.disabled) return true


      // 判断动态禁用是否打开 并且条件是否满足
      if (this.record.options.dynamicDisabled && this.record.options.dynamicDisabledValue) {

        const script = this.record.options.dynamicDisabledValue

        // 打开了开关 这里获取函数内容
        const fvalue = dynamicFun(script, this.models)
        return fvalue
      }


      return false
    },
    dicts() {
      const dict = getDictCache()
      return dict
      //return this.ngConfig ? this.ngConfig.dict: []
    }
  },
  watch: {
    dicts(val) {
      // 只有数据字典要素才需要
      if (this.record.options.dynamic != 2 || !this.record.options.dictType) return
      console.log('watch dict', val)
      if (val) {
        this.initDynamicValue()
      } else {
        this.checkValues = []
      }
    }
  },
  methods: {
    cloneDeepAndFormat,
    // 设置数组类默认值
    updateArrayDefaultValue() {
      if (this.models &&
        (!Object.prototype.hasOwnProperty.call(this.models, this.record.model)
          // 当前赋值类型不是数组
          || !(this.models[this.record.model] instanceof Array)
        )) {
        const defaultValue = this.record.options.defaultValue
        if (defaultValue != null && defaultValue != undefined && defaultValue instanceof Array) {
          //this.$set(this.models , this.record.model , defaultValue)
          this.models[this.record.model] = cloneDeep(defaultValue)
        } else {
          //this.$set(this.models , this.record.model , [])
          this.models[this.record.model] = []
        }
      }
    },
    // 设置文本类默认值
    updateSimpleDefaultValue(isNumber = false) {
      // 判断当前models中是否有值 有值则不需要赋予默认值
      // 必须要包含key但没值
      if (this.models
        && (
          !Object.prototype.hasOwnProperty.call(this.models, this.record.model)
          || this.models[this.record.model] == undefined)
      ) {
        let defaultValue = this.record.options.defaultValue
        if (defaultValue != null && defaultValue != undefined) {
          // 日期类型比较特殊 如果是now 则回填当前日期
          if ((this.record.type == 'date' || this.record.type == 'time' || this.record.type == 'datePicker') && defaultValue == 'now') {
            defaultValue = dateFormater(new Date(), this.record.options.format)
          }
          this.models[this.record.model] = cloneDeep(defaultValue)
        } else {
          //this.$set(this.models , this.record.model , '')
          if (isNumber) {
            this.models[this.record.model] = -Infinity
          } else {
            this.models[this.record.model] = ''
          }

        }
      }
    },
    handleSelectItem(item) {
      this.$emit('handleSelectItem', item)
    },
    // 2021-03-13 判断列表中具体某个值是否应该显示
    dynamicVisible(script, item) {
      const func = script.indexOf('return') >= 0 ? '{' + script + '}' : 'return (' + script + ')'
      const Fn = new Function('$', '$item', func)
      return Fn(this.models, item)
    },
    // 2021-03-13 针对select radio checkbox判断如果有本地过滤关联，判断该条数据是否该显示
    itemVisible(item) {
      if (!item) return false
      // 没有过滤条件 直接全部展示
      if (this.isDragPanel || !this.localFilter || this.localFilter.length == 0) return true

      //挨个过滤判断
      // 本地搜索开始
      for (let i = 0; i < this.localFilter.length; i++) {
        const v = this.dynamicVisible(this.localFilter[i], item)
        // console.log('sitem' , item , v)
        if (!v) {
          return false
        }
      }
      return true
    },
    transformAppend(append) {
      if (append && (append.indexOf('return') >= 0 || append.indexOf('$') >= 0)) {
        // 创建函数 返回结果
        const script = append

        // 打开了开关 这里获取函数内容
        const fvalue = dynamicFun(script, this.models)

        return fvalue
      }
      return append
    },
    // 初始化远程数据或者数据字典 针对select radio checkbox
    initDynamicValue() {
      if (this.record.options.dynamic == 1 && this.record.options.remoteFunc) {

        const url = this.record.options.remoteFunc
        this.remoteUrl = url

        // 在配置了远程数据的label和value之后在请求接口
        if (this.record.options.remoteLabel
          && this.record.options.remoteValue
          // 2023-09-09 lyf 判断是否有联动 如果有链接并且还是接口 则此处不处理，等后面处理
          && !(this.linkageData && this.linkageTypes && this.linkageTypes.includes(2))
        ) {

          this.getRemoteData()
        }


        this.itemProp.label = this.record.options.remoteLabel
        this.itemProp.value = this.record.options.remoteValue
        this.itemProp.children = this.record.options.remoteChildren
      } else if (this.record.options.dynamic == 2 && this.record.options.dictType) {

        // 2022-02-26 lyf  引入数据字典后判断数据字典

        if (this.dicts && this.dicts.length > 0) {
          const fsDict = this.dicts.filter(t => t.type == this.record.options.dictType)
          this.checkValues = cloneDeep(fsDict)

          this.itemProp.label = 'label'
          this.itemProp.value = 'value'
          this.itemProp.children = 'children'
        }


      }
    },
    remoteMethod(query) {
      let queryParam = this.record.options.onlineParams
      queryParam = queryParam.replace('$', query)

      let url = this.record.options.remoteFunc

      if (url.indexOf('?') >= 0) {
        url += '&' + queryParam
      } else {
        url += '?' + queryParam
      }

      this.remoteUrl = url

      this.getRemoteData()
    },
    // 获取远程数据
    getRemoteData() {

      //const objectPath = require("object-path");

      const dataPath = this.record.options.dataPath

      // 如果么有datapath 直接返回
      if (!dataPath) {
        this.checkValues = []
        return
      }

      // 2023-07-08 lyf 获取方法类型
      const methodType = this.record.options.methodType || 'get'
      let postData = this.record.options.dynamicPostData

      if (methodType == 'post' && postData) {
        postData = JSON.parse(postData)
      } else {
        postData = {}
      }

      request({
        url: this.remoteUrl,
        method: methodType,
        params: this.remoteFilter,
        data: postData
        /* {
          ...this.remoteFilter
        }*/
      }).then((data) => {
        if (data) {
          // 获取list 根据dataPath
          const rdata = objectPath.get(data, dataPath);

          this.checkValues = rdata
        }
      })
    },
    handleBlur(e) {
      this.$emit('handleBlur', e)
    },
    handleFocus(e) {
      this.$emit('handleFocus', e)
    }
  }
}
