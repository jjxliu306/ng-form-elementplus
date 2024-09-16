
<template>
    <div style="padding: 20px;">  
        <ng-form-build  ref="formBuild" :models="models" :config="config" :formTemplate="form" />

        <div style="text-align: center;"> 
      		<el-button type="primary" size="mini" @click="dataFormSubmit()">提交</el-button>
        </div>
    </div> 
</template>
<script>
export default { 
   	data() {
    	return { 
    		form: {
	 		 
	"list": [
		{
			"type": "input",
			"options": {
				"type": "text",
				"placeholder": "请输入",
				"clearable": false,
				"hidden": false,
				"disabled": false
			},
			"label": "输入框",
			"labelWidth": -1,
			"width": "100%",
			"span": 24,
			"model": "aaa",
			"key": "input_17264516163102",
			"rules": [
				{
					"required": false,
					"message": "必填项",
					"trigger": [
						"blur"
					]
				}
			],
			"dynamicLabel": false
		},
		{
			"type": "uploadImg",
			"event_": false,
			"listen_": false,
			"options": {
				"action": "https://netopt.net/api/file/upload",
				"responseFileUrl": "url",
				"listType": "picture-card",
				"limitSize": 10,
				"defaultValue": [],
				"multiple": false,
				"limit": 3,
				"hidden": false,
				"disabled": false,
				"uploadHidden": false,
				"headers": [
					{
						"value": "959a45443a32d55a679c424b0b2867ed",
						"label": "token"
					}
				]
			},
			"label": "上传图片",
			"labelWidth": -1,
			"width": "100%",
			"span": 24,
			"model": "bbb",
			"key": "uploadImg_17264516151432",
			"rules": [
				{
					"required": false,
					"message": "必填项",
					"trigger": [
						"blur"
					]
				}
			],
			"dynamicLabel": false
		}
	],
	"config": {
		"labelPosition": "left",
		"labelWidth": 100,
		"size": "default",
		"outputHidden": true,
		"hideRequiredMark": false,
		"syncLabelRequired": true,
		"labelSuffix": "",
		"customStyle": ""
	}
 
			},

    		config: {
    			httpConfig: (config)=>{ 
    				config.baseURL = 'https://www.netopt.net/netopt-admin'
    				if(config.headers) {
    					config.headers['aaaa'] = 'bbbb'
    				}
		          	
		          	return config 
		        },
    		},
    		// 标记历史数据 
    		models: {

	"aaa": "111",
	"bbb": [
		{
			"name": "33a0035d-c070-43a5-8105-3ffbeb896dbf.png",
			"size": 2549,
			"url": "https://www.netopt.net/group1/M00/01/0A/rBEADGbnkJGAQFsXAAAJ9SlyAXg279.png"
		}
	]
 
    		}
    	} 
    },
    created(){
    	 

    	const this_ = this 
    	setTimeout(()=> {
    		const ms = {
    			   aaa: '2222',
    			   bbb: []
    		}

    		this_.models = ms

    	} , 2000)
    },
    methods: {
    	dataFormSubmit() {
    		const models = this.$refs.formBuild.getData()

    		console.log('表单提交:' , JSON.stringify(models))
    	}
    }
}
</script>