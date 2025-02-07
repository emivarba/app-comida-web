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
        }
    }
})

export const {addNewShop, replaceShopList} = shopsSlice.actions;

export default shopsSlice.reducer;