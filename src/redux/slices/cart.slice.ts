import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface CartItem {
	id: number;
	quantity: number;
	name: string;
	price: number;
}

export interface Cart {
	items: CartItem[];
	total: number;
}

export interface CartState {
	cart: Cart;
	loading: boolean;
	fetched: boolean;
	error: { message: string };
}

export const fetchCartFromApi = createAsyncThunk('CART', async () => {
	return (
		await axios.get(
			'https://services.odata.org/Northwind/Northwind.svc/Products?$top=2&$format=json'
		)
	).data.value;
});

// Redux ile async çalışırken 3 farklı state takibi yapıyoruz.
// pending => loading state
// fulfilled => loaded state
// rejected => error state

const initState: CartState = {
	cart: { items: [], total: 0 },
	loading: false,
	fetched: false,
	error: { message: '' },
};

export interface Product {
	ProductID: number;
	ProductName: string;
	UnitPrice: number;
}

const cartSlice = createSlice({
	name: 'CART',
	initialState: initState,
	reducers: {
		addItem: (state: CartState, action: PayloadAction<CartItem>) => {
			const exist = state.cart.items.find((x) => x.id == action.payload.id);

			if (exist) {
				exist.quantity += 1; // sepette aynı item varsa adetini arttır.
			} else {
				state.cart.items.push(action.payload); // sepette aynı ürün yoksa bir item olarak gir.
			}

			let total = 0;

			state.cart.items.forEach((item: CartItem) => {
				total += item.quantity * item.price;
			});

			state.cart.total = total;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchCartFromApi.pending, (state: CartState) => {
			state.loading = true;
		});
		builder.addCase(
			fetchCartFromApi.fulfilled,
			(state: CartState, action: PayloadAction<Product[]>) => {
				state.loading = false;
				state.fetched = true;
				state.cart.items = action.payload.map((item: Product) => {
					return {
						id: item.ProductID,
						name: item.ProductName,
						quantity: 1,
						price: item.UnitPrice,
					};
				});
				let total = 0;

				state.cart.items.forEach((item: CartItem) => {
					total += item.quantity * item.price;
				});

				state.cart.total = total;
			}
		);
		builder.addCase(
			fetchCartFromApi.rejected,
			(state: CartState, action: PayloadAction<AxiosError | any>) => {
				state.fetched = false;
				state.loading = false;
				state.error = { message: action.payload.message };
			}
		);
	},
});

export const { addItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
