import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import { updateSettings } from 'store/action/settings';
import { updateTheme } from 'store/action/theme';

import ChartIcon from 'Component/Icon/Chart';
import FontIcon from 'Component/Icon/Font';
import LeftArrowIcon from 'Component/Icon/LeftArrow';
import LifeRingIcon from 'Component/Icon/LifeRing';
import MoonIcon from 'Component/Icon/Moon';
import NewDocumentIcon from 'Component/Icon/NewDocument';
import SunIcon from 'Component/Icon/Sun';
import SquaresIcon from 'Component/Icon/Squares';
import ToggleOffIcon from 'Component/Icon/ToggleOff';
import ToggleOnIcon from 'Component/Icon/ToggleOn';

// -----------------------------------------------------------------------------

const Sidebar = memo(function EditorScreenSidebar(): JSX.Element {
	const { settings = {}, theme = 'light' } = useStoreon('settings', 'theme');

	//
	function changeSetting(key: string, value: any) {
		updateSettings({ ...settings, [key]: value });
	}

	function toggleSetting(key: string) {
		return () => changeSetting(key, !settings[key]);
	}

	function toggleMode() {
		updateTheme(theme === 'dark' ? 'light' : 'dark');
	}

	//
	return (
		<Container>
			<Section>
				<CloseButton>
					<LeftArrowIcon /> COPYWORK
				</CloseButton>
			</Section>

			<Section>
				<Menu>
					<MenuLink>
						<Link to="/playground">
							<NewDocumentIcon /> New
						</Link>
					</MenuLink>
					<MenuLink>
						<Link to="/library">
							<SquaresIcon /> Library
						</Link>
					</MenuLink>
					<MenuLink disabled>
						<Link to="/statistics">
							<ChartIcon /> Your stats (coming soon)
						</Link>
					</MenuLink>
				</Menu>
			</Section>

			<Section style={{ flexGrow: 1 }}>
				<MenuHeader>Configure</MenuHeader>
				<Menu style={{ flexGrow: 1 }}>
					<MenuOption onClick={toggleSetting('spellcheck')}>
						{settings.spellcheck ? <ToggleOnIcon /> : <ToggleOffIcon />}
						Spellcheck ({onOff(settings.spellcheck)})
					</MenuOption>
					<MenuOption onClick={toggleSetting('autocorrect')}>
						{settings.autocorrect ? <ToggleOnIcon /> : <ToggleOffIcon />}
						Autocorrect ({onOff(settings.autocorrect)})
					</MenuOption>
					<MenuOption onClick={toggleSetting('ignore_punctuation')}>
						{settings.ignore_punctuation ? <ToggleOnIcon /> : <ToggleOffIcon />}
						Ignore punctuation ({onOff(settings.ignore_punctuation)})
					</MenuOption>
					<MenuOption onClick={toggleMode}>
						{settings.theme === 'dark' ? <MoonIcon /> : <SunIcon />}
						Theme mode ({lightDark(settings.theme)})
					</MenuOption>
					<MenuDropdown>
						<FontIcon /> Change font ({settings.font || 'Copse'})
						<select onChange={(e) => changeSetting('font', e.target.value)}>
							<option value="Copse">Copse</option>
						</select>
					</MenuDropdown>
					<Spacer />
					<MenuLink>
						<LifeRingIcon /> Request a feature
					</MenuLink>
				</Menu>
				<Copyright>
					Copywork is made by <a href="https://miscreants.co">Miscreants</a>.
				</Copyright>
			</Section>
		</Container>
	);
});

export default Sidebar;

// -----------------------------------------------------------------------------

function onOff(value: boolean) {
	return value ? 'On' : 'Off';
}

function lightDark(value: string) {
	return value === 'dark' ? 'Dark' : 'Light';
}

// -----------------------------------------------------------------------------

const Container = styled.div`
	background: ${(props) => props.theme.sidebarBackgroundColor};
	bottom: 0;
	color: ${(props) => props.theme.sidebarForegroundColor};
	display: flex;
	flex-direction: column;
	left: 0;
	margin: auto;
	overflow-y: auto;
	padding: 16px;
	position: fixed;
	top: 0;
	user-select: none;
	width: 333px;
	z-index: 1000;
`;

const Section = styled.div`
	display: flex;
	flex-direction: column;

	& + & {
		margin-top: 32px;
	}
`;

const CloseButton = styled.div`
	align-items: center;
	display: flex;
	height: 16px;
	letter-spacing: 1px;

	& svg {
		height: 100%;
		margin-right: 8px;
	}
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
`;

const MenuHeader = styled.div`
	border-bottom: 1px ${(props) => props.theme.sidebarForegroundColor} solid;
	font-size: 0.9rem;
	margin-bottom: 16px;
	padding-bottom: 2px;
`;

const MenuItem = styled.div.attrs((props: GenericObject) => ({ disabled: props.disabled }))`
	align-items: center;
	display: flex;
	flex-shrink: 0;
	font-size: 1.1rem;
	opacity: ${(props) => (props.disabled ? '0.5' : 1)};
	pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};

	& svg {
		height: 18px;
		margin-right: 8px;
		width: 18px;
	}

	& + & {
		margin-top: 16px;
	}
`;

const MenuLink = styled(MenuItem)`
	align-items: center;
	display: flex;
	position: relative;

	& a {
		align-items: center;
		color: ${(props) => props.theme.sidebarForegroundColor};
		display: flex;
		flex-grow: 1;
		text-decoration: none;
	}

	&:hover:after {
		border: 1px ${(props) => props.theme.sidebarForegroundColor} solid;
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

const MenuOption = styled(MenuItem)`
	cursor: pointer;
`;

const MenuDropdown = styled(MenuOption)`
	position: relative;

	& select {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
`;

const Spacer = styled.div`
	flex-grow: 1;
	min-height: 16px;
`;

const Copyright = styled.div`
	font-size: 0.75rem;
	margin-top: 8px;
	opacity: 0.66;

	& a {
		color: blue;
		text-decoration: none;
	}
`;
