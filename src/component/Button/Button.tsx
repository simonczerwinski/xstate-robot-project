import React from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
	children: React.ReactNode;
	size?: ButtonSize;
	className?: string;
	colors?: {
		background: string;
		text: string;
		hoverBackground: string;
		hoverText: string;
	};
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
};

const Button: React.FC<Props> = ({
	children,
	className,
	colors,
	type,
	onClick,
}) => {
	const { background, text, hoverBackground, hoverText } = colors || {};

	const baseStyle = `bg-${background} text-${text} transition ease-in-out duration-300`;
	const hoverStyle = `hover:bg-${hoverBackground} hover:text-${hoverText}`;

	const styleClasses = `${baseStyle} ${hoverStyle} ${className}`;

	return (
		<button type={type} onClick={onClick} className={styleClasses}>
			{children}
		</button>
	);
};

export default Button;
