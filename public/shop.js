class List {
    items = [];

    constructor() {
        let goods = this.fetchGoods();
        goods = goods.map(cur => {
            return new GoodItem(cur);
        });
        this.items.push(...goods);
        this.render();
    }

    fetchGoods() {
        return [{
                name: 'Shirt',
                price: 150
            },
            {
                name: 'Socks',
                price: 15
            },
            {
                name: 'Jacket',
                price: 50
            },
            {
                name: 'Shoes',
                price: 1500
            },

        ];
    }
    render() {
        this.items.forEach(good => {
            good.render();
        });
    }
}

class GoodItem {
    name = '';
    price = 0;
    count = 1;

    constructor({
        name,
        price
    }) {
        this.name = name;
        this.price = price;
    }

    render() {
        const placeToRender = document.querySelector('.goods-list');
        if (placeToRender) {
            const block = document.createElement('div');
            block.classList.add('block-items');
            block.innerHTML = `<img src="" alt="product_photo"><div>${this.name}</div><div>${this.price}${' &#8381'}</div>`;
            placeToRender.appendChild(block);
            block.appendChild(this.btn());
        }
    }

    btn() {
        const placeToRenderBtn = document.querySelector('.block-items');
        if (placeToRenderBtn) {
            const btn = document.createElement('button');
            btn.classList.add('button-buy');
            btn.innerHTML = 'Добавить в корзину';
            btn.addEventListener('click', () => {
                const CartInstanse = new Cart();

            });
            return btn;
        }

    }

}

class Cart extends List {
    constructor() {
        super();
        this.cartTemplate();

    }


    cartTemplate() {
        const cart = document.querySelector('.cart');
        const blockBtn = document.createElement('button');
        blockBtn.classList.add('cart-btn');
        blockBtn.innerText = 'Купить';
        const blockCart = document.createElement('div');
        blockCart.classList.add('block-cart');
        blockCart.innerText = 'В корзине пусто';
        cart.appendChild(blockBtn);
        cart.appendChild(blockCart);
        this.btn();




    }

    cartRender() {
        // this.cartTemplate();

    }
}

const ListInstance = new List();
// const CartInstanse = new Cart();