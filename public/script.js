// const goods = [{
//         title: 'Shirt',
//         price: 150
//     },
//     {
//         title: 'Socks',
//         price: 50
//     },
//     {
//         title: 'Jacket',
//         price: 350
//     },
//     {
//         title: 'Shoes',
//         price: 250
//     }
// ];

class Cart {
    constructor() {
        
    }
}

class CartElement {
    constructor() {
        
    }
}
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>Цена: ${this.price}</p></div>`;
    }

}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 }
        ];
    }
    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHTML += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHTML;
    }
}
// const renderGoodsItem = (title, price) => {
//     return `<div class="goods-item"><h3>${title}</h3><p>Цена: ${price}</p></div>`;

// };

// const renderGoodsList = (list) => {
//     let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
//     document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
//     document.querySelector('.goods-list').style.display = 'flex';
//     document.querySelector('.goods-list').style.flexWrap = 'wrap';

// };

// renderGoodsList(goods);

const list = new GoodsList();
list.fetchGoods();
list.render();