import { memo } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import useThemeMode from 'effect/use_theme_mode';
import Sidebar from 'Component/Layout/Sidebar';

// -----------------------------------------------------------------------------

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-family: 'Copse', serif;
	}

	html, body {
		height: 100%;
		margin: 0;
	}

	body {
		background: ${(props: GenericObject) => props.theme.backgroundColor};
		color: ${(props: GenericObject) => props.theme.foregroundColor};
	}
  `;

// -----------------------------------------------------------------------------

const Layout = memo(function Layout({ children }): JSX.Element {
	const theme = useThemeMode();

	//
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Container>
				<Sidebar />
				{children}
			</Container>
		</ThemeProvider>
	);
});

export default Layout;

// -----------------------------------------------------------------------------

const Container = styled.div`
	align-content: flex-start;
	display: flex;
	height: 100%;
`;
