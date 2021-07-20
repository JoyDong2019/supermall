import { debounce } from './utils'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null

        }
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}
export const toTopMixin = {
    data() {
        return {
            isShowBackTop: false,

        }
    },
    methods: {
        toTop() {
            this.$refs.scroll.scrollTo(0, 0)
        },
    }
}