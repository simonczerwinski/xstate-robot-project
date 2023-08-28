import React from 'react';
import './App.css';
import SquareRoom from './component/SquareRoom/SquareRoom';
import MasterLayout from './layout/MasterLayout';

const App: React.FC = () => {
	return (
		<MasterLayout>
			<header className=" bg-black relative flex flex-wrap items-center justify-between p-8 lg:justify-center xl:px-0">
				<h1 className="text-2xl font-bold text-white">
					Welcome to my Robot Project
				</h1>
			</header>
			<div className="bg-gray-200 py-4 flex flex-col items-center m-10">
				<h2 className="font-medium font-semibold mb-4">
					Please choose a room layout
				</h2>
				<button className="w-20 h-20 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2">
					Square
				</button>
				<button className="w-20 h-20 bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
					Circle
				</button>
			</div>
			<main className="flex-grow flex justify-center items-center">
				<SquareRoom />
			</main>
		</MasterLayout>
	);
};

export default App;
