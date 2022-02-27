import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreContext } from 'storeon/react';

import Store from 'store';

import ErrorBoundary from 'Component/ErrorBoundary';

import EditorScreen from 'Component/Screen/Editor';
import HomeScreen from 'Component/Screen/Home';
import NotFoundScreen from 'Component/Screen/NotFound';

import Layout from 'Component/Layout';

// -----------------------------------------------------------------------------

export default function renderApp(): void {
	render(<App />, document.body);

	// remove loader components
	const components = document.querySelectorAll('[data-preloader="true"]');
	[].forEach.call(components, (component) => component.parentNode.removeChild(component));
}

// -----------------------------------------------------------------------------

function App(): JSX.Element {
	return (
		<BrowserRouter>
			<StoreContext.Provider value={Store}>
				<Layout>
					<ErrorBoundary>
						<Routes>
							<Route path="/" element={<HomeScreen />} />
							<Route path="/playground/:id" element={<PlaygroundRoute />} />
							<Route path="/playground" element={<PlaygroundRoute />} />
							<Route path="*" element={<NotFoundScreen />} />
						</Routes>
					</ErrorBoundary>
				</Layout>
			</StoreContext.Provider>
		</BrowserRouter>
	);
}

// -----------------------------------------------------------------------------

function PlaygroundRoute() {
	return <EditorScreen key={String(new Date())} />;
}
