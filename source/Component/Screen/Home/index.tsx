import { memo } from 'react';
import styled from 'styled-components';

// -----------------------------------------------------------------------------

const HomeScreen = memo(function HomeScreen(): JSX.Element {
	return <Container>[HomeScreen]</Container>;
});

export default HomeScreen;

// -----------------------------------------------------------------------------

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	max-width: 512px;
	width: 100%;
`;
