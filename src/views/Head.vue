<script>
export default {
  name: "Head",
};
</script>

<template>
  <header class="homepage-header" style="padding-left: 42px">
    <router-link to="/">
      <div style="display: flex; align-items: center">
        <img src="../assets/svg/jwlogo.svg" class="homepage-logo" />
        <img src="../assets/img/logo1.png" class="homepage-title" />
      </div>
    </router-link>
    <div class="nav-actions"></div>
  </header>
</template>

<style>
html {
  overflow: hidden;
  min-width: 1440px;
}
</style>

<style>
.homepage-header {
  height: 64px;
  background: rgba(85, 97, 255, 1);
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
}
.homepage-logo {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
.homepage-title {
  height: 28px;
}
</style>