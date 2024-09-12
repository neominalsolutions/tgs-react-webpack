import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 3. aşama
export type CounterState = {
	count: number;
};

const initState: CounterState = { count: 0 };

const counterSlice = createSlice({
	name: 'COUNTER',
	initialState: initState,
	reducers: {
		reset: (state: CounterState) => {
			state.count = 0;
		},
		increase: (state: CounterState) => {
			state.count = state.count + 1;
		},
		decrease: (state: CounterState) => {
			state.count = state.count - 1;
		},
		increaseByAmount: (
			state: CounterState,
			action: PayloadAction<{ value: number }>
		) => {
			state.count = action.payload.value;
		},
	},
});

export const counterReducer = counterSlice.reducer;
export const { reset, increase, decrease, increaseByAmount } =
	counterSlice.actions;
