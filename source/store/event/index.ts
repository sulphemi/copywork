import { StoreonStore } from 'storeon';

import wireUpSettingsEvent from 'store/event/settings';
import wireUpThemeEvents from 'store/event/theme';

// -----------------------------------------------------------------------------

export default function wireUpEvents(store: StoreonStore): void {
	wireUpSettingsEvent(store);
	wireUpThemeEvents(store);
}

// -----------------------------------------------------------------------------
