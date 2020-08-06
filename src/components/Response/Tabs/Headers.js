import React, { useState } from 'react';

import { Input, Table } from 'antd';

const ResponseTabsHeaders = (props) => {
	const { headers } = props;

	const [headersFiltered, setHeadersFiltered] = useState(headers);

	// Filter headers
	const handleInputChange = (e) => {
		const searchTerm = e.target.value;

		if (searchTerm.length) {
			const filtered = {};

			for (let header in headers)
				if (header.includes(searchTerm)) filtered[header] = headers[header];

			setHeadersFiltered(filtered);
		} else setHeadersFiltered(headers);
	};

	const columns = [
		{
			title: 'Key',
			dataIndex: 'key',
			key: 'key'
		},
		{
			title: 'Value',
			dataIndex: 'value',
			key: 'value'
		}
	];

	const dataSource = [];

	for (let header in headersFiltered) {
		dataSource.push({
			key: header,
			value: headersFiltered[header]
		});
	}

	// sort by key
	dataSource.sort((a, b) => (a.key < b.key ? -1 : 1));

	return (
		<div className="ResponseTabsHeaders">
			<Input placeholder="Filter..." onChange={handleInputChange} style={{ marginBottom: 10 }} />
			<Table
				dataSource={dataSource}
				columns={columns}
				pagination={false}
				style={{ height: 600, overflowY: 'scroll' }}
			/>
		</div>
	);
};

export default ResponseTabsHeaders;
