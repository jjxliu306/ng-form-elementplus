<template>
<div class="panel-header-index">  
	<el-row>	
		<el-col :span="6">
		 	<slot name="logo"> 
			 	<a href="https://gitee.com/jjxliu306/ng-form-elementplus" target="_black">
					<img class="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABTpJREFUWEftVmtsFFUU/u7M7KNTS9tAtSAtiAotQUA0BIjKI1s07i5CutWCAaIJqMFAQvwhGORhICYSMSQCIaYhaDTQBZGyxZQWCD8EDRCw2Ae05VmklLZLS3dndmbuNXe22+6yC2TbHxjjSSaZuXPuOd/57jnnHoLHLOQx+8f/AP4bDDidCzI1aKMqfKVnks2pATPgeNOzDgRrTccM6yvLveuSATEgAAVOTxED9jLgB8Zo1dHy/buScc51BwTA4SrcDUbcFkpGHz5c2pqs84EDcHqOcSOVPu/M/jj/dwNwu92yYljHAkI+JWwCAV4iQD1jrJ4IqAfIOMaw3IyCYCvALjCKMYSQMQzgzxmBkfMArbWLoZqysrJAIpYS5oDDWfSRJLI1uoGhfJNNIjRviCDYJXT9fsNI42uSAGNomkAJAVruMag6s/D1/CwhYBWJfNVPQ36FWfmaRcAtjZINlb7S7feDiAPgcHoOAXAuck0zXC6nKKemwlb1mbnvrsLwxXEVU3JEOJ6VkGHv2777XAjfn9Pw9kiCJTNkU787xNDcxVDVqOv7azQJgK/S53VFg4gB4HB6WKosY/uGZRiaNxnQVaChAriwzzSWan140TRcViHfVpH5XApSBpuE9MrpmwZWVSjmd6XP22uo96XA6dmYnf3U6pJNyyE9ORqoOQA0HgXUTvz0p4aSsyEcWCA/EoS/KQi108CQsTJEqxB37AW7unntbzri85q0mgAKnEVzGNgvm1cWY8KsQuDsLqDpeO/mCy0Gqlso5o+PjSpRUlGNoa0uAHumhLThtjiVbX+E8HONBgLy1hFf6UEye/bCVNGu1Oamk6d3zM8RQETgXkt/yxoN7RTDrID8RHz0EaMrfEHjUju7aSj2fOJwvzMF1Di5ZfGLGGe5Bujhc4qWeyGGT35VoFNgzQwbRmQkNs6Z+rRCQW6GgK9etz/wuMov6tjymwoI4lTicBUuGZQ2aOe+H0vC586f++S7MyHsqdbM1ecHC9jmTknI0MeHgqi/Q81/ReMsWPqyWYVx0thO8eHBIEDYUuJwerZaRLKsfOUkAR1XEjKwpkrBqetGr6H1s+yYlivGGD7WpGPTCbV3bfJwERsd9oQAeJJ6DqpU0dm3HMCxnHRhRsm8xFFxC96/NJTV6WgPUpP+FVNtJhPRwpvR50cVNLWHdebmS3CNiU9a9a5uJunmOxZUt9LjJgM56cL7JfNSUvudeUls7L4Vwt2rCj64JPUw4CpcAkZ2eotlpEd1tiRsJqXqv6ygod3AqmreBHgO9FTB2pk2vDKCd8tYaQswFO9NeI880nFpsRzTrqnB0FYTwIluATvqaLgKIn3g1Vxx2KrpttjM6nHB+3xEeL/nsnBi+HxJz0wT0Yms83+LJsZWAe+SgVYNX9620AY/azb7AFeMdMIF4y14b1Li0uF6vos6vuH1CyA6umiWeJ94bWQ8k13NKrpuqNjTKaG8mfV1wkhk/C5gwOrV022Y+Uy8gUfy/QAFQ2PoaAgg1Bku48W1YvxdENnLb0P+7s6z4N3xFgyWkxsZT13RIBnAC1kC9KABPUihdunQAxTnbTZ8fU43XSW8DaNAmPMAHzbm5EkCr/cJ2X2p4VcYrvopRmUKSLOFAda0UpTVaahs1DEvi2LuEDMOXCcirhkCznYSevpvgzeOh88DfSBiJyKrSGh+liA0dVCjS2UmmshEFNCY0BYIr03MFm/aCMsI6JAvdjCq6szsVklNRBEQiWZCHiwIqWUU9QLoG4yQkQzgNXpSIOxKf2bCfwBgrE2DNwT/bgAAAABJRU5ErkJggg==" >
					<span class="title">ng-form-elementplus</span>
				</a>
			</slot>
		</el-col>
		<el-col :span="8">
			<slot name="formName"></slot>
		</el-col>
		<el-col :span="10"> 
			<span class="buttons">
				<slot name="controlButton"></slot>
				<el-button v-if="clear" text size="small" icon="Delete"  @click="handleClear">
					{{t('ngform.header.clear')}}
				</el-button>
			  <el-button v-if="preview" text size="small" icon="View"  @click="handlePreview">
			    	{{t('ngform.header.preview')}}
			  </el-button> 
			  <el-button v-if="imp" text size="small" icon="Download"  @click="handleImport">
			  	{{t('ngform.header.imp')}}
			  </el-button>
			  <el-button v-if="exp" text size="small" icon="Upload" @click="handleExport">
			  	{{t('ngform.header.exp')}}
			  </el-button>
			</span> 
		</el-col> 
	</el-row>	 

  <Preview v-if="previewVisible" ref="preview" />
  <Code v-if="codeVisible" ref="code" @imp="importData" />
