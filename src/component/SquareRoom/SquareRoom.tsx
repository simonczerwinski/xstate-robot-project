import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import Robot from '../Robot/Robot';

type Direction = (x: number, y: number) => string;

interface Props {
	input?: string;
}

const SquareRoom: React.FC<Props> = ({ input }) => {
	const [position, setPosition] = useState({ x: 0, y: 0, direction: '' });
	const [commands, setCommands] = useState<string[]>([]);

	input = 'VGGHGHGHGG';

	useEffect(() => {
		setCommands(input?.split('') || []);
	}, [input]);

	commands.forEach((command) => {
		if (command === 'G') {
			// Gå framåt
		} else if (command === 'V') {
			// Gå vänster
		} else if (command === 'H') {
			// Gå höger
		}
	});
	console.log(commands);

	const direction: Direction = (x, y) => {
		switch (true) {
			case y < 3:
				return 'North';
			case y > 2:
				return 'South';
			case x < 2:
				return 'West';
			case x > 2:
				return 'East';
			default:
				return 'Center?';
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const RoomPosition = (e.target as Element).getBoundingClientRect();
		console.log(
			RoomPosition.top,
			RoomPosition.right,
			RoomPosition.bottom,
			RoomPosition.left
		);
		const x = e.clientX - RoomPosition.left;
		const y = e.clientY - RoomPosition.top;
		console.log(x, y);
		const dir = direction(
			Math.floor(x / (RoomPosition.width / 5)),
			Math.floor(y / (RoomPosition.height / 5))
		);
		console.log(dir);
		setPosition({ x, y, direction: dir });
	};

	return (
		<div className="relative flex flex-col w-full h-full ">
			<div
				className="w-full h-full bg-black text-white grid grid-cols-1 grid-rows-1 border-2 border-gray-100 shadow-lg rounded"
				onClick={handleClick}
			>
				<div className={`border border-gray-100 ${direction(0, 0)}`}>
					<div className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
						<Text text="North" as="span" className="text-xl font-normal" />
					</div>
					<div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
						<Text text="South" as="span" className="text-xl font-normal" />
					</div>
					<div className="absolute left-[-4rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
						<Text text="West" as="span" className="text-xl font-normal" />
					</div>
					<div className="absolute right-[-4rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
						<Text text="East" as="span" className="text-xl font-normal" />
					</div>
				</div>
				<Robot />
			</div>

			<div className="flex flex-col">
				<Text
					text={`Position: ${position.x}, ${position.y}, ${position.direction}`}
					as="p"
					className="text-xl font-normal text-white"
				/>
			</div>
		</div>
	);
};

export default SquareRoom;
