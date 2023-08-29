import React from 'react';
import './App.css';
import Container from './component/Container/Container';
import MasterLayout from './layout/MasterLayout';
import Text from './component/Text/Text';
import Button from './component/Button/Button';
import Footer from './component/Footer/Footer';

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
							className="text-white font-medium font-semibold mb-4"
						/>
					</div>
					<div className="flex flex-row w-full justify-between">
						<Button
							className="w-20 h-20 font-bold py-2 px-4 rounded mb-2"
							colors={{
								background: 'white',
								text: 'blue-900',
								hoverBackground: 'blue-100',
								hoverText: 'white',
							}}
						>
							<Text text="Square" as="span" className="text-m font-medium" />
						</Button>
						<Button
							className="w-20 h-20 font-bold py-2 px-4 rounded-full"
							colors={{
								background: 'white',
								text: 'blue-900',
								hoverBackground: 'blue-100',
								hoverText: 'white',
							}}
						>
							<Text text="Circle" as="span" className="text-m font-medium" />
						</Button>
					</div>
				</div>
				<Container value={roomType} className={'p-8 flex'} />
			</main>
			<Footer />
		</MasterLayout>
	);
};

export default App;
