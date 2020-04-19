import React from 'react';
import { Space, Button, message } from 'antd';

import { DownloadOutlined, ClearOutlined } from '@ant-design/icons';

import RequestService from '../../services/request';
import HelperService from '../../services/helper';

import { exportResponseBody } from '../../utils/electron.api';

const ResponseActions = (props) => {
	const { request, updateResponse } = props;

	const clearResponse = () => {
		updateResponse(RequestService.createEmptyResponse());
	};

	const handleExport = () => {
		const { response } = request;
		const { result } = response;
		const { extension } = result;

		exportResponseBody(request, HelperService.prettyPrint(result.data, extension), (err) => {
			if (err) {
				message.error(err.message);
			} else {
				message.success('Response body exported!');
			}
		});
	};

	return (
		<div className="ResponseActions">
			<Space style={{ marginBottom: 10 }}>
				<Button type="default" icon={<ClearOutlined />} onClick={clearResponse}>
					Clear
				</Button>
				<Button type="default" icon={<DownloadOutlined />} onClick={handleExport}>
					Export body
				</Button>
			</Space>
		</div>
	);
};

export default ResponseActions;
