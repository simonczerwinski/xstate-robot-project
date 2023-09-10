import React from 'react';

type Props = {
	isOpen?: boolean;
	onClose?: () => void;
	children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
					<div className="bg-white p-10 rounded-md">{children}</div>
				</div>
			)}
		</>
	);
};

export default Modal;
