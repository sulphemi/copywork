import { memo } from 'react';

import AbstractIcon from 'Component/Icon/Abstract';

// -----------------------------------------------------------------------------

const LeftArrowIcon = memo(function LeftArrowIcon(): JSX.Element {
	return (
		<AbstractIcon viewBox="0 0 59.414 59.414">
			<polygon points="45.268,1.414 43.854,0 14.146,29.707 43.854,59.414 45.268,58 16.975,29.707" />
		</AbstractIcon>
	);
});

export default LeftArrowIcon;
