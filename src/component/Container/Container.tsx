import React from 'react';
import SquareRoom from '../SquareRoom/SquareRoom';

interface Props {
	value: string;
	className?: string;
}

const Container: React.FC<Props> = ({ value, className }) => {
	return (
		<div className={className}>
			{value === 'Square' ? (
				<div className="w-80 h-80 flex justify-center items-center">
					<SquareRoom />
				</div>
			) : (
				<div className="w-80 h-80 flex justify-center items-center">
					<div className="w-60 h-60 bg-red-500 rounded-full">Circle</div>
				</div>
			)}
		</div>
	);
};

export default Container;
