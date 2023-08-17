import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/cartSlice';
import './pizza-card-style.css';

function PizzaCard({ pizza }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(pizza));
    };

    return (
        <div className={`pizza-card ${pizza.specialOffer ? 'special-offer' : ''}`}>
            <img src={pizza.photo} alt={pizza.name} />
            <h3>{pizza.name}</h3>
            <p>{pizza.ingredients}</p>
            <p>Price: ${pizza.price}</p>
            <button onClick={handleAddToCart} className='add'>Add to Cart</button>
        </div>
    );
}

export default PizzaCard;
