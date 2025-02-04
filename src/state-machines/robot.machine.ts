import { createMachine, assign } from 'xstate';
interface RobotContext {
	x: number;
	y: number;
	direction: number;
	gridWidth: number;
	gridHeight: number;
	getDirection: string;
	rotateRight: number;
	rotateLeft: number;
	showSuccess: boolean;
	showError: boolean;
}
export const robotMachine = (
	gridWidthValue?: number,
	gridHeightValue?: number,
	startPositionX?: number,
	startPositionY?: number
) =>
	createMachine<RobotContext>(
		{
			id: 'robotMachine',
			initial: 'init',
			predictableActionArguments: true,
			context: {
				x: 0,
				y: 0,
				direction: 0,
				getDirection: 'N',
				rotateRight: 0,
				rotateLeft: 0,
				gridWidth: gridWidthValue || 0,
				gridHeight: gridHeightValue || 0,
				showSuccess: false,
				showError: false,
			},
			states: {
				// Set initial state and position of the robot
				init: {
					entry: assign({
						x: startPositionX,
						y: startPositionY,
					}),
					after: {
						100: 'idle',
					},
				},
				// Set transition states for robot movement
				idle: {
					on: {
						MOVE_FORWARD: {
							actions: [
								'moveForward',
								'getDirection',
								'setRotateRight',
								'setRotateLeft',
							],
						},
						TURN_RIGHT: {
							actions: ['turnRight', 'getDirection', 'setRotateRight'],
						},
						TURN_LEFT: {
							actions: ['turnLeft', 'getDirection', 'setRotateLeft'],
						},
						FINISH: {
							target: 'success',
							actions: 'finish',
						},
						ERROR: {
							target: 'error',
							actions: 'setError',
						},
						RESET: {
							target: 'resetting',
						},
					},
				},
				// Reset the robot to initial position
				resetting: {
					after: {
						200: 'init',
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
				error: {
					after: {
						300: 'idle',
					},
				},
			},
		},
		{
			actions: {
				// Move the robot forward depending on the value context.direction gets from the TURN_RIGHT and TURN_LEFT actions
				moveForward: assign({
					y: (context) => {
						switch (context.direction) {
							case 0: // Return NORTH and ensure the new y position doesn't go below 0 to stay within the grid
								return Math.max(context.y - 1, 0);
							case 2: // Return SOUTH and ensure that the new y position doesn't exceed the grid height by decrementing the grid height by 1
								return Math.min(context.y + 1, context.gridHeight - 1);
							default:
								return context.y;
						}
					},
					x: (context) => {
						switch (context.direction) {
							case 1: // Return EAST and ensure that the new x position doesn't exceed the grid width by decrementing the grid width by 1
								return Math.min(context.x + 1, context.gridWidth - 1);
							case 3: // Return WEST and ensure the new x position doesn't go below 0 to stay within the grid
								return Math.max(context.x - 1, 0);
							default:
								return context.x;
						}
					},
					showSuccess: false,
					showError: false,
				}),
				// Move the robot to the right by increment y/x.
				turnRight: assign({
					direction: (context) => {
						context.direction++;
						if (context.direction > 3) {
							context.direction = 0;
						}
						return context.direction;
					},
					showSuccess: false,
					showError: false,
				}),
				// Move the robot to the right by decrement y/x
				turnLeft: assign({
					direction: (context) => {
						context.direction--;
						if (context.direction < 0) {
							context.direction = 3;
						}
						return context.direction;
					},
					showSuccess: false,
					showError: false,
				}),
				// Get the direction of the robot by checking the value of context.direction
				getDirection: assign({
					getDirection: (context) => {
						switch (context.direction) {
							case 0:
								return (context.getDirection = 'N');
							case 1:
								return (context.getDirection = 'Ö');
							case 2:
								return (context.getDirection = 'S');
							case 3:
								return (context.getDirection = 'V');
							default:
								return (context.getDirection = 'N');
						}
					},
				}),
				// Animate the robot by rotating it to the right
				rotateRight: assign({
					rotateRight: (context) => {
						switch (context.direction) {
							case 0:
								return (context.rotateRight = 0);
							case 1:
								return (context.rotateRight = 90);
							case 2:
								return (context.rotateRight = 180);
							case 3:
								return (context.rotateRight = 270);
							default:
								return (context.rotateRight = 0);
						}
					},
				}),
				// Animate the robot by rotating it to the left
				setRotateLeft: assign({
					rotateLeft: (context) => {
						switch (context.direction) {
							case 0:
								return (context.rotateLeft = 0);
							case 1:
								return (context.rotateLeft = -90);
							case 2:
								return (context.rotateLeft = -180);
							case 3:
								return (context.rotateLeft = -270);
							default:
								return (context.rotateLeft = 0);
						}
					},
				}),
				//	Reset the robot to initial position
				resetRobot: assign({
					x: startPositionX,
					y: startPositionY,
					getDirection: 'N',
					direction: 0,
					rotateRight: 0,
					rotateLeft: 0,
					showSuccess: false,
					showError: false,
				}),
				finish: assign({
					showSuccess: true,
					showError: false,
				}),
				setError: assign({
					showError: true,
					showSuccess: false,
				}),
			},
		}
	);
