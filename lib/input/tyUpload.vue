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
    dateFormat(fmt, date) {
        let ret;
        let opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    },
    success(res, file, fileList) {
      if(res.code == 0){
          let _fileList = fileList.map(item => {
            return {
              name: item.name,
              size: item.size,
              uploadTime: this.dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
              id: item.response.data[0].id
            }
          });
          this.$emit("input", _fileList);
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