import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

// -----------------------------------------------------------------------------

const Loader = memo(function Loader({}: LoaderProps): JSX.Element {
	return <Container children={<Spinner />} />;
});

export default Loader;

// -----------------------------------------------------------------------------

const rotate = keyframes`
0% {
	transform:'rotate(0deg);
}
100% {
	transform: rotate(360deg);
}
`;

const Container = styled.div`
	filter: drop-shadow(0 1 2px #000);
	height: 64px;
	width: 64px;
	position: relative;

	&:before {
		border: 7px #070c10 solid;
		border-radius: 1000;
		bottom: 0;
		content: '';
		left: 0;
		opacity: 0.5;
		position: fixed;
		right: 0;
		top: 0;
	}
`;

const Spinner = styled.div`
	animation: ${rotate} 1s linear infinite;
	border: 7px #070c10 solid;
	border-radius: 1000;
	bottom: 0;
	border-color: transparent transparent #fff #fff;
	left: 0;
	position: absolute;
	transform-origin: 50% 50%;
	right: 0;
	top: 0;
`;

// -----------------------------------------------------------------------------

interface LoaderProps {}
