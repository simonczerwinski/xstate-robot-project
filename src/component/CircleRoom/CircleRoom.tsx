import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { robotMachine } from '../../state-machines/robot.machine';
import Robot from '../Robot/Robot';
import clsx from 'clsx';
import CommandInput from '../CommandInput';
import CommandSave from '../CommandSave';

type Props = {
	children?: React.ReactNode;
};

const room = 'Circle';
const startPositionX = 0;
const startPositionY = 0;
const gridWidth = 10;
const gridHeight = 10;
const gridSize = 400;
const cellSize = gridSize / (gridWidth + gridHeight);

const Wall: React.FC<Props> = ({ children }) => {
	return (
		<div
			className={clsx(
				'relative flex justify-center items-center w-64 h-64 border-2 border-gray-100 bg-black rounded-full'
			)}
		>
			{children}
		</div>
	);
};

const CircleRoom: React.FC<Props> = () => {
	const [robotState, sendRobot] = useMachine(() =>
		robotMachine(gridWidth, gridHeight, startPositionX, startPositionY)
	);
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (value: string) => {
		setInputValue(value);
	};

	const handleReset = () => {
		sendRobot('RESET');
		setInputValue('');
	};

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
			const getCommands = inputValue?.toLocaleUpperCase().split('');
			if (getCommands && getCommands.length > 0) {
				for (const command of getCommands) {
					if (commandMapper[command]) {
						sendRobot(commandMapper[command]);
						// Delay sending commands for smoother animation
						await new Promise((resolve) => setTimeout(resolve, 500));
					} else {
						console.error(`Bad command: ${command}`);
					}
				}
				sendRobot('FINISH');
			} else {
				sendRobot('RESET');
			}
		};

		handleCommands();
	}, [inputValue, sendRobot]);

	const { x, y, getDirection, rotateLeft, rotateRight } = robotState.context;

	return (
		<div className="flex flex-col justify-center items-center relative bg-black bg-opacity-30 rounded-md p-8">
			<Wall>
				<div className="w-[200px] h-[200px] flex justify-center items-center z-0">
					<div className="relative flex flex-col w-full h-full">
						<Robot
							id="robot"
							x={x}
							y={y}
							direction={getDirection}
							turnRight={rotateLeft}
							turnLeft={rotateRight}
							finished={robotState.context.showSuccess}
							animation={{
								top: `${y * cellSize}px`,
								left: `${x * cellSize}px`,
								transform: `translate(200%, 200%)`,
								transition: 'all 0.3s linear',
							}}
						/>
					</div>
				</div>
			</Wall>
			<div className="flex flex-col">
				<CommandInput
					onSubmit={handleSubmit}
					onReset={handleReset}
					robotOnReset={robotState.matches('resetting')}
				/>
				{robotState.context.showSuccess && (
					<CommandSave storeRoomType={room} storeCommandInput={inputValue} />
				)}
			</div>
		</div>
	);
};

export default CircleRoom;
