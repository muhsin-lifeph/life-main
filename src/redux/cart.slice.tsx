import createCartPOSTReq from '@/lib/createCart';
import updateCartApiReq from '@/lib/updateCart';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { produce } from "immer"
interface CartItem {
    id: string;
    qty: number;
    // Add other properties of the item
}
const storedCart = typeof window !== "undefined" ? window.localStorage.getItem('life-store') : false

var initialCartState: any = {
    data: {
        items: [
            // {
            //     "id": "56d83529-6919-4d72-8b8e-5f49230d3fab",
            //     "qty": 1
            // }
        ],
        address_id: null
    }
}


const init = {
    cart: {
        // cart_data: {

        //     items: [
        //         // {
        //         //     offer_id: null,
        //         //     type: "simple",
        //         //     offer_data: null,
        //         //     items: [
        //         //     ]
        //         // }
        //     ]
        // }
    }
}
const cartSlice = createSlice({
    name: 'life-store',
    initialState: storedCart ? JSON.parse(storedCart) : init,
    reducers: {

        updateCartData: (state, action: PayloadAction<any>) => {
            debugger

            state.cart = action.payload.data
            localStorage.setItem('life-store', JSON.stringify(state));

        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {

    updateCartData
} = cartSlice.actions;
