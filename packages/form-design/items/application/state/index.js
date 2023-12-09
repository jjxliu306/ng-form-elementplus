// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分
import { t , $t } from '../../../../locale/index.js'  

import BaseIndex from './index.vue' 
  

const obj = {}
 
obj.type = 'state'//, // 表单类型 
obj.component = BaseIndex 

// 序号 实际在json中删除
obj.seq = 1

// 补充配置样式
obj.options = {
	config: {
      size: 'small',
      labelWidth: 80
    },
    columns: [
        {
            label: $t('ngform.item.label'), 
            prop: 'label',
            default: $t('ngform.item.state.name'),
            span: 24,
        },
        {
            label: $t('ngform.item.label_width'), 
            prop: 'labelWidth',
            type: 'number',
            min: -1,
            max: 1000,
            default: -1,
            span: 24,
        },
        {
            label: $t('ngform.item.width'), 
            prop: 'width',  
            default: '100%',
            span: 24,
        },
        {
            label: $t('ngform.item.span'), 
            type: 'slider',
            prop: 'span',
            min: 1,
            max: 24,
            default: 24,
            span: 24,
        },
        {
            label: $t('ngform.item.model'), 
            prop: 'model',
            span: 24,
        },
        {
            label: $t('ngform.item.key'), 
            prop: 'key',
            show: false,
            span: 24,
        },
        {
            type: 'divider',
            label: $t('ngform.item.validate_rule') 
        },
        { 
            prop: 'rules',
            type: 'rules',
            labelWidth: 0,
            default: [{ 
                required: false, // 必须填写
                message: $t('ngform.item.required'), //"必填项",
                trigger: ['blur','change'] 
            }],
            span: 24, 
        } 
    ],
    group: [
        {
            label: $t('ngform.item.options') , //'属性',
            prop: 'options',
            alone: true, // 是否独立与columns之外展示 false则和columns一起，不另外显示
            collapse: false, // 是否启用 collapse 必须alone=true
            column: [ 
               
                {
                    label: $t('ngform.item.default_value') ,//'默认值', 
                    prop: 'defaultValue', 
                    show: false,
                    span: 24,
                }, 
                 // 选择类型  cascader 还是下拉选择
                {
                    label: $t('ngform.item.state.select_type') ,// 类型
                    prop: 'selectType',
                    default: 'select',
                    span: 24,
                    type: 'radioButton',  
                    dicData: [
                        {value: 'select' , label: $t('ngform.item.state.select')},
                        {value: 'cascader' , label: $t('ngform.item.state.cascader')}, 
                    ]
                },  
                {
                    label: $t('ngform.item.state.max_level') ,//'区划层级', 
                    prop: 'maxLevel',
                    default: 3,
                    span: 24,
                    type: 'select',  
                    dicData: [
                        {value:1 , label: $t('ngform.item.state.province')},
                        {value:2 , label: $t('ngform.item.state.city')},
                        {value:3 , label: $t('ngform.item.state.district')}
                    ]
                }, 
                {
                  label: $t('ngform.item.state.any_select'),// 任意一级可选
                  prop: 'anySelect',
                  type: 'switch',
                  show: '$.options && $.options.selectType == "cascader"',
                  default: false,
                  span: 24,
                } ,
                {
                  label: $t('ngform.item.state.one_by_one'),//'递进式显示',
                  prop: 'oneByOne',
                  type: 'switch',
                  show: '$.options && $.options.selectType == "select"',
                  default: false,
                  span: 24,
                },
                 {
                  label: $t('ngform.item.state.all_path'),//'回显路径',
                  prop: 'showAllPath',
                  type: 'switch',
                  default: false,
                  span: 24,
                },
                {
                  label: $t('ngform.item.state.separator'),//'路径分隔符',
                  prop: 'separator',
                  show: '$.options.showAllPath' ,
                  default: '/',
                  span: 24,
                },
                {
                  label: $t('ngform.item.search'),//'可搜索',
                  prop: 'showSearch',
                  type: 'switch',
                  default: true,
                  span: 24,
                } ,
                 {
                  label: $t('ngform.item.clearable'),//'可清除',
                  prop: 'clearable',
                  type: 'switch',
                  show: '$.options && $.options.selectType == "cascader"',
                  default: false,
                  span: 24,
                } ,
                {
                  label: $t('ngform.item.if_hidden') ,//'是否隐藏',
                  prop: 'hidden',
                  type: 'switch',
                  default: false,
                  span: 24,
                },
                {
                  label: $t('ngform.item.if_disabled') ,//'是否禁用',
                  prop: 'disabled',
                  type: 'switch',
                  default: false,
                  span: 24,
                }  

            ]
        }
    ] 
}
 

export default obj


