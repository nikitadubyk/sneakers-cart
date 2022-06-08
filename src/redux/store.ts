import { configureStore } from '@reduxjs/toolkit'
import cardSlice from './productCard/slice'
import cartSlice from './cart/slice'

export const store = configureStore({
    reducer: { productCard: cardSlice, cart: cartSlice },
    devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
