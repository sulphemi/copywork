import { ReturnIf } from 'babel-plugin-transform-functional-return';
import { useStoreon } from 'storeon/react';

// -----------------------------------------------------------------------------

export default function useThemeMode() {
	const { theme: themeMode } = useStoreon('theme');
	ReturnIf(themeMode, getModeTheme(themeMode));

	//
	const html = document.querySelector('html');
	const preferredThemeMode = html.getAttribute('data-preferred-theme') || 'light';

	//
	return getModeTheme(preferredThemeMode);
}

// -----------------------------------------------------------------------------

function getModeTheme(themeMode: string): GenericObject {
	return themeMode === 'dark' ? darkModeTheme : lightModeTheme;
}

// -----------------------------------------------------------------------------

const lightModeTheme = {
	backgroundColor: '#fff',

	sidebarBackgroundColor: '#f7f7f7',
	sidebarForegroundColor: '#000',
};

// -----------------------------------------------------------------------------

const darkModeTheme = {
	backgroundColor: '#333',

	sidebarBackgroundColor: '#666',
	sidebarForegroundColor: '#FFF',
};
