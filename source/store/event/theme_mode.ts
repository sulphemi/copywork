import { StoreonStore } from 'storeon';

import { ThemeModeSet } from 'store/key/theme_mode';

// -----------------------------------------------------------------------------

export default function wireUpThemeModeEvents(store: StoreonStore): void {
	store.on(ThemeModeSet, onThemeModeSet);
}

// -----------------------------------------------------------------------------

function onThemeModeSet(store: StoreonStore, { theme_mode: themeMode }): GenericObject {
	return { theme_mode: themeMode };
}
