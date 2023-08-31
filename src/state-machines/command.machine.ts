import { createMachine, assign } from 'xstate';

interface CommandEvent {
	type: string;
	value?: string;
}

export const commandMachine = createMachine<
	{ inputValue: string; showSuccess: boolean; showError: boolean },
	CommandEvent
>(
	{
		id: 'commandMachine',
		initial: 'idle',
		context: {
			inputValue: '',
			showSuccess: false,
			showError: false,
		},
		states: {
			idle: {
				on: {
					SUBMIT: 'loading',
				},
			},

			// Get the input value and set it to the context
			loading: {
				entry: 'startLoading',
				invoke: {
					src: 'setInputValue',
					onDone: {
						target: 'success',
						actions: assign({
							inputValue: (context, event) => event.data,
						}),
					},
					onError: {
						target: 'fail',
						actions: (e) => {
							console.error('error', e);
						},
					},
				},
			},
			success: {
				after: {
					100: 'idle',
				},
				entry: 'success',
			},
			fail: {
				after: {
					500: 'idle',
				},
				entry: 'error',
			},
		},
	},
	{
		// Handle response states
		actions: {
			startLoading: assign({
				showSuccess: false,
				showError: false,
			}),
			success: assign({
				showSuccess: true,
				showError: false,
			}),
			error: assign({
				showSuccess: false,
				showError: true,
			}),
		},

		// Handle input value
		services: {
			setInputValue: (context, event) => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						const input = event?.value?.toLocaleUpperCase().split('');
						if (input?.some((char) => ['G', 'V', 'H'].includes(char))) {
							resolve(event.value);
						} else {
							console.error('Error: Invalid input value');
							reject('error');
						}
					}, 500);
				});
			},
		},
	}
);
