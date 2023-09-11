import clsx from 'clsx';
import React from 'react';

type Props = {
	children: React.ReactNode;
	id?: string;
	className?: string;
	colors?: {
		background?: string;
		text?: string;
		border?: string;
		hoverBackground?: string;
		hoverText?: string;
	};
	type?: 'button' | 'submit' | 'reset';
	title?: string;
	onClick?: () => void;
};

const Button: React.FC<Props> = ({
	children,
	id,
	className,
	colors,
	title,
	type,
	onClick,
}) => {
	const { background, border, text, hoverBackground, hoverText } = colors || {};

	const baseStyle = `bg-${background} border-${border} text-${text} transition ease-in-out duration-300`;
	const hoverStyle = `hover:bg-${hoverBackground} hover:text-${hoverText}`;

	const styleClasses = `${baseStyle} ${hoverStyle} ${className}`;

	return (
		<button
			id={id}
			title={title}
			type={type}
			onClick={onClick}
			className={clsx(
				styleClasses,
				'flex justify-center items-center rounded-full border-2'
			)}
		>
			{children}
		</button>
	);
};

export default Button;
