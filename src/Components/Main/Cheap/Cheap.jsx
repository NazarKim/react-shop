import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import PizzaCard from '../../PizzaCard/PizzaCard';
import { addToCart } from '../../../store/reducers/cartSlice';
import { setLoading } from '../../../store/reducers/menuSlice';
import Preloader from '../Preloader/Preloader';
import { Link } from 'react-router-dom';
import '../Menu/menu-style.css';

function Cheap() {
    const [pizzas, setPizzas] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const isLoading = useSelector(state => state.menu.isLoading);

    useEffect(() => {
        dispatch(setLoading(true));

        axios.get('https://gist.githubusercontent.com/NazarKim/06b649230330965302775ffc01e12b25/raw/e404cfce761348c60cc3ff3b86659cd770b91b90/gistfile1.txt')
            .then(response => {
                setPizzas(response.data);
                dispatch(setLoading(false));
            })
            .catch(error => {
                console.error(error);
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    const sortedPizzas = pizzas.slice().sort((a, b) => a.price - b.price);

    const handleAddToCart = (pizza) => {
        dispatch(addToCart(pizza));
    };

    return (
        <div className="main">
            <div className='div-price'>
                <Link to="/react-shop/menu" className='price ch active'>Cheap</Link>
                <Link to="/react-shop/expensive" className='price ex'>Expensive</Link>
            </div>
            {isLoading ? (
                <div className="loader-container">
                    <Preloader />
                </div>
            ) : (
                <div className="pizza-list">
                    {sortedPizzas.map((pizza, index) => (
                        <PizzaCard
                            key={index}
                            pizza={pizza}
                            addToCart={() => handleAddToCart(pizza)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cheap;

