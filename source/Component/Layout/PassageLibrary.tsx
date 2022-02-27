import { memo, RefObject, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';
import { ReturnIf } from 'babel-plugin-transform-functional-return';
import sortBy from 'lodash/sortBy';

import { hidePassages } from 'store/action/passages';

import LeftArrowIcon from 'Component/Icon/LeftArrow';
import EyeglassIcon from 'Component/Icon/Eyeglass';

import MenuButton from 'Component/MenuButton';
import Section from 'Component/Section';

import Library from 'data/library.json';

// -----------------------------------------------------------------------------

const PassageLibrary = memo(function PassageLibrary(): JSX.Element {
	const { passages_show: passagesShow } = useStoreon('passages_show');
	const containerRef: RefObject<HTMLDivElement> = useRef();

	//
	const [searchTermsRaw, setSearchTermsRaw] = useState('' as string);
	const [collapsedCategory, setCollapsedCategory] = useState({} as GenericObject);

	//
	const searchTerms =
		searchTermsRaw.length > 0
			? (searchTermsRaw || '').toLocaleLowerCase().trim().split(/\ +/g)
			: undefined;
	const libraryByCategory = Library.reduce((obj, entry) => {
		const keys = entry.category;

		keys.forEach((key) => {
			const entries = obj[key] || [];
			obj[key] = entries;

			ReturnIf(!searchTerms, entries.push(entry));

			//
			if (
				searchTerms.every((searchTerm) => {
					return (
						entry.author.toLocaleLowerCase().includes(searchTerm) ||
						entry.title.toLocaleLowerCase().includes(searchTerm)
					);
				})
			) {
				entries.push(entry);
			}
		});

		return obj;
	}, {});

	const libraryCategories = Object.keys(libraryByCategory).sort();
	libraryCategories.forEach((key) => sortBy(libraryByCategory[key], ['author', 'name']));

	//
	return (
		<Container
			hide={!passagesShow}
			onClick={(e) => {
				ReturnIf(e.target !== containerRef.current);
				hidePassages();
			}}
			ref={containerRef}
		>
			<Content>
				<Section>
					<CloseButton>
						<MenuButton onClick={hidePassages}>
							<LeftArrowIcon /> PASSAGES
						</MenuButton>
					</CloseButton>
				</Section>
				<Section>
					<SearchInput>
						<EyeglassIcon />
						<input
							type="search"
							placeholder="Search..."
							value={searchTermsRaw}
							onChange={(e) => setSearchTermsRaw(e.target.value)}
							data-dontstealfocus="1"
						/>
					</SearchInput>
				</Section>
				<Section grow>
					{libraryCategories.map((category) => {
						const entries = libraryByCategory[category] || [];
						const isCollapsed = collapsedCategory[category];

						//
						return entries.length ? (
							<Category key={category}>
								<CategoryHeader
									collapsed={isCollapsed}
									onClick={() =>
										setCollapsedCategory((oldValue) => {
											return {
												...oldValue,
												[category]: !collapsedCategory[category],
											};
										})
									}
								>
									<span>{category}</span>
									<LeftArrowIcon />
								</CategoryHeader>
								<CategoryEntries collapsed={isCollapsed}>
									{entries.map((entry) => {
										return (
											<Entry
												to={`/playground/${entry.id}`}
												onClick={() => {
													hidePassages();
												}}
											>
												{entry.title}
												<EntryAuthor>{entry.author}</EntryAuthor>
											</Entry>
										);
									})}
								</CategoryEntries>
							</Category>
						) : null;
					})}
				</Section>
			</Content>
		</Container>
	);
});

export default PassageLibrary;

// -----------------------------------------------------------------------------

const Container = styled.div.attrs((props: GenericObject) => ({ hide: props.hide }))`
	bottom: 0;
	left: ${(props) => (props.hide ? '333px' : '0')};
	opacity: ${(props) => (props.hide ? '0' : '1')};
	pointer-events: ${(props) => (props.hide ? 'none' : 'all')};
	position: fixed;
	right: ${(props) => (props.hide ? '-333px' : '0')};
	top: 0;
	user-select: none;
	z-index: 1000;
`;

const Content = styled.div`
	background: ${(props) => props.theme.sidebarBackgroundColor};
	color: ${(props) => props.theme.foregroundColor};
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	overflow-y: auto;
	padding: 16px;
	width: 333px;
	height: 100%;
	margin-left: auto;
`;

const CloseButton = styled.div`
	align-items: center;
	cursor: pointer;
	display: flex;
	letter-spacing: 1px;

	& button {
		height: 100%;
	}

	& svg {
		height: 16px;
		margin-right: 8px;
	}
`;

const SearchInput = styled.div`
	align-items: center;
	background: ${(props) => props.theme.backgroundColor};
	border: 1px ${(props) => props.theme.foregroundColor} solid;
	border-radius: 4px;
	display: flex;
	height: 32px;
	position: relative;

	& svg {
		flex-shrink: 0;
		height: 16px;
		margin-left: 8px;
		pointer-events: none;
	}

	& input {
		appearance: none;
		background: transparent;
		caret-color: ${(props) => props.theme.foregroundColor};
		color: ${(props) => props.theme.foregroundColor};
		border: 0;
		flex-grow: 1;
		font-size: 1.1rem;
		height: 100%;
		left: 0;
		padding-left: 32px;
		position: absolute;
		top: 0;
		width: 100%;
	}
`;

const Category = styled.div`
	& + & {
		margin-top: 32px;
	}
`;

const CategoryHeader = styled.div.attrs((props: GenericObject) => ({
	collapsed: props.collapsed,
}))`
align-items: center;
	display: flex;

	& span {
		flex-grow: 1;
	}

	& svg {
		flex-shrink: 0;
		flex-grow 0;
		height: 16px;
		transform: rotate(${(props) => (props.collapsed ? '90deg' : '-90deg')});
		margin-right: 4px;
	}
`;

const CategoryEntries = styled.div.attrs((props: GenericObject) => ({
	collapsed: props.collapsed,
}))`
	display: flex;
	flex-direction: column;
	height: ${(props) => (props.collapsed ? '0' : '100%')};
	overflow: hidden;
	transition: height 250ms;
`;

const Entry = styled(Link)`
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.foregroundColor};
	cursor: pointer;
	font-size: 1.1rem;
	padding: 8px 8px 8px 16px;
	position: relative;
	text-align: left;
	text-decoration: none;

	&:after {
		content: '';
		border: 1px ${(props) => props.theme.foregroundColor} solid;
		border-radius: 4px;

		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		opacity: 0;
		pointer-events: none;
	}

	&:hover:after,
	&:focus:after {
		opacity: 1;
	}
`;

const EntryAuthor = styled.div`
	font-size: 0.9rem;
	opacity: 0.66;
`;
