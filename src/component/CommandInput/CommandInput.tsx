import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMachine } from '@xstate/react';
import { commandMachine } from '../../state-machines/command.machine';
import { robotMachine } from '../../state-machines/robot.machine';
import Button from '../Button';
import { Play } from 'react-feather';
import { RotateCcw } from 'react-feather';
import CommandSave from '../CommandSave';

type Props = {
	roomType?: string;
	gridWidth?: number;
	gridHeight?: number;
	startPositionX?: number;
	startPositionY?: number;
	robotOnReset?: boolean;
	renderRobotAnimationFromRobotContext?: any;
};

const CommandInput: React.FC<Props> = ({
	roomType,
	robotOnReset,
	gridWidth,
	gridHeight,
	startPositionX,
	startPositionY,
	renderRobotAnimationFromRobotContext,
}) => {
	const [commandState, sendCommand] = useMachine(commandMachine);
	const [robotState, sendRobot] = useMachine(() =>
		robotMachine(gridWidth, gridHeight, startPositionX, startPositionY)
	);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value || '';
		console.log(inputValue);
		setInputValue(inputValue);
	};
	const handleSubmit = () => {
		if (commandState.matches('idle')) {
			sendCommand({ type: 'SUBMIT', inputValue });
		} else {
			console.error('Cannot submit while the commandMachine is not idle');
		}
		handleCommands();
	};

	const handleReset = () => {
		sendCommand('RESET');
		sendRobot('RESET');
		setInputValue('');
	};

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

	useEffect(() => {
		renderRobotAnimationFromRobotContext(robotState.context);
	}, [robotState.context, renderRobotAnimationFromRobotContext]);

	useEffect(() => {
		setTimeout(() => {
			sendCommand('LOAD');
		}, 100);
	}, [sendCommand, sendRobot, handleCommands]);

	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-items-center mt-4">
				<input
					className={clsx(
						'h-10 mr-2 p-2 border-2 font-normal rounded bg-slate-900 text-white',
						{
							' border-red-500': commandState.context.showError,
							' border-green-500': commandState.context.showSuccess,
						}
					)}
					placeholder="eg: VGHGV"
					onChange={handleInputChange}
					value={inputValue}
				/>
				<Button
					className="font-bold py-2 px-4 rounded mb-10 mr-2 border-2 border-green-900"
					type="button"
					onClick={handleSubmit}
					colors={{
						background: 'bg-transparent',
						text: 'white',
						hoverBackground: 'green-800',
						hoverText: 'white',
					}}
					title="Submit command"
				>
					<Play color="white" size={20} />
				</Button>
				<Button
					className="font-bold py-2 px-4 rounded mb-10 border-2 border-blue-900"
					type="button"
					colors={{
						background: 'bg-transparent',
						text: 'white',
						hoverBackground: 'blue-800',
						hoverText: 'blue-100',
					}}
					onClick={handleReset}
					title="Reset robot"
				>
					{robotOnReset ? (
						<SkeletonTheme baseColor="#0b255b" highlightColor="#0d2d6c">
							<Skeleton circle width={20} height={20} />
						</SkeletonTheme>
					) : (
						<RotateCcw color="white" size={20} />
					)}
				</Button>
			</div>

			{commandState.context.showSuccess && robotState.context.showSuccess && (
				<CommandSave storeRoomType={roomType} storeCommandInput={inputValue} />
			)}
		</div>
	);
};

export default CommandInput;
