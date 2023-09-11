import React, { useEffect, useState } from 'react';
import { useHover } from '../../hooks/useHover';
import clsx from 'clsx';

type Props = {
	id?: string;
	x?: number;
	y?: number;
	direction?: string;
	rotateRight?: any;
	rotateLeft?: any;
	animation?: React.CSSProperties;
	finished?: boolean;
	error?: boolean;
};

const Robot: React.FC<Props> = ({
	id,
	x,
	y,
	direction,
	rotateRight,
	rotateLeft,
	animation,
	finished,
	error,
}) => {
	const [rotation, setRotation] = useState(0);

	const { isHovered, onMouseEnter, onMouseLeave } = useHover();
	const scale = isHovered ? 1.1 : 1;
	const scaleAnimation = {
		transform: `scale(${scale})`,
		transition: 'transform 0.3s ease',
	};

	useEffect(() => {
		// Get the turnRight and turnLeft values.
		const newRotation = rotateRight - rotateLeft;
		setRotation(newRotation || 0);
		console.log('newRotation', newRotation);
	}, [rotateRight, rotateLeft]);

	const directionAnimation = {
		transform: `rotate(${rotation}deg)`,
		transition: 'transform 0.3s ease',
	};
	return (
		<div
			id={id}
			data-x={x}
			data-y={y}
			data-direction={direction}
			className={clsx(
				'absolute flex justify-center w-10 h-10 bg-teal-600 bg-opacity-80 animate-pulse rounded-full cursor-pointer z-10',
				{
					'scale-150': isHovered,
				}
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
			{error && (
				<>
					<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-[-1]">
						<div className="w-9 h-9 bg-red-600 rounded-full animate-pulse"></div>
					</div>
					<div className="absolute left-12 bg-red-600 w-32 flex flex-row justify-center items-center rounded-md p-1 mt-[5px]">
						<span className="text-white text-sm font-medium pr-2">
							Bad command!
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Robot;
