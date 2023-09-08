import React, { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { robotMachine } from '../../state-machines/robot.machine';
import Text from '../Text/Text';
import Robot from '../Robot/Robot';
import clsx from 'clsx';
import style from './SquareRoom.module.css';

type Props = {
	input?: string;
	children?: React.ReactNode;
};

const gridWidth = 5;
const gridHeight = 5;
const gridSize = 320;
const cellSize = gridSize / (gridWidth + gridHeight);

const Wall: React.FC<Props> = ({ children }) => {
	return (
		<div
			className={clsx(
				style['sr-shadows'],
				'relative flex justify-center items-center w-96 h-96 border-2 border-gray-100 rounded bg-black'
			)}
		>
			{children}
		</div>
	);
};

const SquareRoom: React.FC<Props> = ({ input }) => {
	const [robotState, sendRobot] = useMachine(robotMachine);
	const getCommands = input?.toLocaleUpperCase().split('');
	const { x, y, direction, directionRotate } = robotState.context;

	useEffect(() => {
		const handleCommands = async () => {
			if (getCommands && getCommands.length > 0) {
				for (const command of getCommands) {
					// Swedish commands
					if (['G', 'H', 'V'].includes(command)) {
						switch (command) {
							case 'G':
								sendRobot('MOVE_FORWARD');
								break;
							case 'H':
								sendRobot('TURN_RIGHT');
								break;
							case 'V':
								sendRobot('TURN_LEFT');
								break;
							default:
								break;
						}
						// Delay movement for smoother animation
						await new Promise((resolve) => setTimeout(resolve, 500));
					}
					// English commands
					else if (['F', 'R', 'L'].includes(command)) {
						switch (command) {
							case 'F':
								sendRobot('MOVE_FORWARD');
								break;
							case 'R':
								sendRobot('TURN_RIGHT');
								break;
							case 'L':
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
				sendRobot({ type: 'FINISH' });
			} else {
				sendRobot({ type: 'RESET' });
			}
		};

		handleCommands();
	}, [input, sendRobot]);

	return (
		<Wall>
			<div className="w-80 h-80 flex justify-center items-center z-0">
				<div className="relative flex flex-col w-full h-full">
					<div
						id="squareroom"
						className={clsx('w-full h-full bg-black text-white rounded')}
					>
						<div>
							<div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
								<Text text="North" as="span" className="text-xl font-normal" />
							</div>
							<div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
								<Text text="South" as="span" className="text-xl font-normal" />
							</div>
							<div className="absolute left-[-5rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
								<Text text="West" as="span" className="text-xl font-normal" />
							</div>
							<div className="absolute right-[-5rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
								<Text text="East" as="span" className="text-xl font-normal" />
							</div>
						</div>
						<Robot
							id="robot"
							direction={directionRotate}
							animation={{
								top: `${y * cellSize}px`,
								left: `${x * cellSize}px`,
								transform: `translate(-50%, -50%)`,
								transition: 'all 0.3s linear',
							}}
						/>
					</div>
					{robotState.context.showSuccess && (
						<div className="absolute bottom-2 left-2 text-white text-lg">
							{x},{y} {direction}
						</div>
					)}
				</div>
			</div>
		</Wall>
	);
};

export default SquareRoom;
