import { StoreonStore } from 'storeon';

import { ThemeSet } from 'store/key/theme';

// -----------------------------------------------------------------------------

export default function wireUpThemeEvents(store: StoreonStore): void {
	store.on(ThemeSet, onThemeSet);
}

// -----------------------------------------------------------------------------

function onThemeSet(store: StoreonStore, theme: 'light' | 'dark'): GenericObject {
	document.documentElement.setAttribute('data-theme', theme);

	//
	return { theme };
}
