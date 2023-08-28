import React from 'react';
import SquareContainer from './SquareContainer';

const SquareRoom: React.FC = () => {
	return (
		<SquareContainer>
			<div className="border-4 border-red-200 bg-black w-full h-full">
				<div className="bg-red-500 w-8 h-8 rounded-full absolute transform"></div>
			</div>
		</SquareContainer>
	);
};

export default SquareRoom;
