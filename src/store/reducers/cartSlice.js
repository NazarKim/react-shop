import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isLoading: false,
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            const itemIdToRemove = action.payload.id;
            const itemIndexToRemove = state.items.findIndex(item => item.id === itemIdToRemove);
            if (itemIndexToRemove !== -1) {
                state.items.splice(itemIndexToRemove, 1);
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, setLoading, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
