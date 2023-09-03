import { createMachine, assign } from 'xstate';

// Define the context interface
interface RobotContext {
	x: number;
	y: number;
	direction: string;
	completedMoves: number;
	totalMoves: number;
	showSuccess: boolean;
}

// // Define the events and their types
// type RobotEvents =
// 	| { type: 'MOVE_FORWARD' }
// 	| { type: 'TURN_RIGHT' }
// 	| { type: 'TURN_LEFT' }
// 	| { type: 'RESET' };

// // Define the actions interface
// interface RobotActions  {
// 	moveForward: () => void;
// 	turnRight: () => void;
// 	turnLeft: () => void;
// 	resetRobot: () => void;
// 	finish: () => void;
// 	incrementCompletedMoves: () => void;
// }
export const robotMachine = createMachine<RobotContext>(
	{
		id: 'robotMachine',
		initial: 'init',
		context: {
			x: 0,
			y: 0,
			direction: '',
			completedMoves: 0,
			totalMoves: 0,
			showSuccess: false,
		},
		states: {
			init: {
				entry: assign({
					x: 25,
					y: 40,
					direction: 'S: SOUTH',
					completedMoves: 0,
					totalMoves: 0,
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
						target: 'move',
						actions: 'turnRight',
					},
					TURN_LEFT: {
						target: 'move',
						actions: 'turnLeft',
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
					onDone: [
						{
							target: 'checkMoves',
							actions: ['incrementCompletedMoves', 'checkAllMovesCompleted'],
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
			// Reset the robot to initial position
			resetting: {
				invoke: {
					src: 'reset',
					onDone: [
						{
							target: 'backToInit',
							actions: ['incrementCompletedMoves', 'checkAllMovesCompleted'],
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
			// Await when checking if all moves are completed
			checkMoves: {
				always: [
					{
						target: 'success',
						cond: 'checkAllMovesCompleted',
					},
					// Target success if all moves are completed
					{
						target: 'idle',
					},
				],
			},
			backToInit: {
				after: {
					100: 'idle',
				},
				entry: 'resetRobot',
			},
			// Show success message
			success: {
				after: {
					100: 'idle',
				},
				entry: 'finish',
			},
		},
	},
	{
		// Handle robot movement and show direction
		actions: {
			moveForward: assign({
				y: (context) => context.y - 10,
				direction: 'N: NORTH',
				totalMoves: (context) => context.totalMoves + 1,
			}),
			turnRight: assign({
				x: (context) => context.x + 10,
				direction: 'Ö: EAST',
				totalMoves: (context) => context.totalMoves + 1,
			}),
			turnLeft: assign({
				x: (context) => context.x - 10,
				direction: 'V: WEST',
				totalMoves: (context) => context.totalMoves + 1,
			}),
			resetRobot: assign({
				x: 25,
				y: 40,
				direction: 'S: SOUTH',
				completedMoves: 0,
				totalMoves: 0,
				showSuccess: false,
			}),
			finish: assign({
				showSuccess: true,
			}),
			incrementCompletedMoves: assign({
				completedMoves: (context) => context.completedMoves + 1,
			}),
		},
		// Handle the state (move) transition and update next move with delay of 100ms
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
			reset: (context, event) => {
				return new Promise((resolve, reject) => {
					console.log('reset', context, event);
					setTimeout(() => {
						resolve({
							x: context.x,
							y: context.y,
						});
					}, 200);
				});
			},
		},

		// Condition: Check if all moves are completed
		guards: {
			checkAllMovesCompleted: (context) => {
				return context.completedMoves === context.totalMoves;
			},
		},
	}
);
