import React, { useState } from 'react';
import { ChangeEvent } from 'react';

// TODO: Show suggestions/ results when typing using debouncing

interface Props {
	value?: string;
	className?: string;
	placeHolder?: string;
	onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({
	value,
	placeHolder,
	className,
	onChange,
}) => {
	const [inputValue, setInputValue] = useState(value);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value || '';
		setInputValue(inputValue);
		onChange(inputValue);
	};

	return (
		<div>
			<input
				placeholder={placeHolder}
				className={className}
				value={inputValue}
				onChange={handleChange}
			/>
		</div>
	);
};

export default Input;
