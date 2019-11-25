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
  methods: {
    success(res, file, fileList) {
      if(res.code == 0){
        if(fileList.length==1){
          this.$emit("input", fileList[0].response.data[0].fileName);
        }else{
          let _fileList = fileList.map(function(item){
            return {
              fileName: item.name,
              fileSize: item.size,
              uploadTime: new Date().getTime(),
              fileId: item.response.data[0].id
            }
          });
          this.$emit("input", _fileList);
        }
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
