import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMachine } from '@xstate/react';
import { commandMachine } from '../../state-machines/command.machine';
import Button from '../Button';
import { Play } from 'react-feather';
import { RotateCcw } from 'react-feather';

type Props = {
	onSubmit: (value: string) => void;
	onReset: () => void;
	className?: string;
	robotOnReset?: boolean;
};

const CommandInput: React.FC<Props> = ({ onSubmit, onReset, robotOnReset }) => {
	const [commandState, sendCommand] = useMachine(commandMachine);
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
			sendCommand({ type: 'RESET' });
			setInputValue('');
			onReset();
		}
	};
	useEffect(() => {
		setTimeout(() => {
			sendCommand('LOAD');
		}, 500);
	}, [sendCommand]);
	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-items-center  mt-4">
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
		</div>
	);
};

export default CommandInput;
