<template>

    <!-- 使用组件 -->
    <!-- <router-view></router-view> -->
    <tab-bar>
      <!-- <router-link to="/home"> -->
      <tab-bar-item path="/home" activeColor="#ed72ab">
      <!-- src引用别名需要加~ -->
          <img slot="item-icon" src="~assets/img/tabbar/home.svg"> 
          <img slot="item-icon-active" src="~assets/img/tabbar/home-fill.svg">
          <div slot="item-text">
          首页
          </div>
      <!-- </router-link> -->
      </tab-bar-item>

      <tab-bar-item path="/list" activeColor="#ed72ab">
        <img slot="item-icon" src="~assets/img/tabbar/list.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/list-fill.svg">
        <div slot="item-text">
        分类
        </div>
      </tab-bar-item>
      
      <tab-bar-item path="/shoppingcar" activeColor="#ed72ab">
        <img slot="item-icon" src="~assets/img/tabbar/car.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/car-fill.svg">
        <div slot="item-text">
        购物车
        </div>
      </tab-bar-item>

      <tab-bar-item path="/my" activeColor="#ed72ab">
        <img slot="item-icon" src="~assets/img/tabbar/my.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/my-fill.svg">
        <div slot="item-text">
        我的
        </div>
      </tab-bar-item>
    </tab-bar>

</template>

<script>
// 导入子组件 
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from 'components/common/tabbar/TabBarItem';
export default {
  name: 'MainTabbar',
  // 注册组件
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
</style>