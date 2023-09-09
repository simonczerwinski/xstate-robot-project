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
}
export const robotMachine = (
	gridWidthValue: number,
	gridHeightValue: number,
	startPositionX: number,
	startPositionY: number
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
				getDirection: '',
				rotateRight: 0,
				rotateLeft: 0,
				gridWidth: gridWidthValue,
				gridHeight: gridHeightValue,
				showSuccess: false,
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
				// Set tranistion states for robot movement
				idle: {
					on: {
						MOVE_FORWARD: {
							actions: [
								'moveForward',
								'getDirection',
								'rotateRight',
								'rotateLeft',
							],
						},
						TURN_RIGHT: {
							actions: 'turnRight',
						},
						TURN_LEFT: {
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
			},
		},
		{
			actions: {
				// Move the robot forward depending on the value context.direction gets from the TURN_RIGHT and TURN_LEFT actions
				moveForward: assign({
					y: (context) => {
						switch (context.direction) {
							case 0: // Return NORTH
								return context.y - 1;
							case 2: // Return SOUTH
								return context.y + 1;
							default:
								return context.y; // No change for EAST or WEST
						}
					},
					x: (context) => {
						switch (context.direction) {
							case 1: // Return EAST
								return context.x + 1;
							case 3: // Return WEST
								return context.x - 1;
							default:
								return context.x; // No change for NORTH or SOUTH
						}
					},
					showSuccess: false,
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
				}),
				// Get the direction of the robot by checking the value of context.direction
				getDirection: assign({
					getDirection: (context) => {
						console.log(context.direction);
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
				rotateLeft: assign({
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
					getDirection: 'N: NORTH',
					direction: 0,
					rotateRight: 0,
					rotateLeft: 0,
					showSuccess: false,
				}),
				finish: assign({
					showSuccess: true,
				}),
			},
		}
	);
