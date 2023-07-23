import createCartPOSTReq from '@/lib/createCart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: string;
    qty: number;
    // Add other properties of the item
}
const storedCart = typeof window !== "undefined" ? window.localStorage.getItem('cart') : false

const initialCartState = {
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

const createCart = (payloadData: any) => {
    debugger
    createCartPOSTReq(payloadData).then(res => {
        debugger
        console.log(res);
        localStorage.setItem('life-store', JSON.stringify({ cart: res.data }))
    })
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: storedCart ? JSON.parse(storedCart) : initialCartState,
    reducers: {
        addToCart: (state: any, action: PayloadAction<CartItem>) => {
            if (state.data.items.length === 0) {
                state.data.items.push({ id: action.payload.id, qty: 1 });
                createCart({ data: state.data })
            }
            else {
                const itemExists = state.data?.items.find((item: any) => item.id === action.payload.id);
                if (itemExists) {
                    itemExists.quantity++;
                } else {
                    state.data.items.push({ id: action.payload.id, qty: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(state));
            }
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {            
            const item = state.data.items?.find((item: any) => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.data.items?.find((item: any) => item.id === action.payload);
            if (item) {
                if (item.qty === 1) {
                    const index = state.data?.items.findIndex((item: any) => item.id === action.payload);
                    state.splice(index, 1);
                } else {
                    item.quantity--;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const index = state.findIndex((item: any) => item.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
} = cartSlice.actions;
