import './style.css';

import Cart from './cart.js';
import List from './list.js';



const CartInstanse = new Cart();
const ListInstance = new List(CartInstanse);