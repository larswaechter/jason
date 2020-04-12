import React from 'react';
import { Empty, Button } from 'antd';

const RequestCreate = (props) => {
	const { addRequest } = props;

	return (
		<div className="RequestCreate">
			<Empty description="No requests yet." style={{ padding: '15rem' }}>
				<Button type="primary" onClick={addRequest}>
					Create
				</Button>
			</Empty>
		</div>
	);
};

export default RequestCreate;
