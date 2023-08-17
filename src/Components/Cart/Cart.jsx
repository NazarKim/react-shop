import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/reducers/cartSlice';
import './cart-style.scss';

function Cart() {
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} - {item.photo}
                        <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            {/* Добавьте здесь логику для оформления заказа */}
        </div>
    );
}

export default Cart;
