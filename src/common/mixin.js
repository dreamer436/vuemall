import {debouce} from './utils';
import BackTop from 'components/content/backtop/BackTop';

export const itemListenerMixin = {
    data() {
        return {
            itemListener:null,
            refresh:null,
        }
    },
    mounted() {
        // 1.对 this.$refs.scroll.refresh这个函数进行防抖操作
        this.refresh = debouce(this.$refs.scroll.refresh,50);

        // 2.对监听的事件进行保存
        this.itemListener = () => {
            this.refresh()
        };
        // 3.接收事件总线
        this.$bus.$on('itemImageLoad',this.itemListener);
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components:{
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0,0,500);
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > 1000;
        },
    }
}