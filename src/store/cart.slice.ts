import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE= 'cart';
export interface CartItem {
    id: number,
    count: number,
}

export interface CartState {
    items: CartItem[];
}
const initialState: CartState = {
	items: loadState<CartState>(CART_PERSISTENT_STATE)?.items ?? []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clean: (state) => {
			state.items = [];
		},
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				state.items.push({id: action.payload, count: 1});
				return;
			}
			state.items.forEach(i => {
				if (i.id === action.payload) {
					i.count += 1;
				}
			});
		},
		decrease: (state, action: PayloadAction<number>) => {
			state.items.forEach((i, index) => {
				if (i.id === action.payload) {
					i.count -= 1;
				}
				if (i.count === 0) {
					state.items.splice(index, 1);
				}
				return i;
			});
		},
		remove: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(i => i.id !== action.payload);
		}
	},
	extraReducers: () => {
	}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
