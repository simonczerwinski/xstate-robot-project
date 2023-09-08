import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { robotMachine } from '../../state-machines/robot.machine';
import Text from '../Text/Text';
import Robot from '../Robot/Robot';
import clsx from 'clsx';
import style from './SquareRoom.module.css';
import CommandInput from '../CommandInput';

type Props = {
	SquareRoomResponse?: string;
	children?: React.ReactNode;
};

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
		<div>
			<Wall>
				<div className="w-[200px] h-[200px] flex justify-center items-center z-0">
					<div className="relative flex flex-col w-full h-full">
						<div
							id="squareroom"
							className={clsx('w-full h-full bg-black text-white rounded')}
						>
							{/* <div>
								<div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
									<Text
										text="North"
										as="span"
										className="text-xl font-normal"
									/>
								</div>
								<div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
									<Text
										text="South"
										as="span"
										className="text-xl font-normal"
									/>
								</div>
								<div className="absolute left-[-5rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
									<Text text="West" as="span" className="text-xl font-normal" />
								</div>
								<div className="absolute right-[-5rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
									<Text text="East" as="span" className="text-xl font-normal" />
								</div>
							</div> */}
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
						{robotState.context.showSuccess && (
							<div className="absolute bottom-2 left-2 text-white text-lg">
								{x},{y} {direction}
							</div>
						)}
					</div>
				</div>
			</Wall>

			<CommandInput onSubmit={handleSubmit} onReset={handleReset} />
		</div>
	);
};

export default SquareRoom;
