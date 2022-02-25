import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NewDocumentIcon from 'Component/Icon/NewDocument';
import SquaresIcon from 'Component/Icon/Squares';

import Menu from 'Component/Menu';
import MenuLink from 'Component/MenuLink';

// -----------------------------------------------------------------------------

const HomeScreen = memo(function HomeScreen(): JSX.Element {
	return (
		<Container>
			<Content>
				<Title>Hello, this is Copywork</Title>

				<Paragraph>
					Polish your writing style by copying passages of great writers (or your next
					copywriting client). Think of it as keboard karaoke!
				</Paragraph>

				<Paragraph>
					Paste in a paste to get started or select from our curated library.
				</Paragraph>

				<Menu style={{ marginTop: '32px' }}>
					<MenuLink>
						<Link to="/playground">
							<NewDocumentIcon /> New document
						</Link>
					</MenuLink>
					<MenuLink>
						<Link to="/library">
							<SquaresIcon /> Passage library
						</Link>
					</MenuLink>
				</Menu>
			</Content>
		</Container>
	);
});

export default HomeScreen;

// -----------------------------------------------------------------------------

const Container = styled.div`
	flex-grow: 1;
	padding: 5vw;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 512px;
	width: 100%;
`;

const Title = styled.h1`
	font-size: 1.25rem;
	margin: 0 0 20px 0;
`;

const Paragraph = styled.p`
	margin: 0;

	& + & {
		margin-top: 16px;
	}
`;
