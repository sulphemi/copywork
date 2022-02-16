import(
	/* webpackChunkName: "app" */
	'Component/App'
)
	.then(({ default: renderApp }) => renderApp())
	.catch((e) => {
		document.activeElement.classList.add('failed_loading_app');
		console.error(e);
	});
