<template>
  <el-form-item :label="$attrs.label+':'">
    <el-upload class="ty-upload" v-bind="$attrs" :on-exceed="exceed" :on-success="success">
      <slot />
      <slot slot="tip" name="tip"/>
    </el-upload>
  </el-form-item>
</template>

<script>
export default {
  props: {
    // must be included in props
   
  },
  methods: {
    success(res) {
      // console.log("success:",res);
      if(res.code == 0){
        this.$emit("input", res.data.length == 1 ? res.data[0].fileName : data);
      }else{
        this.$notify.error({
          title: '错误',
          message: res.msg
        });
      }
    },
    exceed(data) {
      this.$notify.warning({
        title: '警告',
        message: `已超出最大上传量，最多允许上传${data.length}个文件，请删除现有文件后在进行上传!`
      });
    }
  },
  created() {
    // console.log("$attrs:", this.$attrs);
  }
};
</script>
