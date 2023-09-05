import React from 'react';
import SquareRoom from '../SquareRoom/SquareRoom';

type Props = {
	room?: string;
	inputValue?: string;
	className?: string;
	successMessage?: boolean;
	errorMessage?: boolean;
};

const Container: React.FC<Props> = ({
	room,
	inputValue,
	className,
	successMessage,
}) => {
	return (
		<div className={className}>
			{/* <div>{successMessage ? 'Success' : ''}</div> */}
			{room === 'Square' ? (
				<SquareRoom input={inputValue} />
			) : (
				<div className="w-80 h-80 flex justify-center items-center">
					<div className="w-60 h-60 bg-red-500 rounded-full">Circle</div>
				</div>
			)}
		</div>
	);
};

export default Container;
