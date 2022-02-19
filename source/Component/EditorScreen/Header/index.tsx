import { ChangeEvent, memo, MouseEventHandler } from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import { updateSettings } from 'store/action/settings';

import MenuIcon from 'Component/MenuIcon';
import CreateIcon from 'Component/CreateIcon';

// -----------------------------------------------------------------------------

const EditorScreenHeader = memo(function EditorScreenHeader({
	onStartOver,
}: EditorScreenHeaderProps): JSX.Element {
	const { settings = {} } = useStoreon('settings');

	//
	const onChangeSetting = (key: string) => {
		return (e: ChangeEvent<HTMLInputElement>) =>
			updateSettings({
				...settings,
				[key]: e.target.checked,
			});
	};

	//
	return (
		<Container>
			<Title children="copywork" />
			<Spacer />
			<MenuContainer>
				<MenuIconContainer children={<MenuIcon />} />
				<Menu>
					<MenuItemButton
						onClick={onStartOver as MouseEventHandler<HTMLDivElement>}
						style={{ cursor: 'pointer' }}
					>
						<CreateIcon /> New copywork
					</MenuItemButton>
					<MenuItemSettings>
						<strong>Settings</strong>
						<Settings>
							<li>
								<label>
									<input
										type="checkbox"
										checked={settings?.ignore_punctuation}
										onChange={onChangeSetting('ignore_punctuation')}
									/>{' '}
									Ignore punctuation
								</label>
							</li>
							<li>
								<label>
									<input
										type="checkbox"
										checked={settings?.autocorrect_last_word_on_space}
										onChange={onChangeSetting('autocorrect_last_word_on_space')}
									/>{' '}
									Autocorrect last word on space
								</label>
							</li>
						</Settings>
					</MenuItemSettings>
					<MenuItemBy>
						by <Link href="https://miscreants.co">miscreants</Link>
					</MenuItemBy>
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

	&:hover,
	&:focus,
	&:focus-within {
		width: 192px;
	}
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

	${MenuContainer}:hover &, ${MenuContainer}:focus &, ${MenuContainer}:focus-within & {
		display: flex;
	}
`;

const MenuIconContainer = styled.div`
	cursor: pointer;
	height: 32px;
	margin-left: auto;
	width: 32px;

	&:hover svg {
		background: currentColor;
		border-radius: 32px;

		& path {
			fill: #eee;
		}
	}
`;

const MenuItem = styled.div`
	cursor: pointer;
	display: flex;
	padding: 8px;
	width: 192px;

	& + & {
		border-top: 1px rgba(0, 0, 0, 0.1) solid;
	}
`;

const MenuItemButton = styled(MenuItem)`
	align-items: center;
	justify-content: center;

	& svg {
		height: 16px;
		margin-right: 4px;
		width: 16px;
	}

	&:hover {
		background: rgba(0, 0, 0, 0.1);
	}
`;

const MenuItemSettings = styled(MenuItem)`
	flex-direction: column;
`;

const MenuItemBy = styled(MenuItem)`
	align-items: center;
	cursor: unset;
	justify-content: center;
`;

const Link = styled.a`
	color: #66f;
	margin-left: 4px;
`;

const Settings = styled.ul`
	list-style: none;
	list-style-type: none;
	margin: 4px 0 0 0;
	padding: 0;

	& li label {
		display: flex;
	}

	& li input {
		margin-right: 8px;
	}

	& li + li {
		margin-top: 4px;
	}
`;

// -----------------------------------------------------------------------------

interface EditorScreenHeaderProps {
	onStartOver?: Function;
}
