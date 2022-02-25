import styled from 'styled-components';

import MenuItem from 'Component/MenuItem';

// -----------------------------------------------------------------------------

const MenuLink = styled(MenuItem)`
	align-items: center;
	display: flex;
	position: relative;

	& a {
		align-items: center;
		color: ${(props) => props.theme.foregroundColor};
		display: flex;
		flex-grow: 1;
		text-decoration: none;
	}

	&:hover:after {
		border: 1px ${(props) => props.theme.foregroundColor} solid;
		border-radius: 4px;
		bottom: -4px;
		content: '';
		left: -4px;
		pointer-events: none;
		position: absolute;
		right: -4px;
		top: -4px;
		z-index: -1;
	}
`;

export default MenuLink;
