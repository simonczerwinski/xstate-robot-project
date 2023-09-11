import React, { useEffect, useState } from 'react';
import Text from '../Text';

type Props = {
	data: Array<{
		name?: string;
		room?: string;
		command?: string;
		language?: string;
		date?: string;
	}>;
};

const HistoryLogs: React.FC<Props> = ({ data }) => {
	const [historyData, setHistoryData] = useState(data);
	useEffect(() => {
		const sortHistoryToLatestDate = (a: any, b: any) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB.getTime() - dateA.getTime();
		};

		setHistoryData(data.sort(sortHistoryToLatestDate));
	}, [data]);
	return (
		<div className="bg-black bg-opacity-50 p-4 mb-8 rounded-md">
			<Text
				as="h3"
				text="Saved history logs from previous commands"
				className="text-white text-lg font-medium p-4 text-center"
			/>
			<div className="overflow-x-auto py-4">
				<table className="min-w-full bg-transparent text-white divide-y divide-gray-800">
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
								Date
							</th>
						</tr>
					</thead>
					<tbody className="text-white divide-y divide-gray-200">
						{historyData.map((item, index) => (
							<tr
								className={
									index % 2 === 0
										? 'bg-teal-800 lg:opacity-60'
										: 'bg-teal-600 lg:opacity-80'
								}
								key={index}
							>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base font-medium">
									{item.name}
								</td>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base">
									{item.room}
								</td>
								<td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm sm:text-base">
									{item.command}
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

export default HistoryLogs;
