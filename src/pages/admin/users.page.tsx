import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/users.client';

interface User {
	id: string;
	name: string;
	username: string;
	address: { city: string; street: string };
	createdAt: Date;
}

function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		getUser('/users')
			.then((data) => {
				setUsers(data);
			})
			.catch((err) => {
				alert('Hata');
			});

		// axios
		// 	.get<User[]>('https://jsonplaceholder.typicode.com/users')
		// 	.then((response) => {
		// 		response.data.forEach((element) => {
		// 			element.createdAt = new Date();
		// 		});
		// 		console.log('response', response);
		// 		setUsers(response.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log('err', err);
		// 	});
	}, []);

	return (
		<>
			<h1>Kullanıcılar</h1>
			<table>
				<tr>
					<th>Ad</th>
				</tr>
				{users.map((item: User, index: number) => {
					return (
						<tr key={item.id}>
							{item.name} / {item.address.city}
						</tr>
					);
				})}
			</table>
		</>
	);
}

export default UsersPage;
