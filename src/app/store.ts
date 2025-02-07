import { configureStore } from '@reduxjs/toolkit'
import shopReducer from "../features/shops/shopsSlice.js"

export const store = configureStore({
    reducer: {
        shop: shopReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;