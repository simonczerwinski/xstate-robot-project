import React from 'react';
import { IModelRobot } from '../../models/robotModel';
import useHover from '../../hooks/useHover';

interface Props {
	robot?: IModelRobot;
}

const Robot: React.FC<Props> = ({ robot }) => {
	const { x, y, direction } = robot || {};
	const { isHovered, onMouseEnter, onMouseLeave } = useHover();
	const scale = isHovered ? 1.2 : 1;
	const scaleAnimation = {
		transform: `scale(${scale})`,
		transition: 'transform 0.3s ease',
	};
	console.log('x', x);
	console.log('y', y);
	console.log('direction', direction);
	return (
		<div
			className="w-12 h-12 bg-green-600 rounded-full cursor-pointer absolute"
			style={{
				gridColumn: `${x}`,
				gridRow: `${y}`,
				...scaleAnimation,
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<img className="p-2" src={'/images/robot-solid.svg'} alt="Robot Icon" />
		</div>
	);
};

export default Robot;
