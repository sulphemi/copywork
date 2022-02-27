import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { showPassages } from 'store/action/passages';

import NewDocumentIcon from 'Component/Icon/NewDocument';
import SquaresIcon from 'Component/Icon/Squares';

import Menu from 'Component/Menu';
import MenuLink from 'Component/MenuLink';
import MenuButton from 'Component/MenuButton';

// -----------------------------------------------------------------------------

const HomeScreen = memo(function HomeScreen(): JSX.Element {
	return (
		<Container>
			<Content>
				<Title>Hello, this is Copywork</Title>

				<Copy>
					<Paragraph>
						Polish your writing style by copying passages of great writers (or your next
						copywriting client). Think of it as keboard karaoke!
					</Paragraph>

					<Paragraph>
						Get started with one of our curated passages or paste some text in a new
						document.
					</Paragraph>
				</Copy>

				<Menu>
					<MenuLink>
						<Link to="/playground">
							<NewDocumentIcon /> New document
						</Link>
					</MenuLink>
					<MenuLink>
						<MenuButton onClick={showPassages}>
							<SquaresIcon /> Passage library
						</MenuButton>
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
	padding-top: max(52px, 5vw);
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

const Copy = styled.div`
	margin-bottom: 32px;
`;

const Paragraph = styled.p`
	margin: 0;

	& + & {
		margin-top: 16px;
	}
`;
