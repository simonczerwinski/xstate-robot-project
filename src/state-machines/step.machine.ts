import { createMachine, assign } from 'xstate';

interface StepContext {
	animationDirection?: string;
}

export const stepMachine = createMachine<StepContext>(
	{
		id: 'stepMachine',
		initial: 'language',
		context: {
			animationDirection: 'right',
		},
		states: {
			// Set transition states for each step when clicking next or previous
			language: {
				on: {
					NEXT: {
						target: 'name',
						actions: ['setAnimationDirectionRight'],
					},
				},
			},
			name: {
				on: {
					NEXT: {
						target: 'layout',
						actions: ['setAnimationDirectionRight'],
					},
					PREVIOUS: {
						target: 'language',
						actions: ['setAnimationDirectionLeft'],
					},
				},
			},
			layout: {
				on: {
					NEXT: {
						target: 'command',
						actions: ['setAnimationDirectionRight'],
					},
					PREVIOUS: {
						target: 'name',
						actions: ['setAnimationDirectionLeft'],
					},
				},
			},
			command: {
				on: {
					NEXT: {
						target: 'finalstep',
						actions: ['setAnimationDirectionRight'],
					},
					PREVIOUS: {
						target: 'layout',
						actions: ['setAnimationDirectionLeft'],
					},
				},
			},
			finalstep: {
				on: {
					SUBMIT: {
						target: 'language',
						actions: ['setAnimationDirectionRight'],
					},
					PREVIOUS: {
						target: 'command',
						actions: ['setAnimationDirectionLeft'],
					},
				},
			},
		},
	},
	{
		// Set the animation direction for each step
		actions: {
			setAnimationDirectionRight: assign({
				animationDirection: (_, event) => 'right',
			}),
			setAnimationDirectionLeft: assign({
				animationDirection: (_, event) => 'left',
			}),
		},
	}
);
