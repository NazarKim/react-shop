// menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        items: [],
        isLoading: false,
    },
    reducers: {
        setMenuPizzas: (state, action) => {
            state.items = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setMenuPizzas, setLoading } = menuSlice.actions;
export default menuSlice.reducer;
