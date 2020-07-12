import {ADD_COUNTER,ADD_TO_CART} from './mutations-types';


export default {
    addCart(context,payLoad) {
       return new Promise( (resolve,reject) => {
             // 1.查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(function(item) {
                return item.iid === payLoad.iid
            })
            // 2.判断是否有oldProduct
            if(oldProduct) {
                // oldProduct.count += 1;
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前商品数量加一');
            }else {
                payLoad.count = 1;
                // context.state.cartList.push(palyLoad)
                context.commit(ADD_TO_CART , payLoad)
                resolve('添加了新的商品');

            }      
       }) 
    }
}