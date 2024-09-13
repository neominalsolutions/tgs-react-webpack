import React from 'react';
import ReactDom from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import SiteLayout from './layout/site.layout';
import HomePage from './pages/home.page';
import AboutPage from './pages/about.page';
import AdminLayout from './layout/admin.layout';
import UsersPage from './pages/admin/users.page';
import UsersCardPage from './pages/admin/users.card.page';
import LoginPage from './pages/login.page';

import '@fontsource/roboto/500.css';
import AuthGuard from './guards/auth.guard';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ReduxDemoPage from './pages/redux.demo';
import SwrDemo from './pages/swr/swr.demo';

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
			{
				path: '/redux',
				Component: ReduxDemoPage,
			},
			{
				path: '/swr',
				Component: SwrDemo,
			},
		],
	},
	{
		path: '/admin',
		element: (
			<AuthGuard>
				<AdminLayout />
			</AuthGuard>
		),
		children: [
			{
				path: 'users',
				Component: UsersPage,
			},
			{
				path: 'users/:id',
				Component: UsersCardPage,
			},
		],
	},
	{
		path: '/login',
		Component: LoginPage,
	},
]);

// 2. adım
root.render(
	<>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</>
);
