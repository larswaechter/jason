import React from 'react';
import { Row, Col, Spin } from 'antd';

const ResponseLoader = () => {
	return (
		<div className="ResponseLoader">
			<Row>
				<Col span={24}>
					<Spin tip="Loading..." size="large" style={{ margin: '30px auto', display: 'block' }} />
				</Col>
			</Row>
		</div>
	);
};

export default ResponseLoader;
