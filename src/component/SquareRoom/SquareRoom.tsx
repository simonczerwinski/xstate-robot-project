import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { robotMachine } from '../../state-machines/robot.machine';
import { Animate } from 'react-move';
import Text from '../Text/Text';
import Robot from '../Robot/Robot';

type Direction = (x: number, y: number) => string;

interface Props {
	input?: string;
}

const direction: Direction = (x, y) => {
	switch (true) {
		case y < 3:
			return 'N: North';
		case y > 2:
			return 'S: South';
		case x < 2:
			return 'V: West';
		case x > 2:
			return 'Ö: East';
		default:
			return 'Center?';
	}
};

const SquareRoom: React.FC<Props> = ({ input }) => {
	const [current, send] = useMachine(robotMachine);
	const [position, setPosition] = useState({ x: 0, y: 0, direction: '' });
	const divElement = document.getElementById('squareroom');
	const roomPosition = divElement?.getBoundingClientRect();
	console.log('position', position);
	console.log('roomPosition', roomPosition);

	const getCommands = input?.split('');

	const handleMove = () => {
		console.log('current', current);
		console.log('handleMove');
		return {
			// Set gridsize (5x5) and multiply with 10 to get the correct position
			x: [current.context.x * 10],
			y: [current.context.y * 10],
			direction: [current.context.direction],
			timing: { duration: 5000 },
		};
	};
	// const getCommands = (command: string) => {
	// 	// set each position to robot
	// 	switch (command) {
	// 		case 'G':
	// 			// forward
	// 			setPosition((position) => ({ ...position, x: position.x + 1 }));

	// 			break;
	// 		case 'H':
	// 			// right
	// 			setPosition((position) => ({ ...position, y: position.y + 1 }));
	// 			break;
	// 		case 'V':
	// 			// left
	// 			setPosition((position) => ({ ...position, y: position.y - 1 }));
	// 			break;

	// 		default:
	// 			break;
	// 	}
	// };
	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		return {
			x: e.clientX - roomPosition!.left,
			y: e.clientY - roomPosition!.top,
		};
	};
	useEffect(() => {
		if (getCommands) {
			getCommands.forEach((command) => {
				if (['G', 'H', 'V'].includes(command)) {
					switch (command) {
						case 'G':
							// forward
							console.log('FORWARD');
							send('FORWARD');
							break;
						case 'H':
							// right
							console.log('TURN_RIGHT');
							send('TURN_RIGHT');
							break;
						case 'V':
							// left
							console.log('TURN_LEFT');
							send('TURN_LEFT');
							break;

						default:
							console.error(`Weird command: ${command}?`);
							break;
					}
				} else {
					console.error(`Bad command: ${command}`);
				}
			});
		} else {
			send('SET_CENTER');
		}
	}, [input, send]);

	return (
		<div className="relative flex flex-col w-full h-full ">
			<div
				id="squareroom"
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
				<Animate start={handleMove} update={handleMove}>
					{(state) => {
						const { x, y, direction } = state;
						return (
							<div
								className="absolute w-10 h-10 bg-green-600 rounded-full cursor-pointer"
								style={{
									top: `${y}px`,
									left: `${x}px`,
									transform: `translate(-50%, -50%)`,
								}}
							>
								<Robot robot={{ x: x, y: y, direction: direction }} />
							</div>
						);
					}}
				</Animate>
			</div>
		</div>
	);
};

export default SquareRoom;
