<script>
import Head from "./Head.vue";

export default {
  name: "Home",
  components: {
    Head,
  },
};
</script>

<template>
  <div>
    <Head></Head>
    <div class="nav">
      <el-menu mode="horizontal" :router="true">
        <el-menu-item index="/project">项目管理</el-menu-item>
        <el-menu-item index="/dataset">数据管理</el-menu-item>
        <el-menu-item index="/module">模块管理</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
body {
  background-color: rgb(245, 249, 253);
}
.el-menu--horizontal > .el-menu-item {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
}
</style>