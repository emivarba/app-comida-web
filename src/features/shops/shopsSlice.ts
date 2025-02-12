import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Shop {
    id: string,
    color: string
}

interface ShopsState {
    value: Shop[]
}

const initialState: ShopsState = {
    value: [],
};

export const shopsSlice = createSlice({
    name: 'shops',
    initialState,
    reducers: {
        addNewShop: (state, action: PayloadAction<Shop>) => {
            state.value.push(action.payload);
        },
        replaceShopList: (state, action: PayloadAction<Shop[]>) => {
            state.value = action.payload;
        },
        updateShop: (state, action: PayloadAction<{ id: string; updatedData: Partial<Shop> }>) => {
            state.value = state.value.map(shop =>
              shop.id === action.payload.id ? { ...shop, ...action.payload.updatedData } : shop
            );
        },
    }
})

export const {addNewShop, replaceShopList, updateShop} = shopsSlice.actions;

export default shopsSlice.reducer;