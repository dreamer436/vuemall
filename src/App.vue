<template>
  <div id="app">
    <!-- 不让首页内容销毁掉 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <maintabbar></maintabbar>
  </div>
</template>

<script>
  import maintabbar from 'components/content/mainTabber/MainTabbar'
  export default {
    name: 'App',
    components: {
      maintabbar
    }
  }
</script>

<style>
  @import "./assets/css/base.css";
</style>
