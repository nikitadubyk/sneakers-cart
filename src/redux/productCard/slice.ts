import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
    activeColor: number
    activeTab: string
    count: number
}

const initialState: InitialState = {
    activeColor: 0,
    count: 1,
    activeTab: 'Характеристики',
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        changeActiveColor: (state, action: PayloadAction<number>) => {
            state.activeColor = action.payload
        },
        changeActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTab = action.payload
        },
        plusItem: state => {
            state.count++
        },
        minusItem: state => {
            state.count > 1 && state.count--
        },
    },
})

export const { changeActiveColor, changeActiveTab, plusItem, minusItem } =
    cardSlice.actions
export default cardSlice.reducer
