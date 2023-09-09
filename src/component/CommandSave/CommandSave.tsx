import React, { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Text from '../Text';

interface CommandSaveProps {
	storeRoomType?: string;
	storeCommandInput?: string;
}

const CommandSave: React.FC<CommandSaveProps> = ({ storeRoomType }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [nameInput, setNameInput] = useState('');

	const handleSave = () => {
		setIsModalOpen(true);
	};

	const handleModalSubmit = () => {
		// onSave(nameInput);
		setIsModalOpen(false);
	};

	return (
		<>
			<Button
				className="font-bold py-2 px-4 rounded mb-10 mr-2"
				type="button"
				onClick={handleSave}
				colors={{
					background: 'blue-900',
					text: 'white',
					hoverBackground: 'blue-600',
					hoverText: 'blue-100',
				}}
			>
				<Text
					text={`Save ` + storeRoomType}
					as="span"
					className="text-m font-medium"
				/>
			</Button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="p-4">
					<h2 className="text-2xl font-semibold mb-4">Enter your name</h2>
					<input
						type="text"
						value={nameInput}
						onChange={(e) => setNameInput(e.target.value)}
						className="border border-gray-300 p-2 rounded mb-4 w-full"
					/>
					<Button
						className="font-bold py-2 px-4 rounded mb-10 mr-2"
						type="button"
						onClick={handleModalSubmit}
						colors={{
							background: 'blue-900',
							text: 'white',
							hoverBackground: 'blue-600',
							hoverText: 'blue-100',
						}}
					>
						<Text text="Submit" as="span" className="text-m font-medium" />
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default CommandSave;