</div>
</template>
<script>
import Preview from './preview.vue'
import Code from './code.vue'
import LocalMixin from '../../locale/mixin.js'
export default{
	mixins: [LocalMixin],
	components: {
		Preview,
		Code
	},
	data() {
		return {
			previewVisible: false,
			codeVisible: false
		}
	},
	props: {
		formTemplate: {
			type: Object
		},
		// 按钮显示隐藏 
	  clear: {
	    type: Boolean ,
	    default: true
	  },
	  preview: {
	    type: Boolean ,
	    default: true
	  },
	  reder: {
	    type: Boolean ,
	    default: true
	  },
	  imp: {
	    type: Boolean ,
	    default: true
	  },
	  exp: {
	    type: Boolean ,
	    default: true
	  }
	},
	methods: {
		handleClear() {
			this.$confirm(this.t('ngform.header.clear_prompt'), this.t('ngform.header.prompt'), {
          confirmButtonText: this.t('ngform.confirm'),
          cancelButtonText: this.t('ngform.cancel'),
          type: 'warning'
      }).then(() => {
        //this.$set(this.formTemplate , 'list' , [])
        this.formTemplate['list'] = []
      })
			
		},
		handlePreview() {
			this.previewVisible = true 
			this.$nextTick(()=> {
				this.$refs.preview.init(this.formTemplate)
			})
		},
		handleImport() {
			this.codeVisible = true 
			this.$nextTick(()=> {
				this.$refs.code.init(this.formTemplate , true)
			})
		},
		// 外部导入
		importData(codes) {
			this.$emit('importData' , codes)
		},
		handleExport() {
			this.codeVisible = true 
			this.$nextTick(()=> {
				this.$refs.code.init(this.formTemplate)
			})
		}
	}
}
</script>
<style>
.panel-header-index {
  height: 100%;
}

.panel-header-index .logo, .panel-header-index .title {
  float: left;
}

.panel-header-index .title {
  line-height: 40px;
  height: 40px;
  padding-left: 20px;
}

.panel-header-index .buttons {
  float: right;
  height: 40px;
  line-height: 40px;
}
.panel-header-index .buttons .el-button+.el-button{
	margin-left: 0px;
}



</style>
<!-- <style lang="scss">
.panel-header-index {
	height: 100%;
  
  .logo , .title {
  	float: left;
  }

  .title {
  	line-height: 40px;
    height: 40px;
    padding-left: 20px;
  }

	.buttons {
		float: right ;
		height: 40px;
    	line-height: 40px;
	}
}
</style> -->