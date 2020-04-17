import React from 'react';
import { Button, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import RequestActionsSave from './Save';
import RequestActionsImport from './Import';
import RequestActionsExport from './Export';

const RequestActions = (props) => {
	const { request, importRequest, cloneRequest } = props;

	return (
		<div className="RequestActions">
			<Space>
				<Button type="default" icon={<CopyOutlined />} onClick={cloneRequest}>
					Clone
				</Button>
				<RequestActionsSave request={request} />
				<RequestActionsImport importRequest={importRequest} />
				<RequestActionsExport request={request} />
			</Space>
		</div>
	);
};

export default RequestActions;
