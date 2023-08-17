import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import PizzaCard from '../../PizzaCard/PizzaCard';
import Preloader from '../Preloader/Preloader';
import { setMenuPizzas, setLoading } from '../../../store/reducers/menuSlice';
import './menu-style.css';
import {Link} from "react-router-dom";

function Menu() {
    const dispatch = useDispatch();
    const menuPizzas = useSelector(state => state.menu.items);
    const isLoading = useSelector(state => state.menu.isLoading);

    useEffect(() => {
        dispatch(setLoading(true));

        axios.get('https://gist.githubusercontent.com/NazarKim/06b649230330965302775ffc01e12b25/raw/e404cfce761348c60cc3ff3b86659cd770b91b90/gistfile1.txt')
            .then(response => {
                dispatch(setMenuPizzas(response.data));
                dispatch(setLoading(false));
            })
            .catch(error => {
                console.error(error);
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    return (
        <div className="main">
            <div className='div-price'>
                <Link to="/react-shop/cheap" className='price ch'>Cheap</Link>
                <Link to="/react-shop/expensive"  className='price ex'>Expensive</Link>
            </div>
            {isLoading ? (
                <div className="loader-container">
                    <Preloader />
                </div>
            ) : (
                <div className="pizza-list">
                    {menuPizzas.map((pizza, index) => (
                        <PizzaCard key={index} pizza={pizza} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Menu;
