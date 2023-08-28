import React from 'react';
import SquareRoom from '../SquareRoom/SquareRoom';

interface Props {
	value: string;
}

const Container: React.FC<Props> = ({ value }) => {
	return (
		<>
			{value === 'Square' ? (
				<div className="w-80 h-80 flex justify-center items-center">
					Square
					<SquareRoom />
				</div>
			) : (
				<div className="w-80 h-80 flex justify-center items-center">
					<div className="w-60 h-60 bg-red-500 rounded-full">Circle</div>
				</div>
			)}
		</>
	);
};

export default Container;
