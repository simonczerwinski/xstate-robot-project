import React from 'react';

interface Props {
	children: React.ReactNode;
}

const HistoryList: React.FC<Props> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-blue-950">
			{children}
		</div>
	);
};

export default HistoryList;
