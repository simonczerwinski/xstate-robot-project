import { createMachine, assign } from 'xstate';

export const commandMachine = createMachine(
	{
		id: 'commandMachine',
		initial: 'idle',
		predictableActionArguments: false,
		context: {
			inputValue: '',
			showSuccess: false,
			showError: false,
		},
		states: {
			// Set tranistion states for input value
			idle: {
				on: {
					SUBMIT: 'loading',
					RESET: 'reset',
					SUCCESS: 'success',
					ERROR: 'error',
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
						target: 'error',
						actions: (e) => {
							console.error('error', e);
						},
					},
				},
			},
			// Reset the input value
			reset: {
				entry: assign({
					inputValue: '',
					showSuccess: false,
					showError: false,
				}),
				after: {
					100: 'idle',
				},
			},
			// Show success or error message
			success: {
				after: {
					100: 'idle',
				},
				entry: 'success',
			},
			error: {
				after: {
					100: 'idle',
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

		// Handle input value and error handling
		services: {
			setInputValue: (context, event) => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						const input = event?.value?.toLocaleUpperCase().split('');
						if (
							input?.every((char) =>
								['G', 'V', 'H', 'F', 'R', 'L'].includes(char)
							)
						) {
							// Reset the error state to false when a valid input is provided
							resolve({
								...context,
								showError: false,
								inputValue: event.value,
							});
						} else {
							console.error('Error: Invalid input value');
							reject({ type: 'ERROR' });
						}
					}, 500);
				});
			},
		},
	}
);
