import { memo } from 'react';
import styled from 'styled-components';

// -----------------------------------------------------------------------------

const LibraryScreen = memo(function LibraryScreen(): JSX.Element {
	return <Container>[LibraryScreen]</Container>;
});

export default LibraryScreen;

// -----------------------------------------------------------------------------

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	max-width: 512px;
	width: 100%;
`;
