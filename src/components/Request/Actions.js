import React, { useEffect } from 'react';
import { Button, Tooltip, Space, message } from 'antd';
import { CopyOutlined, DownloadOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons';

const { ipcRenderer } = window.require('electron');

const RequestActions = (props) => {
	const { requestMerged, cloneRequest } = props;
	const { metadata, request } = requestMerged;
	const { uuid } = metadata;

	useEffect(() => {
		ipcRenderer.on(`export-request-response-${uuid}`, (event, { success }) => {
			if (success) {
				message.success('Request exported!');
			} else {
				message.error('Failed to export request!');
			}
		});
	}, []);

	const handleExport = () => {
		ipcRenderer.send('export-request', { request: requestMerged });
	};

	return (
		<div className="RequestActions">
			<Space>
				<Button type="default" icon={<CopyOutlined />} onClick={cloneRequest}>
					Clone
				</Button>
				<Button type="default" icon={<HeartOutlined />}>
					Save
				</Button>
				<Tooltip title="Export request to file">
					<Button type="default" icon={<DownloadOutlined />} onClick={handleExport}>
						Export
					</Button>
				</Tooltip>
				<Tooltip title="Import request from file">
					<Button type="default" icon={<UploadOutlined />}>
						Import
					</Button>
				</Tooltip>
			</Space>
		</div>
	);
};

export default RequestActions;
