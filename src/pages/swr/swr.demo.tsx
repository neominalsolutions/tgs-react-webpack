import React, { useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import { Product } from '../../redux/slices/cart.slice';
import axios from 'axios';

// https://services.odata.org/Northwind/Northwind.svc/Products?$top=2&$format=json

export const fetcher: Fetcher<Product[], string> = async (
	pageIndex: string
) => {
	return (
		await axios.get(
			`https://services.odata.org/Northwind/Northwind.svc/Products?$skip=${
				Number(pageIndex) * 10
			}&$top=10&$format=json`
		)
	).data.value;
};

function SwrDemo() {
	const [pageIndex, setPageIndex] = useState(0);
	const { data, isLoading, error } = useSWR(`${pageIndex}`, fetcher);

	if (isLoading) return <>Yükleniyor...</>;

	if (data) {
		return (
			<>
				{data.map((item: Product) => {
					return <div key={item.ProductID}>{item.ProductName}</div>;
				})}

				<button
					onClick={() => {
						setPageIndex(pageIndex + 1);
					}}
				>
					Bir sonraki Sayfa
				</button>
			</>
		);
	}

	return <></>;
}

export default SwrDemo;
