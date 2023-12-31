import React, { useState } from 'react';
import Robot from '../../Robot/Robot';
import clsx from 'clsx';
import CommandInput from '../../CommandInput';
import Text from '../../Text';

type Props = {
	children?: React.ReactNode;
	renderHistoryAndUpdate?: () => void;
};

const room = 'Circle';
const startPositionX = 0;
const startPositionY = 0;
const gridWidth = 10;
const gridHeight = 10;
const gridSize = 400;
const cellSize = gridSize / (gridWidth + gridHeight);

const Wall: React.FC<Props> = ({ children }) => {
	return (
		<div
			className={clsx(
				'relative flex justify-center items-center w-64 h-64 border-2 border-teal-500 bg-black rounded-full'
			)}
		>
			{children}
		</div>
	);
};

const CircleRoom: React.FC<Props> = ({ renderHistoryAndUpdate }) => {
	const [robotValues, setRobotValues] = useState({
		x: startPositionX,
		y: startPositionY,
		getDirection: '',
		rotateLeft: 0,
		rotateRight: 0,
		showSuccess: false,
		showError: false,
	});
	const {
		x,
		y,
		getDirection,
		rotateLeft,
		rotateRight,
		showSuccess,
		showError,
	} = robotValues;

	return (
		<div className="flex flex-col justify-center items-center relative bg-black bg-opacity-50 rounded-md p-8">
			<Text
				as="h3"
				text="Circle Room"
				className="text-white text-lg font-medium pb-4 text-center"
			/>
			<Wall>
				<div className="w-[200px] h-[200px] flex justify-center items-center z-0">
					<div className="relative flex flex-col w-full h-full">
						<div className="text-white">
							<div className="absolute top-[-1rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
								<Text text="N" as="span" className="text-xl font-normal" />
							</div>
							<div className="absolute bottom-[-1rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
								<Text text="S" as="span" className="text-xl font-normal" />
							</div>
							<div className="absolute left-[-1rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
								<Text text="V" as="span" className="text-xl font-normal" />
							</div>
							<div className="absolute right-[-1rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
								<Text text="Ö" as="span" className="text-xl font-normal" />
							</div>
						</div>
						<Robot
							id="robotCircle"
							x={x}
							y={y}
							direction={getDirection}
							rotateRight={rotateLeft}
							rotateLeft={rotateRight}
							finished={showSuccess}
							error={showError}
							animation={{
								top: `${y * cellSize}px`,
								left: `${x * cellSize}px`,
								transform: `translate(200%, 200%)`,
								transition: 'all 0.3s linear',
							}}
						/>
					</div>
				</div>
			</Wall>
			<div className="flex flex-col">
				<CommandInput
					roomType={room}
					gridHeight={gridHeight}
					gridWidth={gridWidth}
					startPositionX={startPositionX}
					startPositionY={startPositionY}
					renderRobotPropsFromRobotContextValues={setRobotValues}
					renderHistoryLogs={renderHistoryAndUpdate}
				/>
			</div>
		</div>
	);
};

export default CircleRoom;
