import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import menuSlice from './reducers/menuSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuSlice
    },
});
