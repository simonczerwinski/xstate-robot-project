import { createMachine, assign } from 'xstate';

// Define the context
interface RobotContext {
	x: number;
	y: number;
	gridWidth: number;
	gridHeight: number;
	direction: string;
	directionRotate: number;
	showSuccess: boolean;
}
export const robotMachine = createMachine<RobotContext>(
	{
		id: 'robotMachine',
		initial: 'init',
		context: {
			x: 0,
			y: 0,
			gridWidth: 5,
			gridHeight: 5,
			direction: 'N: NORTH',
			directionRotate: 0,
			showSuccess: false,
		},
		states: {
			// Set initial state and position of the robot
			init: {
				entry: assign({
					x: 1,
					y: 2,
					direction: 'N: NORTH',
					directionRotate: 0,
					showSuccess: false,
				}),
				after: {
					100: 'idle',
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
						target: 'turn',
						actions: 'turnRight',
					},
					TURN_LEFT: {
						target: 'turn',
						actions: 'turnLeft',
					},
					FINISH: {
						target: 'success',
						actions: 'finish',
					},
					RESET: {
						target: 'resetting',
					},
				},
			},
			// Sets a delay when the robot moves to catch up with the animations outside the machine
			move: {
				after: {
					100: 'idle',
				},
			},
			// Sets a delay when the robot turns to catch up with the animations outside the machine
			turn: {
				after: {
					100: 'idle',
				},
			},
			// Reset the robot to initial position
			resetting: {
				after: {
					100: 'init',
				},
				entry: 'resetRobot',
			},
			// Show success message
			success: {
				after: {
					300: 'idle',
				},
				entry: 'finish',
			},
		},
	},
	{
		actions: {
			moveForward: assign({
				// Move the robot forward depending on the direction it's facing.
				// If the robot is at the edge of the grid, don't move it.
				// With the calculating of the grid width and height (w/h), subtract the upper bound by one so the calculation dont exceed the grid w/h
				y: (context) => {
					if (context.direction === 'N: NORTH') {
						return Math.min(context.gridHeight - 1, Math.max(0, context.y - 1));
					} else if (context.direction === 'S: SOUTH') {
						return Math.min(context.gridHeight - 1, Math.max(0, context.y + 1));
					} else {
						return context.y;
					}
				},
				x: (context) => {
					if (context.direction === 'Ö: EAST') {
						return Math.min(context.gridWidth - 1, Math.max(0, context.x + 1));
					} else if (context.direction === 'V: WEST') {
						return Math.min(context.gridWidth - 1, Math.max(0, context.x - 1));
					} else {
						return context.x;
					}
				},
				showSuccess: false,
			}),

			// Rotate the robot to the right but don't change the movement. Await the next move "forward" based on the direction
			turnRight: assign({
				directionRotate: (context) => {
					const rotation = (context.directionRotate += 90);
					return rotation >= 360 ? 0 : rotation;
				},
				direction: (context) => {
					switch (context.directionRotate) {
						case 0:
							return 'N: NORTH';
						case 90:
							return 'Ö: EAST';
						case 180:
							return 'S: SOUTH';
						case 270:
							return 'V: WEST';
						default:
							return 'N: NORTH';
					}
				},
				showSuccess: false,
			}),

			// Rotate the robot to the left but don't change the movement. Await the next move "forward" based on the direction
			turnLeft: assign({
				directionRotate: (context) => {
					const rotation = (context.directionRotate -= 90);
					return rotation <= -360 ? 0 : rotation;
				},
				direction: (context) => {
					switch (context.directionRotate) {
						case 0:
							return 'N: NORTH';
						case -90:
							return 'Ö: EAST';
						case -180:
							return 'S: SOUTH';
						case -270:
							return 'V: WEST';
						default:
							return 'N: NORTH';
					}
				},
				showSuccess: false,
			}),

			//	Reset the robot to initial position
			resetRobot: assign({
				x: 1,
				y: 2,
				direction: 'N: NORTH',
				directionRotate: 0,
				showSuccess: false,
			}),

			finish: assign({
				showSuccess: true,
				direction: 'N: NORTH',
				directionRotate: 0,
			}),
		},
	}
);
