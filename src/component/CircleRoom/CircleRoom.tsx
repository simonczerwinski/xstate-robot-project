import React from 'react';

const CircleRoom: React.FC = () => {
	return (
		<div className="w-80 h-80 flex justify-center items-center">
			<div className="border-4 border-red-200 bg-black w-full h-full">
				<div className="bg-red-500 w-8 h-8 rounded-full absolute transform"></div>
			</div>
		</div>
	);
};

export default CircleRoom;
