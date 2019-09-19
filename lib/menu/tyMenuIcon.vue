<template>
  <i class="i-wrap">
    <i v-if="name=='测试菜单'" class="el-icon-location"></i>
    <i v-if="name=='账号管理'" class="el-icon-menu"></i>
    <i v-if="name=='企业信息'" class="el-icon-document"></i>
    <i v-if="name=='实时监控'" class="el-icon-setting"></i>
  </i>
</template>
<script>
export default {
  name: "TyMenuIcon",
  props: {
    name: String
  }
};
</script>
<style scoped>
  .i-wrap{
      position: relative;
      bottom: 2px;
  }
</style>