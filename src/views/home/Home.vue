<!--  -->
<template>
<div id="home">
    <nav-bar class="home-nav">
        <div slot='center'>购物街</div>
    </nav-bar>
    <tab-control v-bind:titles="['流行','精选','服饰']"
                     @tabClick="tabClick"
                     ref="tabControl1"
                     class="tab-control"
                     v-show="isTabFixed"
                     ></tab-control>

    <scroll class="content" 
            ref="scroll"  
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >
        <home-swiper v-bind:banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend-view v-bind:recommends="recommends"></home-recommend-view>
        <home-feature></home-feature>
        <tab-control v-bind:titles="['流行','精选','服饰']"
                     @tabClick="tabClick"
                     ref="tabControl2"
                     ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 监听组件的点击需要加上.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommendView from './childComps/HomeRecommendView';
import HomeFeature from './childComps/HomeFeature';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/bscroll/BScroll';


import {getHomeMultidata,getHomeGoods} from 'network/home';
import {itemListenerMixin,backTopMixin} from 'common/mixin';

export default {
//import引入的组件需要注入到对象中才能使用
name: 'Home',
components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,

},
mixins:[itemListenerMixin,backTopMixin],

data() {
//这里存放数据
return {
    banners: [],
    recommends:[],
    goods:{
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
    },
    currentType:'pop',
    tabOffsetTop: 0,
    isTabFixed:false,
    saveY:0,
    };
},
//监听属性 类似于data概念
computed: {
    showGoods() {
        return this.goods[this.currentType].list
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    // 网络请求相关方法
    getHomeMultidata() {
        getHomeMultidata().then( res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        }).catch( err => {
            console.log(err);
        })
    },
    getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then( res => {
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1

            // 完成了上拉加载更多
            this.$refs.scroll.finishPullUp()
        })
    },

    //事件监听相关方法
    tabClick(index){
        switch(index){
            case 0:
                this.currentType = 'pop'
                break;
            case 1:
                this.currentType = 'new'
                break;
            case 2:
                this.currentType = 'sell'
                break;   
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position){
        // 1.判断backTop是否显示
        this.listenShowBackTop(position)
        // 2.决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
        this.getHomeGoods(this.currentType)
    },
    // 获取tabControl的offsetTop
    swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    
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
// 如果页面有keep-alive缓存功能，这个函数会触发
activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
}, 
deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getbsY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemListener)

}
}
</script>
<style scoped>
#home{
    /* viewport height 视口高度 */
    height: 100vh;
    position: relative;
}
.home-nav {
    background-color:#ed72ab;
    color:#fff;
    /* 浏览器原生滚动时为了让导航不跟随一起滚动
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
}

.content{
    overflow:hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;

    /* height: calc(100% - 93px);
    overflow: hidden;
    margin-top:75px ; */
}
.tab-control{
    position: relative;
    top: -1px;
    z-index: 9;
}

</style>