const db_goods = require('../../DB/Goods/Goods.js')
const global = require('../../config.js')
const imgController = require('./ImgController.js')

let getGoodsList = function (_pageindex) {
    // 因为数据少，一次只加载6个。
    let _goodslist = []

    let _min = 6 * (_pageindex - 1)
    let _max = 6 * _pageindex
    for (let i = 0; i < db_goods.goodsList.length; i++) {
        if (i >= _min && i < _max) {
            let _goods = db_goods.goodsList[i]
            _goodslist.push({
                id: _goods.goods_no,
                title: _goods.title,
                add_time: _goods.add_time,
                zhaiyao: _goods.zhaiyao,
                click: _goods.click,
                img_url: global.address + '/public/Image/Goods/' + _goods.img_id + '.jpg',
                sell_price: _goods.sell_price,
                market_price: _goods.market_price,
                stock_quantity: _goods.stock_quantity,
            })
        }
    }

    let result = { status: 0, message: _goodslist }
    return result
}

let getThumImagesGoods = function (goodsNo) {
    let _thumImgs = []

    goodsNo = goodsNo.toUpperCase()
    let _goodsList = db_goods.goodsList
    let _goods = _goodsList.find(item => item.goods_no == goodsNo)
    _goods.thun_ids.forEach(element => {
        _thumImgs.push({
            src: global.address + '/public/Image/Goods/' + element + '.jpg',
        })
    })

    //let _thumImgs = imgController.getThumImages(_goods.img_id) // @@@其实这里应该用跳转，跳转到另一个controll，而不是用方法调用
    return { status: 0, message: _thumImgs }
}

let getInfo = function (goodsNo) {
    goodsNo = goodsNo.toUpperCase()
    let _goodsList = db_goods.goodsList
    let _goods = _goodsList.find(item => item.goods_no == goodsNo)
    let _goodsInfo = {
        id: _goods.goods_no,
        title: _goods.title,
        add_time: _goods.add_time,
        goods_no: _goods.goods_no,
        stock_quantity: _goods.stock_quantity,
        market_price: _goods.market_price,
        sell_price: _goods.sell_sprice,
        video_url: global.address + '/public/Video/' + _goods.video_url
    }
    let result = { status: 0, message: [_goodsInfo] }
    return result
}

let getGoodsDesc = function (goodsNo) {
    goodsNo = goodsNo.toUpperCase()
    let goodsList = db_goods.goodsList
    let goods = goodsList.find(item => item.goods_no == goodsNo)
    let imgDirectory = global.address + '/public/image/GoodsDesc/'
    let goodsDesc = [{
        title: goods.title,
        content: `<img src="${imgDirectory + goods.id + '.jpg'}">`
    }]
    let result = { status: 0, message: goodsDesc }
    return result
}

let getShopcarList = function (ids) {
    let shopcarList = []

    ids = ids.map(element => element.toUpperCase())
    let goodsList = db_goods.goodsList
    goodsList.forEach(element => {
        if (ids.indexOf(element.goods_no) > -1) {
            shopcarList.push({
                cou: 1,
                id: element.goods_no,
                title: element.title,
                sell_price: element.sell_sprice,
                thumb_path: global.address + global.img_address + element.img_id + '.jpg',
            })
        }
    })

    let result = { status: 0, message: shopcarList }
    return result
}

module.exports = {
    getGoodsList: getGoodsList,
    getThumImagesGoods: getThumImagesGoods,
    getInfo: getInfo,
    getGoodsDesc: getGoodsDesc,
    getShopcarList: getShopcarList
}