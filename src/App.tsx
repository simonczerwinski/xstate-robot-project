import React, { useState, useEffect } from 'react';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';
import Footer from './component/Footer/Footer';
import HistoryList from './component/HistoryList/HistoryList';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { SquareRoom, CircleRoom } from './component/Rooms';

const App: React.FC = () => {
	// Example data
	const getHistoryFromDb = [
		{
			name: 'Simon',
			room: 'Square',
			command: 'VGHGV',
			date: '2023-09-10',
		},
		{
			name: 'Simon 2',
			room: 'Circle',
			command: 'ABCD',
			date: '2023-09-10',
		},
	];

	return (
		<MasterLayout>
			<video
				autoPlay
				loop
				muted
				className="absolute inset-0 w-full h-full object-cover"
			>
				<source src="/videos/bg-video-nebula-1920x1080.mp4" type="video/mp4" />
			</video>
			<header className="relative w-full h-auto flex flex-col items-center justify-between p-8 lg:justify-center xl:px-0">
				<div className="absolute inset-0 bg-black opacity-60"></div>

				<Text
					text="Welcome to Simons Robot machine!"
					as="h1"
					className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl m-text-xl font-bold text-white py-8 relative z-10"
				/>
			</header>
			<main className="flex flex-col w-full h-full pt-32 px-8 bg-gradient-to-b from-black to-indigo-950">
				<div className="absolute inset-0 bg-black opacity-60"></div>
				<div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center mt-8 p-4 rounded-md transition-all">
					<SquareRoom />
					{/* <div className="hidden lg:block w-1 bg-gray-300 h-full mx-4"></div> */}
					<CircleRoom />
				</div>
				<div className="relative flex flex-row justify-center items-center mx-auto pt-10">
					<HistoryList data={getHistoryFromDb} />
				</div>
			</main>
			<Footer />
		</MasterLayout>
	);
};

export default App;
