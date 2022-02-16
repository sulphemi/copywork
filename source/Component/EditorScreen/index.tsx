import { memo, useRef, useState, RefObject, useEffect } from 'react';
import styled from 'styled-components';

import Header from 'Component/EditorScreen/Header';

// -----------------------------------------------------------------------------

const EditorScreen = memo(function EditorScreen(): JSX.Element {
	const writerRef: RefObject<HTMLDivElement> = useRef();
	const errorRef: RefObject<HTMLDivElement> = useRef();

	//
	const [contentToCopy, setContentToCopy] = useState(undefined as string);

	//
	useEffect(onManagingEvents(contentToCopy, setContentToCopy, writerRef, errorRef), [
		contentToCopy,
	]);

	//
	const onStartOver = onStartOverFactory(contentToCopy, setContentToCopy);

	//
	return (
		<Container>
			<Header onStartOver={onStartOver} />

			{contentToCopy ? (
				<GhostWriter>
					<Writer contentEditable spellCheck="false" ref={writerRef} data-editor={true} />
					<ErrorContent ref={errorRef} />
					<GhostContent children={contentToCopy} />
				</GhostWriter>
			) : (
				<PasteContainer children="Paste something..." />
			)}
		</Container>
	);
});

export default EditorScreen;

// -----------------------------------------------------------------------------

function onManagingEvents(
	contentToCopy: string,
	setContentToCopy: Function,
	writerRef: RefObject<HTMLDivElement>,
	errorRef: RefObject<HTMLDivElement>,
) {
	return () => {
		const onClick = contentToCopy
			? (e: MouseEvent) => {
					if (!(e.target as HTMLDivElement).dataset.editor) {
						// set cursor to end of writer component
						// https://stackoverflow.com/a/3866442/7400022
						const range = document.createRange();
						range.selectNodeContents(writerRef.current);
						range.collapse(false);

						const selection = window.getSelection();
						selection.removeAllRanges();
						selection.addRange(range);
					}
			  }
			: undefined;

		const onPaste = contentToCopy
			? disableNormalEventBehavor
			: (e: ClipboardEvent) => {
					disableNormalEventBehavor(e);

					//
					const clipboardData = e.clipboardData || window.clipboardData;
					const pastedData = clipboardData
						.getData('Text')
						.replace(/\r/g, '')
						.replace(/\n{1,}/g, '\n\n')
						.trim();
					if (pastedData.length < 1) {
						return;
					}

					//
					setContentToCopy(pastedData);
					setTimeout(() => writerRef.current.focus(), 100);
			  };

		const onKeyUp = contentToCopy
			? checkUserProgress(contentToCopy, writerRef, errorRef)
			: undefined;

		//
		window.addEventListener('paste', onPaste);
		window.addEventListener('click', onClick);
		window.addEventListener('keyup', onKeyUp);

		//
		return () => {
			window.removeEventListener('paste', onPaste);
			window.removeEventListener('click', onClick);
			window.removeEventListener('keyup', onKeyUp);
		};
	};
}

function onStartOverFactory(contentToCopy: string, setContentToCopy: Function): Function {
	return contentToCopy ? () => setContentToCopy(undefined) : undefined;
}

function disableNormalEventBehavor(e: Event) {
	e.stopPropagation();
	e.preventDefault();
}

function checkUserProgress(
	originalText: string,
	writerRef: RefObject<HTMLDivElement>,
	errorRef: RefObject<HTMLDivElement>,
) {
	return () => {
		const text: string = writerRef.current.innerText;

		//
		let error: number[] = undefined;
		const errors: number[][] = [];

		//
		for (let index = 0; index < text.length; index++) {
			const letter = text[index];
			const originalLetter = originalText[index];

			if (letter !== originalLetter) {
				if (error === undefined) {
					error = [index];

					errors.push(error);
				}
			} else {
				if (error !== undefined) {
					error.push(index);
					error = undefined;
				}
			}
		}

		//
		if (error) {
			error.push(text.length);
		}

		//
		const letters = Array.from(text);
		errors.forEach(([start, end]) => {
			letters[start] = `<span spellcheck="false">${letters[start]}`;
			letters[end - 1] = `${letters[end - 1] || ''}</span>`;
		});

		//
		errorRef.current.innerHTML = letters.join('');
	};
}

// -----------------------------------------------------------------------------

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	max-width: 8.5in;
	position: relative;
	width: 100%;
`;

const PasteContainer = styled.div`
	color: #666;
	flex-grow: 1;
	font-size: 1.5rem;
	padding: 5vw 1vw;
	user-select: none;
	display: flex;
	justify-content: center;
`;

const GhostWriter = styled.div`
	height: 100%;
	min-height: 100%;
	position: relative;
`;

const GhostContent = styled.div`
	font-size: 1.5rem;
	left: 0;
	opacity: 0.33;
	padding: 1vw 1vw 25vw 1vw;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	user-select: none;
	white-space: pre-wrap;
	word-break: break-word;
	z-index: 1;
`;

const Writer = styled.div`
	font-size: 1.5rem;
	outline: 0;
	padding: 1vw;
	white-space: pre-wrap;
	word-break: break-word;
	left: 0;
	top: 0;
	right: 0;
	position: absolute;
	z-index: 3;
`;

const ErrorContent = styled.div`
	color: transparent;
	font-size: 1.5rem;
	left: 0;
	padding: 1vw;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	user-select: none;
	white-space: pre-wrap;
	word-break: break-word;
	z-index: 2;

	& span {
		background: pink;
	}
`;
