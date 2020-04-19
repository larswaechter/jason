import React from 'react';

import { Empty, Typography } from 'antd';

import ResponseDetails from './Details';
import ResponseTabs from './Tabs/';
import ResponseLoader from './Loader';
import ResponseError from './Error';
import ResponseActions from './Actions';

const { Title } = Typography;

const Response = (props) => {
	const { request, isLoading, sendRequest, updateResponse } = props;
	const { metadata, response } = request;
	const { completed } = metadata;
	const { result } = response;

	const title = <Title level={4}>Response details</Title>;

	if (isLoading) {
		return (
			<div>
				{title}
				<ResponseLoader />
			</div>
		);
	}

	if (!completed || !result) {
		return (
			<div>
				{title}
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description="No response data"
					style={{ margin: 48 }}
				/>
			</div>
		);
	}

	if (response.error) {
		return (
			<div>
				{title}
				<ResponseError error={response.error} sendRequest={sendRequest} />
			</div>
		);
	}

	return (
		<div className="Response">
			{title}
			<ResponseActions request={request} updateResponse={updateResponse} />
			<ResponseDetails response={response} />
			<ResponseTabs response={response} />
		</div>
	);
};

export default Response;
