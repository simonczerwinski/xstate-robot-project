import { createMachine, assign } from 'xstate';

export const robotMachine = (
	gridWidthValue: number,
	gridHeightValue: number,
	startPositionX: number,
	startPositionY: number
) =>
	createMachine(
		{
			id: 'robotMachine',
			initial: 'init',
			predictableActionArguments: true,
			context: {
				x: 0,
				y: 0,
				gridWidth: gridWidthValue,
				gridHeight: gridHeightValue,
				direction: '',
				directionRotate: 0,
				showSuccess: false,
			},
			states: {
				// Set initial state and position of the robot
				init: {
					entry: assign({
						x: startPositionX,
						y: startPositionY,
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
						500: 'init',
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
					// Move the robot forward depending on the value context.direction gets.
					// Move the robot in different directions by (decrement y/x) or (increment y/x).
					// Otherwise, keep the current y/x coordinate.
					y: (context) => {
						switch (context.direction) {
							case 'N: NORTH':
								return context.y - 1;
							case 'S: SOUTH':
								return context.y + 1;
							default:
								return context.y;
						}
					},
					x: (context) => {
						switch (context.direction) {
							case 'Ö: EAST':
								return context.x + 1;
							case 'V: WEST':
								return context.x - 1;
							default:
								return context.x;
						}
					},

					showSuccess: false,
				}),

				// Rotate the robot to the right but don't change the movement. Await the next move "forward" based on the direction
				turnRight: assign({
					directionRotate: (context) => {
						const rotation = (context.directionRotate += 90);
						return rotation;
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
						return rotation;
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
					direction: 'N: NORTH',
					directionRotate: 0,
					showSuccess: false,
				}),

				finish: assign({
					showSuccess: true,
				}),
			},
		}
	);
