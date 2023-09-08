import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { robotMachine } from '../../state-machines/robot.machine';
import Robot from '../Robot/Robot';
import clsx from 'clsx';
import CommandInput from '../CommandInput';
import CommandSave from '../CommandSave';

type Props = {
	SquareRoomResponse?: string;
	children?: React.ReactNode;
};

const room = 'Square';
const gridWidth = 5;
const gridHeight = 5;
const gridSize = 400;
const cellSize = gridSize / (gridWidth + gridHeight);

const Wall: React.FC<Props> = ({ children }) => {
	return (
		<div
			className={clsx(
				'relative flex justify-center items-center w-64 h-64 border-2 border-gray-100 rounded bg-black'
			)}
		>
			{children}
		</div>
	);
};

const SquareRoom: React.FC<Props> = ({ SquareRoomResponse }) => {
	const [robotState, sendRobot] = useMachine(robotMachine);
	const [inputValue, setInputValue] = useState('');
	const [prevInputValue, setPrevInputValue] = useState('');

	const handleSubmit = (value: string) => {
		if (prevInputValue !== inputValue) {
			sendRobot('RESET');
			setInputValue('');
		} else {
			setInputValue(value);
		}
	};

	const handleReset = () => {
		sendRobot('RESET');
		setInputValue('');
		setPrevInputValue('');
	};
	const handleSave = (name: string) => {
		// Handle saving the name input here
		console.log('Saving:', name);
	};
	const getCommands = inputValue?.toLocaleUpperCase().split('');

	useEffect(() => {
		const handleCommands = async () => {
			const commandMapper = {
				G: 'MOVE_FORWARD',
				H: 'TURN_RIGHT',
				V: 'TURN_LEFT',
				F: 'MOVE_FORWARD',
				R: 'TURN_RIGHT',
				L: 'TURN_LEFT',
			};
			if (getCommands && getCommands.length > 0) {
				for (const command of getCommands) {
					if (commandMapper[command]) {
						sendRobot(commandMapper[command]);
						// Delay movement for smoother animation
						await new Promise((resolve) => setTimeout(resolve, 500));
					} else {
						console.error(`Bad command: ${command}`);
					}
				}
				setPrevInputValue(inputValue);
				sendRobot('FINISH');
			} else {
				sendRobot('RESET');
			}
		};

		handleCommands();
	}, [inputValue, sendRobot]);

	const { x, y, direction, directionRotate } = robotState.context;

	return (
		<div className="flex flex-col justify-center items-center relative bg-black bg-opacity-30 rounded-md p-8">
			<Wall>
				<div className="w-[200px] h-[200px] flex justify-center items-center z-0">
					<div className="relative flex flex-col w-full h-full">
						<div
							id="squareroom"
							className={clsx('w-full h-full bg-black text-white rounded')}
						>
							<Robot
								id="robot"
								x={x}
								y={y}
								directionText={direction}
								directionRotate={directionRotate}
								finished={robotState.context.showSuccess}
								animation={{
									top: `${y * cellSize}px`,
									left: `${x * cellSize}px`,
									transform: `translate(-50%, -50%)`,
									transition: 'all 0.3s linear',
								}}
							/>
						</div>
					</div>
				</div>
			</Wall>
			<div className="flex flex-col">
				<CommandInput onSubmit={handleSubmit} onReset={handleReset} />
				{robotState.context.showSuccess && (
					<CommandSave
						onSave={handleSave}
						storeRoomType={room}
						storeCommandInput={inputValue}
					/>
				)}
			</div>
		</div>
	);
};

export default SquareRoom;
