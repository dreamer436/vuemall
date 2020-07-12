<!--  -->
<template>
<div class='detail'>
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probeType="3">
        <detail-swiper :top-images="topImages" ></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <!-- <toast :message="message" :show="show"></toast> -->

</div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar';
import DetailSwiper from './childComponents/DetailSwiper';
import DetailBaseInfo from './childComponents/DetailBaseInfo';
import DetailShopInfo from './childComponents/DetailShopInfo';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo';
import DetailParamInfo from './childComponents/DetailParamInfo';
import DetailCommentInfo from './childComponents/DetailCommentInfo';
import DetailBottomBar from './childComponents/DetailBottomBar';
import GoodsList from 'components/content/goods/GoodsList';

import {getDetail,GoodsInfo,Shop,GoodsParam,getRecommend} from 'network/detail';

import Scroll from 'components/common/bscroll/BScroll'
import {itemListenerMixin,backTopMixin} from 'common/mixin';
import {debouce} from 'common/utils';

// import Toast from 'components/common/toast/Toast'


export default {
name: 'Detail',
components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
},
mixins:[itemListenerMixin,backTopMixin],
data() {
//这里存放数据
    return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        // message:'',
        // show:false,
    };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    imgLoad() {
        this.refresh()
        this.getThemeTopY()
    },
    titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    // 导航联动效果
    detailScroll(position) {
        const positionY = -position.y;
        let length = this.themeTopYs.length;
        for(var i=0; i<this.themeTopYs.length-1; i++ ){
            if( this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] )) {
                this.currentIndex = i;
                this.$refs.nav.currentIndex = this.currentIndex
            }
        };
        // 是否显示回到顶部
        this.listenShowBackTop(position)
    },
    
    addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车
        this.$store.dispatch('addCart', product).then( res => {
            this.$toast.show(res,1000)
        })

    },
    
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情页数据
    getDetail(this.iid).then( res => {
        // 1.获取顶部的轮播图数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        // 2.获取商品信息
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services);
        // 3.创建店铺信息
        this.shop = new Shop(data.shopInfo);
        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo;
        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.获取评论信息
        if(data.rate.cRate != 0) {
            this.commentInfo = data.rate.list[0];
        }
        
    }),
    //3.请求推荐数据
    getRecommend().then( res => {
        this.recommends = res.data.list;

    })
    // 4.给getThemeTopY赋值
    this.getThemeTopY = debouce( () => {
        this.themeTopYs =[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop+10);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop-44);
        this.themeTopYs.push(Number.MAX_VALUE)

    },600)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    
},
// detail页面没有缓存用destroyed，如果有缓存用deactivated生命周期函数
destroyed() {
    this.$bus.$off('itemImageLoad',this.itemListener)
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {
    
}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.detail{
    position:relative;
    z-index:9;
    background-color:#fff;
    height: 100vh;
}
.detail-nav{
    position:relative;
    z-index:9;
    background-color:#fff;
}
.content{
    height: calc(100% - 44px - 58px);
}

</style>