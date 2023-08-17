import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './main-style.css';
import '../Main/Menu/menu-style.css';
import '../PizzaCard/pizza-card-style.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/cartSlice';
import PizzaCard from "../PizzaCard/PizzaCard";

function Main({ pizza }) {
    const [images, setImages] = useState([]);
    const [specialOffers, setSpecialOffers] = useState([]);

    useEffect(() => {
        const sampleImages = [
            'https://png.pngtree.com/png-clipart/20210829/original/pngtree-pizza-restaurant-promotion-black-banner-png-image_6685185.jpg',
            'https://png.pngtree.com/png-clipart/20210829/original/pngtree-pizza-restaurant-promotion-black-minimalist-banner-png-image_6685518.jpg',
            'https://img.freepik.com/free-vector/flat-food-sale-background_23-2149175437.jpg',
        ];
        setImages(sampleImages);

        const sampleSpecialOffers = [
            {
                id: 1,
                photo: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/317/230_230_2a1fde8d5e7dcaa11be442336c9d37f5e/3177dbcaf14b959f96f09cd81798ccf3.webp',
                ingredients: 'Tomato sauceMozzarellaPepperoni',
                price: 10.99,
                name: 'Delicious',
                specialOffer: true,
            },
            {
                id: 2,
                photo: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/590/230_230_2a1fde8d5e7dcaa11be442336c9d37f5e/5902b7fe46706d2b95b27378848410f8.webp',
                ingredients: 'Tomato sauceMozzarellaFresh basil',
                price: 12.99,
                name: 'Super peperoni',
                specialOffer: true,
            },
            {
                id: 3,
                photo: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/eb1/230_230_2a1fde8d5e7dcaa11be442336c9d37f5e/2evm4y7j6klj7s7tt8b17uc3g01nibx3.webp',
                ingredients: 'Tomato sauceMozzarellaPepperoniHamAssorted fresh vegetables',
                price: 12.99,
                name: 'Alamys',
                specialOffer: true,
            },
            {
                id: 4,
                photo: 'https://pizza.od.ua/upload/resize_cache/webp/iblock/442/230_230_2a1fde8d5e7dcaa11be442336c9d37f5e/44205a593ca3b5d59456a0ac892ecd99.webp',
                ingredients: 'Tomato sauceMozzarellaAssorted fresh vegetables',
                price: 12.99,
                name: 'Firmova',
                specialOffer: true,
            },
        ];
        setSpecialOffers(sampleSpecialOffers);
    }, []);

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(pizza));
    };

    return (
        <main>
            <div className="image-carousel">
                <Carousel showArrows={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
                    {images.map((image, index) => (
                        <div key={index} className='carousel-pop'>
                            <img src={image} alt={`Image ${index}`} />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="pizza-list">
                {specialOffers.map((offer) => (
                    <PizzaCard key={offer.id} pizza={offer} onAddToCart={handleAddToCart} />
                ))}
            </div>
            <div className=''></div>
        </main>
    );
}

export default Main;