import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './order-style.css';
import axios from 'axios';
import { clearCart } from '../../../store/reducers/cartSlice';

function Order() {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const [deliveryInfo, setDeliveryInfo] = useState({
        card: '',
        address: '',
        street: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        card: false,
        address: false,
        street: false,
        phone: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: false
        }));
    };

    const isPhoneValid = /^[0-9]{10}$/.test(deliveryInfo.phone);

    const handleOrderSuccess = () => {
        resetDeliveryInfo();
        dispatch(clearCart());
    };

    const resetDeliveryInfo = () => {
        setDeliveryInfo({
            card: '',
            address: '',
            street: '',
            phone: '',
        });
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

    const handlePlaceOrder = () => {
        let hasErrors = false;

        if (!deliveryInfo.card.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                card: true
            }));
            hasErrors = true;
        }

        if (!deliveryInfo.address.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                address: true
            }));
            hasErrors = true;
        }

        if (!deliveryInfo.street.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                street: true
            }));
            hasErrors = true;
        }

        if (!isPhoneValid) {
            setErrors(prevErrors => ({
                ...prevErrors,
                phone: true
            }));
            hasErrors = true;
        }

        if (!hasErrors) {
            const orderData = {
                card: deliveryInfo.card,
                address: deliveryInfo.address,
                street: deliveryInfo.street,
                phone: deliveryInfo.phone,
                cartItems: cartItems
            };
            axios.post('server_no', orderData)
                .then(response => {
                    console.log('Order placed successfully:', response.data);
                    handleOrderSuccess();
                })
                .catch(error => {
                    console.error('Error placing order:', error);
                    handleOrderSuccess(); //тут функция потому что нету api сервера (тут не должна быть эта функция)
                });
        }
    };

    return (
        <div className="order-page">
            <div className="order-form">
                <h2>Delivery Information</h2>
                <div className='first'>
                    <div className={`input-block ${errors.card ? 'invalid' : ''}`}>
                        <label htmlFor="card">Card:</label>
                        <input
                            type="text"
                            placeholder="Enter your card"
                            id="card"
                            name="card"
                            className="input"
                            value={deliveryInfo.card}
                            onChange={handleInputChange}
                            pattern="[0-9]{16}"
                            required
                        />
                    </div>
                    <div className={`input-block ${errors.address ? 'invalid' : ''}`}>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            placeholder="Enter address"
                            id="address"
                            name="address"
                            className="input"
                            value={deliveryInfo.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className='second'>
                    <div className={`input-block ${errors.street ? 'invalid' : ''}`}>
                        <label htmlFor="street">Street:</label>
                        <input
                            type="text"
                            placeholder="Enter street"
                            id="street"
                            name="street"
                            className="input"
                            value={deliveryInfo.street}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={`input-block ${errors.phone || !isPhoneValid ? 'invalid' : ''}`}>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            placeholder="Enter phone"
                            id="phone"
                            name="phone"
                            className="input"
                            value={deliveryInfo.phone}
                            onChange={handleInputChange}
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="cart-summary">
                <h2>Cart Summary</h2>
                <div className='div-pizza'>
                    {groupedCartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.photo} alt={item.name} className='pizza-photo'/>
                            <div className="item-details">
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                {item.count > 1 && <p>Quantity: {item.count}</p>}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="total">Total: ${groupedCartItems.reduce((total, item) => total + (item.price * item.count), 0)}</p>
                <button className="order-btn" onClick={handlePlaceOrder}>
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default Order;
