import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('productsSlice/fetchProducts', async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();
    return data;
});

const productsSlice = createSlice({
    name: "productsSlice",
    initialState: {
        products: [],
        categories: [],
        selectedCategory: 'all',
    },
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        sortProductsByPrice: (state, action) => {
            const { direction } = action.payload;
            state.products.sort((a, b) => {
                if (direction === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            const categories = action.payload.map(product => product.category);
            state.categories = ['all', ...new Set(categories)];
        });
    }
});

export const { setCategory, sortProductsByPrice } = productsSlice.actions;
export default productsSlice.reducer;
