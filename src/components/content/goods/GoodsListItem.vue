<!--  -->
<template>
<div class='goods-item'@click="itemClick" >
    <img v-lazy="showImage" @load="imageLoad" />
    <div class="goods-info">
        <p> {{goodsitem.title}} </p>
        <span class="price"> {{goodsitem.price}} </span>
        <span class="collect"> {{goodsitem.cfav}} </span>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
name: 'GoodsListItem',
props:{
    goodsitem:{
        type:Object,
        default (){
            return {}
        }
    }
},
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念 
// 判断数据中的img路径 动态绑定给图片
computed: {
    showImage() {
        return this.goodsitem.image || this.goodsitem.show.img
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    imageLoad(){
        // 发送事件总线
        this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
        this.$router.push('/detail/' + this.goodsitem.iid)
    }
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
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.goods-item{
    padding-bottom: 50px;
    width:48%;
    position: relative;
    margin-bottom: 10px;
}
.goods-item img{
    width:100%;
    border-radius:8px 8px 0 0;

}
.goods-info{
    font-size:14px;
    position:absolute;
    bottom: 5px;
    left: 5px;
    right: 5px;
}
.goods-info p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height:30px;
    
}
.price{
    color: var(--color-high-text);
    font-size: 16px;
    font-weight: 600;
}    
.collect {
    position: relative;
    float: right;
}
.collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>