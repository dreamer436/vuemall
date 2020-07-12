<!--  -->
<template>
<div class='bottom-bar'>
    <div class="check-all">
        <check-button class="check-all-icon" :isChecked="ischeckedAll" @click.native="checkAllClick"></check-button>
        <span>全选</span>
    </div>
    <div class="price">
        合计:{{totalPrice}}
    </div>
    <div class="calculate">
        去结算({{checkedLength}})
    </div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
name: 'CartBottomBar',
components: {
    CheckButton,
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {
    totalPrice() {
        return  '￥' + this.$store.state.cartList.filter ( item => {
            return item.checked
        }).reduce( (preValue,item) => {
            return preValue + item.price * item.count
        },0).toFixed(2)
    },
    checkedLength() {
        return this.$store.state.cartList.filter( item => item.checked ).length
    },
    ischeckedAll() {
        if(this.$store.state.cartList.length === 0){
            return false
        }
        // return !(this.$store.state.cartList.filter( item => !item.checked).length > 0)
        return  !this.$store.state.cartList.find(item => !item.checked )
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    checkAllClick() {
        // 全部选中，变成全部不选中
        if(this.ischeckedAll) {
            this.$store.state.cartList.forEach(element => {
               return element.checked = false
            });
        }else{
             this.$store.state.cartList.forEach(element => {
               return element.checked = true
            });
        }
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
.bottom-bar{
    height:40px;
    position: fixed;
    bottom:49px;
    left: 0;
    right: 0;
    line-height:40px;
    border-top:1px solid #f6f6f6;
    border-bottom:1px solid #f6f6f6;
    display: flex;
}
.check-all{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
    
}
.check-all-icon{
    width:18px;
    height:18px;
    margin-right: 5px;
    line-height:18px;
}
.price{
    margin-left: 30px;
    flex: 1;
}
.calculate{
    width: 90px;
    background-color: var(--color-high-text);
    color: white;
    text-align: center;
}
</style>