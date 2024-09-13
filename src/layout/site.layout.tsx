import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { fetchCartFromApi } from '../redux/slices/cart.slice';
import { AppDispatch } from '../redux/store';
import CartPage from '../pages/cart.page';

function SiteLayout() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchCartFromApi());
	}, []);

	return (
		<>
			<header>
				<h1>Başlık</h1>
				<nav>
					<Link to="/">Anasayfa</Link> <Link to="/hakkimizda">Hakkımızda</Link>
					<Link to="/redux">Redux Demo</Link>
				</nav>
			</header>
			<main>
				<Outlet />
				<br></br>

				<CartPage />
			</main>
			<footer>Alt bilgi</footer>
		</>
	);
}

export default SiteLayout;
