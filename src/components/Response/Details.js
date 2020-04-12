import React from 'react';
import { Descriptions, Row, Col } from 'antd';

const ResponseDetails = (props) => {
	const { response } = props;
	const { result, duration } = response;
	const { status, statusText, headers } = result;

	return (
		<div className="ResponseDetails">
			<Row gutter={[0, 16]}>
				<Col span={24}>
					<Descriptions bordered>
						<Descriptions.Item label="Status">{status}</Descriptions.Item>
						<Descriptions.Item label="Status-Text">{statusText}</Descriptions.Item>
						<Descriptions.Item label="Duration">{duration} ms</Descriptions.Item>
						<Descriptions.Item label="Bytes">{headers['content-length']}</Descriptions.Item>
						<Descriptions.Item label="Content-Type">{headers['content-type']}</Descriptions.Item>
					</Descriptions>
				</Col>
			</Row>
		</div>
	);
};

export default ResponseDetails;
