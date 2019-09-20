<template>
  <div>
    <template v-for="(item,index) in menus">
      <el-submenu v-if="item.children" :key="index" :index="item.name">
        <template slot="title">
          <ty-menu-icon :name="item.name"></ty-menu-icon>
          <span>{{item.name}}</span>
        </template>
        <ty-menu-item :menus="item.children"></ty-menu-item>
      </el-submenu>
      <el-menu-item v-if="!item.children" :key="index" :index="item.name">
        <ty-menu-icon :name="item.name"></ty-menu-icon>
        <span slot="title" @click="goto(item.router)">{{item.name}}</span>
        </el-menu-item>
    </template>
  </div>
</template>

<script>
import TyMenuIcon from "./tyMenuIcon.vue"
export default {
  name: "TyMenuItem",
  components: {
    TyMenuIcon
  },
  props: {
    menus: Array
  },
  methods: {
    goto: function(routeName) {
      this.$router.push(routeName || "enterprise");
    }
  }
};
</script>
