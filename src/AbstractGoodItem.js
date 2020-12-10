export default class AGoodItem {
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
    }
}
