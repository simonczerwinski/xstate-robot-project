import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMachine } from '@xstate/react';
import { commandMachine } from '../../state-machines/command.machine';
import { robotMachine } from '../../state-machines/robot.machine';
import Button from '../Button';
import Text from '../Text';

type Props = {
	onSubmit: (value: string) => void;
	onReset: () => void;
	className?: string;
};

const CommandInput: React.FC<Props> = ({ onSubmit, onReset }) => {
	const [commandState, sendCommand] = useMachine(commandMachine);
	const [robotState, sendRobot] = useMachine(robotMachine);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value || '';
		setInputValue(inputValue);
	};

	const handleSubmit = () => {
		if (inputValue !== '') {
			sendCommand({ type: 'SUBMIT', value: inputValue });
			onSubmit(inputValue);
		}
	};

	const handleReset = () => {
		if (inputValue !== '') {
			sendCommand('RESET');
			setInputValue('');
			onReset();
		}
	};
	useEffect(() => {
		setTimeout(() => {
			sendCommand('LOAD');
		}, 500);
	}, [sendCommand, sendRobot]);

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-row justify-items-center mt-4">
				<input
					className={clsx('h-10 mr-2 p-2 font-normal rounded', {
						'border-2 border-red-500': commandState.context.showError,
						'border-2 border-green-500': commandState.context.showSuccess,
					})}
					placeholder="eg: VGHGV"
					onChange={handleInputChange}
					value={inputValue}
				/>
				<Button
					className="font-bold py-2 px-4 rounded mb-10 mr-2"
					type="button"
					onClick={handleSubmit}
					colors={{
						background: 'blue-900',
						text: 'white',
						hoverBackground: 'blue-600',
						hoverText: 'blue-100',
					}}
				>
					<Text text="Submit" as="span" className="text-m font-medium" />
				</Button>
				<Button
					className="font-bold py-2 px-4 rounded mb-10"
					type="button"
					colors={{
						background: 'blue-900',
						text: 'white',
						hoverBackground: 'blue-600',
						hoverText: 'blue-100',
					}}
					onClick={handleReset}
				>
					{robotState.matches('resetting') ? (
						<SkeletonTheme baseColor="#0b255b" highlightColor="#0d2d6c">
							<Skeleton circle width={20} height={20} />
						</SkeletonTheme>
					) : (
						<Text text="Retry" as="span" className="text-m font-medium" />
					)}
				</Button>
			</div>
		</div>
	);
};

export default CommandInput;
