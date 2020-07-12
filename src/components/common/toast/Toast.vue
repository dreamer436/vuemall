<!--  -->
<template>
<div class='toast'  v-show="showMessage">
    <div class="">
        {{message}}
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
name: 'Toast',
props:{
    // message:{
    //     type:String,
    //     default:''
    // },
    // show:{
    //     type:Boolean,
    //     default:false
    // }
},
components: {},
data() {
//这里存放数据
return {
    message:'',
    showMessage:false
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    show(message, duration) {
        this.showMessage = true;
        this.message = message;
        setTimeout( () => {
            this.showMessage = false;
            this.message = '';
        },duration)
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
.toast{
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    color:white;
    background-color:rgba(0,0,0,0.6);
    padding:10px 10px;
    z-index: 111;
}
</style>