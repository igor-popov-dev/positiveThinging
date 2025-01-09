import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Final } from './pages/Final/Final';
import { Main } from './pages/Main/Main';
import { store } from './store/store';

const router = createBrowserRouter([
	{
		path: '/training/',
		element: <Main />
		
	},
	{
		path: '/training/final',
		element: <Final />
		
	}
]);
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
