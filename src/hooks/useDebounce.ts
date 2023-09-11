import { useState, useEffect } from 'react';

type Props = {
	(callback: any, delay: number): any;
};

export const useDebounce: Props = (callback, delay) => {
	const [debouncedCallback, setDebouncedCallback] = useState(callback);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedCallback(callback);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [callback, delay]);

	return debouncedCallback;
};
