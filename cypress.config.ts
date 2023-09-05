import { defineConfig } from 'cypress';

export default defineConfig({
	waitForAnimations: false,
	animationDistanceThreshold: 50,

	e2e: {
		baseUrl: 'http://localhost:3001',
		chromeWebSecurity: false,
		// viewportWidth: 1200,
		// viewportHeight: 768,
		// setupNodeEvents(on, config) {
		// 	// implement node event listeners here
		// },
	},
});
