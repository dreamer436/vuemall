<!--  -->
<template>
<!-- Object.keys(goods).length判断对象是否为空 -->
<div class="info-bottom">
    <div class='base-info' v-if="Object.keys(goods).length !== 0">
        <div class="info-title"> 
            {{goods.title}}
        </div>
        <div class="info-price">
            <span class="n-price"> {{goods.newPrice}} </span>
            <span class="o-price"> {{goods.oldPrice}} </span>
            <span class="discount" v-if="goods.discount"> {{goods.discount}} </span>
        </div>
        <div class="info-other">
            <span> {{goods.columns[0]}} </span>
            <span> {{goods.columns[1]}} </span>
            <span> {{goods.services[goods.services.length-1].name}} </span>

        </div>
        <div class="info-service">
            <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon" />
                <span> {{goods.services[index-1].name}} </span>
            </span>
        </div>
        
    </div>
</div>

</template>

<script>

export default {
//import引入的组件需要注入到对象中才能使用
name: 'DetailBaseInfo',
props:{
    goods:{
        type:Object,
        default() {
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
computed: {},
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
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.base-info{
    font-size:14px;
    width: 96%;
    margin: auto;
    margin-top: 15px;
    color:#b1b1b1;
}
.info-title{
    font-size:16px;
    color: #222;
    text-indent: 5px;
    line-height:20px;
    font-weight:600;
    padding-bottom: 8px;
}
.info-price{
    padding-bottom:15px;
}
.n-price{
    font-size:24px;
    color:var(--color-high-text);
}
.o-price{
    text-decoration: line-through;
    margin-left:10px;
}
.discount{
    padding:3px 6px;
    color:#fff;
    background-color:var(--color-high-text);
    border-radius:10px;
    margin-left:5px;
    position:relative;
    top:-8px;
    font-size: 10px;
}
.info-other{
    display:flex;
    justify-content:space-between;
    padding-bottom:15px;
    border-bottom:1px solid #f3f3f3;
} 
.info-service{
    display:flex;
    justify-content:space-between;
    color:#333;
    padding:15px 0;
}
.info-service-item img{
    width:14px;
    height:14px;
    position:relative;
    top:2px;
}
.info-bottom{
    border-bottom:5px solid #f3f3f3;
}
</style>