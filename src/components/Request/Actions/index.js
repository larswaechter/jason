import React from 'react';
import { Button, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import RequestActionsSave from './Save';
import RequestActionsImport from './Import';
import RequestActionsExport from './Export';

const RequestActions = (props) => {
	const { request, importRequest, cloneRequest, updateMetadata } = props;

	return (
		<div className="RequestActions">
			<Space>
				<RequestActionsImport importRequest={importRequest} />
				<RequestActionsExport request={request} />
				<Button type="default" icon={<CopyOutlined />} onClick={cloneRequest}>
					Clone
				</Button>
				<RequestActionsSave request={request} updateMetadata={updateMetadata} />
			</Space>
		</div>
	);
};

export default RequestActions;
