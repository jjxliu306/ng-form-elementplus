<!--
  多组件联动的时候配置联动信息
-->

<template>
  <div class="option-change-container">
    <el-row  :gutter="8">
      <span v-for="(val, index) in value" :key="index">
        <div class="option-change-box"  >
          <el-col :span="21" >

              {{index+1}}、
              <el-radio v-model="val.vtype" :label="1">本地</el-radio>
              <el-radio v-model="val.vtype" :label="2">远程</el-radio>

          </el-col>
          <el-col :span="21" >
            <el-input size="default" v-model="val.model" placeholder="关联字段">
              <template #prepend>关联字段</template>
            </el-input>
          </el-col>
          <el-col :span="21">
            <template v-if="val.vtype == 1">
               表达式:
              <el-input size="default"   type="textarea" v-model="val.script" placeholder="表达式,eg: $item.value>$.age . 其中$item表示当前数据中具体一条数据,$表示当前整个表单数据" />

            </template>

            <el-row v-else-if="val.vtype == 2">
              <el-col :span="12">
                <el-input size="default" v-model="val.queryKey" placeholder="query key" />
              </el-col>
               <el-col :span="12">
                <el-input size="default" v-model="val.queryValue" placeholder="query value" />
              </el-col>
            </el-row>

          <!--   <el-input size="default"  v-else-if="val.vtype == 2" type="textarea" v-model="val.query" placeholder="远程搜索添加查询条件,eg:key=$.sex" /> -->
          </el-col>
          <el-col :span="3" >
            <div @click="handleDelete(index)" class="option-delete-box">
              <el-icon><Delete /></el-icon>
            </div>
          </el-col>
        </div>
      </span>
      <el-col v-if="!disabled" :span="24"><el-button type="primary" size="default" @click="handleAdd">添加</el-button></el-col>
    </el-row>

  </div>
</template>
<script>

export default {
  name: "ChangeOption",
  props: {
    value: {
      type: Array,
      default: ()=> [],
      required: true
    },

    disabled: {
      type: Boolean,
      default: false
    },

  },
  methods: {

    handleAdd() {
      console.log('thisvalue' , this.value)
      this.value.push( {
        vtype: 1,
        //validator: 'validatorFiled',
        model: "",
        script: "",
        queryKey: "",
        queryValue: ""
      })
      this.$emit("update:value", this.value);
    },
    handleDelete(deleteIndex) {
      // 删除

      this.value.splice(deleteIndex,1)
      this.$emit(
        "update:value",
        this.value
      )
    },

  }
};
</script>
