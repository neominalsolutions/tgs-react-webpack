import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function SiteLayout() {
	return (
		<>
			<header>
				<h1>Başlık</h1>
				<nav>
					<Link to="/">Anasayfa</Link> <Link to="/hakkimizda">Hakkımızda</Link>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>Alt bilgi</footer>
		</>
	);
}

export default SiteLayout;
