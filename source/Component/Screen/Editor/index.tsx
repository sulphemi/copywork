import { memo, useRef, useState, RefObject, useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { ReturnIf } from 'babel-plugin-transform-functional-return';

import Library from 'data/library.json';

// -----------------------------------------------------------------------------

const NotAlphanumericRegex: RegExp = /[^a-z0-9]/i;

// -----------------------------------------------------------------------------

const EditorScreen = memo(function EditorScreen(): JSX.Element {
	const writerRef: RefObject<HTMLDivElement> = useRef();
	const errorRef: RefObject<HTMLDivElement> = useRef();

	const { id } = useParams();
	const libraryContent = Library[id];
	const libraryContentText = libraryContent
		? libraryContent?.text
				.replace(/ +/g, ' ')
				.replace(/\t/g, '')
				.replace(/\r/g, '')
				.replace(/\n{1,}/g, '\n\n')
				.trim()
		: undefined;

	//
	const { settings = {} } = useStoreon('settings');
	const [contentToCopy, setContentToCopy] = useState(libraryContentText);

	//
	useEffect(onManagingEvents(contentToCopy, setContentToCopy, writerRef, errorRef, settings), [
		contentToCopy,
		setContentToCopy,
		settings,
	]);

	//
	return (
		<Container>
			<Content>
				{contentToCopy ? (
					<GhostWriter>
						<Writer
							contentEditable
							spellCheck={settings.spellcheck ? 'true' : 'false'}
							ref={writerRef}
							data-editor={true}
						/>
						<ErrorContent ref={errorRef} />
						<GhostContent children={contentToCopy} />
					</GhostWriter>
				) : (
					<PasteContainer children="Paste something..." />
				)}
			</Content>
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
	settings: GenericObject,
) {
	return () => {
		const onClick = contentToCopy
			? (e: MouseEvent) => {
					const target = e.target as HTMLDivElement;

					if (!target.dataset.editor) {
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
						.replace(/ +/g, ' ')
						.replace(/\t/g, '')
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

		const onKeydown = contentToCopy
			? (e: KeyboardEvent) => {
					ReturnIf(e.metaKey || e.altKey || e.ctrlKey);

					switch (true) {
						// prevent enter from inserting divs
						case e.key === 'Enter':
							e.stopImmediatePropagation();
							e.preventDefault();

							if (settings.autocorrect) {
								const range: Range = window.getSelection().getRangeAt(0);
								const node: Node =
									range.startContainer === writerRef.current
										? writerRef.current.lastChild
										: range.startContainer;
								const index: number =
									range.startContainer === writerRef.current
										? writerRef.current.lastChild.textContent.length
										: range.startOffset;

								const line = getCurrentLine(contentToCopy, node);
								const lastSpace = line.includes(' ')
									? line.lastIndexOf(' ') + 1
									: line.length;

								if (index >= lastSpace) {
									handleAutocorrect(contentToCopy, writerRef.current, false);
								}
							}

							document.execCommand('insertLineBreak');
							return;

						// no space on first letter
						case e.key === ' ':
							switch (true) {
								case writerRef.current.textContent.length < 1:
								case wouldCreateConsecutiveSpaces(writerRef.current):
									e.stopImmediatePropagation();
									e.preventDefault();
									return;
							}
							break;
					}

					//
					if (settings.ignore_punctuation) {
						if (handleIgnorePunctuation(e, contentToCopy, writerRef.current)) {
							e.stopImmediatePropagation();
							e.preventDefault();
							return;
						}
					}

					//
					if (settings.autocorrect && e.key === ' ') {
						if (handleAutocorrect(contentToCopy, writerRef.current)) {
							e.stopImmediatePropagation();
							e.preventDefault();
							return;
						}
					}
			  }
			: undefined;

		const onKeyUp = contentToCopy
			? checkUserProgress(contentToCopy, writerRef, errorRef)
			: undefined;

		//
		window.addEventListener('paste', onPaste);
		window.addEventListener('click', onClick);
		window.addEventListener('keydown', onKeydown);
		window.addEventListener('keyup', onKeyUp);

		//
		return () => {
			window.removeEventListener('paste', onPaste);
			window.removeEventListener('click', onClick);
			window.removeEventListener('keydown', onKeydown);
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
			letters[start] = `<span>${letters[start]}`;
			letters[end - 1] = `${letters[end - 1] || ''}</span>`;
		});

		//
		errorRef.current.innerHTML = letters.join('');
	};
}

function wouldCreateConsecutiveSpaces(writer: Node): boolean {
	const range = window.getSelection().getRangeAt(0);
	const index =
		range.startContainer === writer ? writer.lastChild.textContent.length : range.startOffset;
	const node = range.startContainer === writer ? writer.lastChild : range.startContainer;
	const line = node.textContent;

	//
	return line[index - 1] === ' ' || line[index] === ' ';
}

function handleIgnorePunctuation(e: KeyboardEvent, contentToCopy: string, writer: Node): boolean {
	switch (true) {
		case !NotAlphanumericRegex.test(e.key):
			return false;

		case e.key === ' ':
			return false;
	}

	//
	const range: Range = window.getSelection().getRangeAt(0);
	const node: Node = range.startContainer === writer ? writer.lastChild : range.startContainer;
	const index: number =
		range.startContainer === writer ? writer.lastChild.textContent.length : range.startOffset;

	const line = getCurrentLine(contentToCopy, node);
	const letter: string = line[index];

	//
	switch (true) {
		case !NotAlphanumericRegex.test(letter):
		case letter === '':
		case letter === '\n':
			return false;
	}

	//
	node.textContent = `${node.textContent.slice(0, index)}${letter}${node.textContent.slice(
		index,
	)}`;

	//
	range.setStart(node, index + 1);
	range.collapse(false);

	//
	return true;
}

function handleAutocorrect(contentToCopy: string, writer: Node, addSpace: boolean = true): boolean {
	const range: Range = window.getSelection().getRangeAt(0);
	const node: Node = range.startContainer === writer ? writer.lastChild : range.startContainer;
	ReturnIf(node === null, false);

	//
	const index: number =
		range.startContainer === writer ? writer.lastChild.textContent.length : range.startOffset;
	const line = getCurrentLine(contentToCopy, node);
	const entered = node.textContent;
	const start = getPreviousSpace(entered, index);
	const end = getNextSpace(line, start);

	const willAddSpace = addSpace && end < line.length;

	//
	const nodeWord = entered.slice(start, index);
	const word = line.slice(start, end);
	ReturnIf(nodeWord === word, false);

	//
	range.setStart(node, start);
	range.setEnd(node, start + nodeWord.length);
	document.execCommand('insertText', false, `${word}${willAddSpace ? ' ' : ''}`);
	range.collapse(false);

	//
	return true;
}

function getCurrentLine(contentToCopy: string, node: Node): string {
	const lines = contentToCopy.split('\n');
	const lineIndex = getCurrentLineIndex(node);

	//
	return lines[lineIndex];
}

function getCurrentLineIndex(node: Node): number {
	let lineIndex: number = 0;
	let offset: number = 0;
	let lastChild = null;
	for (let i: number = 0; i < node.parentNode.childNodes.length; i++) {
		const child: Node = node.parentNode.childNodes[i];

		if (child.textContent === '\n' && lastChild?.textContent === '\n') {
			offset += 1;
		}

		ReturnIf(child === node, lineIndex - offset);

		//
		lastChild = child;
		lineIndex += 1;
	}

	//
	return 0;
}

function getPreviousSpace(text: string, offset: number = undefined): number {
	const index: number = text.lastIndexOf(' ', offset);

	//
	return index < 0 ? 0 : index + 1;
}

function getNextSpace(text: string, offset: number): number {
	const index = text.indexOf(' ', offset);

	//
	return index < 0 ? text.length : index;
}

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

const PasteContainer = styled.div`
	color: #666;
	flex-grow: 1;
	font-size: 1.5rem;
	padding: 5vw 1vw;
	user-select: all;
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
	display: inline-block;
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
		border-bottom: 4px solid red;
	}
`;
