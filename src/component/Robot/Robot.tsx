import React from 'react';
import { RobotModel } from '../../models/robotModel';

interface Props {
	robot: RobotModel;
}

const Robot: React.FC<Props> = ({ robot }) => {
	return (
		<div
			className="w-10 h-10 bg-red-500 rounded-full cursor-pointer"
			style={{
				position: 'absolute',
			}}
		/>
	);
};

export default Robot;
