import React from 'react';

interface Props {
	children: React.ReactNode;
}

const MasterLayout: React.FC<Props> = ({ children }) => {
	return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default MasterLayout;
