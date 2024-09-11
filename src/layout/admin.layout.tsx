import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminLayout() {
	return (
		<>
			<nav>
				<Link to="users"> Kullanıcılar </Link>
			</nav>
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default AdminLayout;
