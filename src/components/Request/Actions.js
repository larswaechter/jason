import React from 'react';
import { Button, Tooltip, Space } from 'antd';

import { CopyOutlined, DownloadOutlined, HeartOutlined, UploadOutlined } from '@ant-design/icons';

const RequestActions = (props) => {
	const { cloneRequest } = props;

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
					<Button type="default" icon={<DownloadOutlined />}>
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
