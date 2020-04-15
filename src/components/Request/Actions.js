import React from 'react';
import { Button, Tooltip, Space, message } from 'antd';
import { CopyOutlined, DownloadOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons';

import {
	importRequest as fsImportRequest,
	exportRequest as fsExportRequest
} from '../../utils/electron.api';

const { ipcRenderer } = window.require('electron');

const RequestActions = (props) => {
	const { requestMerged, importRequest, cloneRequest } = props;

	const handleSave = () => {
		ipcRenderer.send('save-request', { request: requestMerged });
	};

	const handleImport = () => {
		fsImportRequest((err, request) => {
			if (err) {
				message.error(err.message);
			} else {
				importRequest(request);
				message.success('Request imported!');
			}
		});
	};

	const handleExport = () => {
		fsExportRequest({ request: requestMerged }, (err) => {
			if (err) {
				message.error(err.message);
			} else {
				message.success('Request exported!');
			}
		});
	};

	return (
		<div className="RequestActions">
			<Space>
				<Button type="default" icon={<CopyOutlined />} onClick={cloneRequest}>
					Clone
				</Button>
				<Button type="default" icon={<HeartOutlined />} onClick={handleSave}>
					Save
				</Button>
				<Tooltip title="Import request from file">
					<Button type="default" icon={<UploadOutlined />} onClick={handleImport}>
						Import
					</Button>
				</Tooltip>
				<Tooltip title="Export request to file">
					<Button type="default" icon={<DownloadOutlined />} onClick={handleExport}>
						Export
					</Button>
				</Tooltip>
			</Space>
		</div>
	);
};

export default RequestActions;
