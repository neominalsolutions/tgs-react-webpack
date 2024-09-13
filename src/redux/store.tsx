// 1. Adım

import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './slices/counter.slice';
import { cartReducer } from './slices/cart.slice';

export const store = configureStore({
	reducer: {
		cartState: cartReducer,
		counterState: counterReducer, // 4. aşama hangi state hangi reducer yönetecek
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
