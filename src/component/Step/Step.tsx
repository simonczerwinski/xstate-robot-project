import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Button from '../Button/Button';
import Text from '../Text/Text';
import clsx from 'clsx';

type StepProps = {
	title?: string;
	className?: string;
	onNext?: () => void;
	loading?: boolean;
	children?: React.ReactNode;
};

const Step: React.FC<StepProps> = ({
	title,
	className,
	onNext,
	loading,
	children,
}) => {
	return (
		<div className={clsx('flex flex-col items-center', className)}>
			<Text
				text={title}
				as="h3"
				className="text-lg font-bold text-white mb-4"
			/>
			{loading ? (
				<SkeletonTheme baseColor="#0b255b" highlightColor="#0d2d6c">
					<Skeleton circle width={20} height={20} />
				</SkeletonTheme>
			) : (
				<>
					{children}
					{onNext && (
						<Button
							className="font-bold py-2 px-4 rounded my-10 mr-2"
							type="button"
							onClick={onNext}
							colors={{
								background: 'blue-900',
								text: 'white',
								hoverBackground: 'blue-600',
								hoverText: 'blue-100',
							}}
						>
							<Text text="Next" as="span" className="text-m font-medium" />
						</Button>
					)}
				</>
			)}
		</div>
	);
};

export default Step;
