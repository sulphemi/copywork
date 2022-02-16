import { ReturnIf } from 'babel-plugin-transform-functional-return';

import Store from 'store';

// -----------------------------------------------------------------------------

export default function useThemeMode() {
	const { theme_mode: themeMode } = Store.get() as GenericObject;
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
	bodyBackground: '#F5F5F5',
	bodyForeground: '#4E565C',

	color1: '#203449',
	color2: '#708594',
	color3: '#070C10',
	color4: '#00A4FA',
};

// -----------------------------------------------------------------------------

const darkModeTheme = {
	bodyBackground: '#162736',
	bodyForeground: '#F5F5F5',

	headerBackground: '#203449',
	headerForeground: '#F5F5F5',
	headerAccountBackground: '#708594',

	color0: '#162736',
	color1: '#203449',
	color2: '#708594',
	color3: '#070C10',
	color4: '#00A4FA',
};
