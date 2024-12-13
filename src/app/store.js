import { configureStore } from '@reduxjs/toolkit'
import shopReducer from "../features/shops/shopsSlice.js"

export default configureStore({
    reducer: {
        shop: shopReducer,
    },
})