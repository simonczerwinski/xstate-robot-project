import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';
import Footer from './component/Footer/Footer';
import HistoryList from './component/HistoryList/HistoryList';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import SquareRoom from './component/SquareRoom';
import CircleRoom from './component/CircleRoom/CircleRoom';

const App: React.FC = () => {
	const [squareRoomResult, setSquareRoomResult] = useState('');
	const [circleRoomResult, setCircleRoomResult] = useState('');

	// Example data
	const getHistoryFromDb = [
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

	return (
		<MasterLayout>
			<header className="bg-black relative flex flex-wrap items-center justify-between p-8 lg:justify-center xl:px-0">
				<Text
					text="Welcome to Simons robot project!"
					as="h1"
					className="text-2xl font-bold text-white py-8"
				/>
			</header>
			<main className="flex flex-col w-full h-full p-10">
				<div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center overflow-hidden mt-8 p-4 rounded-md transition-all">
					<SquareRoom SquareRoomResponse={squareRoomResult} />
					{/* <div className="hidden lg:block w-1 bg-gray-300 h-full mx-4"></div> */}
					<CircleRoom resCircleRoom={circleRoomResult} />
				</div>
				<div className="flex flex-row justify-center items-center mx-auto pt-10">
					<HistoryList data={getHistoryFromDb} />
				</div>
			</main>
			<Footer />
		</MasterLayout>
	);
};

export default App;
