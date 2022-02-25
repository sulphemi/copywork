import { useStoreon } from 'storeon/react';
import { ReturnIf } from 'babel-plugin-transform-functional-return';

import { darkModeTheme, lightModeTheme } from 'data/theme';

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
