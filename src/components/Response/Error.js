import React from 'react';
import { Result, Button, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const ResponseError = ({ error, sendRequest }) => {
	return (
		<div className="ResponseError">
			<Result
				status="error"
				title="Request failed"
				subTitle={error.message}
				extra={[
					<Button type="primary" key="try-again" onClick={sendRequest}>
						Try again
					</Button>
				]}
			>
				<Paragraph>
					<Text
						code={true}
						style={{
							fontSize: 16
						}}
					>
						{error.stack}
					</Text>
				</Paragraph>
			</Result>
		</div>
	);
};

export default ResponseError;
