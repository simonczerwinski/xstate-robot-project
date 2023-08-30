import React, { useState } from 'react';
import './App.css';
import Container from './component/Container/Container';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';
import Button from './component/Button/Button';
import Footer from './component/Footer/Footer';
import Input from './component/Input/Input';

interface Props {
	roomType?: string;
}

const App: React.FC<Props> = ({ roomType }) => {
	const [inputValue, setInputValue] = useState('');
	const [inputData, setInputData] = useState('');

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleSubmit = () => {
		setInputData(inputValue);
	};

	roomType = 'Square';
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
					<Input
						className={'h-10 mr-2 p-2 font-normal rounded'}
						value={inputValue}
						onChange={handleInputChange}
					/>
					<Button
						className="w-25 h-10 font-bold py-2 px-4 rounded my-10"
						onClick={handleSubmit}
						colors={{
							background: 'blue-900',
							text: 'white',
							hoverBackground: 'blue-600',
							hoverText: 'blue-100',
						}}
					>
						Submit
					</Button>
				</div>
				<Container
					value={roomType}
					inputValue={inputData}
					className={'p-8 flex'}
				/>
			</main>
			<Footer />
		</MasterLayout>
	);
};

export default App;
