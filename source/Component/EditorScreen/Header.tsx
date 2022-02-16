import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';

import MenuIcon from 'Component/MenuIcon';

// -----------------------------------------------------------------------------

const EditorScreenHeader = memo(function EditorScreenHeader({
	onStartOver,
}: EditorScreenHeaderProps): JSX.Element {
	return (
		<Container>
			<Title children="copywork" />
			<Spacer />
			<MenuContainer>
				<MenuIcon />
				<Menu>
					<MenuItem
						onClick={onStartOver as MouseEventHandler<HTMLDivElement>}
						style={{ cursor: 'pointer' }}
					>
						Clear screen
					</MenuItem>
					<MenuItem>
						by <Link href="https://miscreants.co">miscreants</Link>
					</MenuItem>
				</Menu>
			</MenuContainer>
		</Container>
	);
});

export default EditorScreenHeader;

// -----------------------------------------------------------------------------

const Container = styled.div`
	align-items: center;
	color: #666;
	display: flex;
	padding: 1vw;
	position: relative;
	user-select: none;
`;

const Title = styled.div`
	font-size: 1.25rem;
`;

const Spacer = styled.div`
	flex-grow: 1;
`;

const MenuContainer = styled.div`
	position: relative;
	width: 32px;
`;

const Menu = styled.div`
	background: #eee;
	border-radius: 4px;
	display: none;
	filter: drop-shadow(0 1px 1px #000);
	flex-direction: column;
	position: absolute;
	right: 0;
	top: 34px;
	z-index: 100;

	${MenuContainer}:hover &, ${MenuContainer}:focus & {
		display: flex;
	}
`;

const MenuItem = styled.div`
	padding: 8px;
	white-space: pre;
`;

const Link = styled.a`
	color: #66f;
`;

// -----------------------------------------------------------------------------

interface EditorScreenHeaderProps {
	onStartOver?: Function;
}
