import React from 'react';

interface Props {
	value?: string;
	className?: string;
	onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({ value, className, onChange }) => {
	return (
		<div>
			<input
				className={className}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default Input;
