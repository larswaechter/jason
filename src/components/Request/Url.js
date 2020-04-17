import React, { useState } from 'react';
import { Form, Button, Input, Select, Row, Col } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { Option } = Select;

const RequestUrl = (props) => {
	const { context, updateRequestContext, sendRequest, isLoading } = props;
	const { method } = context;

	const [url, setUrl] = useState(context.url);

	const handleMethodChange = (method) => {
		updateRequestContext('method', method);
	};

	const handleUrlChange = (e) => {
		setUrl(e.target.value);
	};

	const handleUrlBlur = () => {
		if (url !== context.url) {
			updateRequestContext('url', url);
		}
	};

	const addonMethods = (
		<Select value={method} className="select-before" onChange={handleMethodChange}>
			<Option value="get">GET</Option>
			<Option value="delete">DELETE</Option>
			<Option value="post">POST</Option>
			<Option value="put">PUT</Option>
			<Option value="patch">Patch</Option>
		</Select>
	);

	return (
		<div className="RequestUrl">
			<Form>
				<Row gutter={[8, 16]}>
					<Col span={22}>
						<Input
							className="gutter-row"
							value={url}
							addonBefore={addonMethods}
							placeholder="Enter URL"
							size="large"
							onChange={handleUrlChange}
							onBlur={handleUrlBlur}
						/>
					</Col>
					<Col span={2}>
						<Button
							className="gutter-row"
							type="primary"
							icon={<SendOutlined />}
							size="large"
							style={{ width: '100%' }}
							onClick={sendRequest}
							htmlType="submit"
							loading={isLoading}
						/>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default RequestUrl;
