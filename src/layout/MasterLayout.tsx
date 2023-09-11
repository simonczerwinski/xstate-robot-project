import React from 'react';

interface Props {
	children: React.ReactNode;
}

const MasterLayout: React.FC<Props> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-cyan-950 ">
			{children}
		</div>
	);
};

export default MasterLayout;
