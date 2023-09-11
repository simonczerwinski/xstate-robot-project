export default {
	e2e: {
		baseUrl: 'https://localhost:3000',
		chromeWebSecurity: false,
		viewportWidth: 1280,
		viewportHeight: 1000,
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
	env: {
		xstate: 'false', // Disable XState visualizer
	},
};
