<template>
  <el-dialog
    title="预览"
    v-model="visible"
    :append-to-body="true"
    custom-class="design-preview"
    :destroy-on-close="true"
    width="850px"
  >

    <div class="item-main">
      <FormBuild :formTemplate="jsonData"  :custom-components="customComponents"   :config="ngConfig"   :models="models" ref="formBuild" />
      <PreviewCode ref="previewCode" />
      <renderPreview ref="renderPreview" v-if="renderVisisble"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="default" @click="visible = false">取 消</el-button>
        <el-button size="default" @click="handleGetData">获取数据</el-button>
        <el-button size="default" @click="handleRender">渲染</el-button>
        <el-button size="default" @click="handleValidator">验证</el-button>
        <el-button  size="default" type="primary" @click="visible = false">确 定</el-button>
      </span>
    </template>


  </el-dialog>
</template>
<script>
import FormBuild from '../form-build/index.vue'
import PreviewCode from "./preview-code.vue";

import renderPreview from "./render.vue";
export default {
  name: "ng-form-preview",
  data() {
    return {
      visible: false,
      renderVisisble: false,
      previewWidth: 850,
      models:{},
      jsonData: {}
    };
  },
  components: {
    PreviewCode,FormBuild,renderPreview
  },
  inject: {
    customComponents: {
      from: 'customC',
      default: ()=>[]
    },
    ngConfig: {
      from: 'ngConfigC',
      default: ()=>({})
    }
  },
  methods: {
    init(data ) {
      this.visible = true

      this.jsonData = data
      // 重置表单
      this.$nextTick(()=>{
        this.$refs.formBuild.reset()
      })
    },
    handleGetData() {
      this.$refs.formBuild.getData()
        .then(res => {
          this.$refs.previewCode.init(res)
        })
        .catch(err => {
          console.log(err, "获取数据失败");
        });
    },
    handleValidator(){
       this.$refs.formBuild.getData()
        .then()
        .catch(err => {
          console.log(err, "获取数据失败");
        });
    },
    handleRender(){

      this.renderVisisble = true ;
      this.$refs.formBuild.getData()
        .then(res => {
          this.$nextTick(() => {
            this.$refs.renderPreview.init(this.jsonData , res)
          })
      })
      .catch(err => {
          console.log(err, "获取数据失败");
      });

    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
