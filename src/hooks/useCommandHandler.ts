import { useState } from 'react';

export const useCommandHandler = (initialValue = '') => {
	const [value, setValue] = useState(initialValue);

	const handleCommand = (e) => {
		setValue(e.target.value || '');
	};

	const resetCommand = () => setValue(initialValue);

	return [value, handleCommand, resetCommand];
};
