import Button from './button.js';

import './style.css';

class AbstractList {
    items = [];

    constructor(item = []) {
        this.item = [];
    }

    add(item) {
        const findedItem = this.items.find((fitem) => {
            return fitem.title === item.title;
        });
    
        const addedPromise = new Promise(resolve => {
            if (findedItem) {
                findedItem.counter++;
            } else {
                this.items.push(item);
            }
            resolve()
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
    _cartInstance = null
    _pageCounter = 1

    constructor(CartInstance) {
        super();
        this._cartInstance = CartInstance;

        this.initShowMoreBtn();

        let goodsPromise = this.fetchGoods();
        goodsPromise.then(() => {
            this.render();
        });
    }

    initShowMoreBtn() {
        const btn = document.querySelector('.show-more');
        btn.addEventListener('click', () => {
            this.fetchGoods()
                .then(() => {
                    this.render();
                });
        });
    }

    hideShowMoreBtn() {
        const btn = document.querySelector('.show-more');
        btn.remove();
    }

    fetchGoods() {
        const result = fetch(`/database/page${this._pageCounter}.json`);
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
                placeToRender.innerHTML = 'Корзина пуста';
            }
        
        }
        
    }
    
}

class GoodItem {
    title = ''
    price = 0
    counter = 1
    _cartInstance = null

    constructor({ title, price }, CartInstance) {
        this.title = title
        this.price = price
        this._cartInstance = CartInstance
    }

    render(placeToRender) {
        if (placeToRender) {
            const block = document.createElement('div');
            block.innerHTML = `<a href="https://placeholder.com">
            <img src="https://via.placeholder.com/100/a2e2de" alt="product_photo"></a>
            <div>${this.title}</div>
            <div>${this.price}</div>
            <div class="btn_holder"></div>`;
            block.className = 'goods-item';
            placeToRender.appendChild(block);

            const AddButton = new Button('Добавить в корзину', ()=> {
                this._cartInstance.add(new GoodItemInCart(this));
            });
            block.querySelector('.btn_holder').appendChild(AddButton.getTemplate());
            

        }
        
    }
    
}

class GoodItemInCart extends GoodItem {
    constructor(props) {
        super(props);  
    }

    render(placeToRender) {
        if (placeToRender) {
            const block = document.createElement('div');
            block.classList.add('cart__good');
            block.innerHTML = `${this.title} = ${this.price} x ${this.counter}`;
            placeToRender.appendChild(block);
        }
    }
}

const CartInstance = new Cart();
const ListInstance = new List(CartInstance);
