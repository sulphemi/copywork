import { StoreonStore } from 'storeon';

import wireUpSettingsEvent from 'store/event/settings';
import wireUpThemeModeEvents from 'store/event/theme_mode';

// -----------------------------------------------------------------------------

export default function wireUpEvents(store: StoreonStore): void {
	wireUpSettingsEvent(store);
	wireUpThemeModeEvents(store);
}

// -----------------------------------------------------------------------------
