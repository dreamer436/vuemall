<!--  -->
<template>
<div class=''>
    <nav-bar>
        <div slot="center" class="title">
            <div v-for="(item,index) in titles" 
                 class="title-item" 
                 :class="{active: index === currentIndex}"
                 @click="titleClick(index)">
                  {{item}} </div>
        </div>
        <div slot="left"  class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" />
        </div>
    </nav-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
//import引入的组件需要注入到对象中才能使用
name: '',
components: {
    NavBar
},
data() {
//这里存放数据
return {
    titles:['商品','参数','评论','推荐'],
    currentIndex:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index);
    },
    backClick() {
        this.$router.back()
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
.title{
    display:flex;
    font-size:15px;
}
.title-item{
    flex:1;
}
.active{
    color:var(--color-high-text);
}
.back img{
    margin-top:12px;
    width: 18px;
    height: 18px;
}
</style>