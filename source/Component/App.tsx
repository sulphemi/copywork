import { render } from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StoreContext } from 'storeon/react';

import useThemeMode from 'effect/use_mode_theme';

import Store from 'store';

import EditorScreen from 'Component/EditorScreen';
import ErrorBoundary from 'Component/ErrorBoundary';

// -----------------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-family: 'Copse', serif;
	}

  html, body {
	  background: #EEE;
	  height: 100%;
	  margin: 0;
  }`;

// -----------------------------------------------------------------------------

export default function renderApp(): void {
	render(<App />, document.body);

	// remove loader components
	const components = document.querySelectorAll('[data-preloader="true"]');
	[].forEach.call(components, (component) => component.parentNode.removeChild(component));
}

// -----------------------------------------------------------------------------

function App(): JSX.Element {
	const theme = useThemeMode();

	//
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<StoreContext.Provider value={Store}>
				<ErrorBoundary>
					<EditorScreen />
				</ErrorBoundary>
			</StoreContext.Provider>
		</ThemeProvider>
	);
}
