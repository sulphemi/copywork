import { memo } from 'react';
import styled from 'styled-components';

// -----------------------------------------------------------------------------

const NotFoundScreen = memo(function NotFoundScreen(): JSX.Element {
	return <Container>Page Not Found</Container>;
});

export default NotFoundScreen;

// -----------------------------------------------------------------------------

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
`;
