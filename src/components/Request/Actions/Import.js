import React from 'react';
import { Button, Tooltip, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { importRequest as fsImportRequest } from '../../../utils/electron.api';

const RequestActionsImport = (props) => {
	const { importRequest } = props;

	const handleImport = () => {
		fsImportRequest()
			.then((request) => {
				importRequest(request);
				message.success('Request imported!');
			})
			.catch((err) => message.error(err.message));
	};

	return (
		<Tooltip title="Import request from file">
			<Button type="default" icon={<UploadOutlined />} onClick={handleImport}>
				Import
			</Button>
		</Tooltip>
	);
};

export default RequestActionsImport;
