import { StoreonStore } from 'storeon';

import wireUpThemeModeEvents from 'store/event/theme_mode';

// -----------------------------------------------------------------------------

export default function wireUpEvents(store: StoreonStore): void {
	wireUpThemeModeEvents(store);
}

// -----------------------------------------------------------------------------
