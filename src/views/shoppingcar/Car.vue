<!--  -->
<template>
<div class='cart'>
    <nav-bar class="nav-bar">
        <div slot="center">购物车( {{cartLength}} )</div>
    </nav-bar>
    <scroll class="content" ref="scroll" >
        <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from 'components/common/bscroll/BScroll';

import CartList from "views/shoppingcar/childComps/CartList";
import CartBottomBar from "views/shoppingcar/childComps/CartBottomBar";

import {mapGetters} from 'vuex';

export default {
//import引入的组件需要注入到对象中才能使用
name: 'Car',
components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {
    ...mapGetters([
        'cartLength'
    ])
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {
    this.$refs.scroll.refresh()
}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.car{
    height: 100vh;
}
.nav-bar{
    background: var(--color-high-text);
    color:#fff;
}
.content{
    overflow:hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
    right: 0;
    left: 0;
}
</style>