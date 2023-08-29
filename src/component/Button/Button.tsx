import React from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

interface Props {
	children: React.ReactNode;
	size?: ButtonSize;
	className?: string;
	colors?: {
		background: string;
		text: string;
		hoverBackground: string;
		hoverText: string;
	};
}

const Button: React.FC<Props> = ({ children, className, colors }) => {
	const baseStyle = `${className} bg-${colors?.background} text-${colors?.text} transition ease-in-out duration-300`;
	const hoverStyle = `hover:bg-${colors?.hoverBackground} hover:text-${colors?.hoverText}`;

	return <button className={`${baseStyle} ${hoverStyle}`}>{children}</button>;
};

export default Button;
