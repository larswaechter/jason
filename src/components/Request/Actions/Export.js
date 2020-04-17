import React from 'react';
import { Button, Tooltip, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { exportRequest as fsExportRequest } from '../../../utils/electron.api';

const RequestActionsExport = (props) => {
	const { request } = props;

	const handleExport = () => {
		fsExportRequest({ request }, (err) => {
			if (err) {
				message.error(err.message);
			} else {
				message.success('Request exported!');
			}
		});
	};

	return (
		<Tooltip title="Export request to file">
			<Button type="default" icon={<DownloadOutlined />} onClick={handleExport}>
				Export
			</Button>
		</Tooltip>
	);
};

export default RequestActionsExport;
