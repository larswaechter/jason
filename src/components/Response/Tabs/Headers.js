import React from 'react';

import { Table } from 'antd';

const ResponseTabsHeaders = (props) => {
	const { headers } = props;

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

	for (let header in headers) {
		dataSource.push({
			key: header,
			value: headers[header]
		});
	}

	return (
		<div className="ResponseTabsHeaders">
			<Table dataSource={dataSource} columns={columns} pagination={false} />
		</div>
	);
};

export default ResponseTabsHeaders;
