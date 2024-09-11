import React from 'react';
import ReactDom from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import SiteLayout from './layout/site.layout';
import HomePage from './pages/home.page';
import AboutPage from './pages/about.page';
import AdminLayout from './layout/admin.layout';
import UsersPage from './pages/admin/users.page';

const App = () => {
	return <>App21 Component</>;
};

const root = ReactDom.createRoot(
	document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
	{
		path: '/',
		Component: SiteLayout,
		children: [
			{
				path: '/',
				Component: HomePage,
			},
			{
				path: '/hakkimizda',
				Component: AboutPage,
			},
		],
	},
	{
		path: '/admin',
		Component: AdminLayout,
		children: [
			{
				path: 'users',
				Component: UsersPage,
			},
		],
	},
]);

root.render(
	<>
		<RouterProvider router={router} />
	</>
);
