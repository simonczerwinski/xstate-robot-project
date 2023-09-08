import React, { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useMachine } from '@xstate/react';
import { commandMachine } from './state-machines/command.machine';
import { robotMachine } from './state-machines/robot.machine';
import { stepMachine } from './state-machines/step.machine';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Container from './component/Container/Container';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';
import Button from './component/Button/Button';
import Footer from './component/Footer/Footer';
import Step from './component/Step/Step';
import HistoryList from './component/HistoryList/HistoryList';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';

const App: React.FC = () => {
	const [commandState, sendCommand] = useMachine(commandMachine);
	const [stepState, sendStep] = useMachine(stepMachine);
	const [robotState, sendRobot] = useMachine(robotMachine);
	const [roomType, setRoomType] = useState('Square');

	const [value, setValue] = useState('');

	const handleRegisterName = (e) => {
		e.preventDefault();
		const name = e.target.value;
		console.log('name', name);
	};
	const handleRoomType = (e) => {
		const roomType = e.target.value || '';
		setRoomType(roomType);
	};
	const handleCommand = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value || '';
		setValue(inputValue);
	};
	const handleReset = () => {
		if (value !== '') {
			sendCommand('RESET');
			sendRobot({ type: 'RESET' });
			setValue('');
		}
	};
	const handleSave = () => {
		sendStep({ type: 'SUBMIT' });
		//save to db
	};

	const handleStepChange = (step: string) => {
		sendStep({ type: step === 'next' ? 'NEXT' : 'PREVIOUS' });
	};
	useEffect(() => {
		setTimeout(() => {
			sendCommand('LOAD');
		}, 500);
	}, [sendCommand, sendRobot]);

	// Example data
	const dataFromDb = [
		{
			name: 'Simon',
			room: 'Square',
			command: 'VGHGV',
			language: 'English',
			date: '2023-09-10',
		},
		{
			name: 'Simon 2',
			room: 'Circle',
			command: 'ABCD',
			language: 'Swedish',
			date: '2023-09-10',
		},
	];
	console.log(stepState.value);

	const renderSteps = () => {
		switch (stepState.value) {
			case 'language':
				return (
					<Step
						title="Choose a language"
						animationDirection={stepState.context.animationDirection}
						onNext={() => handleStepChange('next')}
					>
						<div className="flex flex-row justify-between">
							<select className="h-10 mr-2 p-2 font-normal rounded">
								<option value="en">English</option>
								<option value="se">Swedish</option>
							</select>
						</div>
					</Step>
				);
			case 'name':
				return (
					<Step
						title="To get started, you need to add a name:"
						animationDirection={stepState.context.animationDirection}
						onPrevious={() => handleStepChange('prev')}
						onNext={() => handleStepChange('next')}
					>
						<input
							type="text"
							className="h-10 mr-2 p-2 font-normal rounded"
							placeholder="Enter your name"
							onChange={handleRegisterName}
						/>
					</Step>
				);
			case 'layout':
				return (
					<Step
						title="Please choose a room layout"
						animationDirection={stepState.context.animationDirection}
						onPrevious={() => handleStepChange('prev')}
						onNext={() => handleStepChange('next')}
					>
						<div className="flex flex-row justify-between">
							<select
								className="h-10 mr-2 p-2 font-normal rounded"
								onChange={handleRoomType}
							>
								<option value="">Select</option>
								<option value="Square">icon Square</option>
								<option value="Circle">icon Circle</option>
							</select>
						</div>
					</Step>
				);
			case 'command':
				return (
					<Step
						title="Enter your command"
						animationDirection={stepState.context.animationDirection}
						onPrevious={() => handleStepChange('prev')}
						onSave={() => handleStepChange('next')}
						isRobotFinished={commandState.context.showSuccess}
					>
						<div className="flex flex-col items-center">
							<div className="flex flex-row justify-items-center mt-4">
								<input
									className={clsx('h-10 mr-2 p-2 font-normal rounded', {
										'border-2 border-red-500': commandState.context.showError,
										'border-2 border-green-500':
											commandState.context.showSuccess,
									})}
									placeholder="eg: VGHGV"
									onChange={handleCommand}
									value={value}
								/>

								<Button
									className="font-bold py-2 px-4 rounded mb-10 mr-2"
									type="button"
									onClick={() => {
										sendCommand({ type: 'SUBMIT', value: value });
									}}
									colors={{
										background: 'blue-900',
										text: 'white',
										hoverBackground: 'blue-600',
										hoverText: 'blue-100',
									}}
								>
									<Text
										text="Submit"
										as="span"
										className="text-m font-medium"
									/>
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
										// Enable submit and input after succeeded submit
										handleReset();
									}}
								>
									{robotState.matches('resetting') ? (
										<SkeletonTheme baseColor="#0b255b" highlightColor="#0d2d6c">
											<Skeleton circle width={20} height={20} />
										</SkeletonTheme>
									) : (
										<Text
											text="Retry"
											as="span"
											className="text-m font-medium"
										/>
									)}
								</Button>
							</div>
						</div>
						<Container
							className={'p-8 flex'}
							room={roomType}
							inputValue={commandState.context.inputValue || ''}
							successMessage={commandState.context.showSuccess}
							errorMessage={commandState.context.showError}
						/>
					</Step>
				);
			case 'finalstep':
				return (
					<Step
						title="Start a new command or go back to start"
						animationDirection={stepState.context.animationDirection}
					>
						<div className="flex flex-row justify-between">
							<Button
								className="font-bold py-2 px-4 rounded mb-10 mr-2"
								type="button"
								colors={{
									background: 'blue-900',
									text: 'white',
									hoverBackground: 'blue-600',
									hoverText: 'blue-100',
								}}
								onClick={() => {
									console.log('reset');
									handleStepChange('prev');
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
							<Button
								className="font-bold py-2 px-4 rounded mb-10"
								type="submit"
								colors={{
									background: 'blue-900',
									text: 'white',
									hoverBackground: 'blue-600',
									hoverText: 'blue-100',
								}}
								onClick={() => {
									console.log('startOver');
									handleSave();
									handleReset();
								}}
							>
								<Text
									text="Back to start"
									as="span"
									className="text-m font-medium"
								/>
							</Button>
						</div>
					</Step>
				);
			default:
				return null;
		}
	};

	return (
		<MasterLayout>
			<header className="bg-black relative flex flex-wrap items-center justify-between p-8 lg:justify-center xl:px-0">
				<Text
					text="Welcome to Simons robot project!"
					as="h1"
					className="text-2xl font-bold text-white py-8"
				/>
			</header>
			<main className="flex flex-col w-full h-full justify-center items-center py-10">
				<div className="flex flex-col justify-center items-center overflow-hidden mt-8 p-4 rounded-md transition-all">
					{renderSteps()}
				</div>
				<div className="flex flex-row justify-center items-center mx-auto pt-10">
					<HistoryList data={dataFromDb} />
				</div>
			</main>
			<Footer />
		</MasterLayout>
	);
};

export default App;
