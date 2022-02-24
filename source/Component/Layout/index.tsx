import { memo } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Sidebar from 'Component/Layout/Sidebar';
import useThemeMode from 'effect/use_theme_mode';

// -----------------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-family: 'Copse', serif;
	}

  html, body {
	  background: ${(props: GenericObject) => props.theme.backgroundColor};
	  height: 100%;
	  margin: 0;
  }`;

// -----------------------------------------------------------------------------

const Layout = memo(function Layout({ children }): JSX.Element {
	const theme = useThemeMode();

	//
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Sidebar />
			{children}
		</ThemeProvider>
	);
});

export default Layout;
