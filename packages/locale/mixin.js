import { t, $t, currentLang } from './index';
import { cloneDeepAndFormat, dynamicFun } from '../utils/index.js'
import { ref, onUnmounted, watch, computed } from 'vue'
import Bus from '../utils/bus.js'

/**
 * Vue3 Composable - 国际化和标签处理
 * 从 Vue2 mixin 原地转换而来
 * 支持响应式语言切换
 */
export function useLocale() {
  // 使用 ref 存储当前语言标识，当语言变化时更新它以触发重新渲染
  const localeKey = ref(currentLang())

  /**
   * 获取国际化文本（响应式）
   * 注意：为了让组件响应语言变化，需要在模板中使用 localeKey 作为 key
   * 例如：{{ localeKey }} 或者在计算属性中引用它
   */
  const translate = computed(() => {
    // 当 localeKey 变化时，这个 computed 会重新计算
    return (...args) => {
      // 每次调用时都从全局 lang 获取最新值
      return t.apply(null, args);
    };
  })

  /**
   * 简化版本的 t 函数，直接调用
   */
  function tFunc(...args) {
    // 通过访问 localeKey.value 建立依赖关系，使 Vue 能追踪语言变化
    // 这是一个技巧性的方法来触发响应式更新
    const _ = localeKey.value; // eslint-disable-line no-unused-vars
    // 直接调用全局 t 函数
    return t.apply(null, args);
  }

  /**
   * 获取标签（支持函数）
   */
  function getLabel(v) {
    if (typeof v == 'function') {
      const label = v();
      return label;
    }
    return v;
  }

  /**
   * 获取动态标签（支持函数或动态脚本）
   */
  function getDynamicLabel(v, models) {
    if (typeof v == 'function') {
      const label = v();
      return label;
    } else {
      // 尝试转换为函数
      try {
        const label = dynamicFun(v, models);
        return label;
      } catch (error) {
        return v;
      }
    }
    return v;
  }

  // 监听 i18nRefresh 事件，更新 localeKey 以触发组件重新渲染
  const handleI18nRefresh = () => {
    localeKey.value = currentLang();
  };

  // 注册事件监听
  Bus.on('i18nRefresh', handleI18nRefresh);

  // 组件卸载时移除监听
  onUnmounted(() => {
    Bus.off('i18nRefresh', handleI18nRefresh);
  });

  return {
    $t,
    t: tFunc,
    tComputed: translate, // 响应式版本的 t 函数
    locale: localeKey, // 暴露响应式的 locale，可用于强制更新
    cloneDeepAndFormat,
    getLabel,
    getDynamicLabel
  };
}

// 保持向后兼容，同时也导出 default（虽然Vue3中不再使用）
export default {
  methods: {
    cloneDeepAndFormat,
    $t,
    t(...args) {
      return t.apply(this, args);
    },
    getLabel(v) {
      if (typeof v == 'function') {
        const label = v();
        return label;
      }
      return v;
    },
    getDynamicLabel(v, models) {
      if (typeof v == 'function') {
        const label = v();
        return label;
      } else {
        // 尝试转换为函数
        try {
          const label = dynamicFun(v, models);
          return label;
        } catch (error) {
          return v;
        }
      }
      return v;
    }
  }
};
