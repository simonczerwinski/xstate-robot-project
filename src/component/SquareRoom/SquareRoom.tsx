import React from 'react';

const SquareRoom: React.FC = () => {
	return (
		<div className="border-4 border-red-200 bg-black w-full h-full">
			<div className="bg-red-500 w-8 h-8 rounded-full absolute transform"></div>
		</div>
	);
};

export default SquareRoom;
