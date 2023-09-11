import { createMachine, assign } from 'xstate';

interface CommandContext {
	inputValue: string;
	showSuccess: boolean;
	showError: boolean;
}

export const commandMachine = createMachine<CommandContext>(
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
			// Set transition states for input value
			idle: {
				on: {
					SUBMIT: 'loading',
					RESET: 'reset',
				},
			},

			// Get the input value and set it to the context
			loading: {
				on: {
					SUBMIT: [
						{
							target: 'success',
							cond: 'validateInput',
							actions: assign({
								inputValue: (context, event) => event.value,
							}),
						},
						{
							target: 'error',
						},
					],
					ERROR: 'error',
					RESET: 'reset',
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
				on: {
					ERROR: 'error',
				},
				after: {
					100: 'idle',
				},
				entry: 'setSuccess',
			},
			error: {
				after: {
					100: 'idle',
				},
				entry: 'setError',
			},
		},
	},
	{
		// Handle response states
		actions: {
			setSuccess: assign({
				showSuccess: true,
				showError: false,
			}),
			setError: assign({
				showSuccess: false,
				showError: true,
			}),
		},
		// Handle input value
		guards: {
			validateInput: (context, event: any) => {
				const input = event?.value?.toLocaleUpperCase().split('');
				const validLetters = ['G', 'V', 'H', 'F', 'R', 'L'];
				const hasInvalidLetters = input?.some(
					(char) => !validLetters.includes(char)
				);
				return !hasInvalidLetters;
			},
		},
	}
);
