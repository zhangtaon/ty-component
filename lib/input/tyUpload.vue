<template>
    <el-form-item :label="$attrs.label + ':'">
        <el-upload
                class="ty-upload"
                v-bind="$attrs"
                :on-exceed="onExceed"
                :on-success="onSuccess"
                :on-remove="onRemove"
        >
            <slot/>
            <slot slot="tip" name="tip"/>
        </el-upload>
    </el-form-item>
</template>

<script>
  export default {
    methods: {
      formatFileList(fileList = []) {
        return fileList.map(item => {
          if (item.response && item.response.data) {
            return item.response.data[0];
          }
        });
      },
      onRemove(file, fileList) {
        this.asyncData(fileList);
      },
      onSuccess(response, file, fileList) {
        if (response.code === 0) {
          this.asyncData(fileList);
        } else {
          this.$notify.error({
            title: "错误",
            message: response.msg
          });
        }
      },
      asyncData(fileList) {
        const list = this.formatFileList(fileList);
        this.$emit("input", list);
      },
      onExceed(data) {
        this.$notify.warning({
          title: '警告',
          message: `已超出最大上传量，最多允许上传${data.length}个文件，请删除现有文件后在进行上传!`
        });
      }
    },
    created() {}
  };
</script>
