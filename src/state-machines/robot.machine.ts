import { createMachine, assign } from 'xstate';

// Define the context interface
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
						actions: 'resetRobot',
					},
				},
			},
			// Set the robot's movement
			move: {
				invoke: {
					src: 'moving',
					onDone: {
						target: 'idle',
					},
					onError: {
						target: 'idle',
						actions: (e) => {
							console.error('error', e);
						},
					},
				},
			},
			turn: {
				invoke: {
					src: 'turning',
					onDone: {
						target: 'idle',
					},
					onError: {
						target: 'idle',
						actions: (e) => {
							console.error('error', e);
						},
					},
				},
			},
			// Reset the robot to initial position
			resetting: {
				invoke: {
					src: 'reset',
					onDone: [
						{
							target: 'backToStart',
						},
					],
					onError: {
						target: 'idle',
						actions: (e) => {
							console.error('error', e);
						},
					},
				},
			},
			// Transition back to 'idle' after reset
			backToStart: {
				after: {
					100: 'idle',
				},
				entry: 'resetRobot',
			},
			// Show success message
			success: {
				after: {
					300: 'idle',
				},
				type: 'final',
			},
		},
	},
	{
		actions: {
			moveForward: assign({
				// Move the robot forward depending on the direction it's facing
				// y: (context) => {
				// 	if (context.direction === 'N: NORTH') {
				// 		return context.y - 1;
				// 	} else if (context.direction === 'S: SOUTH') {
				// 		return context.y + 1;
				// 	} else {
				// 		return context.y;
				// 	}
				// },
				// x: (context) => {
				// 	if (context.direction === 'Ö: EAST') {
				// 		return context.x + 1;
				// 	} else if (context.direction === 'V: WEST') {
				// 		return context.x - 1;
				// 	} else {
				// 		return context.x;
				// 	}
				// },
				y: (context) => {
					if (context.direction === 'N: NORTH') {
						return Math.min(context.gridHeight, context.y - 1);
					} else if (context.direction === 'S: SOUTH') {
						return Math.max(0, context.y + 1);
					} else {
						return context.y;
					}
				},
				x: (context) => {
					if (context.direction === 'Ö: EAST') {
						return Math.min(context.gridWidth, context.x + 1);
					} else if (context.direction === 'V: WEST') {
						return Math.max(0, context.x - 1);
					} else {
						return context.x;
					}
				},
			}),

			// Rotate the robot to the right but don't change the position. Await the next move "forward"
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
			}),

			// Rotate the robot to the left but don't change the position. Await the next move forward
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
			}),

			// Reset the robot to initial position
			resetRobot: assign({
				x: 1,
				y: 2,
				direction: 'N: NORTH',
				directionRotate: 0,
				showSuccess: false,
			}),

			finish: assign({
				showSuccess: true,
			}),
		},
		// Handle the state (move) transition and update x/y
		// Set delay so it doesn't overlap with move/ animations
		services: {
			moving: (context, event) => {
				return new Promise((resolve, reject) => {
					console.log('move', context, event);
					setTimeout(() => {
						resolve({
							x: context.x,
							y: context.y,
						});
					}, 100);
				});
			},
			// Handle the state (turn) transition and update x/y
			// Set delay so it doesn't overlap with move/ animations
			turning: (context, event) => {
				return new Promise((resolve, reject) => {
					console.log('turn', context, event);
					setTimeout(() => {
						resolve({
							x: context.x,
							y: context.y,
						});
					}, 100);
				});
			},
			// Handle the state (reset) transition and update x/y
			// Set delay so it doesn't overlap with move/ animations
			reset: (context, event) => {
				return new Promise((resolve, reject) => {
					console.log('reset', context, event);
					setTimeout(() => {
						resolve({
							x: context.x,
							y: context.y,
						});
					}, 100);
				});
			},
		},
	}
);
