import React from 'react';
import { useHover } from '../../hooks/useHover';
import style from './Robot.module.css';
import clsx from 'clsx';

interface Props {
	id?: string;
	x?: number;
	y?: number;
	direction?: number;
	animation?: React.CSSProperties;
}

const Robot: React.FC<Props> = ({ id, direction, animation }) => {
	const { isHovered, onMouseEnter, onMouseLeave } = useHover();
	const scale = isHovered ? 1.2 : 1;
	const scaleAnimation = {
		transform: `scale(${scale})`,
		transition: 'transform 0.3s ease',
	};
	const directionAnimation = {
		transform: `rotate(${direction}deg)`,
		transition: 'transform 0.3s ease',
	};
	return (
		<div
			id={id}
			className={clsx(
				'absolute w-10 h-10 bg-green-600 rounded-full cursor-pointer',
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
				className="p-2"
				src={'/images/robot-solid.svg'}
				alt="Robot Icon"
			/>
		</div>
	);
};

export default Robot;
