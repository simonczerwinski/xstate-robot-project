import React, { useEffect, useState } from 'react';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';
import Footer from './component/Footer/Footer';
import HistoryLogs from './component/HistoryLogs/HistoryLogs';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { SquareRoom, CircleRoom } from './component/Rooms';

const App: React.FC = () => {
	const [commandHistoryLogs, setCommandHistoryLogs] = useState([]);

	const renderHistoryLogs = () => {
		// Load data from the local storage
		const commandHistoryLogsString = localStorage.getItem('commandHistoryLogs');
		const commandHistoryLogs = commandHistoryLogsString
			? JSON.parse(commandHistoryLogsString)
			: [];
		setCommandHistoryLogs(commandHistoryLogs);
	};

	useEffect(() => {
		setTimeout(() => {
			renderHistoryLogs();
		}, 1000);
	}, [renderHistoryLogs]);
	return (
		<MasterLayout>
			<video
				autoPlay
				loop
				muted
				className="absolute inset-0 w-full lg:h-full object-cover md:h-60"
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
			<main className="flex flex-col w-full h-full pt-32 px-8 lg:bg-gradient-to-t from-black to-red-950">
				<div className="container mx-auto">
					<div className="absolute inset-0 bg-black opacity-60 lg:block hidden"></div>
					<div className="flex flex-col lg:flex-row justify-center lg:justify-between lg:items-start md:items-center mt-8 p-4 rounded-md transition-all">
						<SquareRoom renderHistoryAndUpdate={renderHistoryLogs} />
						<CircleRoom renderHistoryAndUpdate={renderHistoryLogs} />
					</div>
					<div className="relative flex flex-row justify-center items-center mx-auto pt-10">
						<HistoryLogs data={commandHistoryLogs} />
					</div>
				</div>
			</main>
			<Footer />
		</MasterLayout>
	);
};

export default App;
