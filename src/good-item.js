import Button from './button.js';
import {
    GoodItemInCart
} from './good-item-in-cart.js';

export default class GoodItem {
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

        }
    }


}