import React, { useEffect } from 'react';
import { IModelRobot } from '../../models/robotModel';
import { useHover } from '../../hooks/useHover';
import style from './Robot.module.css';
import clsx from 'clsx';

interface Props {
	// robot?: IModelRobot;
	x?: number;
	y?: number;
	direction?: string;
	animation?: React.CSSProperties;
}

const Robot: React.FC<Props> = ({ x, y, direction, animation }) => {
	// const { x, y, direction } = robot || {};
	const { isHovered, onMouseEnter, onMouseLeave } = useHover();
	const scale = isHovered ? 1.2 : 1;
	const scaleAnimation = {
		transform: `scale(${scale})`,
		transition: 'transform 0.3s ease',
	};

	return (
		<div
			className={clsx(
				'absolute w-10 h-10 bg-green-600 rounded-full cursor-pointer',
				style.robot
			)}
			style={{
				gridColumn: `${x}`,
				gridRow: `${y}`,
				...scaleAnimation,
				...animation,
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<img className="p-2" src={'/images/robot-solid.svg'} alt="Robot Icon" />
		</div>
	);
};

export default Robot;
