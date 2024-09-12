import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../../models/user.model';
import { getUser } from '../../services/users.client';
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

function UsersPage() {
	const [users, setUsers] = useState<User[]>([]);
	const location = useLocation();
	const [queryParams] = useSearchParams();
	const navigate = useNavigate();
	// admin/users?page=1&limit=5
	console.log('queryParams-page', queryParams.get('page'));
	console.log('queryParams-limit', queryParams.get('limit'));
	console.log('location', location);

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
							<Link to={`${item.id}`}>
								{item.name} / {item.address.city}
							</Link>
						</tr>
					);
				})}
			</table>

			<button
				onClick={() => {
					const ok = window.confirm('Siteden çıkmak isteğiniz emin misiniz?');

					if (ok) {
						navigate('/');
					}
				}}
			>
				Navigate
			</button>
		</>
	);
}

export default UsersPage;
