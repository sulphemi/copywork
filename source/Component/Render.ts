import { memo } from 'react';

// -----------------------------------------------------------------------------

const Render = memo(function Render({
	if: truthy,
	children,
	else: otherwise = () => null,
}: RenderProps): JSX.Element {
	return truthy ? children() : otherwise();
});

export default Render;

// -----------------------------------------------------------------------------

interface RenderProps {
	if: any;
	children: Function;
	else?: Function;
}
