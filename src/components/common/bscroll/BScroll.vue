<!--  -->
<template>
<div class='wrapper'>
    <div>
        <slot></slot>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from 'better-scroll';

export default {
//import引入的组件需要注入到对象中才能使用

name: 'BScroll',
components: {},
props:{
    probeType:{
        type:Number,
        default:0
    },
    pullUpLoad:{
        type:Boolean,
        default:false
    }
},
data() {
//这里存放数据
return {
    bs:null,
    
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    scrollTo(x,y,time) {
       this.bs && this.bs.scrollTo(x,y,time)
    },
    refresh() {
       this.bs && this.bs.refresh()
    },
    finishPullUp() {
        this.bs && this.bs.finishPullUp()
    },
    getbsY() {
        return this.bs ? this.bs.y : 0
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    // 创建BScroll对象
    this.bs = new BScroll(document.querySelector('.content') , {
        probeType: this.probeType,
        click: true,
        pullUpLoad:this.pullUpLoad
    })
    // 监听滚动位置
    if(this.probeType === 2 || this.probeType === 3) {
        this.bs.on('scroll' , (position) => {
            this.$emit('scroll' , position)
        })
    }
    // 监听scroll滚动到底部
    if (this.pullUpLoad) {
        this.bs.on('pullingUp' , () => {
            this.$emit('pullingUp')
        })
    }
    
},
beforeCsreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>

</style>