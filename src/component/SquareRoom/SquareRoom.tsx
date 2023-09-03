import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { robotMachine } from '../../state-machines/robot.machine';
import Text from '../Text/Text';
import Robot from '../Robot/Robot';

interface Props {
	input?: string;
}

const gridWidth = 5;
const gridHeight = 5;
const gridSize = 320;
const cellSize = gridSize / gridWidth;

const SquareRoom: React.FC<Props> = ({ input }) => {
	const [robotState, sendRobot] = useMachine(robotMachine);
	const getCommands = input?.toLocaleUpperCase().split('');
	const x = robotState.context.x;
	const y = robotState.context.y;
	console.log('x', x);
	console.log('y', y);
	const direction = robotState.context.direction;

	useEffect(() => {
		const handleCommands = async () => {
			console.log('getCommands', getCommands);
			if (getCommands && getCommands.length > 0) {
				for (const command of getCommands) {
					if (['G', 'H', 'V'].includes(command)) {
						switch (command) {
							case 'G':
								// forward
								console.log('MOVE_FORWARD');
								sendRobot('MOVE_FORWARD');
								break;
							case 'H':
								// right
								console.log('TURN_RIGHT');
								sendRobot('TURN_RIGHT');
								break;
							case 'V':
								// left
								console.log('TURN_LEFT');
								sendRobot('TURN_LEFT');
								break;
							default:
								break;
						}
						// Delay movement for smoother animation
						await new Promise((resolve) => setTimeout(resolve, 500));
					} else {
						console.error(`Bad command: ${command}`);
					}
				}
			} else {
				sendRobot({ type: 'RESET' });
			}
		};

		handleCommands();
	}, [input, sendRobot]);

	// Calculate x and y positions based on the robot's current position
	const xPosition = Math.max(0, Math.min(gridWidth - 1, x / 10));
	const yPosition = Math.max(0, Math.min(gridHeight - 1, y / 10));

	return (
		<div className="w-80 h-80 flex justify-center items-center">
			<div className="relative flex flex-col w-full h-full transition-all">
				<div
					id="squareroom"
					className="w-full h-full bg-black text-white border-2 border-gray-100 shadow-lg rounded"
				>
					<div>
						<div className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
							<Text text="North" as="span" className="text-xl font-normal" />
						</div>
						<div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
							<Text text="South" as="span" className="text-xl font-normal" />
						</div>
						<div className="absolute left-[-4rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
							<Text text="West" as="span" className="text-xl font-normal" />
						</div>
						<div className="absolute right-[-4rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
							<Text text="East" as="span" className="text-xl font-normal" />
						</div>
					</div>
					<Robot
						x={x}
						y={y}
						direction={direction}
						animation={{
							top: `${yPosition * cellSize}px`,
							left: `${xPosition * cellSize}px`,
							transform: `translate(-50%, -50%)`,
							transition: 'all 0.3s linear',
						}}
					/>
				</div>
				{robotState.context.showSuccess && (
					<div className="absolute bottom-2 left-2 text-white text-lg">
						{xPosition},{yPosition},{direction}
					</div>
				)}
			</div>
		</div>
	);
};

export default SquareRoom;
