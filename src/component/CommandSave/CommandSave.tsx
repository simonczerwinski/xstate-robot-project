import React, { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import Text from '../Text';
import clsx from 'clsx';

interface CommandSaveProps {
	storeRoomType?: string;
	storeCommandInput?: string;
	updateHistoryLogs?: () => void;
}

const CommandSave: React.FC<CommandSaveProps> = ({
	storeRoomType,
	storeCommandInput,
	updateHistoryLogs,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [nameInput, setNameInput] = useState('');
	const [saveSuccess, setSaveSuccess] = useState(false);
	const [showSaveButton, setShowSaveButton] = useState(true);

	const handleSave = () => {
		setIsModalOpen(true);
	};
	const cancelSave = () => {
		setIsModalOpen(false);
	};
	const handleModalSubmit = () => {
		const commandHistoryLogsString = localStorage.getItem('commandHistoryLogs');
		const commandHistoryLogs = commandHistoryLogsString
			? JSON.parse(commandHistoryLogsString)
			: [];

		if (storeRoomType !== undefined && storeCommandInput !== undefined) {
			// Push the new command history log into array
			commandHistoryLogs.push({
				name: nameInput || '-',
				room: storeRoomType,
				command: storeCommandInput,
				date: new Date().toISOString().split('T')[0],
			});

			// Store the updated commands
			localStorage.setItem(
				'commandHistoryLogs',
				JSON.stringify(commandHistoryLogs)
			);
			setSaveSuccess(true);
			setTimeout(() => {
				setShowSaveButton(false);
			}, 4000);
		}
		// Update the history logs in the HistoryLogs component
		updateHistoryLogs;
		setIsModalOpen(false);
	};
	return (
		<>
			{showSaveButton && (
				<Button
					id={'saveButton-' + storeRoomType}
					className={clsx('font-bold py-2 px-4 rounded mb-10 mr-2 ', {
						' bg-green-900': saveSuccess,
					})}
					type="button"
					onClick={handleSave}
					colors={{
						background: 'bg-transparent',
						text: 'white',
						hoverBackground: 'teal-600',
					}}
				>
					{saveSuccess ? (
						<Text
							text="Saved Successful!"
							as="span"
							className="text-m font-medium"
						/>
					) : (
						<Text
							text={`Save ` + storeRoomType}
							as="span"
							className="text-m font-medium"
						/>
					)}
				</Button>
			)}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<div className="p-4">
					<Text
						as="h2"
						text="Enter your name"
						className="text-white text-2xl tex font-semibold mb-4"
					/>
					<input
						id={'nameInput-' + storeRoomType}
						type="text"
						value={nameInput}
						onChange={(e) => setNameInput(e.target.value)}
						className="border-2 border-teal-950 font-normal bg-black text-white rounded mb-4 p-2 w-full"
					/>
					<div className="flex flex-row justify-end">
						<Button
							id={'submitSave-' + storeRoomType}
							className="font-bold py-2 px-4 rounded mb-10 mr-2"
							type="button"
							onClick={handleModalSubmit}
							colors={{
								background: 'bg-transparent',
								text: 'white',
								hoverBackground: 'teal-600',
							}}
						>
							<Text text="Submit" as="span" className="text-m font-medium" />
						</Button>

						<Button
							className="font-bold py-2 px-4 rounded mb-10 mr-2"
							type="button"
							onClick={cancelSave}
							colors={{
								background: 'bg-transparent',
								text: 'white',
								hoverBackground: 'gray-300',
								hoverText: 'black',
							}}
						>
							<Text text="Cancel" as="span" className="text-m font-medium" />
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default CommandSave;
