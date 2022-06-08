import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Order {
    title: string
    count: number
    color: number
    price: number
}

interface InitialState {
    orders: Order[]
}

const initialState: InitialState = {
    orders: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Order>) => {
            const findItem = state.orders.find(
                order =>
                    order.title === action.payload.title &&
                    order.color === action.payload.color
            )

            if (findItem) {
                findItem.count += action.payload.count
            } else {
                state.orders = [...state.orders, action.payload]
            }
        },
        buyNow: (state, action: PayloadAction<Order>) => {
            state.orders = [action.payload]
        },
    },
})

export const { addItem, buyNow } = cartSlice.actions
export default cartSlice.reducer
