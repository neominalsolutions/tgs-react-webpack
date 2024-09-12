import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/users.client';
import { User } from '../../models/user.model';

function UsersCardPage() {
	const params = useParams();
	const [user, setUser] = useState<User>();
	console.log('params', params);

	useEffect(() => {
		getUserById('/users', Number(params.id)).then((response) => {
			setUser(response);
		});
	}, []);

	return (
		<>
			<p>
				<p>{user?.name}</p>
				{user?.address.city} / {user?.address.street}
			</p>
		</>
	);
}

export default UsersCardPage;
