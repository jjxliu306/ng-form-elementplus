# ng-form 致力打造开源最强vue动态表单组件
NG-FORM-ELEMENTPLUS

![组件一览](img/0324_11.png "0324_11.png")  
 
 **说明**
 
目前已经开始启用2.0版本，配置基本兼容1.x版本。差异部分如下：
1. 1.x中日期中通过属性来配置是否可以范围选择，2.x版本拆成了两个组件
2. 2.x版本全局默认使用栅格布局，使用1.x的配置导入进来后，默认每个组件都是占24格



 **在线示例**
 https://jjxliu306.github.io/ng-form-elementplus/dist

 **element-ui版本地址**
 https://gitee.com/jjxliu306/ng-form-element

 **iview版本地址**
 https://gitee.com/jjxliu306/ng-form-iview

 
 
## 后端服务
**ngtool 后端解析和校验功能** 
https://gitee.com/jjxliu306/ngtool

## 文档（陆续更新）
https://www.kancloud.cn/jjxliu306/ng-form/3138508


<!--
## 集成示例
**基于springboot + vue 的前后端分离集成案例**

后端springboot: https://gitee.com/jjxliu306/ng-server

前端vue: https://gitee.com/jjxliu306/ng-ui
-->
##示例
 **基础表单** 
 ![基础表单](img/0324_basic.gif "0324_basic.gif")  


 **表单验证和组件动态显示** 
![表单验证和组件动态显示](img/0324_validator.gif "0324_validator.gif")


 **动态表格** 
![动态表格](img/0324_batch.gif "0324_batch.gif")


## 简介

基于vue和element-plus实现的表单设计器。通过拖拽方式快速生成一个表单页面，表单可以导出json格式,也可以将其他人绘制的表单通过json导入方式进行还原。

## 和其他开源表单的差异
 
- 每个组件可以动态隐藏和显示，并且提供除了“必填”以外的多种规则验证，支持表达式验证和正则验证
- 隐藏的组件绑定值可以配置不输出，减少输出数据大小
- 针对选择性控件（radio，select，checkbox）提供选择后触发调用，支持表达式。对选择性控件支持数据联动功能，通过此功能可以做多级联动
- 动态表格提供单独的弹框进行填写和编辑
- 布局方式多样化，提供栅格，表格等多种布局方式 
- 支持表单预览模式，表单内容全部非组件化，全部文本显示
- 针对选择性控件（radio，select，checkbox）选择后将对应的label进行单独存储，方便展示

 

## 组件
- ng-form-design 表单设计器（基于可视化操作快速设计出表单页面，生成配置json或页面）
- ng-form-build 表单构建器（根据设计器中获取的配置json数据，快速构建出表单页面，添加readonly属性后展现预览表单）
 
 
## 安装
```
npm install --save  ng-form-elementplus

```
## 引用
```
 // 导入组件库
import NgFormElementPlus  from 'ng-form-elementplus'
import 'ng-form-elementplus/lib/style.css'
```

## 注册
``` 
const app = createApp(App)
 
// 注册组件库
app.use(NgFormElementPlus) 

```

### 页面引用
```
<div id="app"> 
    <ng-form-design  />
</div>
```
 
### API 说明
# 1. 表单绘制组件  ng-form-design 

方法:

|方法名称 | 参数| 说明|   
|----|-----|---------------|
 initModel | json |  初始化动态表单内容，参数为动态表单json模板
 getModel| N/A|  返回当前正在编辑得动态表单信息

属性: 

| 属性名 | 说明 | 格式| 默认值 | 
|----|--------------|---|---|
| customComponents |   自定义组件的配置,具体参加最下方自定义组件示例中的格式 | array | N/A  | 
| config|表单的一些基础配置，主要为http的一些参数,譬如在http请求中给header增加参数：config: { httpConfig: (config)=>{          config.headers['aaaa'] = 'bbbb'          return config  } }| object |  N/A  |
| clear|  是否显示面板上清除按钮 |boolean | true |
| preview|  是否显示面板上预览按钮 |boolean | true |
| reder|  是否显示面板上渲染按钮 |boolean | true |
| imp|  是否显示面板上导入按钮 |boolean | true |
| exp|  是否显示面板上导出按钮 |boolean | true |
| basic-item|  基础组件是否要展示或待选组件列表集合 |boolean/Array | true |
| personal-item|  个性化组件是否要展示或待选组件列表集合 |boolean/Array | true |
| layout-item|  布局组件是否要展示或待选组件列表集合 |boolean/Array | true | 

 

插槽:

|  插槽名称 | 说明  |
|-----------|-------------------------|
| drag |  左侧组件面板插槽，可以在组件面板上面填充一个区域展示内容|
| formName |  当前动态表单名称|
| controlButton | 功能区按钮,如果需要自定义功能按钮可以在这里自定义 |
 

 插槽示例:
 ```
  <ng-form-design >
        <template #controlButton >
            <el-button   type="text" size="large"  @click="initDemo(1)">示例1</el-button>
            <el-button   type="text" size="large"  @click="initDemo(2)">示例2</el-button>
            <el-button   type="text" size="large"  @click="initDemo(3)">示例3</el-button>
        </template>
        <template  slot="formName">
            <span> ng-form-elementplus 示例 </span>
        </template>
    </ng-form-design> 
 ```

