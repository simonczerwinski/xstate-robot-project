import React from 'react';
import CircleContainer from './CircleContainer';

const CircleRoom: React.FC = () => {
	return (
		<CircleContainer>
			<div className="border-4 border-red-200 bg-black w-full h-full">
				<div className="bg-red-500 w-8 h-8 rounded-full absolute transform"></div>
			</div>
		</CircleContainer>
	);
};

export default CircleRoom;
