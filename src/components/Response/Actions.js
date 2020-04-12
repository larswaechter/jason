import React from 'react';
import { Space, Button } from 'antd';

import { DownloadOutlined, ClearOutlined } from '@ant-design/icons';

const ResponseActions = (props) => {
	const { updateResponse } = props;

	const clearResponse = () => {
		updateResponse({});
	};

	return (
		<div className="ResponseActions">
			<Space style={{ marginBottom: 10 }}>
				<Button type="default" icon={<ClearOutlined />} onClick={clearResponse}>
					Clear
				</Button>
				<Button type="default" icon={<DownloadOutlined />}>
					Export body
				</Button>
			</Space>
		</div>
	);
};

export default ResponseActions;