# 2. 表单查看/填报组件  ng-form-build

方法:

|  方法名称 | 参数| 说明  |
|-----------|--------|-------------------------|
| reset | N/A |  重置动态表单内容|
| validator| N/A|  根据设置的规则验证当前表单内容,返回Promise|
| getData | N/A | 表单验证后,获取当前表单数据,返回Promise | 
   

属性: 

| 属性名 | 说明 | 格式| 默认值 | 
|-----------|------------------------------|--------|----------|
| formTemplate | 表单模板 | json | 无 |
| models | 表单填充数据 | json | 无 |
| disabled | 是否禁用 | boolean | false |
| renderPreview | 当前是否为预览模式 | boolean | false |
| config|表单的一些基础配置，主要为http的一些参数,譬如在http请求中给header增加参数：config: {  httpConfig: (config)=>{  config.headers['aaaa'] = 'bbbb' return config   } }| object |  N/A  |
| customComponents |   自定义组件的配置,具体参加最下方自定义组件示例中的格式 | array | N/A  |  
 
 

 使用示例:
 ```
    <template>
      <div id="app"> 
         <ng-form-build  :formTemplate="formTemplate" :models="models"/>
      </div>
    </template>
    <script>
    export default {
      data(){
        return {
          models: {} ,
          formTemplate: {}
        }
      },
      created() {
        this.formTemplate = require('./data/basic.json')
      }
    }
    </script>

 ```


# 3. 自定义组件示例

3.1 自定义一个组件（根据文本中输入的地址展示图片）

```
<template>
  <div> 
    <el-input
      v-if="!preview"
      type="textarea"
      autosize
      placeholder="请输入图片地址"
      v-model="models[record.model]" :disabled="disabled">
    </el-input> 
     <el-image
        :style="record.options.style ? record.options.style : null"
        :src="models[record.model]"
        fit="scale-down"></el-image> 
  </div> 
</template>
<script>
  export default { 
    props: {    
      record: {//组件数据
        type: Object,
        required: true
      }, 
      models: {// 表单数组 
        type: Object,
        required: true
      }, 
      disabled: { // 是否禁用
        type: Boolean,
        default: false
      } , 
      preview: {// 是否当前是预览
        type: Boolean ,
        default: false
      } 
    },
    methods: { 
    }
  }
</script>
```

3.2 定义一个自定义组件的属性配置组件（后面通过插槽挂到表单绘制面板的属性面板中）

```
<template>
  <!-- 自定义组件的属性配置 -->  
  <el-form v-show="selectItem.key" size="default" :disabled="disabled">
    <!-- TCustom   start-->
      <template v-if="selectItem.type == 'customT'"> 
            <!-- 开关的label -->
          <el-form-item   label="图片样式">
              <el-input type="textarea" placeholder="请输入" v-model="selectItem.options.style" /> 
          </el-form-item>
      </template> 
      <!-- TCustom  end -->
  </el-form> 
</template>
<script>
export default {
  props: {
      selectItem: { // 当前选择的组件
        type: Object,
        required: true
      },
      disabled: { // 是否禁用
        type: Boolean,
        default: false
      }
  } 
}
</script>
```

3.3 在动态表单绘制面板中进行配置

```
<template>
  <div id="app">
    <ng-form-design ref="formDesign" :custom-components="customComponents" > 
      <!-- 自定义属性配置 -->
      <template slot="custom-properties" slot-scope="{selectItem}">
        <Properties :selectItem="selectItem"/>
      </template> 
      <template  slot="formName">
        <span> vue-drag-formdesign 示例 </span>
      </template>
    </ng-form-design>   
  </div>
</template> 
<script>
// 引用自定义的表单组件和自定义组件配置信息修改组件
import CustomT from './components/TCustom'
import Properties from './components/properties'
export default {
  name: 'App',
  components: {CustomT , Properties},
  data(){
    return {  
      // 自定义组件列表
      customComponents: [
        { 
          type: 'customT' ,
          label: "自定义图片展示", // 标题文字 
          component: CustomT ,
          options: {
            style: 'width:100px;height:100px'
          },
          model: "customT",
          key: "customT",
          rules: [
            {
              required: false,
              message: "必填项"
            }
          ]
        },
      ]
    }
  } ,  
  methods: { 
  }
}
</script>
 
```
 
# 交流
点击链接加入qq群聊，可以直接提问及反馈bug 【交流群：203205848】 <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=vNN2AMPxXjojpwYu66DOGNtL2dFYh6Q-&jump_from=webapi"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="vue-form-design" title="vue-form-design"></a>
 