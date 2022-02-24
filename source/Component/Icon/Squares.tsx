import { memo } from 'react';

import AbstractIcon from 'Component/Icon/Abstract';

// -----------------------------------------------------------------------------

const SquaresIcon = memo(function SquaresIcon(): JSX.Element {
	return (
		<AbstractIcon viewBox="0 0 64 64">
			<path d="M2,28h24c1.104,0,2-0.896,2-2V2c0-1.104-0.896-2-2-2H2C0.896,0,0,0.896,0,2v24C0,27.104,0.896,28,2,28z M4,4h20v20H4V4z" />
			<path d="M64,2c0-1.104-0.896-2-2-2H38c-1.104,0-2,0.896-2,2v24c0,1.104,0.896,2,2,2h24c1.104,0,2-0.896,2-2V2z M60,24H40V4h20V24z" />
			<path
				d="M2,64h25c1.104,0,2-0.896,2-2V37c0-1.104-0.896-2-2-2H2c-1.104,0-2,0.896-2,2v25C0,63.104,0.896,64,2,64z M4,39h21v21H4V39
		   z"
			/>
			<path
				d="M62,36H38c-1.104,0-2,0.896-2,2v24c0,1.104,0.896,2,2,2h24c1.104,0,2-0.896,2-2V38C64,36.896,63.104,36,62,36z M60,60H40
		   V40h20V60z"
			/>
		</AbstractIcon>
	);
});

export default SquaresIcon;
