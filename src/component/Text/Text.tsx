import React from 'react';

export type Tags = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export interface TextProps {
	text?: string;
	as: Tags;
	margin?: boolean;
	className?: string;
	[htmlAttributes: string]: any;
}

const tagProps = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	p: 'p',
	span: 'span',
};

const Text: React.FC<TextProps> = ({
	text,
	as,
	margin,
	className,
	...props
}) => {
	const Tag: any = tagProps[as];
	return (
		<Tag className={`text ${margin ? 'w-margin' : ''} ${className}`} {...props}>
			{text}
		</Tag>
	);
};

export default Text;
