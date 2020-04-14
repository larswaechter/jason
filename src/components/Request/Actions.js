import React from 'react';
import { Button, Tooltip, Space, message } from 'antd';
import { CopyOutlined, DownloadOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons';

const remote = window.require('electron').remote.require('./remote');

const RequestActions = (props) => {
	const { requestMerged, importRequest, cloneRequest } = props;

	const handleImport = () => {
		remote.importRequest((err, request) => {
			if (err) {
				message.error(err.message);
			} else {
				importRequest(request);
				message.success('Request imported!');
			}
		});
	};

	const handleExport = () => {
		remote.exportRequest({ request: requestMerged }, (err) => {
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
				<Button type="default" icon={<HeartOutlined />}>
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
