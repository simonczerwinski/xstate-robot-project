import React from 'react';
import { useHover } from '../../hooks/useHover';
import style from './Robot.module.css';
import clsx from 'clsx';
import Text from '../Text';

interface Props {
	id?: string;
	x?: number;
	y?: number;
	directionText?: string;
	directionRotate?: number;
	animation?: React.CSSProperties;
	finished?: boolean;
}

const Robot: React.FC<Props> = ({
	id,
	x,
	y,
	directionText,
	directionRotate,
	animation,
	finished,
}) => {
	const { isHovered, onMouseEnter, onMouseLeave } = useHover();
	const scale = isHovered ? 1.2 : 1;
	const scaleAnimation = {
		transform: `scale(${scale})`,
		transition: 'transform 0.3s ease',
	};
	const directionAnimation = {
		transform: `rotate(${directionRotate}deg)`,
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
					<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
						<div className="w-9 h-9 bg-green-600 rounded-full animate-pulse"></div>
					</div>
					<div className="absolute top-[-2rem] left-[-2rem] bg-green-600 w-28 flex flex-row justify-center items-center rounded-md p-1">
						<span className="text-white text-sm font-medium pr-2">
							{x},{y} {directionText}
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Robot;
