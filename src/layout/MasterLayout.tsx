import React from 'react';

interface Props {
	children: React.ReactNode;
}

const MasterLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="overflow-x-hidden min-h-screen bg-gray-700">{children}</div>
	);
};

export default MasterLayout;
