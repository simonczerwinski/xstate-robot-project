import React from 'react';
import Text from '../Text/Text';
import Robot from '../Robot/Robot';

const SquareRoom: React.FC = () => {
	return (
		<div className="relative w-full h-full bg-black text-white border-4 border-blue-300 rounded">
			<div className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
				<Text text="North" as="span" className="text-xl" />
			</div>
			<div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 text-center text-xs">
				<Text text="South" as="span" className="text-xl" />
			</div>
			<div className="absolute left-[-4rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
				<Text text="West" as="span" className="text-xl" />
			</div>
			<div className="absolute right-[-4rem] top-1/2 transform -translate-y-1/2 text-center text-xs flex justify-center items-center">
				<Text text="East" as="span" className="text-xl" />
			</div>
			<Robot />
		</div>
	);
};

export default SquareRoom;
