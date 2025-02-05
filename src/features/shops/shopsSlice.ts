import {createSlice} from "@reduxjs/toolkit";

export const shopsSlice = createSlice({
    name: 'shops',
    initialState: {
        value: [],
    },
    reducers: {
        addNewShop: (state, action) => {
            state.value.push(action.payload);
        },
        replaceShopList: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {addNewShop, replaceShopList} = shopsSlice.actions;

export default shopsSlice.reducer;