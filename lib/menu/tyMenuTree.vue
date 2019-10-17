<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#F6F6F6"
    text-color="#0E1926"
    active-text-color="#1890FF"
  >
    <ty-menu-item :menus="menus"></ty-menu-item>
          <!-- <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title" @click="goto('monitor')">实时监控</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="goto('account')">账号管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title" @click="goto('enterprise')">企业信息</span>
          </el-menu-item> -->
  </el-menu>
</template>

<script>
import TyMenuItem from "./tyMenuItem.vue";
export default {
  name: "TyMenuTree",
  components: {
    TyMenuItem
  },
  props: {
    menus: Array
  },
  methods: {
    handleOpen: function(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose: function(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>