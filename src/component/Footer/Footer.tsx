import React from 'react';
import Text from '../Text/Text';

const getCurrentYear = () => {
	return new Date().getFullYear();
};

const Footer: React.FC = () => {
	const currentYear = getCurrentYear();

	return (
		<footer className="relative flex flex-row mt-auto justify-center p-4 bg-black">
			<Text
				text={`Created by: Simon Czerwinski © ${currentYear}`}
				as="h3"
				className="text-center text-xs text-white"
			/>
		</footer>
	);
};

export default Footer;
