import { createMachine, assign } from 'xstate';

export const robotMachine = createMachine(
	{
		id: 'robotMachine',
		initial: 'init',
		context: {
			x: 0,
			y: 0,
			direction: '',
		},
		states: {
			init: {
				// Set the initial (y/x) coordinates to bottom
				entry: assign({
					x: 16,
					y: 28,
				}),

				// Set delay before transitioning to 'idle' state to make sure the robot is positioned at the bottom
				after: {
					200: 'idle',
				},
			},

			// Set tranistion states for robot movement
			idle: {
				on: {
					MOVE_FORWARD: {
						target: 'move',
						actions: 'moveForward',
					},
					TURN_RIGHT: {
						target: 'move',
						actions: 'turnRight',
					},
					TURN_LEFT: {
						target: 'move',
						actions: 'turnLeft',
					},
				},
			},

			// Set the robot's movement speed
			move: {
				after: {
					100: 'idle',
				},
			},
		},
	},
	{
		// Handle robot movement and show direction
		actions: {
			moveForward: assign({
				y: (context) => context.y - 10,
				direction: 'NORTH',
			}),
			turnRight: assign({
				x: (context) => context.x + 10,
				direction: 'EAST',
			}),
			turnLeft: assign({
				x: (context) => context.x - 10,
				direction: 'WEST',
			}),
		},
	}
);
