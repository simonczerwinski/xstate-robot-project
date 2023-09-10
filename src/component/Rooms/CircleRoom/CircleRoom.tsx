import React, { useState } from 'react';
import Robot from '../../Robot/Robot';
import clsx from 'clsx';
import CommandInput from '../../CommandInput';

type Props = {
	children?: React.ReactNode;
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
				'relative flex justify-center items-center w-64 h-64 border-2 border-gray-100 bg-black rounded-full'
			)}
		>
			{children}
		</div>
	);
};

const CircleRoom: React.FC<Props> = () => {
	const [robotValues, setRobotValues] = useState({
		x: startPositionX,
		y: startPositionY,
		getDirection: '',
		rotateLeft: 0,
		rotateRight: 0,
		showSuccess: false,
	});
	const { x, y, getDirection, rotateLeft, rotateRight, showSuccess } =
		robotValues;

	return (
		<div className="flex flex-col justify-center items-center relative bg-black bg-opacity-30 rounded-md p-8">
			<Wall>
				<div className="w-[200px] h-[200px] flex justify-center items-center z-0">
					<div className="relative flex flex-col w-full h-full">
						<Robot
							id="robot"
							x={x}
							y={y}
							direction={getDirection}
							turnRight={rotateLeft}
							turnLeft={rotateRight}
							finished={showSuccess}
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
					renderRobotAnimationFromRobotContext={setRobotValues}
				/>
			</div>
		</div>
	);
};

export default CircleRoom;
