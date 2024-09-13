import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addItem, CartItem } from '../redux/slices/cart.slice';
import {
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';

function generate(element: React.ReactElement<any>) {
	return [0, 1, 2].map((value) =>
		React.cloneElement(element, {
			key: value,
		})
	);
}

function CartPage() {
	const cartState = useSelector((store: RootState) => store.cartState);
	const dispatch = useDispatch<AppDispatch>();

	if (cartState.loading) return <>Yükleniyor... </>;
	if (cartState.error.message !== '') return <>{cartState.error.message}</>;
	if (cartState.fetched)
		return (
			<>
				<List>
					{cartState.cart.items.map((item: CartItem, index: number) => {
						return (
							<>
								<ListItem>
									<ListItemText
										primary={item.name}
										secondary={`${item.price} TL`}
									/>
								</ListItem>
								<Button
									color="primary"
									onClick={() => {
										// dispatch(
										// 	addItem({ id: 3, name: 'test', quantity: 2, price: 10 })
										// );
										dispatch(addItem(item));
									}}
								>
									Sepete Ekle
								</Button>
								<Typography>
									Toplam: {cartState.cart.total}
									<br></br>
									Items: {cartState.cart.items.length} Ürün Sayısı
								</Typography>
							</>
						);
					})}
				</List>
			</>
		);

	return <></>;
}

export default CartPage;
