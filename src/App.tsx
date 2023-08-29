import React from 'react';
import './App.css';
import Container from './component/Container/Container';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';

interface Props {
	roomType?: string;
}

const App: React.FC<Props> = ({ roomType }) => {
	// roomType = 'Circle';
	roomType = 'Square';
	return (
		<MasterLayout>
			<header className=" bg-black relative flex flex-wrap items-center justify-between p-8 lg:justify-center xl:px-0">
				<Text
					text="Welcome to my Robot Project"
					as="h1"
					className="text-2xl font-bold text-white"
				/>
			</header>
			<main className="flex flex-col w-full justify-center items-center">
				<div className="flex flex-col items-center justify-center pb-8">
					<div className="py-4 flex items-center m-10">
						<Text
							text="Please choose a room layout"
							as="h1"
							className="font-medium font-semibold mb-4"
						/>
					</div>
					<div className="flex flex-row w-full justify-between">
						<button className="w-20 h-20 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2">
							<Text
								text="Square"
								as="span"
								className="text-lg font-bold text-white"
							/>
						</button>
						<button className="w-20 h-20 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
							<Text
								text="Circle"
								as="span"
								className="text-lg font-bold text-white"
							/>
						</button>
					</div>
				</div>
				<Container value={roomType} className={'pt-8'} />
			</main>
			<footer className="mt-auto">
				<Text
					text="© 2023 - Created by: Simon Czerwinski"
					as="h3"
					className="text-center text-xs text-gray-500"
				/>
			</footer>
		</MasterLayout>
	);
};

export default App;
