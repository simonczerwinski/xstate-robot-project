import React from 'react';
import Text from '../Text';

interface HistoryItem {
	name?: string;
	room?: string;
	command?: string;
	language?: string;
	date?: string;
}

interface Props {
	data: HistoryItem[];
}

const HistoryList: React.FC<Props> = ({ data }) => {
	return (
		<div className="bg-black bg-opacity-30 p-4 mb-8 rounded-md">
			<Text
				as="h3"
				text="History"
				className="text-white text-lg font-bold p-4 text-center"
			/>
			<div className="overflow-x-auto py-4">
				<table className="min-w-full bg-black text-gray-300 divide-y divide-gray-800">
					<thead>
						<tr>
							<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
								Name
							</th>
							<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
								Room
							</th>
							<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
								Command
							</th>
							<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
								Language
							</th>
							<th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider">
								Date
							</th>
						</tr>
					</thead>
					<tbody className="bg-gray-800 text-gray-300 divide-y divide-gray-200">
						{data.map((item, index) => (
							<tr
								className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600'}
								key={index}
							>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base font-bold">
									{item.name}
								</td>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base">
									{item.room}
								</td>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base">
									{item.command}
								</td>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base">
									{item.language}
								</td>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base">
									{item.date}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default HistoryList;
