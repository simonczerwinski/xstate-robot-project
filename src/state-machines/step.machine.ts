import { createMachine, assign } from 'xstate';

export const stepMachine = createMachine({
	id: 'stepMachine',
	initial: 'language',
	states: {
		language: {
			on: {
				NEXT: 'name',
			},
		},
		name: {
			on: {
				NEXT: 'layout',
			},
		},
		layout: {
			on: {
				NEXT: 'input',
			},
		},
		input: {
			on: {
				SUBMIT: 'save',
			},
		},
		save: {},
	},
});
