import React, { useState } from 'react';
import Robot from '../../Robot/Robot';
import clsx from 'clsx';
import CommandInput from '../../CommandInput';

type Props = {
	children?: React.ReactNode;
};

const room = 'Square';
const startPositionX = 1;
const startPositionY = 2;
const gridWidth = 5;
const gridHeight = 5;
const gridSize = 400;
const cellSize = gridSize / (gridWidth + gridHeight);

const Wall: React.FC<Props> = ({ children }) => {
	return (
		<div
			className={clsx(
				'relative flex justify-center items-center w-64 h-64 border-2 border-gray-100 rounded bg-black'
			)}
		>
			{children}
		</div>
	);
};

const SquareRoom: React.FC<Props> = () => {
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
							turnRight={rotateRight}
							turnLeft={rotateLeft}
							finished={showSuccess}
							animation={{
								top: `${y * cellSize}px`,
								left: `${x * cellSize}px`,
								transform: `translate(-10%, -20%)`,
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

export default SquareRoom;
