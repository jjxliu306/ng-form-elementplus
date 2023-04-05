// 对外输出 包含组件的对外json定义、属性配置页面、展示页面 三部分
 
import BaseIndex from './index.vue'
//import BaseProperties from './properties.vue'
  

const obj = {}
 
obj.type = 'uploadFile'//, // 表单类型 
obj.component = BaseIndex
//obj.properties = BaseProperties

// 序号 实际在json中删除
obj.seq = 22

// 补充配置样式
obj.options = {
	config: {
      size: 'small',
      labelWidth: 80
    },
    columns: [
        {
            label: '标签', 
            prop: 'label',
            default: '上传文件',
            span: 24,
        },
        {
            label: '标签宽度', 
            prop: 'labelWidth',
            type: 'number',
            min: -1,
            max: 1000,
            default: -1,
            span: 24,
        },
        {
            label: '要素宽度', 
            prop: 'width',  
            default: '100%',
            span: 24,
        },
        {
            label: '所占栅格', 
            type: 'slider',
            prop: 'span',
            min: 1,
            max: 24,
            default: 24,
            span: 24,
        },
        {
            label: '数据字段', 
            prop: 'model',
            span: 24,
        },
        {
            label: '数据KEY', 
            prop: 'key',
            show: false,
            span: 24,
        },
        {
            type: 'divider',
            label: '效验规则'
        },
        { 
            prop: 'rules',
            type: 'rules',
            labelWidth: 0,
            default: [{ 
                required: false, // 必须填写
                message: "必填项",
                trigger: ['blur'] 
            }],
            span: 24, 
        } 
    ],
    group: [
        {
            label: '属性',
            prop: 'options',
            alone: true, // 是否独立与columns之外展示 false则和columns一起，不另外显示
            collapse: false, // 是否启用 collapse 必须alone=true
            column: [ 
                 
                {
                    label: '上传地址', 
                    prop: 'action',  
                    type: 'textarea',
                    span: 24,
                },
                {
                    label: 'epl地址', 
                    prop: 'responseFileUrl',  
                    type: 'textarea',
                    placeholder: "上传成功后解析文件url的epl地址",
                    span: 24,
                },
                {
                    label: '文件类型', 
                    prop: 'accept',   
                    placeholder: "文件类型",
                    span: 24,
                },
                {
                    label: '文件大小', 
                    prop: 'limitSize',   
                    type: 'number', 
                    default: 10 ,
                    placeholder: "文件大小(Mb)",
                    span: 24,
                },
                {
                    label: '默认值', 
                    prop: 'defaultValue', 
                    show: false,
                    default: [],
                    span: 24,
                },   
                {
                  label: '多选',
                  prop: 'multiple',
                  type: 'switch',
                  default: false,
                  span: 24,
                } ,
                {
                    label: '最大上传数量', 
                    prop: 'limit',   
                    type: 'number', 
                    default: 3 ,
                    show: '$.options.multiple' ,
                    placeholder: "最大上传文件数量",
                    span: 24,
                },
                {
                  label: '是否隐藏',
                  prop: 'hidden',
                  type: 'switch',
                  default: false,
                  span: 24,
                },
                {
                  label: '是否禁用',
                  prop: 'disabled',
                  type: 'switch',
                  default: false,
                  span: 24,
                },
                {
                  label: '携带头信息',
                  prop: 'headers',
                  type: 'kv',
                  default: [],
                  span: 24,
                },
                 

            ]
        }
    ] 
}
 

export default obj

