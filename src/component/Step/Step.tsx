import React, { useRef } from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';
import './Step.module.css';

type StepProps = {
	title?: string;
	className?: string;
	animationDirection?: string;
	onPrevious?: () => void;
	onNext?: () => void;
	onSave?: () => void;
	children?: React.ReactNode;
	isRobotFinished?: boolean;
};

const Step: React.FC<StepProps> = ({
	title,
	className,
	animationDirection,
	onPrevious,
	onNext,
	onSave,
	children,
	isRobotFinished,
}) => {
	const nodeRef = useRef(null);
	console.log(animationDirection);
	// TODO: Fix smoother animation slides
	return (
		<>
			<CSSTransition
				in={true}
				apear={true}
				nodeRef={nodeRef}
				timeout={500}
				classNames={
					animationDirection === 'right' ? 'slide-out-left' : 'slide-out-right'
				}
				unmountOnExit
			>
				<div
					ref={nodeRef}
					className={clsx('flex flex-col items-center', className)}
				>
					<Text
						text={title}
						as="h3"
						className="text-lg font-bold text-white mb-4"
					/>
					{children}
				</div>
			</CSSTransition>

			<div className="flex justify-center items-center w-full py-2">
				{onPrevious && (
					<Button
						className="font-bold py-2 px-4 rounded my-10 mr-2"
						type="button"
						onClick={onPrevious}
						colors={{
							background: 'blue-900',
							text: 'white',
							hoverBackground: 'blue-600',
							hoverText: 'blue-100',
						}}
					>
						<Text text="Back" as="span" className="text-m font-medium" />
					</Button>
				)}
				{onNext && (
					<Button
						className="font-bold py-2 px-4 rounded my-10 mr-2"
						colors={{
							background: 'blue-900',
							text: 'white',
							hoverBackground: 'blue-600',
							hoverText: 'blue-100',
						}}
						onClick={onNext}
					>
						<Text text="Next" as="span" className="text-m font-medium " />
					</Button>
				)}
				{onSave && isRobotFinished && (
					<Button
						className="font-bold py-2 px-4 rounded my-10 mr-2"
						type="button"
						onClick={onSave}
						colors={{
							background: 'blue-900',
							text: 'white',
							hoverBackground: 'blue-600',
							hoverText: 'blue-100',
						}}
					>
						<Text text="Save" as="span" className="text-m font-medium" />
					</Button>
				)}
			</div>
		</>
	);
};

export default Step;
