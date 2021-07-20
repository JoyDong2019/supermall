import { request } from './request.js'
export function getDetail(iid) {
    // 必须要有return 把数据送出去
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}
// 由于闯过来的res数据非常杂乱 在组件中最好接受的数据来源单一，所以创建一个类
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.lowPrice = itemInfo.lowPrice
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}
export class GoodsParam {
    constructor(info, rule) {
        // images可能没有值
        this.image = info.images ? info.images[0] : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}