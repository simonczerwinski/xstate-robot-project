import clsx from 'clsx';
import React from 'react';

type Props = {
	children: React.ReactNode;
	className?: string;
	colors?: {
		background: string;
		text: string;
		hoverBackground: string;
		hoverText: string;
	};
	type?: 'button' | 'submit' | 'reset';
	title?: string;
	onClick?: () => void;
};

const Button: React.FC<Props> = ({
	children,
	className,
	colors,
	title,
	type,
	onClick,
}) => {
	const { background, text, hoverBackground, hoverText } = colors || {};

	const baseStyle = `bg-${background} text-${text} transition ease-in-out duration-300`;
	const hoverStyle = `hover:bg-${hoverBackground} hover:text-${hoverText}`;

	const styleClasses = `${baseStyle} ${hoverStyle} ${className}`;

	return (
		<button
			title={title}
			type={type}
			onClick={onClick}
			className={clsx(
				styleClasses,
				'flex justify-center items-center rounded-full'
			)}
		>
			{children}
		</button>
	);
};

export default Button;
