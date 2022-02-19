import { StoreonStore } from 'storeon';

import { SettingsSet } from 'store/key/settings';

// -----------------------------------------------------------------------------

export default function wireUpSettingsEvent(store: StoreonStore): void {
	store.on(SettingsSet, onSettingsSet);
}

// -----------------------------------------------------------------------------

function onSettingsSet(store: StoreonStore, settings: GenericObject): GenericObject {
	return { settings };
}
