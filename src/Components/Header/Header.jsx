import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/reducers/cartSlice';
import './header-style.css';

function Header() {
    const [cartOpen, setCartOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleCartMouseLeave = () => {
        setCartOpen(false);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const groupedCartItems = cartItems.reduce((groupedItems, currentItem) => {
        const existingItem = groupedItems.find(item => item.id === currentItem.id);

        if (existingItem) {
            existingItem.count++;
        } else {
            groupedItems.push({ ...currentItem, count: 1 });
        }

        return groupedItems;
    }, []);

    return (
        <header>
            <div className='left'>
                <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pizza-logo-template-design-183c12cfbe00ef109c299d864f364e58_screen.jpg?ts=1635756978" className='logo' alt="Logo" />
                <nav>
                    <Link to="/react-shop" className='header-btn'><span>Home</span></Link> <br />
                    <Link to="/react-shop/menu" className='header-btn'><span>Menu</span></Link> <br/>
                </nav>
                <img
                    src="https://img.freepik.com/premium-vector/shopping-backet-icon-buy-sign-for-sale-web-site-shop-retail-market-and-commerce-store-symbol_87543-11125.jpg"
                    className={`kor ${cartOpen ? 'open' : ''}`}
                    alt="Cart"
                    onClick={toggleCart}
                />
            </div>
            <div
                className={`cart-panel ${cartOpen ? 'open' : ''}`}
                onMouseLeave={handleCartMouseLeave}
            >
                <ul className="cart-items">
                    {groupedCartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.photo} alt={item.name} />
                            </div>
                            <div className="cart-item-details">
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                {item.count > 1 && <div className="item-count">x{item.count}</div>}
                                <button className="btn" onClick={() => handleRemoveFromCart(item)}>
                                    <svg viewBox="0 0 15 17.5" height="17.5" width="15" xmlns="http://www.w3.org/2000/svg" className="icon">
                                        <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <Link to='/react-shop/order' className='order'>Order</Link>
            </div>
        </header>
    );
}

export default Header;
