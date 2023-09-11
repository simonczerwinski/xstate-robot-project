import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMachine } from '@xstate/react';
import { robotMachine } from '../../state-machines/robot.machine';
import Button from '../Button';
import { Play } from 'react-feather';
import { RotateCcw } from 'react-feather';
import CommandSave from '../CommandSave';
import { useDebounce } from '../../hooks/useDebounce';

type Props = {
	roomType?: string;
	gridWidth?: number;
	gridHeight?: number;
	startPositionX?: number;
	startPositionY?: number;
	robotOnReset?: boolean;
	renderRobotPropsFromRobotContextValues?: any;
	renderHistoryLogs?: () => void;
};

const CommandInput: React.FC<Props> = ({
	roomType,
	robotOnReset,
	gridWidth,
	gridHeight,
	startPositionX,
	startPositionY,
	renderRobotPropsFromRobotContextValues,
	renderHistoryLogs,
}) => {
	const [robotState, sendRobot] = useMachine(() =>
		robotMachine(gridWidth, gridHeight, startPositionX, startPositionY)
	);
	const [inputValue, setInputValue] = useState('');
	const [showError, setShowError] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const debouncedValue = useDebounce(inputValue, 500);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value || '';
		setInputValue(inputValue);
	};

	const handleSubmit = () => {
		if (inputValue !== '') {
			handleCommands();
		}
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
		setShowError(false);
		setShowSuccess(false);

		// Regex test and check if input value contains valid commands [G, H, V, F, R, L]
		if (/^[GHVFRL]+$/.test(inputValue.toUpperCase())) {
			setShowSuccess(true);
		}

		const getCommands = inputValue?.toLocaleUpperCase().split('');

		if (getCommands && getCommands.length > 0) {
			for (const command of getCommands) {
				if (commandMapper[command]) {
					sendRobot(commandMapper[command]);
					// Delay sending commands for smoother animation
					await new Promise((resolve) => setTimeout(resolve, 500));
				} else {
					console.error(`Bad command: ${command}`);
					sendRobot('ERROR');
					setShowError(true);
					break;
				}
			}
			sendRobot('FINISH');
		} else {
			sendRobot('RESET');
		}
	};

	const handleReset = () => {
		sendRobot('RESET');
		setInputValue('');
		setShowError(false);
		setShowSuccess(false);
	};

	useEffect(() => {
		renderRobotPropsFromRobotContextValues(robotState.context);
	}, [
		inputValue,
		debouncedValue,
		sendRobot,
		handleCommands,
		renderRobotPropsFromRobotContextValues,
	]);
	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-items-center mt-4">
				<input
					id={'commandInput-' + roomType}
					className={clsx(
						'h-10 mr-2 p-2 border-2 font-normal rounded bg-black text-white',
						{
							' border-red-800': showError,
							' border-green-800': showSuccess,
							'border-teal-950': !showError && !showSuccess,
						}
					)}
					placeholder="Enter: G, H, V, F, R, L"
					onChange={handleInputChange}
					value={inputValue}
				/>
				<Button
					id={'commandSubmit-' + roomType}
					className="font-bold py-2 px-4 rounded mb-10 mr-2 border-2 border-white"
					type="button"
					onClick={handleSubmit}
					colors={{
						background: 'bg-transparent',
						text: 'white',
						hoverBackground: 'teal-600',
					}}
					title="Submit command"
				>
					<Play color="white" size={20} />
				</Button>
				<Button
					className="font-bold py-2 px-4 rounded mb-10 border-2 border-gray-600"
					type="button"
					colors={{
						background: 'bg-transparent',
						text: 'white',
						hoverBackground: 'gray-300',
					}}
					onClick={handleReset}
					title="Reset robot"
				>
					{robotOnReset ? (
						<SkeletonTheme baseColor="#0b255b" highlightColor="#0d2d6c">
							<Skeleton circle width={20} height={20} />
						</SkeletonTheme>
					) : (
						<RotateCcw color="gray" size={20} />
					)}
				</Button>
			</div>

			{robotState.context.showSuccess && (
				<CommandSave
					storeRoomType={roomType}
					storeCommandInput={inputValue}
					updateHistoryLogs={renderHistoryLogs}
				/>
			)}
		</div>
	);
};

export default CommandInput;
