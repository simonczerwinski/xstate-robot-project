import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
	value?: string;
	className?: string;
	onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({ value, className, onChange }) => {
	const [inputValue, setInputValue] = useState(value);
	const debouncedValue = useDebounce(inputValue, 500);

	const handleChange = (event: any) => {
		setInputValue(event.target.value);
		onChange(debouncedValue);
	};

	return (
		<div>
			<input className={className} value={inputValue} onChange={handleChange} />
		</div>
	);
};

export default Input;
