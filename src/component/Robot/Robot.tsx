import React, { useEffect, useState } from 'react';
import { useHover } from '../../hooks/useHover';
import style from './Robot.module.css';
import clsx from 'clsx';
import Text from '../Text';

interface Props {
	id?: string;
	x?: number;
	y?: number;
	direction?: string;
	turnRight?: number;
	turnLeft?: number;
	animation?: React.CSSProperties;
	finished?: boolean;
}

const Robot: React.FC<Props> = ({
	id,
	x,
	y,
	direction,
	turnRight,
	turnLeft,
	animation,
	finished,
}) => {
	const [rotation, setRotation] = useState(0);

	const { isHovered, onMouseEnter, onMouseLeave } = useHover();
	const scale = isHovered ? 1.2 : 1;
	const scaleAnimation = {
		transform: `scale(${scale})`,
		transition: 'transform 0.3s ease',
	};
	console.log(isHovered);

	useEffect(() => {
		// Calculate the new rotation based on turnRight and turnLeft values
		const newRotation = direction === 'right' ? turnRight : turnLeft;
		setRotation(newRotation || 0);
	}, [direction, turnRight, turnLeft]);
	console.log(rotation);
	const directionAnimation = {
		transform: `rotate(${rotation}deg)`,
		transition: 'transform 0.3s ease',
	};
	return (
		<div
			id={id}
			className={clsx(
				'absolute flex justify-center w-10 h-10 bg-teal-600 bg-opacity-80 animate-pulse rounded-full cursor-pointer z-10',
				style
			)}
			style={{
				...animation,
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<img
				style={{
					...scaleAnimation,
					...directionAnimation,
				}}
				className="p-1 w-8"
				src={'/images/robot-solid.svg'}
				alt="Robot Icon"
			/>
			{finished && (
				<>
					<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-[-1]">
						<div className="w-9 h-9 bg-green-600 rounded-full animate-pulse"></div>
					</div>
					<div className="absolute left-12 bg-green-600 w-16 flex flex-row justify-center items-center rounded-md p-1 mt-[5px]">
						<span className="text-white text-sm font-medium pr-2">
							{x},{y} {direction}
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Robot;
