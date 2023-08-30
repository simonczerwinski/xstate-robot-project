import { createMachine, assign } from 'xstate';

export const robotMachine = createMachine({
	id: 'robot',
	initial: 'init',
	context: {
		x: 0,
		y: 0,
		direction: '',
	},
	states: {
		init: {
			// Set the initial (y/x) coordinates to center
			entry: assign({
				x: 16,
				y: 16,
				direction: 'Center',
			}),

			// Set delay before transitioning to 'idle' state to make sure the robot is positioned at the center
			after: {
				100: 'idle',
			},
		},
		idle: {
			// Set transitions to 'moving' state based on user input (commands)
			on: {
				FORWARD: {
					target: 'moving',
					actions: assign({
						x: (context) => context.x + 1,
					}),
				},
				TURN_RIGHT: {
					target: 'moving',
					actions: assign({
						y: (context) => context.y + 1,
					}),
				},
				TURN_LEFT: {
					target: 'moving',
					actions: assign({
						y: (context) => context.y - 1,
					}),
				},
			},
		},
		// Set the direction
		moving: {
			entry: assign({
				direction: 'Moving',
			}),
			on: {
				'': 'idle',
			},
		},
	},
});
