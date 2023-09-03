import React, { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useMachine } from '@xstate/react';
import { commandMachine } from './state-machines/command.machine';
import { robotMachine } from './state-machines/robot.machine';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Container from './component/Container/Container';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';
import Button from './component/Button/Button';
import Footer from './component/Footer/Footer';
import Input from './component/Input/Input';

interface Props {
	roomType?: string;
}

const App: React.FC<Props> = ({ roomType = 'Square' }) => {
	const [commandState, sendCommand] = useMachine(commandMachine);
	const [robotState, sendRobot] = useMachine(robotMachine);
	const [value, setValue] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value || '';
		setValue(inputValue);
	};
	const handleReset = () => {
		if (value !== '') {
			sendCommand('RESET');
			setValue('');
		}
	};
	console.log('robotState', robotState.value);
	useEffect(() => {
		setTimeout(() => {
			sendCommand('LOAD');
		}, 500);
	}, [sendCommand, sendRobot]);

	return (
		<MasterLayout>
			<header className="bg-black relative flex flex-wrap items-center justify-between p-8 lg:justify-center xl:px-0">
				{/* <img src={logo} alt="Logo" className="w-10 h-10 mr-4" /> */}

				<Button
					className="py-2 px-4 rounded border"
					colors={{
						background: 'transparent',
						text: 'white',
						hoverBackground: 'gray-100',
						hoverText: 'black',
					}}
				>
					<Text text="History" as="span" className="text-m font-medium" />
				</Button>
			</header>
			<main className="flex flex-col w-full justify-center items-center">
				<input type="text" placeholder="Enter your name" />
				<Text
					text="Welcome to my Robot Project"
					as="h1"
					className="text-2xl font-bold text-white"
				/>

				<div className="flex flex-col items-center justify-center pb-8">
					<div className="py-4 flex items-center m-10">
						<Text
							text="Please choose a room layout"
							as="h1"
							className="text-white font-medium font-semibold mb-4"
						/>
					</div>
					<div className="flex flex-row w-full justify-between">
						<Button
							className="w-20 h-20 font-bold py-2 px-4 rounded mb-2"
							colors={{
								background: 'blue-900',
								text: 'white',
								hoverBackground: 'blue-600',
								hoverText: 'blue-100',
							}}
						>
							<Text text="Square" as="span" className="text-m font-medium " />
						</Button>
						<Button
							className="w-20 h-20 font-bold py-2 px-4 rounded-full"
							colors={{
								background: 'blue-900',
								text: 'white',
								hoverBackground: 'blue-600',
								hoverText: 'blue-100',
							}}
						>
							<Text text="Circle" as="span" className="text-m font-medium" />
						</Button>
					</div>
				</div>
				<div className="flex flex-row items-center">
					<form
						className="flex flex-col items-center"
						onSubmit={(e) => {
							e.preventDefault();
							sendCommand({ type: 'SUBMIT', value: value });
						}}
					>
						<label className="text-white font-medium font-semibold mb-2">
							<Text text="Enter your command" as="span" />
						</label>
						<div className="flex flex-row justify-items-center">
							<input
								className={clsx('h-10 mr-2 p-2 font-normal rounded', {
									'border-2 border-red-500': commandState.context.showError,
									'border-2 border-green-500': commandState.context.showSuccess,
								})}
								placeholder="eg: VGHGV"
								onChange={handleChange}
								value={value}
							/>

							<Button
								className="font-bold py-2 px-4 rounded mb-10 mr-2"
								type="submit"
								colors={{
									background: 'blue-900',
									text: 'white',
									hoverBackground: 'blue-600',
									hoverText: 'blue-100',
								}}
							>
								{commandState.matches('loading') ? (
									<SkeletonTheme baseColor="#0b255b" highlightColor="#0d2d6c">
										<Skeleton circle width={20} height={20} />
									</SkeletonTheme>
								) : (
									<Text
										text="Submit"
										as="span"
										className="text-m font-medium"
									/>
								)}
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
								onClick={() => {
									console.log('reset');
									handleReset();
								}}
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
					</form>
				</div>
				{/* <div className="flex flex-row items-center pb-10">
					{state.context.showSuccess && (
						<Text
							text="Success"
							as="span"
							className="text-m font-medium text-white"
						/>
					)}
					{state.context.showError && (
						<Text
							text="Error"
							as="span"
							className="text-m font-medium text-white"
						/>
					)}
				</div> */}
				<Container
					className={'p-8 flex'}
					room={roomType}
					inputValue={commandState.context.inputValue || ''}
					successMessage={commandState.context.showSuccess}
					errorMessage={commandState.context.showError}
				/>
			</main>
			<Footer />
		</MasterLayout>
	);
};

export default App;
