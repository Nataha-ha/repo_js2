import Button from './button.js';

import './style.css';

class AbstractList {
    items = [];

    constructor(item = []) {
        this.item = [];
    }

    add(item) {
        const findedItem = this.items.find((fitem) => {
            return fitem.name === item.name;
        });


        const addedPromise = new Promise(resolve => {
            if (findedItem) {
                findedItem.counter++;
            } else {
                this.items.push(item);
            }
            resolve();
        });

        addedPromise.then(() => this.render());
    }

    remove() {
        //todo
    }

    render() {
        this.items.forEach(good => {
            good.render();
        });
    }
}

class List extends AbstractList {
    _cartInstance = null;
    _pageCounter = 1;

    constructor(CartInstanse) {
        super();
        this._cartInstance = CartInstanse;

        this.initShowMoreBtn();

        let goodsPromise = this.fetchGoods();
        goodsPromise.then(() => {
            this.render();
        });

    }

    initShowMoreBtn() {
        const btn = document.querySelector('.showmore');
        btn.addEventListener('click', () => {
            this.fetchGoods()
                .then(() => {
                    this.render();
                });
        });
    }

    hideShowMoreBtn() {
        const btn = document.querySelector('.showmore');
        btn.remove();
    }

    fetchGoods() {
        const result = fetch(`./database/page${this._pageCounter}.json`);
        return result
            .then(res => {
                return res.json();
            })
            .then(data => {
                this._pageCounter++;
                this.items.push(...data.data.map(cur => {
                    return new GoodItem(cur, this._cartInstance);
                }));
            })
            .catch(e => {
                this.hideShowMoreBtn();
                console.log(e);
            });
    }

    render() {
        const placeToRender = document.querySelector('.goods-list');
        if (placeToRender) {
            placeToRender.innerHTML = '';
            this.items.forEach(good => {
                good.render(placeToRender);
            });
        }

    }

}

class Cart extends AbstractList {
    constructor() {
        super();
        this.init();

    }

    init() {
        const block = document.createElement('div');
        block.classList.add('cart');

        const list = document.createElement('div');
        list.classList.add('cart-list');
        block.appendChild(list);

        const ButtonInstance = new Button('Корзина', () => {
            list.classList.toggle('shown');
        });
        block.appendChild(ButtonInstance.getTemplate());

        const placeToRender = document.querySelector('header');
        if (placeToRender) {
            placeToRender.appendChild(block);
        }

        this.render();
    }
    render() {
        const placeToRender = document.querySelector('.cart-list');
        if (placeToRender) {
            placeToRender.innerHTML = '';
            if (this.items.length) {
                this.items.forEach(good => {
                    good.render(placeToRender);
                });
            } else {
                placeToRender.innerHTML = 'Нет товаров в корзине';
            }
        }
    }
}


class GoodItem {
    name = '';
    price = 0;
    counter = 1;
    _cartInstance = null;

    constructor({
            name,
            price
        },
        CartInstanse
    ) {
        this.name = name;
        this.price = price;
        this._cartInstance = CartInstanse;
    }

    render(placeToRender) {
        if (placeToRender) {
            const block = document.createElement('div');
            block.classList.add('block-items');
            block.innerHTML = `<a href="https://placeholder.com"><img src="https://via.placeholder.com/100/a2e2de" alt="product_photo"></a><div>${this.name}</div><div>${this.price}${' &#8381'}<div class="btn-holder"></div></div>`;
            placeToRender.appendChild(block);

            const AddButton = new Button('Добавить в корзину ', () => {
                this._cartInstance.add(new GoodItemInCart(this));
            });
            block.querySelector('.btn-holder').appendChild(AddButton.getTemplate());
            // block.appendChild(this.btn());

        }
    }

    // btn() {
    //     const placeToRender = document.querySelector('.block-items');
    //     if (placeToRender) {
    //         const btn = document.createElement('button');
    //         btn.classList.add('button-buy');
    //         btn.innerHTML = 'Добавить в корзину';
    //         btn.addEventListener('click', () => {
    //             this._cartInstance.add(new GoodItemInCart(this));

    //         });
    //         return btn;
    //     }

    // }

}

class GoodItemInCart extends GoodItem {
    constructor(props) {
        super(props);
    }

    render(placeToRender) {
        if (placeToRender) {
            const block = document.createElement('div');
            block.classList.add('cart__good');
            block.innerHTML = `${this.name} = ${this.price} x ${this.counter}`;
            placeToRender.appendChild(block);
        }
    }
}

const CartInstanse = new Cart();
const ListInstance = new List(CartInstanse);