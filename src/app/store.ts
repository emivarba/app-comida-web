import { configureStore } from '@reduxjs/toolkit'
import shopReducer from "../features/shops/shopsSlice.js"
import sudokuReducer from "../features/sudoku/sudokuSlice.js"

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        sudoku: sudokuReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;