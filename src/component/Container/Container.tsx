import React from 'react';

interface Props {
	value: string;
	onChange: (value: string) => void;
}

const Container: React.FC<Props> = ({ value, onChange }) => {
	value = 'Square';

	return (
		<>
			{value === 'Square' ? (
				<div className="w-80 h-80 flex justify-center items-center">
					<div className="w-60 h-60 bg-blue-500"></div>
				</div>
			) : (
				<div className="w-80 h-80 flex justify-center items-center">
					<div className="w-60 h-60 bg-red-500 rounded-full"></div>
				</div>
			)}
		</>
	);
};

export default Container;
